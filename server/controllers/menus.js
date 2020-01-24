var mongoose = require('mongoose')

var Menu = require('../models/Menu');

module.exports.controller = (app) => {  
   
    // fetch all menu items 
    app.get('/menu',(req, res) => {    
        Menu.find({}, (error, menus) => {      
            
            if (error) { console.log(error);}      
            res.send({        
                menus: menus,      
            });    
        }); 
    });

    // add a new menu item  
    app.post('/addmenu', (req, res) => {    
        var menu = new Menu(req.body);
        
        menu.save((error, menu) => {      
            if (error) { console.log(error); }      
            res.send(menu);    
        });  
    }); 

    app.put('/menu/:id', (req, res) => {   
        
        Menu.findById(req.params.id, 'name category description cost image_url', function (error, menu) { 
            if (error) { console.error(error); }
            
            menu.name = req.body.name    
            menu.category = req.body.category  
            menu.description = req.body.description   
            menu.cost = req.body.cost      
            menu.image_url = req.body.image_url 
            
                  
            user.save(function (error, menu) {        
                if (error) { console.log(error); }        
                res.send(menu)      
            });    
        });  
    }); 

    app.delete('/menu/:id', (req, res) => {    
        Menu.remove({ _id: req.params.id }, function(error, menu){      
            if (error) { console.error(error); }      
            res.send({ success: true })    
        });  
    });

};
