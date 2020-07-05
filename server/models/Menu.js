var mongoose = require('mongoose');


var Schema=mongoose.Schema;

//Menu Schema
var menuSchema = new Schema({
    name:{
        type: String,
        required:true

    },
    category:{
        type: String,
        required:true

    },
    description:{
        type: String,
        required:true

    },
    cost:{
        type: Number,
        required:true

    },
    image_url:{
        type: String,
        required:true
    },
    prepTime:{
        type: Number,
        required:true

    },
    qty:{
        type: Number,
        required:true

    },
    


});

module.exports = mongoose.model('Menu',menuSchema);
