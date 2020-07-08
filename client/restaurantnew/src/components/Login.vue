
<template>
    <div class="container is-fullscreen">   
        <div class="columns is-1"> 
            <div id="payBox" class="column is-one-quarter" v-if="exitList.length"> 
                <div>    
                    <button class="button field is-danger" @click="paystatUpdate" >
                        Paid
                    </button>
                </div>
                <br/>
                <b-table
                    
                    :data="exitList"
                    :columns="columns"
                    :checked-rows.sync="checkedRow"                   
                    checkable
                    :checkbox-position="checkboxPosition">
                </b-table>
                
            </div>    
            <div id="beforeBest" class="column is-half">
                <div id="best" class="box">   
                    <h1 class="title is-4">Enter Password Here</h1><br/>
                    <div class="container">
                        <b-field name="pass" label="Password" custom-class="is-small has-text-warning" type="is-primary">
                            <b-input v-model="password" :message="loginLabelMessage">  
                            </b-input>                        
                        </b-field> <br/>

                        <b-button type="is-primary" :disabled="loginIsInDanger" @click="login">
                            Login    
                        </b-button>
                    </div>
                </div>
            </div>
            <div id="message" class="column is-one-quarter" v-if="payMessage">                            
                <b-notification type="is-warning" aria-close-label="Close notification">
                    A Customer is trying to leave without pay
                </b-notification>
            </div>
            <div id="message" class="column is-one-quarter" v-if="bothNotice">                            
                <b-notification type="is-warning" aria-close-label="Close notification">
                    A Customer is leaving without pay while another is enterring unauthorized 
                </b-notification>
            </div>
            <div id="message" class="column is-one-quarter" v-if="entryNotice">                            
                <b-notification type="is-warning" aria-close-label="Close notification">
                    A Customer is trying to enter without being validated
                </b-notification>
            </div>
            <div id="message" class="column is-one-quarter" v-if="tableNotice">                            
                <b-notification type="is-danger" aria-close-label="Close notification">
                    A customer is at the Wrong seat. Or may have entered without being validated
                </b-notification>
            </div>
        </div>
    </div> 
</template>

<script>
import axios from 'axios'
import openSocket from "socket.io-client";
var socket = openSocket("http://localhost:5000");
var check=0;

export default {
    name:'Login',

    data(){
        return{

            password:'',
            reservation:null,
            payMessage:false,
            messageCount:0,
            tableNo:0,
            exitList:[],
            entryNotice:false,
            bothNotice:false,
            tableNotice:false,
            checkboxPosition: 'left',
            checkedRow: [],
            columns: [
                {
                    field: 'password',
                    label: 'ID',                    
                    searchable: true,
                },
                {
                    field: 'customerName',
                    label: 'Name',
                    searchable: true,
                },
                {
                    field: 'paid',
                    label: 'Paid',                   
                },            
            ],
            
        }
    },
    created:function(){
        
        this.getTable();   
        
        //listens for event and triggers an on-screen alert message to notify front desk of unauthorized exits and simultaneous entries/exits
        socket.on("noPayWarning", (data)=>{
            console.log(data);
            if(data=='leaving'){
                console.log('The new Data is', data)               
                this.payMessage=true;
                this.messageCount+=1;
            }
            else if(data=='both'){
                this.bothNotice=true
            }
            
        });

        //listens for event to trigger alert message notifying front desk  of unauthorized entries
        socket.on("entryUnauth", (data)=>{
            console.log(data);
            if(data=='true'){
                console.log('The new Data is', data)               
                this.entryNotice=true;
                
            }
            
        });

        //to reload front desk webpage when customer paid status is updated
        socket.on("reloadTable", (data)=>{
            console.log(data);
            if(data=='true'){
                this.getTable();
            }
            
        });
       //to alert front desk when unauthorised person is at a table
        socket.on("tableWrong", (data)=>{
            console.log(data);
            if(data=='true'){
                this.tableNotice=true;
            }
            
        });
       
    },
    

    methods:{

        getTable(){
            axios({        
                method: 'get',
                url: 'http://localhost:5000/reservation/payStat',      
            })        
            .then((response) => {          
                this.exitList = response.data.reservations;        
            })        
            .catch(() => {})
        },

        login() {      
            axios({        
                method: 'put',
                
                url: `http://localhost:5000/reservation/user/password/${this.password}`,      

            })        
            .then((response) => {       
                    
                    this.$swal(            
                        'Great!',            
                        'Reservation was successfully added!',            
                        'success',          
                    ); 
                    this.reservation = response.data.reservation;
                    check=1
                    socket.emit('approveEntry', check)//to send notify front desk to prevent false alarms on customer entry
                    socket.emit('reloadRes', {onSite:'true', table: this.reservation.tableNo.tableNum})  
                    socket.emit('rgbTrigger', this.reservation.tableNo._id )  
                    socket.emit('openCustomer', {table: this.reservation.tableNo.tableNum, password: this.password})         
            })
            .catch(() => {

                this.$swal(            
                    'Sorry!',            
                    'Your reservation was NOT sucessfully added! Try again',            
                    'error',          
                ); 
            });      
        },
        paystatUpdate(){
            axios({        
                method: 'put',                
                url: `http://localhost:5000/reservation/payStat/${this.checkedRow[0].password}`,      

            })        
            .then((response) => {       
                    
                    this.$swal(            
                        'Great!',            
                        'Reservation was successfully added!',            
                        'success',          
                    ); 
                   
                    
                    socket.emit('tableReload', 'true')
                            
            })
            .catch(() => {

                this.$swal(            
                    'Sorry!',            
                    'Your reservation was NOT sucessfully added! Try again',            
                    'error',          
                ); 
            });    
        }
    },
    computed:{

        loginLabelMessage() {
                if (this.password !== "") {
                    return "";
                } 
                else {
                    return "This field is required";
                }
        },
        loginIsInDanger() {
                if (this.loginLabelMessage === "This field is required") {
                    return true;
                } 

                else {
                    return false;
                }
            },
    }
}
   
</script>
<style scoped>
    @import '../css/login.css';    

</style>