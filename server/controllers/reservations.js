//var mongoose = require('mongoose')
var randomstring= require('randomstring');
var express = require("express")
var router = express.Router()
var Reservation = require("../models/Reservation");
var dateFormat = require('dateformat');
var Menu = require('../models/Menu');
var Table = require('../models/Table')
var nodemailer = require("nodemailer");

//defines acc used to send email
var transporter = nodemailer.createTransport({
    service: 'gmail',                
    auth: {
        user: 'toptiercuisineja@gmail.com',
        pass:  't0Pt1eRJ@'
    }
})    
    
//add a reservation
router.post('/', async(req,res) => {
    
    var passCode = randomstring.generate({length: 6,  charset: 'numeric'}); //generates random password for customer

    var reservation = new Reservation(req.body); //accepts and stores the reservation details entered by the customer

    var tableNo = await Table.findOne({"seatNum":reservation.seatsReserved, "reserved":false});//tries to find an unreserved table that suits reservation details

    var resTableNo= await Table.findOne({"seatNum":reservation.seatsReserved});
    
    var testres = await Reservation.find({"seatsReserved":reservation.seatsReserved, "dateReserved":{$ne:reservation.dateReserved}})
    
    console.log(testres.length)
    

    //var i=0;
    var hr= 7200000;
    var reserveDate= reservation.dateReserved.getTime();//converts date entered into millisecs
   
    
    //if a suitable table is found... save reservation and send an email to the customer of their ID required for entry into restaurant
    if(tableNo){
        console.log("Table", tableNo);
        tableNo.reserved= true;
        await tableNo.save();
        reservation.atTable= false;
        reservation.tableNo = tableNo._id;
        reservation.password = passCode;
        reservation.onSite=false;

        await reservation.save();
        // sends email to customer when table becomes available 
        // send mail with defined transport object
        var mailInfo ={
            from:'"Top Tier Ja" <toptiercuisineja@gmail.com>', // sender address
            to: reservation.email, // list of receivers
            subject: "Top Tier- Reservation Update", // Subject line
            text: "Hello World", // plain text body
            html: `<p>Hi ${reservation.name} your password is ${reservation.password} <br/> Please Ensure you save this password.
            <br/>You are required to have it to validate your reservation upon your arrival at the restaurant
            <br/> Thank you.</p>` // html body
        };

        transporter.sendMail(mailInfo, (error, info)=>{
            if (error){
                return console.log(error);
            } 
            else{
                console.log("Message sent:" + info.response);
            }
        }) 

        res.json({        
            reservation,      
        }); 
        
        
    }

    //if an unreserved table is not found... find a table based on the time slot it is reserved for... given that each reservation lasts for 2hrs upon customer arrival 
    else if(testres.length!=0){
        /*if reservations with same seatNo but different date is found check to see if all those found                
        have dates that are > or <  the date for reservation being made by at least 2hrs  */                 
        console.log("No completely unreserved tables available")
        var resDateCheck = testres.filter(tr => Math.abs(tr.dateReserved.getTime() - reserveDate) < hr);
        console.log("resDateCheck:", resDateCheck);
        if (resDateCheck.length == 0) {
            // save reservation to db
            reservation.atTable= false; 
            reservation.tableNo=resTableNo._id;                    
            reservation.password = passCode;
            reservation.onSite=false;

            await reservation.save(); 

            // sends email to customer when table becomes available 
            // send mail with defined transport object
            var mailpostInfo ={
                from: '"Top Tier Ja" <toptiercuisineja@gmail.com>', // sender address
                to: reservation.email, // list of receivers
                subject: "Top Tier- Reservation Update", // Subject line
                text: "Hello World",
                html: `<p>Hi ${reservation.name} your password is ${reservation.password} <br/> Please Ensure you save this password.
                <br/>You are required to have it to validate your reservation upon your arrival at the restaurant
                <br/> Thank you.</p>`// html body
            }
            transporter.sendMail(mailpostInfo, (error, info)=>{
                if (error){
                    return console.log(error);
                } 
                else{
                    console.log("Message sent:" + info.response);
                }

            })
        
            res.json({        
                reservation,      
            }); 

        }
        else{
            res.status(409).end();
        }
     
    }   
    else{
        res.status(409).end();
    }         
    //}
    
}); 

router.get('/checkonsite/:tableId', (req,res) => {
        
    var idTable= req.params.tableId;

    Reservation.findOne({_id:idTable, onSite:true, atTable:false}, 'onSite', (error, reservation) => {      
                                        
        if (error) { console.log(error); }      
        res.send(reservation); 
    })
    
});    

