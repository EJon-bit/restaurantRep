
<template>
    <div id="reserve">
        <div class="container is-fulscreen">
            <br/>
            
            <div v-for="reservation in reservations" :key="reservation._id" style="margin-top:85px">
                
                <b-message :title="reservation.tableNo.tableNum.toString()" type="is-success" aria-close-label="Close message">                    
                    <strong>No. of Orders: <b-tag rounded type="is-dark">{{reservation.numOrders}}</b-tag></strong>
                    <br/><br/>
                    <strong> Orders: {{reservation.orders}}</strong>
                    <div>
                        <br/><message v-if="checkWait"></message>
                    </div>
                    <hr class="featurette-divider" style="margin-top:5px;margin-top:0px">
                    <div>
                        <flip-countdown :deadline="reservation.dateReserved"></flip-countdown>
                    </div>

                </b-message>
            
            </div>
        </div>
        <br/><br/>
    </div>
</template>

<script>

import axios from 'axios'
import FlipCountdown from 'vue2-flip-countdown'
import Message from'./Message'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

export default {

  name: 'ReserveList', 

  components: { 
    FlipCountdown,
    'message':Message

  },

    data() {    
        return {      
            reservations: [],                 
            //reserveUpdate: false,
            
        };  
    }, 
    created() {
        this.fetchReservations();
        var newData;
        socket.on("newReserveList", function(data){
            console.log(data);
            newData=data;
            
        })
        if(newData==true){
            console.log('The new Data is', newData)
            this.fetchReservations();
        }
       
    }, 
        
    methods: {    
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
        
    },
    computed:{
        checkWait(){
            return this.$store.state.checkWait
        },
               
    }
        

}
</script>
<style scoped>

#reserve{
 background-image: url('https://i.imgur.com/ZOcLM7h.jpg');
 /* background-size: cover;
 background-repeat: no-repeat;  */
 
}


</style>