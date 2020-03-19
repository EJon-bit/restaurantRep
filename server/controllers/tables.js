var mongoose = require('mongoose')
const nodemailer = require("nodemailer");

var Table = require("../models/Table");
require("../models/Reservation")
var Reservemisc = require('../models/ReserveMisc')

var transporter = nodemailer.createTransport({
    service: 'gmail',                
    auth: {
        user: 'toptiercuisineja@gmail.com',
        pass:  't0Pt1eRJ@'
    }
})

module.exports.controller = (app) =>{ 
    
        app.get('/table', (req, res) => {    
            Table.find({"reserved":false}, (error, tables) => {      
                if (error) { console.log(error); }      
                res.json({        
                    tables,      
                });    
            }); 
        }); 

        //finds out if table is still unoccupied after set time 
        //to determine if reserved field should be changed
        app.get('/table/:tableNum', (req, res) => { 
            
            var tableId= req.params.tableNum;

            Table.findOne({"tableNum":tableId},'occupied ipAddress', (error, table) => {      
                if (error) { console.log(error); }      
                res.json({        
                    table,      
                });    
            }); 
        }); 

        /*updates table document by changing reserved field when 
        customer makes reservation on web App*/
        

        //update table reserved field in database based on PIR sensors
        app.put('/tableavailability/:tableNo', async(req, res) => {   
            
            var tableNo=req.params.tableNo;

            //finds table with id given in parameter...returns the seatNum field for that table and stores in in seatNo
            var seatNo= await Table.findOne({tableNum:tableNo},'seatNum');
            console.log("The number of seats are", seatNo);

            //seat[0] is likely to be the id..
            //this finds a queued reservation with the # of reserved seats that corresponds to the table which became available       
            var reserveMisc = await Reservemisc.findOne({"seatsReserved":seatNo.seatNum}, function(error, miscReservation){
                if (error) { console.error(error); }
                
                miscReservation.tableNo = seatNo[0];
                      
                miscReservation.save(function (error) {        
                    if (error) { console.log(error); }        
                    //res.send(miscReservation)      
                });    
            
                
            });
            console.log("The value in this array is", reserveMisc);

            Table.findOne({tableNum:tableNo}, function(error, table) {      
                
                if (error) { console.error(error); }
                
                if(!reserveMisc){
                    table.reserved = false;
                }
                

                //if a queued reservation requesting this table was found...
                //change table status back to reserved before a new customer tries to reserve it
                else if(reserveMisc){

                    table.reserved = true;
                }
                
                      
                table.save(function (error, table) {        
                    if (error) { console.log(error); }        
                    res.send(table)      
                });    
            }); 
            
            //finds table that was recently made available and 
            //stores the id of that table in the queued reservation document which requesting a similar table
            // Reservemisc.findOne({"seatsReserved":seatNo}, function(error, miscReservation){
            //     if (error) { console.error(error); }
                
            //     miscReservation.tableNo = seatNo[0];
                      
            //     miscReservation.save(function (error, miscReservation) {        
            //         if (error) { console.log(error); }        
            //         res.send(miscReservation)      
            //     });    
            
                
            // })

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

            
                        
        }); 


           
     
}
 
