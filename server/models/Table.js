var mongoose = require('mongoose');

var Schema=mongoose.Schema;

var tableSchema = new Schema({
    
    tableNum:{
        type:Number,
    },
    
    seatNum:{
        type:Number,
       
    },
    ipAddress:{
        type:String,
        

    },
    occupied:{
        type:Boolean,
        
    },
    reserved:{
        type:Boolean,        
    }

});

var Table = module.exports = mongoose.model('Table', tableSchema);