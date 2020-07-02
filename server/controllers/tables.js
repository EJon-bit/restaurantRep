
var express = require("express")
var router = express.Router()
var Table = require("../models/Table");
require("../models/Reservation")


//adds table when restaurant makes changes to seating
router.post('/addtable', (req, res) => {    
    var table = new Table(req.body);
    
    table.occupied=false;
    table.reserved=false;

    table.save((error, table) => {      
        if (error) { console.log(error); }      
        res.json({
            table,
        });    
    });  
}); 

//to list all table for restaurant manager and/or employes to see and make changes if necessary    
router.get('/', (req, res) => {    
    Table.find({}, (error, tables) => {      
        if (error) { console.log(error); }      
        res.json({        
            tables,      
        });    
    }); 
}); 

//finds out if table is still unoccupied after set time 
//to determine if reserved field should be changed
router.get('/:tableNum', (req, res) => { 
    
    var tableId= req.params.tableNum;

    Table.findOne({_id:tableId},'occupied', (error, table) => {      
        if (error) { console.log(error); }      
        res.send(table);    
    }); 
}); 

//changes occupied to true when pir motion is detected
router.put('/tableoccupancyStat/:tableNo', async(req, res) => {   
    
    var tableId=req.params.tableNo;
    var occupancy= Table.findOne({_id:tableId,}, 'occupied')

    Table.findOne({_id:tableId}, function(error, table) {      
            
        if (error) { console.error(error); }
        
        if (occupancy.occupied== true){
            
            table.occupied= false;
        }
        else{
            table.occupied = true;
        }
                                 
              
        table.save(function (error, table) {        
            if (error) { console.log(error); }        
            res.send(table)      
        });    
    });  

})




module.exports=router;
           
   

 
