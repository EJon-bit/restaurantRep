var mongoose = require('mongoose');
require("./Menu")
require("./Table")

var Schema=mongoose.Schema;


//Reservation Schema
var reservationSchema = new Schema({
    customerName:{

        type:String,
        required:true //ensures data type entered for the field defined ..is correct
    },
    seatsReserved:{
        type: Number,
        required:true
    },// insert type validation
    numOrders:{
    	
    	type: Number,
        required:true

    },
    orders:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Menu'
        
    }],

    specialRequests:{ //example:birthdays, allergy notification
    	type: String,
    	required:true

    },

    orderCost:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Menu'        
    }],

    dateReserved:{
        type:Date,
        required:true

    },
    tableNo:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Table'        
    }],
    onSite:{
        type:Boolean,
        
    }
    
});

var Reservation = module.exports = mongoose.model('Reservation', reservationSchema);
 //makes reservation model accessable from anywhere else

 
 