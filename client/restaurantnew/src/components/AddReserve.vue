
<template> 
    <div>
        <div id="heading">
            <h1 class="title is-4" style="font-family:Gabriola;color:gold;font-size:30px;">Enter Reservation Details Here</h1><br/>
        </div>
        <div class="container">                  
            
            <b-field 
                    custom-class="is-small has-text-warning" 
                    :type="isNameLabelDanger"
                    :name="customerName" 
                    :message="nameLabelMessage"
                    label="Name">
                    
                <b-input placeholder="John Doe" :style="myStyle" v-model="customerName" ></b-input>
                
            </b-field>
            <br/>
            <b-field                    
                    custom-class="is-small has-text-warning" 
                    :type="isEmailLabelDanger"
                    :name="customerEmail" 
                    :message="emailLabelMessage"
                    label="Email">
                    
                <b-input placeholder="johndoe@gmail.com" :style="myStyle" v-model="customerEmail" ></b-input>
                
            </b-field><br/>  

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
                <b-input :value="msg.toString()" type="textarea" disabled ></b-input>
            </b-field><br/> 
                
         
            <div id="button">
                <b-button type="is-primary" :disabled="formIsInDanger" v-if="!queued" @click="submit" >
                    Submit Reservation
                </b-button>
                <div>
                    <b-button type="is-link" :disabled="formIsInDanger" v-if="queued" @click="save" >
                        Save Reservation
                    </b-button>
                </div>
                <div>
                    <b-button type="is-warning" v-if="queued" @click="isComponentModalActive = true" >
                        See Available Tables
                    </b-button>
                </div>

                <b-modal 
                    :active.sync="isComponentModalActive"
                    has-modal-card
                    trap-focus
                    aria-role="dialog"
                    aria-modal>
                    <modal-form @availDate="changeDate" :seatNo="seatsReserved" :date="datetime" :minDatetime="minDatetime" :maxDatetime="maxDatetime"></modal-form>
                </b-modal>
            </div>
         
        </div>
    </div>   
</template> 

<script>  
    import axios from 'axios';

    var ModalForm = {
        props: ['date', 'minDatetime', 'maxDatetime', 'seatNo'],

        data(){
            return{
                availableDates:[],
                checkboxGroup:[],
                availDate:"",
                //dateChange,
            }   
        },

        mounted() {    
            this.fetchAvailDates(); //fetches available using axios request
        },  

        methods: { 

            dateChecked() {
                this.$emit('availDate', this.checkboxGroup.dateReserved);
                //this.$emit('dateChange', true);
            },
            
            fetchAvailDates() {      
                return axios({        
                    method: 'get',
                    url: `http://localhost:5000/reservation/${this.seatNo}/${this.date}`,      
                })        
                .then((response) => {          
                    this.availableDates = response.data.availableDates;        
                })        
                .catch(() => {        
                });    
            }
        },
        // computed:{
        //     closestdate() {
        //         if (this.availableDates !== "") {
        //             return "is-success";
        //         } else {
        //             return "is-danger";
        //         }
        //     },
        // },

        template: 
        `   <form>
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Add Order</p>
                    </header>
                    <section class="modal-card-body">
                        <b-datetimepicker v-model="date" 
                            inline 
                            :min-datetime="minDatetime"
                            :max-datetime="maxDatetime">
                        </b-datetimepicker> <br/>
                        <div>
                            <b-notification v-for="date in availableDates" :key="date.dateReserved" :type="is-info" aria-close-label="Close notification">
                                <b-checkbox size="is-medium" v-model="checkboxGroup" :native-value="date.dateReserved"></b-checkbox>
                                {{date.dateReserved}}
                            </b-notification>

                        </div>                        
                        
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="$parent.close()">Close</button>
                        <button v-if= "checkboxGroup" class="button is-primary" @click="dateChecked">Submit Date</button>
                    </footer>
                </div>
            </form>
        `
    }
        
    export default {  
        
        name: 'AddReserve',
         //look up form validations
        //mixins: [validationMixin],
        props:{
            msg: {
                type: Array,
                required: true
            }
        },

        components: {
            ModalForm,
       
        },

        
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
                
               // submitfail:true,
                queued:false,
                customerName: "",
                seatsReserved:"",
                customerEmail:"",
                isComponentModalActive:false,

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
                        dateReserved:this.datetime,  
                        email:this.customerEmail        
                    },          
                    url: 'http://localhost:5000/reservation',          
                    // headers: {            
                    //     'Content-Type': 'application/json',          
                    // },        
                })          
                .then(() => { 
                    //this.submitfail=false,

                    this.$router.push({ name: 'UserReservePage' });  

                    this.$swal(            
                        'Great!',            
                        'Reservation was successfully added!',            
                        'success',          
                    );            
                           
                    //this.$refs.form.reset();          
                })
                .catch(() => {

                    this.queued=true;

                    this.$swal(            
                        'Sorry! There are NO available tables Right Now',            
                        'You can save this reservation.',
                        'If you do it will be automatically added when a Table becomes Available',         
                        'error',          
                    ); 
                });      
            },

            changeDate(value){

                this.datetime= this.value;
                //this.submit();                
            },

            save() {      
                        
                return axios({          
                    method: 'post',          
                    data: {            
                        customerName: this.customerName,            
                        seatsReserved: this.seatsReserved, 
                        numOrders:this.msg.length,           
                        orders:this.msg,
                        dateReserved:this.datetime,
                        email:this.customerEmail         
                    },          
                    url: 'http://localhost:5000/misc/queued',          
                    // headers: {            
                    //     'Content-Type': 'application/json',          
                    // },        
                })          
                .then(() => { 
                    this.$router.push({ name: 'Home' });  

                    this.$swal(            
                        'Great!',            
                        'Reservation was successfully added!',            
                        'success',          
                    );            
                           
                    //this.$refs.form.reset();          
                })
                .catch(() => {

                    //this.queued=true;

                    this.$swal(            
                        'Sorry! Reservation failed to save, try again later',                                
                        'error',          
                    ); 
                });      
            },

            // seeTables(){
            //     this.$router.push({ name: 'AvailTables' });
            // }
            
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
            isEmailLabelDanger() {
                if (this.customerEmail !== "") {
                    return "is-success";
                } else {
                    return "is-danger";
                }
            },
            emailLabelMessage() {
                if (this.customerEmail !== null) {
                    return "";
                } 
                else {
                    return "This field is required";
                }
            },                     
            formIsInDanger() {
                if (this.isNameLabelDanger === "is-danger"|| this.ispersonNumLabelDanger === "is-danger"|| this.isEmailLabelDanger === "is-danger") {
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