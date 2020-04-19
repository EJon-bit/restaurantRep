
<template>
    <div id="reserve">
        <div class="container is-fulscreen">
            <br/>
            
            <div v-for="reservation in sortedReservations" :key="reservation._id" style="margin-top:85px">
                
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

export default {

  name: 'ReserveList', 

  components: { 
    FlipCountdown,
    'message':Message

  },

    data() {    
        return {      
            reservations: [],                 

            // backImage: { 
            //     backgroundImage: "url(https://image.freepik.com/free-photo/grunge-wooden-cutting-board-with-copy-space-design-make-food-background_3249-3466.jpg)" 
                
            // }  
            };  
        },  
        mounted() {    
            this.fetchReservations(); //fetches menu using axios request 
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

            sortedReservations: function(){
                
                // put in search function for change in onSite field...if person onSite and not served 
                //sort such that those onSite reservations are placed first

                //if person on site and orderAdded after being served placed them last
                return this.reservations.sort((a, b) =>{

                    return new Date(a.dateReserved) - new Date(b.dateReserved);
                })                    
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