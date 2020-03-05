var mongoose = require('mongoose');


var Schema=mongoose.Schema;

var mongooseDateFormat = require('mongoose-date-format');


//Schema for queued reservations when no tables are available
var miscReserveSchema = new Schema({
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
        type: Array,                        
    },
    password:{
        type:String,
        required:true

    },

    dateReserved:{
        type:Date,
        required:true

    } ,
    email:{
        type:String,

    },
    phoneNo:{

        type:String

    }
    
       
});

miscReserveSchema.plugin(mongooseDateFormat);

var Reservemisc = module.exports = mongoose.model('ReserveMisc', miscReserveSchema);
 //makes reservation model accessable from anywhere else
