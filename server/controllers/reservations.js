var mongoose = require('mongoose')

var Reservation = require("../models/Reservation");

module.exports.controller = (app) => {
    
    //fetch all reservations
    app.get('/reservation', function(req,res){
        
        Reservation.find({}, 'customerName seatsReserved numOrders specialRequests dateReserved onSite', (error, reservations) => {      
                                            
            if (error) { console.log(error); }      
            res.send({        
                reservations: reservations,      
            });    
        })
        .populate('orders', 'name') // only return the name of the order
        .populate('orderCost', 'cost')
        .populate('tableNo', 'seatNum')
 
        .exec((err, reservation) => {
        if (err) throw err;

            console.log('The order is %s', reservation.orders.name);
            console.log('The cost is %s', reservation.orderCost.cost);
            console.log('The order is %s', reservation.tableNo.seatNum); 
        
        });
    });

    //add a reservation    
    app.post('/reservation', function(req,res){
        
        var reservation = new Reservation({      
            customerName: req.body.customerName,    
            seatsReserved:req.body.seatsReserved,  
            numOrders: req.body.numOrders,     
            orders: req.body.orders,      
            specialRequests: req.body.specialRequests, 
            orderCost:req.body.orderCost,
            dateReserved:req.body.dateReserved,
            tableNo:req.body.tableNo,
            onSite:req.body.onSite

        });
        
        reservation.save((error, reservation) => {      
            if (error) { console.log(error); }      
            res.send(reservation);    
        });  
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
