var express = require('express');
var http = require('http');
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose');
var cors = require('cors'); 
var morgan = require('morgan'); 
var fs = require('fs');
var app = express(); 
var router = express.Router();
//var socketIO = require('socket.io');
//var serveStatic = require('serve-static');

 let server = http.createServer(app);
// let io = socketIO(server); 

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

// Include all 'controllers' files without needing to do it manually
// fs.readdirSync("controllers").forEach(function (file) { 
    
//     if(file.substr(-3) == ".js") {
//         var route = require("./controllers/" + file) 
//         route.controller(app)  
//     } 
// })

app.use("/menu", require("./controllers/menus"));
app.use("/misc", require("./controllers/miscReserves"));
app.use("/reservation", require("./controllers/reservations"));
app.use("/table", require("./controllers/tables"));


//
 
var port = process.env.API_PORT || 5000; 

app.use('/', router); 

//listens for an event from any client
// io.on('connection',(socket)=>{
//     console.log("Connection with new user");

//     //listens from an event from a single client called create message
//     socket.on('disconnect', ()=>{
//         console.log("Disconnected");
//     })

//     socket.on('Created', (data)=>{
//         //emits an event to other devices but not yours
//         socket.broadcast.emit('Created', (data));
//     })

//     socket.on('message', (data)=>{
//         socket.broadcast.emit('message', (data))

//     })
// })

server.listen(port, function() {  
    console.log(`api running on port ${port}`);
}); 