
<template>
  <b-container>
    <div v-for="reservation in reservations" :key="reservation._id">

      <b-card bg-variant="dark" text-variant="white" :title="reservations.tableNo">
        <b-card-text>
          {{reservations.orders}} 
          <br>
          No of. Orders: {{reservations.numOrders}}
        </b-card-text>
        
        <b-button href="#" variant="primary">Close</b-button>
      </b-card>
    </div>
  </b-container>
 
</template>

<script>

import axios from 'axios'
export default {
  name: 'ReserveList',  
    
    data() {    
        return {      
            reservations: [],    
            };  
        },  
        mounted() {    
            this.fetchReservations(); //fetches menu using axios request 
        },  
        methods: {    
            async fetchReservations() {      
                return axios({        
                    method: 'get',
                    url: 'http://localhost:8081/api/Menu',      
                })        
                .then((response) => {          
                    this.reservations = response.data.reservations;        
                })        
                .catch(() => {        

                });    
            },  
        }, 

}
</script>