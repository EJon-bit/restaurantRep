
<template>
  <div class="container is-fluid">
    <br/>
    <div v-for="reservation in reservations" :key="reservation._id">
       <b-message :title="filteredRes" type="is-success" aria-close-label="Close message">
            
            <strong>No. of Orders: <b-tag rounded type="is-dark">{{reservation.numOrders}}</b-tag></strong>
            <br/><br/>
            <strong> Orders: {{reservation.orders}}</strong>
        </b-message>
      
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
                       
            filteredRes: function(){
              return this.reservations.filter(reservation => reservation.tableNo).map(tableNo=>(tableNo.tableNum))                                 
                
            }
        }    

}
</script>