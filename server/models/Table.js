var mongoose = require('mongoose');

var Schema=mongoose.Schema;

var tableSchema = new Schema({
    
    seatNum:{
        type:Number,
        required:true
    },
    ipAddress:{
        type:String,
        required:true

    },
    occupied:{
        type:Boolean,
        
    }

});

var Table = module.exports = mongoose.model('Table', tableSchema);