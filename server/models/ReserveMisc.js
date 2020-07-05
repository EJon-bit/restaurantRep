var mongoose = require('mongoose');


var Schema=mongoose.Schema;

var mongooseDateFormat = require('mongoose-date-format');
require("./Table")

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
        type: Number,                        
    },

    dateReserved:{
        type:Date,
        required:true

    },
    tableNo:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Table' ,
            
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

miscReserveSchema.plugin(mongooseDateFormat);

module.exports = mongoose.model('ReserveMisc', miscReserveSchema);
 //makes reservation model accessable from anywhere else
