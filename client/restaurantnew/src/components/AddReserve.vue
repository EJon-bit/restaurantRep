
<template> 
    <div>
        <div id="heading">
            <h1 class="title is-4" style="font-family:Gabriola;color:gold;font-size:30px;">Enter Reservation Details Here</h1><br/>
        </div>
        <div class="container">                  
        <b-form>    
            <b-field 
                    custom-class="is-small has-text-warning" 
                    :type="isNameLabelDanger"
                    :name="customerName" 
                    :message="nameLabelMessage"
                    label="Name">
                    
                <b-input placeholder="John Doe" :style="myStyle" v-model="customerName" ></b-input>
                
            </b-field>
            <br/>
            <b-field label="No. of Persons" custom-class="is-small has-text-warning" :type="ispersonNumLabelDanger" :message="personNumLabelMessage">
                    <b-select placeholder="Select a number" v-model="seatsReserved">
                       
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>

                        <option value="5">5</option>
                        <option value="6">6</option>                
                    </b-select>
            </b-field><br/>
            <b-field label="Arrival Date and Time" custom-class="is-small has-text-warning" :type="isdateLabelDanger" :message="dateLabelMessage">
                <b-datetimepicker v-model="datetime"
                    placeholder="Click to select..."
                    :min-datetime="minDatetime"
                    :max-datetime="maxDatetime">
                </b-datetimepicker>
            </b-field><br/> 
  
            
            <b-field label="Orders" custom-class="is-small has-text-warning" type="is-primary">
                <b-input :value="msg" type="textarea" disabled ></b-input>
            </b-field><br/>        
         
            <div id="button" >
                <b-button type="is-primary" :disabled="formIsInDanger" @click="submit" >
                    Submit Reservation
                </b-button>
            </div>
        </b-form> 
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

        
        data () {
            
            const min = new Date()
            min.setDate(min.getDate())
            min.setHours(9)
            min.setMinutes(0)
            min.setSeconds(0)
            const max = new Date()
            max.setDate(max.getDate() + 5)
            max.setHours(18)
            max.setMinutes(0)
            max.setSeconds(0)
            return {
                minDatetime: min,
                maxDatetime: max,
                
                customerName: "",
                seatsReserved:"",
                datetime:new Date(),
               
                
                myStyle:{

                    backgroundColor: 'rgba(37,37,37,.95)'                
                },

                               
            }
        }, 
        methods:{
            submit() {      
                        
                return axios({          
                    method: 'post',          
                    data: {            
                        customerName: this.customerName,            
                        seatsReserved: this.seatsReserved, 
                        numOrders:this.msg.length,           
                        orders:this.msg,
                        dateReserved:this.datetime          
                    },          
                    url: 'http://localhost:5000/reservation',          
                    // headers: {            
                    //     'Content-Type': 'application/json',          
                    // },        
                })          
                .then(() => { 
                    this.$router.push({ name: 'UserReservePage' });  

                    this.$swal(            
                        'Great!',            
                        'Reservation was successfully added!',            
                        'success',          
                    );            
                           
                    //this.$refs.form.reset();          
                })
                .catch(() => {

                    this.$swal(            
                        'Sorry! There are NO available tables Right Now',            
                        'Your reservation was NOT sucessfully added! Try again',  
                        'You can save this reservation. If you choose to your reservation will be automatically added when a Table becomes Available',         
                        'error',          
                    ); 
                });      
            },
            
        },

        computed:{
            isNameLabelDanger() {
                if (this.customerName !== "") {
                    return "is-success";
                } else {
                    return "is-danger";
                }
            },
            nameLabelMessage() {
                if (this.customerName !== "") {
                    return "";
                } 
                else {
                    return "This field is required";
                }
            },
            ispersonNumLabelDanger() {
                if (this.seatsReserved !== "") {
                    return "is-success";
                } else {
                    return "is-danger";
                }
            },
            personNumLabelMessage() {
                if (this.seatsReserved !== "") {
                    return "";
                } 
                else {
                    return "This field is required";
                }
            },                        
            formIsInDanger() {
                if (this.isNameLabelDanger === "is-danger"|| this.ispersonNumLabelDanger === "is-danger") {
                    return true;
                } 
                else {
                    return false;
                }
            },

            isdateLabelDanger() {
                if (this.datetime !== null) {
                    return "is-success";
                } else {
                    return "is-danger";
                }
            },
            dateLabelMessage() {
                if (this.datetime !== null) {
                    return "";
                } 
                else {
                    return "This field is required";
                }
            },
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