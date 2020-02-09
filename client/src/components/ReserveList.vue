
<template>
    <div :style="backImage">
        <div class="container is-fluid">
            <br/>
            <div v-for="reservation in reservations" :key="reservation._id">
            <b-message :title="reservation.tableNo[0].tableNum" type="is-success" aria-close-label="Close message">
                    
                    <strong>No. of Orders: <b-tag rounded type="is-dark">{{reservation.numOrders}}</b-tag></strong>
                    <br/><br/>
                    <strong> Orders: {{reservation.orders}}</strong>
                </b-message><br/><br/>
            
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'ReserveList',  
    
    data() {    
        return {      
            reservations: [],  

            backImage: { 
                backgroundImage: "url(https://image.freepik.com/free-photo/grunge-wooden-cutting-board-with-copy-space-design-make-food-background_3249-3466.jpg)" 
            }  
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
        }
        

}
</script>