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
var pySockets = require('./sockets/pythonSockets')
var frontSockets= require('./sockets/clientSockets')

require('dotenv').config()
 
server.listen(port, function() {  
    console.log(`api running on port ${port}`);
}); 

app.use(morgan('combined')); 
app.use(bodyParser.json());  
app.use(cors());

//connect to mongodb
mongoose.connect(process.env.DB_CONNECTSTRING, {useUnifiedTopology: true, useNewUrlParser: true}, function() {
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

    frontSockets(socket)
    pySockets(socket)
    
});

app.use("/menu", require("./controllers/menus"));
app.use("/misc", require("./controllers/miscReserves"));
app.use("/reservation", require("./controllers/reservations"));
app.use("/table", require("./controllers/tables"));

app.use('/', router); 
 
