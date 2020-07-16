
<template> 
    <div>
        <div id="heading">
            <h1 class="title is-4">Enter Reservation Details Here</h1><br/>
        </div>
        <div class="container">                  
            
            <b-field 
                    custom-class="is-small has-text-warning" 
                    :type="isNameLabelDanger"
                    :name="customerName" 
                    :message="nameLabelMessage"
                    label="Name">
                    
                <b-input id="nameField" placeholder="John Doe" v-model="customerName" ></b-input>
                
            </b-field>
            <br/>
            <b-field                    
                    custom-class="is-small has-text-warning" 
                    :type="isEmailLabelDanger"
                    :name="customerEmail" 
                    :message="emailLabelMessage"
                    label="Email">
                    
                <b-input id="emailField" placeholder="johndoe@gmail.com" v-model="customerEmail" ></b-input>
                
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

            <b-field label="Total Cost" custom-class="is-small has-text-warning" type="is-primary">
                <b-input :value="cost" disabled ></b-input>
            </b-field><br/> 
                
         
            <div id="button">
                <b-button type="is-link" :disabled="formIsInDanger" v-if="!queued" @click="submit" >
                    Submit Reservation
                </b-button>
                <div>
                    <b-button type="is-link" :disabled="formIsInDanger" v-if="queued" @click="save" >
                        Save Reservation
                    </b-button>
                </div><br/>
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
                    <modal-form                         
                        :seatNo="seatsReserved" 
                        :date="datetime"
                        :customerName="customerName"                      
                        :numOrders="msg.length"          
                        :orders="msg"                          
                        :email="customerEmail">
                    </modal-form>
                </b-modal>

                <b-modal 
                    :active.sync="statModalActive"
                    has-modal-card
                    trap-focus
                    aria-role="dialog"
                    aria-modal>
                    <stat-modal v-if="(fail==true)"                                               
                        :success="success" 
                        :fail="fail">                        
                    </stat-modal>
                    <stat-modal v-if="(reservation!=null)"
                        @changePage="changePage"                        
                        :success="success" 
                        :fail="fail"
                        :password="reservation.reservation.password">                        
                    </stat-modal>
                </b-modal>
            </div>
         
        </div>
    </div>   
</template> 

