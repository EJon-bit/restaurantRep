
<template>
    <div id="reserve">
        <div class="container is-fullscreen">
            <div class="column" v-if="reservations.length" style="margin:auto">            
                <div v-for="reservation in sortReserve" :key="reservation._id" style="margin-top:50px">
                    
                    <b-message :title="getTitle(reservation.tableNo.tableNum)" type="is-success" aria-close-label="Close message">                    
                        <strong>No. of Orders: <b-tag rounded type="is-dark">{{reservation.numOrders}}</b-tag></strong>
                        <br/><br/>
                        <strong> Orders:</strong>
                        <b-taglist v-for="order in reservation.orders" :key="order"> 
                            <b-tag size="is-medium" rounded type="is-dark">{{order}}</b-tag>
                        </b-taglist>

                        <b-button type="is-primary" @click="served(reservation._id, reservation.password)">
                            Served   
                        </b-button>
                        
                        <hr class="featurette-divider" style="margin-top:5px;margin-top:0px">
                        <div>
                            <flip-countdown :deadline="reservation.dateReserved"></flip-countdown>
                        </div>

                    </b-message>                
                </div>
            </div>
            <div class="column" v-if="!reservations.length" style="margin:auto;">
                <b-notification type="is-dark">
                   No Reservations have been made yet.
                </b-notification>
            </div>
        </div>
        
    </div>
</template>

<script>

import axios from 'axios'
import FlipCountdown from 'vue2-flip-countdown'

import Speech from 'speak-tts'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');
const speech = new Speech();

export default {

  name: 'ReserveList', 

  components: { 
    FlipCountdown,   

  },

    data() {    
        return {      
            reservations: [],                 
            tableNo: null,
            
        };  
    }, 
    created:function(){
        this.fetchReservations();
        
        if(speech.hasBrowserSupport()) { // returns a boolean
            console.log("speech synthesis supported")
        }

        speech.init({
            'volume': 1,
            'lang': 'en-US',
            'rate': 1.25,
            'pitch': 1.5,
            'voice':'Microsoft Zira Desktop - English (United States)',
        })
        .then((data) => {            
            console.log("Speech is ready, voices are available", data.voices)
        })
        .catch(e => {
            console.error("An error occured while initializing : ", e)
        })
                        
        socket.on("newReserveList", (data)=>{
            console.log(data);
            if(data=='true'){
                console.log('The new Data is', data)
                this.fetchReservations();
            }            
        })
        socket.on("reserveUpdate", (data)=>{
            console.log(data);
            if(data.onSite=='true'){
                console.log('The new Data is', data)
                this.fetchReservations();

                console.log('A customer has arrived')
                //Add audio thingy to call waiter
                speech.speak({
                    text: `Customer for table ${data.table} has arrived`,
                    queue: true, // current speech will be interrupted,
                    listeners: {
                        onstart: () => {
                            console.log("Start utterance")
                        },
                        onend: () => {
                            console.log("End utterance")
                        },
                        onresume: () => {
                            console.log("Resume utterance")
                        },
                       
                    }
                }).then(() => {
                    console.log("Success !")
                }).catch(e => {
                    console.error("An error occurred :", e)
                })
             
            }
            
        })

        socket.on("waiterCall", (data)=>{
            console.log(data);
            if(data.status=='true'){
                this.tableNo= data.table;
                console.log('Calling waiter')
                //Add audio thingy to call waiter
                speech.speak({
                    text: `Calling Waiter to table ${this.tableNo}`,
                    queue: true, // current speech will be interrupted,
                    listeners: {
                        onstart: () => {
                            console.log("Start utterance")
                        },
                        onend: () => {
                            console.log("End utterance")
                        },
                        onresume: () => {
                            console.log("Resume utterance")
                        },
                       
                    }
                }).then(() => {
                    console.log("Success !")
                }).catch(e => {
                    console.error("An error occurred :", e)
                })
            }
            
        })      
    }, 
           
    methods: {  
        
        getTitle(tableObj){
            return "Table " + tableObj.toString()
        },
        async fetchReservations() {      
            return axios({        
                method: 'get',
                url: 'http://localhost:5000/reservation',      
            })        
            .then((response) => {          
                this.reservations = response.data.reservations;        
            })        
            .catch(() => {        

            });    
        },

        served(resId, passcode){
            
            axios({        
                method: 'put',                
                url: `http://localhost:5000/reservation/served/${resId}`,      

            })        
            .then(() => { 
                socket.emit('fromClient', 'true')      
                socket.emit('foodUpdate', passcode)  
                this.$swal(            
                    'Great!',            
                    'Reservation was successfully added!',            
                    'success',          
                ); 
                         
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
        sortReserve:function(){
            return this.reservations.sort((x, y)=>{
                // true values first
                return (x.onSite === y.onSite)? 0 : x.onSite? -1 : 1;
                
            });
        }
    }
    
        

}
</script>
<style scoped>




</style>