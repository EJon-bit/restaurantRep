var mongoose = require('mongoose')
var randomstring= require('randomstring');
var express = require("express")
var router = express.Router()
var Reservemisc = require("../models/ReserveMisc");
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',                
    auth: {
        user: 'toptiercuisineja@gmail.com',
        pass:  't0Pt1eRJ@'
    }
})    


//post request to make post this miscellaneous collection if no tables are available 
router.post('/queued', async(req,res) => {
    
    
    var passCode = randomstring.generate({length: 6,  charset: 'numeric'});

    var miscReservation = new Reservemisc(req.body);
                    
        
    miscReservation.password = passCode;
    miscReservation.onSite=false;
    miscReservation.paid= false;
    miscReservation.served=false;


    await miscReservation.save(); 

    var mailInfo ={
        from: '"Top Tier Ja" <toptiercuisineja@gmail.com>', // sender address
        to: miscReservation.email, // list of receivers
        subject: "Top Tier- Reservation Update", // Subject line
        text: "Hello", // plain text body
        html: `<p>Hi ${miscReservation.customerName},
        <br/><br/>Your request has been saved. A message will be sent to this email, should a table become available.<br/><br/> Thank you. </p>` // html body
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
        miscReservation,      
    });  
   
});     



module.exports = router