//to find available reservation datetimes.. if the datetime selected by customer for any given table is unavailable
router.get('/seatNum/:seatNum/:date', async(req, res) => { 

    var seatId= req.params.seatNum;

    var timeStamp=req.params.date;//this variable contains the getTime() version of the date....reverse it...
    console.log("The Time is:", timeStamp)
    
    var parsedDate= new Date(timeStamp) //stores the formatted date mm/dd/yyyy 00:00...      
    console.log("The Date is:", parsedDate);

    //find all the reservations with the same number of seats...and date > or < search date sorted from closest date to that selected to farthest
    var reserves= await Reservation.find({"seatsReserved":seatId, "dateReserved":{$ne:parsedDate}},'dateReserved').sort({dateReserved:1})
    console.log("Sorted reservations is:", reserves);
    
    
    var fourHours=14400000
    var twoHours= 7200000
    var availableDates= new Array();

    if(reserves.length!=0){           
        
        //var i=0;
        
        var timeDiff;

        var resTimeCheck = reserves.filter((rs, i)=>{                               
            
            if (i < reserves.length-1) {
                timeDiff= reserves[i+1].dateReserved.getTime() - rs.dateReserved.getTime(); 
                                
                console.log("Time Diff:", timeDiff)
            }                                
            return timeDiff >= fourHours;
        });
        console.log("Filtered reservations:", resTimeCheck)
        

        if (resTimeCheck.length > 0) {

            i=0;

            while (i<resTimeCheck.length){
                timeStampAvailDate= resTimeCheck[i].dateReserved.getTime() + twoHours                    
                
                parsedAvailDate= new Date(timeStampAvailDate);//format the date back to the form mm/dd/.... 
                console.log("Parsed Date is:", parsedAvailDate);                   
                
                availableDates.push({"dateReserved":dateFormat(parsedAvailDate, "dddd, mmmm dS, yyyy, h:MM:ss TT"), "rawDate":parsedAvailDate}); //store the available date
                
                i++;
            }
            
            console.log("The Available Dates are:", availableDates);
            res.send({        
                availableDates: availableDates,      
            }); 
                            
            
        }
        else{
            availableDates.push({"dateReserved":"There are NO Dates Available. Sorry"})
            res.send({
                availableDates: availableDates,
            })
        }   

        //loops through all of the indexes in reserve and finds time slots open for reservation
        
        
    }  
    else{

        res.status(409).end();
    }   

    
}); 

//fetch all reservations
router.get('/', async(req, res) => {
    
    await Reservation.find({},(error, reservations) => {      
                                        
        if (error) { console.log(error); }      
        res.json({        
            reservations,      
        });    
    })       
    .sort({dateReserved:1})      
    .populate('tableNo', 'tableNum')//only returns number id of the table provided for customer

    
});

//add get method for to display a customers reservation orders
router.get('/date/:date', async(req,res) => {

    var dateres=req.params.date;

    var parseDate= new Date(dateres) //stores the formatted date mm/dd/yyyy 00:00...      
    console.log("The Date is:", parseDate);

    await Reservation.findOne({"dateReserved":parseDate},'password', (error, reservation) => {      
                                        
        if (error) { console.log(error); }      
        console.log("The reservation is:", reservation)
        res.json({        
            reservation,      
        });    
    })               
        
});

router.get('/user/:password', (req,res) => {
        
    var userId= req.params.password;

        Reservation.findOne({password:userId}, 'customerName numOrders orders orderCost', (error, reservation) => {      
                                        
        if (error) { console.log(error); }      
        res.json({        
            reservation,      
        }); 
    })
    
});


router.get('/password/:password', async(req,res) => {

    var pass=req.params.password;
        
    console.log("The password is:", pass);
    
    var order= await Reservation.findOne({"password":pass}).populate('tableNo', 'tableNum')
    console.log(order)
    // let menuItems = await order.orders.map(async name => await Menu.findOne({name}));
    let menuItems = await Promise.all(order.orders.map((name) => Menu.findOne({name})));
    
    console.log({
        menuItems,
        order
    })
    
    res.json({
        menuItems,
        order
    })
    
});

    
//update onSite field when employee enters customer's id at entrance
router.put('/user/password/:password', async(req, res) => {  
    
    var reservePass=req.params.password 
            
    await Reservation.findOne({password:reservePass}, function(error, reservation) {      
        
        if (error) { console.error(error); }
        
        reservation.onSite = true;  
        
                
        reservation.save(function (error, reservation) {        
            if (error) { console.log(error); }        
            res.json({
                reservation
            })      
        });    
    }).populate('tableNo', 'tableNum')  
}); 

router.put('/user/:password', async(req, res) => {  
    
    var reservePass=req.params.password 
                
        await Reservation.findOne({password:reservePass},'orders cost', function(error, reservation) {      
            
            if (error) { console.error(error); }
            
            reservation.orders = req.body.orders;  
            
                
            reservation.save(function (error, reservation) {        
                if (error) { console.log(error); }        
                res.json({
                    reservation
                })      
            });    
        });  
}); 

//to addtime to reservation when customer arrives...based on the time taken to prepare meal
router.put('/user/addtime/:password/:time',async(req, res) => {  
    
    var reservePass=req.params.password 
    var addtime=req.params.time;           
    await Reservation.findOne({password:reservePass}, (error, reservation)=>{      
            
            if (error) { console.error(error); }
            var olddate = reservation.dateReserved;
            console.log("Old date is", olddate)
            var newDateObj = new Date((Date.now()-olddate.getTime()) + addtime*60000);
            console.log("new Date is", newDateObj)

            reservation.orders = req.body.orders;

            if(reservation.onSite==true){
                reservation.dateReserved= newDateObj;
            }
                            
            reservation.save(function (error, reservation) {        
                if (error) { console.log(error); }        
                res.json({
                    reservation
                })      
            });    
        });  
}); 


//delete a reservation for a user if they decide to cancel because of circumstance
router.delete('/user/:password', (req, res) => {  
        
    var deletebyPass=req.params.password;
    Reservation.remove({password:deletebyPass}, function(error, reservation){      
        if (error) { console.error(error); }      
        res.send({ success: true })    
    });  

});

//delete based on pir sensors and python code
router.delete('/deletereserve/:code', (req, res) => {  
        
    var custId=req.params.code;
    Reservation.remove({password:custId}, function(error){      
        if (error) { console.error(error); }      
        res.send({ success: true })    
    });  

});



module.exports = router