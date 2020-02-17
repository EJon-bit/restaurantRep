var mongoose = require('mongoose');
//require("./Menu")
require("./Table")
//require("./Customer")

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
    },// insert type validatio
    numOrders:{
    	
    	type: Number,
        // required:true

    },
    orders:{
        type: Array, 
               
    },

    specialRequests:{ //example:birthdays, allergy notification
        
        type: String,	

    },

    orderCost:{
        type: Array,                        
    },

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
        required:true

    },
    password:{
        type:String,
        required:true

    },

    
   
});

var Reservation = module.exports = mongoose.model('Reservation', reservationSchema);
 //makes reservation model accessable from anywhere else

 
 