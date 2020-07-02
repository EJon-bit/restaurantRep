var mongoose = require('mongoose')
var express = require("express")
var router = express.Router()

var Menu = require('../models/Menu');

// fetch all menu items 
router.get('/',(req, res) => {    
    Menu.find({}, (error, menus) => {      
        
        if (error) { console.log(error);}      
        res.send({        
            menus: menus,      
        });    
    }); 
});

router.get('/editmenu',(req, res) => {    
    Menu.find({}, (error, menus) => {      
        
        if (error) { console.log(error);}      
        res.send({        
            menus: menus,      
        });    
    }); 
});

router.get('/user/:order', (req,res) => {
    
    Menu.findOne({name:req.params.order}, (error, menu) => {      
                                        
        if (error) { console.log(error); }      
        res.json({        
            menu,      
        });    
    })                
    
});

// add a new menu item  
router.post('/editmenu/add', (req, res) => {    
    var menu = new Menu(req.body);
    
    menu.save((error, menu) => {      
        if (error) { console.log(error); }      
        res.send(menu);    
    });  
}); 

router.put('editmenu/update/:id', (req, res) => {   
    
    Menu.findById(req.params.id, function (error, menu) { 
        if (error) { console.error(error); }
        
        menu.name = req.body.name;
        menu.category = req.body.category;  
        menu.description = req.body.description;   
        menu.cost = req.body.cost;     
        menu.image_url = req.body.image_url; 
        
                
        menu.save(function (error, menu) {        
            if (error) { console.log(error); }        
            res.send(menu)      
        });    
    });  
}); 

router.delete('/deleteItems', (req, res) => { 
    
    var itemDelete= req.body.itemsforDelete

    itemDelete.forEach(async(item) => {
        await Menu.remove({ name:item.name}, function(error){      
            if (error) { console.error(error); }      
               
        });  
    });
    res.send({ success: true }) 
    
});

module.exports = router