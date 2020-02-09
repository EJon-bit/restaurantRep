var mongoose = require('mongoose')

var Table = require("../models/Table");
require("../models/Reservation")

module.exports.controller = (app) =>{ 
    
        app.get('/table', (req, res) => {    
            Table.find({"reserved":false}, (error, tables) => {      
                if (error) { console.log(error); }      
                res.json({        
                    tables,      
                });    
            }); 
        }); 

        app.put('/table/update',(req, res) => {   
                
            Table.findOne({"tableNum":reservation.tableNo[0]}, function(error, table) {      
                
                if (error) { console.error(error); }
                
                table.reserved = true;
                
                      
                table.save(function (error, table) {        
                    if (error) { console.log(error); }        
                    res.send(table)      
                });    
            });  
        }); 
           
     
}

