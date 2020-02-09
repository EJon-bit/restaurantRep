<template> 
    <div>
        <div id="heading">
            <h1 class="title is-4" style="font-family:Gabriola;color:gold;font-size:30px;">Enter Reservation Details Here</h1><br/>
        </div>
        <div class="container">                  
            
            <b-field 
                    custom-class="is-small has-text-warning" 
                    type="is-primary"
                    name="customerName" 
                    label="Name" >
                    
                <b-input placeholder="John Doe" :style="myStyle"></b-input>
            </b-field>
            <br/>
            <b-field label="No. of Persons" custom-class="is-small has-text-warning" type="is-primary">
                    <b-select placeholder="Select a number">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>                
                    </b-select>
            </b-field><br/>
            <b-field label="Arrival Date and Time" custom-class="is-small has-text-warning" type="is-primary">
                <b-datetimepicker
                    placeholder="Click to select..."
                    :min-datetime="minDatetime"
                    :max-datetime="maxDatetime">
                </b-datetimepicker>
            </b-field><br/> 
  
            
            <b-field label="Orders" custom-class="is-small has-text-warning" type="is-primary">
                <b-input :value="msg" type="textarea" disabled></b-input>
            </b-field><br/>        
            
            <div id="button">
                <b-button type="is-primary">Submit Reservation</b-button>
            </div>
        </div>
    </div>   
</template> 

<script>  
    import axios from 'axios';
        
    export default {  
        
        name: 'AddReserve',
         //look up form validations
        //mixins: [validationMixin],
        props:['msg'],

        myStyle:{
                backgroundColor: 'rgba(37,37,37,.95)'
                
        },

        data () {
            
            const min = new Date()
            min.setDate(min.getDate() - 7)
            min.setHours(9)
            min.setMinutes(0)
            min.setSeconds(0)
            const max = new Date()
            max.setDate(max.getDate() + 7)
            max.setHours(18)
            max.setMinutes(0)
            max.setSeconds(0)
            return {
                minDatetime: min,
                maxDatetime: max,
                
                form: {
                    customerName: "",
                    seatsReserved:"",
                    dateReserved:""
                }
                               
            }
        },  
               
    }
</script>

<style scoped>
.container{
     text-align: left;
}
#heading{
     text-align: center;
}
#button{
     text-align: center;
}

</style>