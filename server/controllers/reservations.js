var mongoose = require('mongoose')
var randomstring= require('randomstring');
var express = require("express")
var router = express.Router()
var Reservation = require("../models/Reservation");
var Menu = require('../models/Menu');
var Table = require('../models/Table')

    
    //add a reservation
    router.post('/', async(req,res) => {
        
        var passCode = randomstring.generate({length: 6,  charset: 'numeric'});

        var reservation = new Reservation(req.body);

        var tableNo = await Table.findOne({"seatNum":reservation.seatsReserved, "reserved":false});

        //this finds one reservation similar to the one being posted but with different date
        var testres= await Reservation.find({"seatReserved":reservation.seatsReserved, "dateReserved":!reservation.dateReserved},'dateReserved')
        
        
        //to deduce cost take data from orders input field 'req.body.orders' and split it after iver comma into separate arrays the put it in cost
        try{
            if(tableNo){

                tableNo.reserved= true;
                await tableNo.save();
                reservation.atTable= false;
                reservation.tableNo = tableNo;
                reservation.password = passCode;
                reservation.onSite=false;
    
    
                await reservation.save(); 
    
                res.json({        
                    reservation,      
                });  
            }
            else if(testres){

                reservation.atTable= false;
                reservation.tableNo = testres.tableNo;
                reservation.password = passCode;
                reservation.onSite=false;
    
    
                await reservation.save(); 
    
                res.json({        
                    reservation,      
                });  



            }
            else throw "No tables available"

        }
        catch(err) {
            console.error(err);
           
        }     
            
        


        
    });     

    // router.post('/importQueued', async(req,res) => {        
       
    //     var reservation = new Reservation(req.body);

    //     var tableNo = await Table.find({"seatNum":reservation.seatsReserved, "reserved":false});
        
    //     //to deduce cost take data from orders input field 'req.body.orders' and split it after iver comma into separate arrays the put it in cost
    //     if(tableNo){

    //         tableNo[0].reserved= true;
    //         await tableNo[0].save();
    //         reservation.atTable= false;
    //         reservation.tableNo = tableNo[0];
            
    //         await reservation.save(); 

    //         res.json({        
    //             reservation,      
    //         });                 

    //     }        
    // });     
    
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