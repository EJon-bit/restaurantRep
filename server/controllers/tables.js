var mongoose = require('mongoose')
const nodemailer = require("nodemailer");
var express = require("express")
var router = express.Router()
var Table = require("../models/Table");
require("../models/Reservation")
var Reservemisc = require('../models/ReserveMisc')
var Reservation =require('../models/Reservation')

var transporter = nodemailer.createTransport({
    service: 'gmail',                
    auth: {
        user: 'toptiercuisineja@gmail.com',
        pass:  't0Pt1eRJ@'
    }
})

//adds table when restaurant makes changes to seating
router.post('/addtable', (req, res) => {    
    var table = new Table(req.body);
    
    table.occupied=false;
    table.reserved=false;

    table.save((error, table) => {      
        if (error) { console.log(error); }      
        res.json({
            table,
        });    
    });  
}); 

//to list all table for restaurant manager and/or employes to see and make changes if necessary    
router.get('/', (req, res) => {    
    Table.find({}, (error, tables) => {      
        if (error) { console.log(error); }      
        res.json({        
            tables,      
        });    
    }); 
}); 

//finds out if table is still unoccupied after set time 
//to determine if reserved field should be changed
router.get('/:tableNum', (req, res) => { 
    
    var tableId= req.params.tableNum;

    Table.findOne({_id:tableId},'occupied', (error, table) => {      
        if (error) { console.log(error); }      
        res.send(table);    
    }); 
}); 

//changes occupied to true when pir motion is detected
router.put('/tableoccupancyStat/:tableNo', async(req, res) => {   
    
    var tableId=req.params.tableNo;
    var occupancy= Table.findOne({_id:tableId,}, 'occupied')

    Table.findOne({_id:tableId}, function(error, table) {      
            
        if (error) { console.error(error); }
        
        if (occupancy.occupied== true){
            
            table.occupied= false;
        }
        else{
            table.occupied = true;
        }
                                 
              
        table.save(function (error, table) {        
            if (error) { console.log(error); }        
            res.send(table)      
        });    
    });  

})


//update table reserved field in database if PIR no longer detects motion (i.e. if a person has left or did not arrive in time)
//assigns the newly unreserved table to another waiting customer
router.put('/tableavailability/:tableNo/:tableId', async(req, res) => {   
    
    var tableNo=req.params.tableNo;
    var idTable= req.params.tableId;

    //finds table with id given in parameter...returns the seatNum field for that table and stores in in seatNo
    var seatNo= await Table.findOne({tableNum:tableNo},'seatNum');
    console.log("The number of seats are", seatNo);

    
    //this finds a queued reservation with the # of reserved seats that corresponds to the table which became available       
    var reserveMisc = await Reservemisc.findOne({"seatsReserved":seatNo.seatNum});
    console.log("The value in this array is", reserveMisc);

    //stores 2hrs ahead of current date in millisec
    var dateCheck= Date.now()+7200000;
    console.log("Date in millisec is:", dateCheck);

    //stores 2hrs ahead in normal format
    var filterDate= Date(dateCheck);
    console.log("Date is:", filterDate);

    //checks for reservations that might have a reservation date within the 2hr margin alloted to each res
    var reserveCheck = await Reservation.find({"tableNo":idTable, "dateReserved":{$lte:filterDate}});
    console.log("The table ID is", reserveCheck);

    //updates reserved field based on the presence or absence of a miscellaneous reservation match
    Table.findOne({tableNum:tableNo}, function(error, table) {      
        
        if (error) { console.error(error); }
        
        //if there are no suitable queued reservations and no regular reservations within a 2hr margin...set table to false
        if(!reserveMisc && !reserveCheck.length){
            table.reserved = false;
        }
        

        /*if a queued reservation requesting this table was found and no regular reservation within a 2hr margin was found
        change table status back to reserved before a new customer tries to reserve it*/
        else if(reserveMisc && !reserveCheck.length){

            table.reserved = true;
        }    
        
        
                
        table.save(function (error) {        
            if (error) { console.log(error); }        
            //res.send(table)      
        });    
    }); 
    
    /*finds table that was recently made available and 
    stores the id of that table in the queued reservation document which requesting a similar table ---IF no other reservations*/
    if(reserveMisc && !reserveCheck.length){    
        Reservemisc.findOne({"seatsReserved":seatNo.seatNum}, function(error, miscReservation){
            if (error) { console.error(error); }
            
            miscReservation.tableNo = seatNo._id;
                    
            miscReservation.save(function (error, miscReservation) {        
                if (error) { console.log(error); }        
                res.send(miscReservation)      
            });    
        
            
        })
    }
    //sends email to customer when table becomes available 
    //send mail with defined transport object
    // var mailInfo = transporter.sendMail({
    //         from: transporter.auth.user, // sender address
    //         to: reserveMisc.email, // list of receivers
    //         subject: "Top Toer- Reservation Update", // Subject line
    //         text: "A table meeting your requirments has been made available and assigned to you. PLEASE CLICK THE LINK BELOW TO SECURE YOUR RESERVATION.", // plain text body
    //         html: "<b>Hello world?</b>" // html body
    //     },
    //     (error)=>{
    //         if (error){
    //             return console.log(error);
    //         }                    
    // });
    // console.log("Message sent: %s", mailInfo.messageId);

    //} 
                
}); 

module.exports=router;
           
   

 
