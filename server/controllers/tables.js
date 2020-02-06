var mongoose = require('mongoose')

var Table = require("../models/Table");

module.exports.controller = (app) =>{ 
    
        app.get('/table', (req, res) => {    
            Table.find({"reserved":false}, (error, tables) => {      
                if (error) { console.log(error); }      
                res.json({        
                    tables,      
                });    
            }); 
        }); 
           
     
}

