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

        //finds out if table is still unoccupied after set time 
        //to determine if reserved field should be changed
        app.get('/table/:tableNum', (req, res) => { 
            
            TableId= req.params.tableNum;

            Table.findOne({"tableNum":TableId},'occupied ipAddress', (error, table) => {      
                if (error) { console.log(error); }      
                res.json({        
                    table,      
                });    
            }); 
        }); 

        /*updates table document by changing reserved field when 
        customer makes reservation on web App*/
        

        //update table reserved field in database based on PIR sensors
        app.put('/tableavailability/:tableNo',(req, res) => {   
            
            var tableId=req.params.tableNo;
            
            Table.findOne({tableNum:tableId}, function(error, table) {      
                
                if (error) { console.error(error); }
                
                table.reserved = false;
                
                      
                table.save(function (error, table) {        
                    if (error) { console.log(error); }        
                    res.send(table)      
                });    
            });  
        }); 


           
     
}

