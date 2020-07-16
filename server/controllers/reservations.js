
var randomstring= require('randomstring');
var express = require("express")
var router = express.Router()
var Reservation = require("../models/Reservation");
var ReservationArchive = require("../models/ReservationArchive")
var dateFormat = require('dateformat');
var Menu = require('../models/Menu');
var Table = require('../models/Table')
var Reservemisc = require('../models/ReserveMisc')
var nodemailer = require("nodemailer");
var deleteRes=0;

//defines acc used to send email
var transporter = nodemailer.createTransport({
    service: 'gmail',                
    auth: {
        user: 'toptiercuisineja@gmail.com',
        pass:  't0Pt1eRJ@'
    }
})    


async function tranferSavedRes(numSeats, table, date){

    var savedRes
      
    //this finds a queued reservation with the # of reserved seats that corresponds to the table which became available       
    var reserveMisc = await Reservemisc.find({"seatsReserved":numSeats, "dateReserved":{$gte:date}}).sort({dateReserved:1});
    console.log("Similar queued Reservation", reserveMisc);
    if(reserveMisc.length){
        var queuedTime = reserveMisc[0].dateReserved.getTime() + 7200000;

        var queuedDate = Date(queuedTime);
        console.log(" Queued Date is:", queuedDate);

        //checks for reservations that might have a reservation date within the 2hr margin alloted to each res
        var reserveCheck = await Reservation.find({"tableNo":table, "dateReserved":{$lte:queuedDate}});
        console.log("The reservation is", reserveCheck);

    }
    
    //if there is a miscellaneous reservation with a similar seating and date that does not clash with any pre existing reservation
    if(reserveMisc.length && !reserveCheck.length){  
        await Reservemisc.find({password:reserveMisc[0].password}, function(error, miscReservation) {      
            
            if (error) { console.error(error); }   
                        
            console.log(miscReservation)

            savedRes=miscReservation.password;

            var reservation = new Reservation(miscReservation)
            reservation.tableNo= table
            
            //saves queued reservation to the reservations list
            reservation.save(function (error) {        
                if (error) { console.log(error); }                          
            }); 
            
            //sends email to customer when table becomes available 
            //send mail with defined transport object
            var mailInfo ={
                from:'"Top Tier Ja" <toptiercuisineja@gmail.com>', // sender address
                to: reservation.email, 
                subject: "Top Tier- Reservation Update", // Subject line
                text: "Hello World", // plain text body
                html: `<p>Hi ${reservation.customerName}, <br/><br/>Please Ensure you save this password.
                <br/>A table suitable for you saved Reservation has been made available. You are now officially Reserved.
                <br/><br/>Your password is ${reservation.password}.
                <br/><br/>If you want to review/Edit your order or no longer have an interest in this keeping this reservation, PLEASE click the link below and enter the password given to do so.
                <br/><a href="http://localhost:8081/Reservation/User">link text</a>
                <br/><br/> Thank you.</p>` 
            };

            transporter.sendMail(mailInfo, (error, info)=>{
                if (error){
                    return console.log(error);
                } 
                else{
                    console.log("Message sent:" + info.response);
                }
            }) 
                  
        })  

        Reservemisc.deleteOne({password:savedRes}, function(error){      
            if (error) { console.error(error); }      
        
        });  

            
    }
}