<script>  
    import axios from 'axios';
    import openSocket from 'socket.io-client';
    const socket = openSocket('http://localhost:5000');
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var ModalForm = {
        props: ['date', 'seatNo', 'customerName', 'numOrders', 'orders', 'email'],

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

            subDateNew() {                
                return axios({          
                    method: 'post',          
                    data: {            
                        customerName: this.customerName,            
                        seatsReserved: this.seatNo, 
                        numOrders:this.numOrders,           
                        orders:this.orders,
                        dateReserved:this.checkboxGroup[0],  
                        email:this.email        
                    },          
                    url: 'http://localhost:5000/reservation',          
                          
                })          
                .then(() => { 
                    //this.submitfail=false,

                    this.$router.push({ name: 'UserReservePage' });  

                    this.$swal(            
                                  
                        'Reservation was successfully added!',            
                        'CHECK EMAIL FOR PASSWORD',          
                    );            
                           
                              
                })
                .catch(() => {

                    
                    this.$swal(            
                        'Sorry! There are NO available tables Right Now',            
                        'You can save this reservation.',
                        'If you do it will be automatically added when a Table becomes Available',         
                        'error',          
                    ); 
                });    
                
            },
            
            fetchAvailDates() {      
                return axios({        
                    method: 'get',
                    url: `http://localhost:5000/reservation/seatNum/${this.seatNo}/${this.date}`,      
                })        
                .then((response) => {          
                    this.availableDates = response.data.availableDates;        
                })        
                .catch(() => {        
                });    
            }
        },
       
        template: 
        `   
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Available Dates</p>
                </header>
                <section class="modal-card-body">
                    
                    <div>
                        <b-notification v-for="date in availableDates" :key="date.rawDate" type="is-dark" style="color:gold;font-size:25px; opacity:0.85" aria-close-label="Close notification">
                            <b-checkbox v-if="typeof date.dateReserved!='string'" size="is-medium" v-model="checkboxGroup" :native-value="date.rawDate"></b-checkbox>
                            {{date.dateReserved}}
                        </b-notification>

                    </div>                        
                    
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>
                    <button v-if= "checkboxGroup.length" class="button is-primary" @click="subDateNew">Submit Date</button>
                </footer>
            </div>            
        `
    }
    var statModal = {
        props: ['success','fail', 'password'],
                
        methods: { 

            savePassword() {                
                               
                this.$emit('changePage', this.password)
               
            }
        },
       
        template: 
        `   
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Reservation Status</p>
                </header>
                <section class="modal-card-body">                    
                    <div>
                       <div v-if="success">
                            <p>Reservation Succesfully Added</p>
                            <p class="title is-6" style="color:white;font-weight:bold">Your Password is {{password}}</p>
                            <button class="button is-primary" @click="savePassword">Ok</button>
                       </div>
                       <div v-if="fail">
                            <p class="title is-4"> Sorry <br/>Your reservation cannot be added right now<br/>There are no available tables</p>
                            <p class="title is-6" style="color:white;">You can save your reservation details and/or check to see other available times</p>
                            <p class="title is-6" style="color:white;">To do click Ok click the the buttons under your reservation details</p>
                            <button class="button" type="button is-primary" @click="$parent.close()">Ok</button>
                       </div>                        
                    </div>          
                </section>
                <footer class="modal-card-foot">
                    <p style="font-family:Gabriola;font-weight:bold; color:gold; font-size:35px;">Thank you for visiting</p>
                </footer>

            </div>            
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
            },
            cost: {
                type: Number,
                required: true
            },
        },

        components: {
            ModalForm,
            statModal,
       
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
                reservation:null,
                isComponentModalActive:false,
                statModalActive:false,
                success:false,
                fail:false,

                datetime:new Date(),
               
                
                                               
            }
        }, 
        created:()=>{
            socket.on('created', (data)=>{
                console.log(data)
            })
        },
        methods:{
            

            changePage(value){
               
                this.$store.commit('pass', value);
                this.$store.commit('isDerived', true);
                this.$router.push({ name: 'UserReservePage' }); 
            },
            submit() {      
                        
                axios({          
                    method: 'post',          
                    data: {            
                        customerName: this.customerName,            
                        seatsReserved: this.seatsReserved, 
                        numOrders:this.msg.length,           
                        orders:this.msg,
                        orderCost:this.cost,
                        dateReserved:this.datetime,  
                        email:this.customerEmail        
                    },          
                    url: 'http://localhost:5000/reservation',          
                        
                })          
                .then((response) => { 
                    
                    socket.emit('fromClient', true)
                    console.log(response);                   
                    this.getRes();                    
                    
                    this.success=true;  
                    this.statModalActive=true;                                          
                      
                                                        
                })
                .catch((error) => {
                    if (error.response) {
                        this.queued=true;
                        this.fail=true;
                        this.statModalActive=true;
                    }
                    
                });      
            },            

            save() {      
                        
                axios({          
                    method: 'post',          
                    data: {            
                        customerName: this.customerName,            
                        seatsReserved: this.seatsReserved, 
                        numOrders:this.msg.length,           
                        orders:this.msg,
                        orderCost:this.cost,
                        dateReserved:this.datetime,
                        email:this.customerEmail         
                    },          
                    url: 'http://localhost:5000/misc/queued',          
                          
                })          
                .then(() => { 
                    this.$router.push({ name: 'Home' });  

                    this.$swal(            
                        'Great!',            
                        'Reservation has been saved!',            
                        'success',          
                    );            
                           
                        
                })
                .catch(() => {                  

                    this.$swal(            
                        'Sorry!',
                        'Reservation failed to save, try again later',                                
                        'error',          
                    ); 
                });      
            },

            async getRes(){                
                axios({        
                    method: 'get',
                    url: `http://localhost:5000/reservation/date/${this.datetime}`,      
                })        
                .then((response) => {          
                    this.reservation = response.data;        
                })        
                .catch(() => {        

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
            isEmailLabelDanger() {
                
                if (this.customerEmail.match(mailFormat)) {
                    return "is-success";
                } else {
                    return "is-danger";
                }
            },
            emailLabelMessage() {
                if (this.customerEmail== "") {
                    return "This field is required";
                } 
                else if (this.customerEmail.match(mailFormat)) {
                    return "";
                } 
                else {
                    return "Invalid Email";
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

    @import '../css/reserveAdd.css';

</style>