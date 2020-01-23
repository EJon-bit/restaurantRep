var mongoose = require('mongoose')

var Table = require("../models/Table");

module.exports.controller = (app) =>{ 
    
        app.get('/table', (req, res) => {    
            Table.find({}, (error, Tables) => {      
                if (error) { console.log(error); }      
                res.send({        
                    Tables: Tables,      
                });    
            }); 
        }); 
           
     
}

