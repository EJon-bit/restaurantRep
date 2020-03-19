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
    

    orderCost:{
        type: Array,                        
    },

    tableNo:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Table' ,
              
    }],

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
        required:true

    },
    phoneNo:{

        type:String

    }
    
       
});

miscReserveSchema.plugin(mongooseDateFormat);

var Reservemisc = module.exports = mongoose.model('ReserveMisc', miscReserveSchema);
 //makes reservation model accessable from anywhere else
