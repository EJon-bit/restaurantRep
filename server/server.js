var express = require('express');
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose');
var cors = require('cors'); 
var morgan = require('morgan'); 
var fs = require('fs');
var app = express(); 
var router = express.Router();

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
fs.readdirSync("controllers").forEach(function (file) { 
    
    if(file.substr(-3) == ".js") {
        var route = require("./controllers/" + file) 
        route.controller(app)  
    } 
})

router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

var port = process.env.API_PORT || 8081; 

app.use('/', router); 

app.listen(port, function() {  
    console.log(`api running on port ${port}`);
}); 