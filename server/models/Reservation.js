var mongoose = require('mongoose');
//require("./Menu")
require("./Table")
//require("./Customer")

var Schema=mongoose.Schema;

var mongooseDateFormat = require('mongoose-date-format');


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
        
        type: Boolean,	

    },

    orderCost:{
        type: Number,                        
    },

    dateReserved:{
        type:Date,
        required:true

    },
    tableNo:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Table' ,
        required:true      
    },
    onSite:{
        
        type:Boolean,
        required:true

    },
    paid:{
        type:Boolean,
    }, 
    served:{
        type:Boolean,
    }, 
    password:{
        type:String,
        required:true

    },       
    email:{
        type:String,

    }
       
});

reservationSchema.plugin(mongooseDateFormat);

var Reservation = module.exports = mongoose.model('Reservation', reservationSchema);
 //makes reservation model accessable from anywhere else

 
 