async function delResUpTab(tabId, resPass, a, c){
    await Table.findOne({_id:tabId}, async function(error, table){

        if (error) { console.error(error); }
       
        //if table with specified id is not occupied (i.e. the person has left), check for a suitable queued reservation to fill its place
        if(!table.occupied|| deleteRes==1){

            tranferSavedRes(a, tabId, c)

            await Reservation.findOne({password: resPass}, async function(error, reservation){      
                
                if (error) { console.error(error); }    
                var archiveRes = new ReservationArchive(reservation);  
                
                await archiveRes.save(function(error){
                    if (error) { console.error(error);}
                }); 
            });  

            await Reservation.deleteOne({"password":resPass}, function(error){      
                if (error) { console.error(error); }                    
            });  

             //finds all reservations reserved to the same table
            var sameTable= await Reservation.find({tableNo:tabId})

            //change table reserved field to false if there are no other reservations related to that table
            if(!sameTable.length){
                table.reserved=false

                table.save(function (error) {        
                    if (error) { console.log(error); }        
                    
                });    
            }
        }
    })
}
    
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

        await tableNo.save(function(error) {        
            if (error) { console.log(error); }           
        });    
       
        reservation.paid= false;
        reservation.served=false;
        reservation.tableNo = tableNo._id;
        reservation.password = passCode;
        reservation.onSite=false;

        await reservation.save(function (error) {        
            if (error) { console.log(error); }          
        });    


        // sends email to customer when table becomes available 
        // send mail with defined transport object
        var mailInfo ={
            from:'"Top Tier Ja" <toptiercuisineja@gmail.com>', // sender address
            to: reservation.email, // list of receivers
            subject: "Top Tier- Reservation Update", // Subject line
            text: "Hello World", // plain text body
            html: `<p>Hi ${reservation.customerName},<br/> <br/> Your password is ${reservation.password} <br/><br/> Please Ensure you save this password.
            <br/>You are required to have it to validate your reservation upon your arrival at the restaurant
            <br/><br/>Thank you.</p>` // html body
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
            reservation.paid= false; 
            reservation.served=false;
            reservation.tableNo=resTableNo._id;                    
            reservation.password = passCode;
            reservation.onSite=false;

            await reservation.save(function (error) {        
                if (error) { console.log(error); }               
            });     

            // sends email to customer when table becomes available 
            // send mail with defined transport object
            var mailpostInfo ={
                from: '"Top Tier Ja" <toptiercuisineja@gmail.com>', // sender address
                to: reservation.email, // list of receivers
                subject: "Top Tier- Reservation Update", // Subject line
                text: "Hello World",
                html: `<p>Hi ${reservation.customerName} your password is ${reservation.password} <br/> Please Ensure you save this password.
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
    
    
}); 


//fetch all reservations not yet served
router.get('/', async(req, res) => {
   
    //each time kitchen page is reloaded check if the the date for any reservation has passed and the customer didnt show up
    var dateCheck= new Date(Date.now()-120000)
    console.log(dateCheck)
    
    var resOnTimeCheck= await Reservation.find({"dateReserved":{$lt:dateCheck}}) 
    console.log(resOnTimeCheck)

    if(resOnTimeCheck.length){
        resOnTimeCheck.forEach((reserve)=>{

            delResUpTab(reserve.tableNo, reserve.password, reserve.seatsReserved, reserve.dateReserved)            

        })
    }
    await Reservation.find({served:false},(error, reservations) => {      
                                      
        if (error) { console.log(error); }      
        res.json({        
            reservations,      
        });    
    })       
    .sort({dateReserved:1})      
    .populate('tableNo', 'tableNum')//only returns number id of the table provided for customer
    
});

//triggered when customer gets up from table (i.e. no motion detected)
router.get('/checkpay/:tableId', async(req,res) => {
        
    var idTable= req.params.tableId;

    await Reservation.findOne({tableNo:idTable, onSite:true}, 'paid', (error, reservation) => {      
                                        
        if (error) { console.log(error); }      
        res.send(reservation); 
    })
    
});    

//to get a list of all reservations that are onsite but have not yet paid
router.get('/payStat', async(req,res) => {        
   
    await Reservation.find({onSite:true}, 'customerName paid password', (error, reservations) => {      
                                        
        if (error) { console.log(error); }      
        res.json({
            reservations
        }); 
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

//to display a customers reservation password for reservation modal
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

//gets details from db menu corresponding to the orders of a specified reservation
router.get('/password/:password', async(req,res) => {

    var pass=req.params.password;
        
    console.log("The password is:", pass);
    
    var order= await Reservation.findOne({"password":pass}).populate('tableNo', 'tableNum')
    console.log(order)
    
    if (order==null){

        res.status(409).end();
    }
    
    else{

        let menuItems = await Promise.all(order.orders.map((name) => Menu.findOne({name})));
    
        console.log({
            menuItems,
            order
        })
        
        res.json({
            menuItems,
            order
        })
    
    }
    
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

//to update (remove specific orders) from a reservation
router.put('/user/:password', async(req, res) => {  
    
    var reservePass=req.params.password 
   
               
    await Reservation.findOne({password:reservePass}, ' numOrders orders orderCost', function(error, reservation) {      
       
        var newCost=0

        if (error) { console.error(error); }
                    
        var unwantedItems = req.body.orders
        console.log(unwantedItems)

        var newOrder=reservation.orders
        console.log(newOrder)

        unwantedItems.forEach((item)=>{
            var i
            newOrder.find((order, index)=>{
                i=index
                return order==item
            })
            newOrder.splice(i, 1)
        })

        console.log(newOrder)

        newOrder.forEach((order)=>{
            console.log(order)
            Menu.findOne({name:order},'cost', function(error, menu){
                if (error) { console.error(error); }
               
                newCost+=menu.cost 
                reservation.orderCost= newCost   
                console.log("The total cost is:", newCost)
                            
            })           
            
        })

        
        reservation.orders= newOrder
        reservation.numOrders = newOrder.length
                
        reservation.save(function (error, reservation) {        
            if (error) { console.log(error); }        
            res.json({
                reservation
            })      
        });    
        
    });  
}); 

//to addtime to reservation when customer arrives...based on the time taken to prepare meal
router.put('/user/addtime/:password',async(req, res) => {  
    
    var reservePass=req.params.password 
    var orders=req.body.orders
    console.log(orders)       
    
    var newCost=0

    await Reservation.findOne({password:reservePass}, async(error, reservation)=>{      
            
            if (error) { console.error(error); }
            // var oldOrder= reservation.orders
            // console.log(oldOrder)

            orders.forEach((order)=>{
                reservation.orders.push(order)
            })            
            console.log(reservation.orders) 
            reservation.numOrders= reservation.orders.length

            var menuItems = await Promise.all(reservation.orders.map((name) => Menu.findOne({name},'prepTime cost')));
            console.log(menuItems)

            menuItems.forEach((item)=>{
               
                newCost+=item.cost 
                reservation.orderCost= newCost   
                console.log("The total cost is:", newCost)
                            
            })          
               
           
            var timePrep= menuItems.sort((a,b)=>(b.prepTime-a.prepTime))
            console.log(timePrep)
            var addTime= timePrep[0].prepTime
            console.log(addTime)

            var olddate = reservation.dateReserved;
            console.log("Old date is", olddate)

            var dateCalc= olddate.getTime() + (addTime*60000)
            console.log("calculated date is", dateCalc)
          
            var newDateObj = new Date(dateCalc);
            console.log("new Date is", newDateObj)

            

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


//available in kitchen to update a reservation to 'served' when meal has been prepared
router.put('/served/:id', async(req, res) => {  
    
    var reserveId= req.params.id
                
        await Reservation.findOne({_id:reserveId},'served', function(error, reservation) {      
            
            if (error) { console.error(error); }
            
            reservation.served = true;              
           
            reservation.save(function (error, reservation) {        
                if (error) { console.log(error); }        
                res.json({
                    reservation
                })      
            });    
        });  

       
        
}); 

//to update paid status to true for a specific reservation...also deletes the reservation if paid customer has left the restaurant
//and replaces it with miscellaneous Reservation
router.put('/payStat/:password', async(req, res) => {  
    var tableCode
    var seating
    var reservePass=req.params.password 
    var resDate
                
    await Reservation.findOne({password:reservePass},'paid tableNo seatsReserved dateReserved', function(error, reservation) {      
        
        if (error) { console.error(error); }
        
        resDate=reservation.dateReserved
        reservation.paid = true;              
        tableCode= reservation.tableNo 
        seating=reservation.seatsReserved
        reservation.save(function (error, reservation) {        
            if (error) { console.log(error); }        
            res.json({
                reservation
            })      
        });    
    });  
   
    delResUpTab(tableCode, reservePass, seating, resDate)

    
        
}); 

//delete a reservation for a user if they decide to cancel because of circumstance
router.delete('/user/:seatNo/:table/:password', async(req, res) => {  
        
    var deletebyPass=req.params.password;
    var idTable=req.params.table
    var seatNum=req.params.seatNo
   
    await Reservation.findOne({"password":deletebyPass},'dateReserved', function(error,date){
        deleteRes+=1
        delResUpTab(idTable, deletebyPass, seatNum, date.dateReserved)
    })
    
    
    res.send({ success: true }) 
   
});

//delete based on pir sensors and python code
router.delete('/deletereserve/:code', async(req, res) => {  
        
    var idTable=req.params.code;
    var resSeat
    var date
    var passId
    await Reservation.findOne({tableNo:idTable, onSite: true}, 'seatsReserved dateReserved password', function(error, reservation){
        if (error) { console.error(error); }
        resSeat=reservation.seatsReserved
        date= reservation.dateReserved
        passId= reservation.password
    })

    delResUpTab(idTable, passId, resSeat, date)
    
    res.send({ success: true }) 
});



module.exports = router