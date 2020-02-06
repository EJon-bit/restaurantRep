<template>
    <div class="container is-fluid">        
        
        <div class="columns is-multiline is-variable is-0-mobile is-2-tablet is-2-desktop is-2-widescreen" style="margin-top:25px" >  
            <div class="column is-variable is-one-third-desktop is-12-tablet is-12-mobile">
                <div id="good" class="box"> 
                    <h1 class="title is-4">Enter Password Here</h1><br/>
                    <b-form>
                        <b-field label="Password" label-position='on-border' style="margin-left:100px"><br>
                            <b-input v-model="password">  
                            </b-input>
                        
                        </b-field>
                    </b-form>
                </div>
            </div>
            <div class="column is-variable is-two-thirds-desktop is-12-tablet is-12-mobile"> <!--v-for="menu in paginatedItems" :key="menu.name"-->                                     
                <div class="box">
                    <p class="title is-4">Your Ordered Items</p>
                </div>
                <div id="nice" class="box" style="margin-top:35px">   
                    <b-card 
                        :img-src="itemsOrdered.image_url"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 25rem;"
                        class="box">
                        
                        <b-text class="title is-4">{{itemsOrdered.name}}</b-text>
                        
                        <b-card-text style="margin-top: 10px">
                            {{itemsOrdered.description}} <br/>                                            
                        </b-card-text>
                                                                    
                    </b-card>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import axios from 'axios'

export default {
    name: 'UserReservePage',  
    
    data() {    
        return { 
            
            orders:[],
            password:'',
            reservations: [], 
            reserves:[],
            itemsOrdered:[],   
            };  
        },  
        mounted() {    
            this.fetchReservations(); //fetches menu using axios request 
            this.fetchMenuItems();
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
            async fetchMenuItems() {      
                
                var menuStuff= this.orders.map(order=>{

                    return axios({        
                        method: 'get',
                        url: 'http://localhost:5000/menu/user/${order}',      
                    })        
                    .then((response) => {          
                        this.itemsOrdered.push = response.data.menu;        
                    })        
                    .catch(() => {        

                    });   

                })
                 
            }, 
        },
        computed:{
        
            filteredReservation: function(){
                return this.reservations.filter((reservation)=>{                        
                        return reservation.password.match(this.password)
                })                     
                
            },
            getOrders: function(){                    
                                    
                this.orders= filteredReservation.orders.split(",");
                
            }
        }


            // async fetchOrderInfo(){

            //     this.reservations.map(function(reservation.password){

            //     })

            // }
        

}
</script>
<style scoped>
    #nice{
        width: 100%;
        height: 30vw;
        object-fit: cover;
    }
    #good{
        width: 100%;
        height: 37.5vw;
        object-fit: cover;
    }
    .card{
    width: 100%;
    height: 25vw;
    object-fit: cover;
    }
    .card-img-top {
        width: 100%;
        height: 15vw;
        object-fit: cover;
    }
    
</style>