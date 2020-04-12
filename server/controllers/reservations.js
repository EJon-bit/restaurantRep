var mongoose = require('mongoose')
var randomstring= require('randomstring');
var express = require("express")
var router = express.Router()
var Reservation = require("../models/Reservation");
var Menu = require('../models/Menu');
var Table = require('../models/Table')
const nodemailer = require("nodemailer");

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


        var i=0;
        var hr= 7200000;
        var reserveDate= reservation.dateReserved.getTime();//converts date entered into millisecs
        var tableIdNum=0;
               
        //to deduce cost take data from orders input field 'req.body.orders' and split it after iver comma into separate arrays the put it in cost
        
        //if a suitable table is found... save reservation and send an email to the customer of their ID required for entry into restaurant
        if(tableNo){

            tableNo.reserved= true;
            await tableNo.save();
            reservation.atTable= false;
            reservation.tableNo = tableNo._id;
            reservation.password = passCode;
            reservation.onSite=false;


            await reservation.save(); 

            res.json({        
                reservation,      
            }); 
            
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
        }
        //if an unreserved table is not found... find a table based on the time slot it is reserved for... given that each reservation lasts for 2hrs upon customer arrival 
        // else {
            
        //     //finds reservations with same number of seats but different dates
        //     var testres= await Reservation.find({"seatsReserved":reservation.seatsReserved, "dateReserved":{$ne:reservation.dateReserved}})
            
        //     console.log(testres.length)
        //     console.log(testres[0].dateReserved)

        //     if(testres){
        //         /*if reservations with same seatNo
        //          but different date is found check to see if all those found
        //          have dates that are > or <  the date for reservation being made by at least 2hrs  */                 
               
        //         var j=0;

        //         //loops through all reservations with same seating number to find an available timeslot to reserve
        //         for (i=0; i=testres.length; i++){ 

        //             console.log(j);
                    
        //             var compTime= testres[j].dateReserved.getTime();

        //             console.log("compTime is:",compTime);
        //             console.log("reserveDate is:",reserveDate);

        //             var timeDifference=0;
        
        //             if(reserveDate>compTime){
                        
        //                 timeDifference= reserveDate - compTime
        //             }
        //             else{
        //                 timeDifference= compTime-reserveDate;
        //             }
                    
        //             console.log("Time difference is:", timeDifference)
        //             //checks if date
        //             if(timeDifference >hr){
        //                 tableIdNum = testres[j]._id;
        //                 console.log("Testres consists of:",testres[j]);

        //                 i= testres.length;

        //                 reservation.atTable= false; 
        //                 reservation.tableNo=tableIdNum;                    
        //                 reservation.password = passCode;
        //                 reservation.onSite=false;
            
        //                 await reservation.save(); 
            
        //                 res.json({        
        //                     reservation,      
        //                 }); 

        //                  //sends email to customer when table becomes available 
        //                 //send mail with defined transport object
        //                 // var mailInfo = transporter.sendMail({
        //                 //         from: transporter.auth.user, // sender address
        //                 //         to: reserveMisc.email, // list of receivers
        //                 //         subject: "Top Toer- Reservation Update", // Subject line
        //                 //         text: "A table meeting your requirments has been made available and assigned to you. PLEASE CLICK THE LINK BELOW TO SECURE YOUR RESERVATION.", // plain text body
        //                 //         html: "<b>Hello world?</b>" // html body
        //                 //     },
        //                 //     (error)=>{
        //                 //         if (error){
        //                 //             return console.log(error);
        //                 //         }                    
        //                 // });
        //                 // console.log("Message sent: %s", mailInfo.messageId);
                                    
        //             }
        //             j++;
        //         }
        //     } 
            else{
                res.status(404).send({error:'Not Found'});
            }         
        //}
       
    });   

    //to find available reservation datetimes.. if the datetime selected by customer for any given table is unavailable
    router.get('/:seatNum/:date', (req, res) => { 
    
        var seatId= req.params.seatNum;

        var timeStamp=req.params.date;//this variable contains the getTime() version of the date....reverse it...
        console.log("The Time is:", timeStamp)
        
        var parsedDate= new Date(timeStamp) //stores the formatted date mm/dd/yyyy 00:00...      
        console.log("The Date is:", parsedDate);

        //find all the reservations with the same number of seats...and date > or < search date sorted from closest date to that selected to farthest
        var reserves= Reservation.find({"seatsReserved":seatId,"dateReserved":{$ne:parsedDate}},'dateReserved').sort({dateReserved:1})
        console.log(reserves);

        var fourHours=14400000
        var twoHours= 7200000
        var availableDates=0;

        if(reserves){                          
           
            var j=0;
            var i=0;

            //loops through all of the indexes in reserve and finds time slots open for reservation
            for (i=0; i=reserves.length; i++){ 

                console.log(j);

                //stores the difference between two consequtive reservations sorted by date
                var dateDiff= reserves[j+1].dateReserved.getTime() - reserves[j].dateReserved.getTime()
                console.log("The Difference in Dates is:", availableDates);

                //if consecutive reservations are at least four hours apart 
                if (dateDiff >= fourHours){

                    //store an available reserve date two hours after the closer of the 2 dates to the originally chosen date
                    timeStampAvailDate= reserves[j].dateReserved.getTime() + twoHours
                    
                    parsedAvailDate= new Date(timeStampAvailDate);//format the date back to the form mm/dd/....

                    availableDates[j]= {"dateReserved":parsedAvailDate} ; //store the available date
                    console.log("The Available Dates are:", availableDates);
                    
                }
                j++;

                //responds with all the dates available for reservation in json format
                res.json({        
                    availableDates,      
                }); 

            }
        }  
        else{

            res.status(404).send({error:'Not found'});
        }   
    
        
    }); 

    
     //fetch all reservations
     router.get('/', (req,res) => {
        
        Reservation.find({},(error, reservations) => {      
                                            
            if (error) { console.log(error); }      
            res.json({        
                reservations,      
            });    
        })       
        .populate('tableNo', 'tableNum')//only returns number id of the table provided for customer
 
        
    });

    //add get method for to display a customers reservation orders
    
    router.get('/user/:password', (req,res) => {
           
        var userId= req.params.password;

         Reservation.findOne({password:userId}, 'customerName numOrders orders orderCost', (error, reservation) => {      
                                            
            if (error) { console.log(error); }      
            res.json({        
                reservation,      
            }); 
        })
        
    });

    //get method below checks if reserved customer has entered to determine if RGB lights should be turned on
    router.get('/checkonSite/:password', (req,res) => {
           
        var userId= req.params.password;

        Reservation.findOne({onSite:true, atTable:false}, 'tableNo', (error, reservation) => {      
                                            
            if (error) { console.log(error); }      
            res.json({        
                reservation,      
            }); 
        }).populate('tableNo', 'tableNum')
        
    });     

    
      
    //update onSite field when employee enters customer's id at entrance
    router.put('/user/:password',(req, res) => {  
        
       var reservePass=req.params.password 
                
        Reservation.findOne({password:reservePass}, function(error, reservation) {      
            
            if (error) { console.error(error); }
            
            reservation.onSite = true;  
            
                  
            reservation.save(function (error, reservation) {        
                if (error) { console.log(error); }        
                res.send(reservation)      
            });    
        });  
    }); 

    router.put('/user/:password',(req, res) => {  
        
        var reservePass=req.params.password 
                 
         Reservation.findOne({password:reservePass}, function(error, reservation) {      
             
             if (error) { console.error(error); }
             
             reservation.orders = req.body.orders;  
             
                   
             reservation.save(function (error, reservation) {        
                 if (error) { console.log(error); }        
                 res.send(reservation)      
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
    router.delete('/deletereserve/:tableNo', (req, res) => {  
         
        var tableId=req.params.tableNo;
        Reservation.remove({tableNum:tableId}, function(error, reservation){      
            if (error) { console.error(error); }      
            res.send({ success: true })    
        });  

    });



module.exports = router