
<template>
    <div id="backImage">        
        <div class="column" style="margin:auto">
            <div id="best" class="box">   
                <h1 class="title is-4" style="font-family:Gabriola;font-weight:bold; color:gold; font-size:35px;">Enter Password Here</h1><br/>
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
        <div v-if="payMessage">                            
            <b-notification type="is-info" aria-close-label="Close notification">
                Customer at table {{tableNo}} has requested to Pay for their Order
            </b-notification>
        </div>
       
    </div> 
</template>

<script>
import axios from 'axios'
import openSocket from "socket.io-client";
var socket = openSocket("http://localhost:5000");
   
export default {
    name:'Login',

    data(){
        return{

            password:'',
            reservation:null,
            payMessage:false,
            messageCount:0,
            tableNo:0,
            
        }
    },
    created:function(){    
        
        socket.on("newPayRequest", (data)=>{
            console.log(data);
            if(data.status=='true'){
                console.log('The new Data is', data)
                this.tableNo= data.table;
                this.payMessage=true;
                this.messageCount+=1;
            }
            
        })
    },
    methods:{
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

  #best{
    background-color: rgba(63,63,63,.95);
    margin:auto;   
    margin-top:10%;
    width:50%;
    height: 100%;
    
  }  
    

</style>