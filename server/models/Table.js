var mongoose = require('mongoose');

var Schema=mongoose.Schema;

var tableSchema = new Schema({
    
    tableNum:{
        type:Number,
    },
    
    seatNum:{
        type:Number,
       
    },
    
    occupied:{
        type:Boolean,
        
    },
    reserved:{
        type:Boolean,        
    }

});

module.exports = mongoose.model('Table', tableSchema);