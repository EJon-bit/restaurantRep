
<template>
    <div id="reserve">
        <div class="container is-fluid">
            <br/>
            <div v-for="reservation in sortedReservations" :key="reservation._id">
            <b-message :title="reservation.tableNo[0].tableNum.toString()" type="is-success" aria-close-label="Close message">
                    
                    <strong>No. of Orders: <b-tag rounded type="is-dark">{{reservation.numOrders}}</b-tag></strong>
                    <br/><br/>
                    <strong> Orders: {{reservation.orders}}</strong>
                    <hr class="featurette-divider">
                    <div>
                        <flip-countdown :deadline="reservation.dateReserved"></flip-countdown>
                    </div>

                </b-message><br/><br/>
            
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import FlipCountdown from 'vue2-flip-countdown'

export default {

  name: 'ReserveList', 

  components: { FlipCountdown },

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
            
            sortedReservations: function(){
                                   
                return this.reservations.sort((a, b) =>{

                    return new Date(a.dateReserved) - new Date(b.dateReserved);
                })                    
            },

            
        }
        

}
</script>
<style scoped>

#reserve{
 background-image: url('https://previews.123rf.com/images/9dreamstudio/9dreamstudio1709/9dreamstudio170901460/85756145-kitchen-table-with-spices-and-dry-herbs-on-wooden-kitchen-background-top-view-mock-up.jpg');
 /* background-size: cover;
 background-repeat: no-repeat;  */
 
}


</style>