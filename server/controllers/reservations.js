var mongoose = require('mongoose')

var Reservation = require("../models/Reservation");
var Menu = require('../models/Menu');
var Table = require('../models/Table')

module.exports.controller = (app) => {
    
    //fetch all reservations
    app.get('/reservation', (req,res) => {
        
        Reservation.find({}, 'customerName numOrders orders specialRequests orderCost tableNo dateReserved onSite', (error, reservations) => {      
                                            
            if (error) { console.log(error); }      
            res.send({        
                reservations: reservations,      
            });    
        })
        .populate('orders', 'name') // only return the name of the order
        .populate('orderCost', 'cost')
        .populate('tableNo', 'tableNum')//only returns number of persons in reservation
 
        
    });

    //add a reservation    
    app.post('/reservation', async(req,res) => {
        
        var reservation = new Reservation(req.body);

        var order = await Menu.find({"name":"Fried Brie"});        
        var orderCost = await Menu.find({"name":"Fried Brie"});
        var tableNo = await Table.find({"seatNum":reservation.seatsReserved, "occupied":false});

        reservation.orders = order;
        reservation.orderCost = orderCost;
        reservation.tableNo = tableNo;

        await reservation.save();  
    }); 
     
    
    // update a reservation  
    app.put('/reservation/:id', (req, res) => {   
        
        Reservation.findById(req.params.id, 'customerName seatsReserved numOrders orders specialRequests orderCost dateReserved tableNo onSite', function (error, reservation) {      
            
            if (error) { console.error(error); }
            
            reservation.customerName = req.body.customerName    
            reservation.seatsReserved = req.body.seatsReserved  
            reservation.numOrders = req.body.numOrders   
            reservation.orders = req.body.orders      
            reservation.specialRequests = req.body.specialRequests 
            reservation.orderCost = req.body.orderCost
            reservation.dateReserved = req.body.dateReserved
            reservation.tableNo = req.body.tableNo
            reservation.onSite = req.body.onSite
                  
            user.save(function (error, reservation) {        
                if (error) { console.log(error); }        
                res.send(reservation)      
            });    
        });  
    }); 

    // delete a reservation  
    app.delete('/reservations/:id', (req, res) => {    
        Reservation.remove({ _id: req.params.id }, function(error, reservation){      
            if (error) { console.error(error); }      
            res.send({ success: true })    
        });  
    });

}
