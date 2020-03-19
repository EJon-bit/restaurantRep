var mongoose = require('mongoose')
var randomstring= require('randomstring');
var express = require("express")
var router = express.Router()
var Reservemisc = require("../models/ReserveMisc");
// var Menu = require('../models/Menu');
// var Table = require('../models/Table')



//post request to make post this miscellaneous collection if no tables are available 
router.post('/queued', async(req,res) => {
    
    
var passCode = randomstring.generate({length: 6,  charset: 'numeric'});

var miscReservation = new Reservemisc(req.body);
                
    
miscReservation.password = passCode;
miscReservation.onSite=false;


await miscReservation.save(); 

res.json({        
    miscReservation,      
});  
    

    
});     

//put request to update a specific document in the miscellaneous reservations collection with an email or phone number
router.put('/queued/:password',(req, res) => {  
    
    var reservePass=req.params.password 
                
        Reservemisc.findOne({password:reservePass}, function(error, miscReservation) {      
            
            if (error) { console.error(error); }
            
            miscReservation.onSite = true;  
            
                
            miscReservation.save(function (error, miscReservation) {        
                if (error) { console.log(error); }        
                res.send(miscReservation)      
            });    
        });  
    }); 

//delete request to delete miscellaneous reservation
router.delete('/queued/:password', (req, res) => {  
        
    var deletebyPass=req.params.password;

    miscReservation.remove({password:deletebyPass}, function(error, miscReservation){      
        if (error) { console.error(error); }      
        res.send({ success: true })    
    });  

});

//get request to get a specific miscellaneous reservation to return all fields to eventually be posted in the reservations collection
router.get('/getqueued/:password', (req,res) => {
        
    var userId= req.params.password;

        Reservemisc.findOne({password:userId}, (error, miscReservation) => {      
                                        
        if (error) { console.log(error); }      
        res.json({        
            miscReservation,      
        }); 
    })
    
});

module.exports = router