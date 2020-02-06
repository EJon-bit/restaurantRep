var mongoose = require('mongoose')
var randomstring= require('randomstring');

var Reservation = require("../models/Reservation");
var Menu = require('../models/Menu');
var Table = require('../models/Table')

module.exports.controller = (app) => {
    
    //add a reservation
    app.post('/reservation', async(req,res) => {
        
       
        var passCode = randomstring.generate({length: 6,  charset: 'numeric'});

        var reservation = new Reservation(req.body);

        var tableNo = await Table.find({"seatNum":reservation.seatsReserved, "occupied":false});
        
        //to deduce cost take data from orders input field 'req.body.orders' and split it after iver comma into separate arrays the put it in cost
        
        reservation.tableNo = tableNo[0];
        reservation.password = passCode;

        await reservation.save(); 

        res.json({        
            reservation,      
        });  
    });     
    
     //fetch all reservations
    app.get('/reservation', (req,res) => {
        
        Reservation.find({}, 'numOrders orders specialRequests tableNo dateReserved onSite', (error, reservations) => {      
                                            
            if (error) { console.log(error); }      
            res.json({        
                reservations,      
            });    
        })       
        .populate('tableNo', 'tableNum')//only returns number id of the table provided for customer
 
        
    });

    //add get method for to display a customers reservation details at their table
    //this method should be executed when the onSite field changes to True.
    // app.get('/reservation/user', (req,res) => {
        
    //     Reservation.findOne(password, 'customerName orders specialRequests orderCost dateReserved password', (error, reservations) => {      
                                            
    //         if (error) { console.log(error); }      
    //         res.send({        
    //             user: user,      
    //         }); 
    //     })
    //     // .populate('orders', 'name') // only return the name of the order
    //     // .populate('orderCost', 'cost')
    //     .populate('tableNo', 'tableNum')
    // });
       
        
    
    // update a reservation  for user on webpage if they want to make changes due to circumstance
    app.put('/reservation/user',(req, res) => {   
        
        Reservation.findOne(passCode, 'customerName seatsReserved numOrders orders specialRequests orderCost dateReserved tableNo', function(error, reservation) {      
            
            if (error) { console.error(error); }
            
            reservation.customerName = req.body.customerName    
            reservation.seatsReserved = req.body.seatsReserved  
            reservation.numOrders = req.body.numOrders   
            reservation.orders = req.body.orders      
            reservation.specialRequests = req.body.specialRequests 
            reservation.orderCost = req.body.orderCost
            reservation.dateReserved = req.body.dateReserved
            reservation.tableNo = Table.find({"seatNum":reservation.seatsReserved, "occupied":false});
                  
            user.save(function (error, reservation) {        
                if (error) { console.log(error); }        
                res.send(reservation)      
            });    
        });  
    }); 

    // delete a reservation  from kitchen reservation list
    app.delete('/reservations/:id', (req, res) => {    
        Reservation.remove({ _id: req.params.id }, function(error, reservation){      
            if (error) { console.error(error); }      
            res.send({ success: true })    
        });  
    });

    //delete a reservation for a user if they decide to cancel because of circumstance
    app.delete('/reservations/user', (req, res) => {    
        Reservation.remove(passCode, function(error, reservation){      
            if (error) { console.error(error); }      
            res.send({ success: true })    
        });  
    });

}
