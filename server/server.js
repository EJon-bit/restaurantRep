var express = require('express');
var http = require('http');
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose');
var cors = require('cors'); 
var morgan = require('morgan'); 
var app = express(); 
var router = express.Router();
var port = process.env.API_PORT || 5000;
var server = http.createServer(app); 
var clientSocket = require('socket.io')(server);

server.listen(port, function() {  
    console.log(`api running on port ${port}`);
}); 


app.use(morgan('combined')); 
app.use(bodyParser.json());  
app.use(cors());

//connect to mongodb
mongoose.connect('mongodb+srv://restaurant:restaurantdb1@cluster0-cclil.azure.mongodb.net/restaurant?retryWrites=true&w=majority' , {useUnifiedTopology: true, useNewUrlParser: true}, function() {
console.log('Connection has been made');
}) 
.catch(err => { 
    console.error('App starting error:', err.stack);
    process.exit(1); 
});

clientSocket.on('connection', function(socket){
    console.log('There is a connection')

    socket.on('disconnect', function(){
        console.log('Socket was disconnected')
    })
    
    clientSocket.emit('created','Connection to client made')
    
    socket.on('fromClient', function(data){
        console.log('The data is', data)
        
        if(data=='true'){
            console.log("Reserve has been updated");
            socket.broadcast.emit("newReserveList", data);
        }
    }); 

    socket.on('callWaiter', function(data){
        console.log('The data is', data)
        
        if(data.status=='true'){
            console.log("Waiter has been called");
            socket.broadcast.emit("waiterCall", data);
        }
    });        

    socket.on('reloadRes', function(data){
        console.log('The data is', data)
        
        if(data.onSite=='true'){
            console.log("Reserve has been updated");
            socket.broadcast.emit("reserveUpdate", data);
        }
    }); 

    socket.on('reloadCustomer', function(data){
        console.log('The data is', data)
        
        if(data=='true'){
            console.log("Customer records has been updated");
            socket.broadcast.emit("customerReload", data);
        }
    }); 


    socket.on('rgbTrigger', function(data){
        console.log('The data is', data)
                
        console.log("RGB wil lbe triggered");
        socket.broadcast.emit("triggerRgb", data);
        
    }); 

    socket.on('openCustomer', function(data){
        console.log('The data is', data)
                
        console.log("Customer page Loading at Table");
        socket.broadcast.emit("customerOpen", data);
        
    }); 
    
    

    socket.on('payReq', function(data){
        console.log('The data is', data)
        
        if(data.status=='true'){
            console.log("Request to Pay has been made");
            socket.broadcast.emit("newPayRequest", data);
        }
    });        
        
});

app.use("/menu", require("./controllers/menus"));
app.use("/misc", require("./controllers/miscReserves"));
app.use("/reservation", require("./controllers/reservations"));
app.use("/table", require("./controllers/tables"));

app.use('/', router); 
 
