
<template>
    <div :style="backImage">
        <div class="container is-fullscreen">    
            
            <div class="columns is-multiline is-variable is-0-mobile is-2-tablet is-2-desktop is-2-widescreen" style="margin-top:0px" >  
                <div class="column is-variable is-one-third-desktop is-12-tablet is-12-mobile" style="margin-top:85px">
                    <div class="columns is-multiline is-variable is-0-mobile is-2-tablet is-2-desktop is-2-widescreen">
                        <div class="column is-variable is-11-desktop is-12-tablet is-12-mobile is-offset-11" style="margin-top:85px" v-if="password.length!=6 && !filteredRes.length">   
                            <div id="best" class="box" :style="myStyle" > 
                                <h1 class="title is-4" style="font-family:Gabriola;font-weight:bold; color:gold; font-size:35px;">Enter Password Here</h1><br/><br/>
                                
                                <b-field 
                                
                                    label="Password"    
                                    :name=password                              
                                    custom-class="is-small has-text-warning" 
                                    type="is-primary">
                                    <b-input v-model="password">  
                                    </b-input>
                                
                                </b-field>
                                
                            </div>
                        </div>
                        <div class="column is-variable is-one-11-desktop is-12-tablet is-12-mobile">
                            <br/>
                            <div id="good" class="box" :style="myStyle" v-if="filteredRes.length!=0"> 
                                <h1 class="title is-4" style="font-family:Gabriola;font-weight:bold; color:gold; font-size:35px;">Your Order will be ready In:</h1><br/>
                                <div>
                                    <flip-countdown :deadline="filteredRes.dateReserved"></flip-countdown>
                                </div>  

                                <p class="title is-4" style="color:orange;font-size:20px;">Bill Total: ${{orderTotal}}</p>
                                
                                <div v-if="!orders.length||orderAdd">                            
                                    <message></message><br/>
                                </div>
                                
                                <div>
                                    <button class="button field is-danger">                                    
                                        <span>Pay Now</span>
                                    </button>

                                    <button  v-if="!orders.length||orderAdd" class="button field is-link" @click="isComponentModalActive = true">                                    
                                        <span>Add Order</span>
                                    </button>
                                    <b-modal :active.sync="isComponentModalActive"
                                        has-modal-card
                                        trap-focus
                                        aria-role="dialog"
                                        aria-modal>
                                        <modal-form :orders="checkboxGroup"></modal-form>
                                    </b-modal>

                                    <button class="button field is-warning" @click="kitchenSend">                                    
                                        <span>Call Waiter</span>
                                    </button>
                                </div>  
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="column is-variable is-two-thirds-desktop is-12-tablet is-12-mobile" style="margin-top:85px">
                    <div class="columns is-multiline is-variable is-0-mobile is-2-tablet is-2-desktop is-2-widescreen">
                        <div class="column is-variable is-11-desktop is-12-tablet is-12-mobile">
                            <div class="box" :style="myStyle" v-if="(password.length==6) && !orders.length">
                                    <p class="title is-4" style="color:orange;font-size:20px;">No Orders have been Made yet....Add order now!</p>
                            </div>
                            <div class="box" :style="tabStyle" v-if="(password.length==6) && (!orders.length||orderAdd)"> 

                                <div class="box" :style="myStyle">
                                    <p class="title is-4" style="color:orange;font-size:20px;">Select additional items for your order!</p>
                                </div>
                                <foodmenu></foodmenu>                        
                            </div>                     
                        </div>     

                        <div class="column is-variable is-11-desktop is-12-tablet is-12-mobile" v-if="orders.length"> <!--v-for="menu in paginatedItems" :key="menu.name"-->                                     
                            <div class="box" :style="myStyle">
                                <p class="title is-4" style="font-family:Gabriola;color:gold;font-size:35px;">Your Order</p>
                            </div>
                            <div id="nice" class="box" style="margin-top:15px" :style="tabStyle">                         
                                <div class="columns is-multiline is-variable is-0-mobile is-2-tablet is-2-desktop is-2-widescreen">
                                    <div class="column is-variable is-one-third-widescreen is-8-desktop is-one-8-tablet is-8-mobile is-offset-2-mobile" v-for="order in orders" :key="order.name">   
                                        <b-card                                     
                                            :img-src="order.image_url"
                                            img-alt="Image"
                                            img-top
                                            tag="article"
                                            :style="cardStyle"                                   
                                            class="box">
                                            
                                            <b-card-text  name="name" class="title is-4">{{order.name}}</b-card-text>

                                            <p class="title is-6" style="margin-bottom: 25px; margin-top:25px"> Cost: ${{order.cost}}</p>

                                            <div class="field" style="margin-bottom: 30px">
                                                <b-checkbox size="is-large" v-model="checkboxOrders" :native-value="order.name"></b-checkbox><br/>
                                                <p style="font-weight:bold">Check to Add</p>
                                            </div>
                                            
                                            <b-card-text name="description" style="margin-top: 10px">
                                                {{order.description}} <br/>                                            
                                            </b-card-text>                                                                                
                                        </b-card>
                                    </div> 
                                    <br/>
                                    <div class="column is-variable is-offset-1-desktop is-offset-2-mobile">                                    
                                        <button class="button field is-danger" >
                                            <b-icon icon="delete"></b-icon>
                                            <span>Delete</span>
                                        </button> 
                                        <button class="button field is-link" @click="orderAdd = true">                                    
                                            <span>See Menu</span>
                                        </button>                     
                                    </div>                      
                                </div>                        
                            </div> 
                        </div> 
                    </div>
                </div>    
            </div>            
        </div>
        <br/><br/>
    </div>
</template>

<script>
import axios from 'axios'
import FlipCountdown from 'vue2-flip-countdown'
import _ from 'lodash'
import Message from'./Message';
import FoodMenu from './FoodMenu.vue';
// import io from "socket.io-client";
// var socket = io.connect("http://localhost:5000");

var ModalForm = {
    props: ['orders', 'cost'],

    methods: {    
        update() {
            return axios({
                method: 'put',          
                data: {            
                    name: this.formData[0].name,            
                    category: this.formData[0].category,                               
                    cost:this.formData[0].cost,
                    description:this.formData[0].description,
                    image_url:this.formData[0].image_url  
                },          
                url: `http://localhost:5000/menu/editmenu/update/${this.formData[0]._id}`          
                  
            })          
            .then(() => { 
                
                this.$swal(            
                    'Great!',            
                    'Menu Item was successfully updated!',            
                    'success',          
                );               
                        
                //this.$refs.form.reset();          
            })
            .catch(() => {

                this.$swal(            
                    'Sorry! Menu Item could not be Updated.',
                    'Try Again'           
                           
                ); 
            });      
        },    
   
    },

    template: 
        `   <form>
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Add Order</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field custom-class="is-small has-text-warning" label="Orders">
                            <b-input
                                type="textarea"
                                :value="orders"                            
                                required disabled>
                            </b-input>
                        </b-field>

                        <b-field custom-class="is-small has-text-warning" label="Cost">
                            <b-input
                                type="textarea"
                                :value="cost"                            
                                required disabled>
                            </b-input>
                        </b-field>
                        
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="$parent.close()">Close</button>
                        <button class="button is-primary">Add Order</button>
                    </footer>
                </div>
            </form>
        `
}

export default {
    name: 'UserReservePage',  
   
   components: {       
        ModalForm,
        FlipCountdown,
        'message':Message,
        'foodmenu':FoodMenu
    },

    data() {    
        return { 
            
            //callWait:false,
            orderAdd:false,
            isComponentModalActive: false,

            backImage: { 
                backgroundImage: "url(https://i.imgur.com/ZOcLM7h.jpg)"
                         
            },
            filteredRes:[],
            password:'',
            reservations: [], 
            orders:[],
            orderTotal:0,
           
            myStyle:{
                backgroundColor: 'rgba(63,63,63,.95)'
                
            },
            
            cardStyle:{
                backgroundColor:"#a9d3cd"
            },
            tabStyle:{
                backgroundColor: 'rgba(52,103,96,.89)'
            },
        };  
    }, 
    mounted() {    
        
        this.fetchReservations();//fetches reservations from db
        this.password= this.$store.state.password;
        
    },
    
    
    watch: {
        // whenever password changes, this function will run
        password: function (newPassword) { 
            if(this.password.length==6){
                this.filteredReservations();
                this.totalCost();
            }           
            
        }
    },              
     
    methods: { 
                
        kitchenSend(){
           
            this.$store.dispatch('kitchenSend');
        },        
        
        fetchReservations() {      
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
        totalCost:function(){
            var i=0; 
            
            for(i=0;i=this.orders.length;i++){
                this.orderTotal+=this.orders[i].cost

            }            
        },
        filteredReservations:function(){
            // this.filteredRes = [ somthing ][0]
            this.filteredRes= this.reservations.filter(reservation=> reservation.password.match(this.password))[0]                
            
            this.filteredRes.orders.map(order=>{

                axios({        
                    method: 'get',
                    url: `http://localhost:5000/menu/user/${order}`,      
                })        
                .then((response) => { 
                            
                    this.orders.push(response.data.menu);        
                })        
                .catch(() => {        

                });   

            });  
                        
            
        },
               
       
    },
    computed:{
        callWait(){
            return this.$store.state.waiterCall
        },
                  
       
    
    }, 

    
    

}
</script>
<style scoped>
   
    #great{
        width: 100%;
        height: 50vw;
        object-fit: cover;
    }
    #good{
        width: 100%;
        height: 40vw;
        object-fit: cover;
    }
    #best{
        width: 100%;
        height: 28vw;
        object-fit: cover;
    }
    #nice{
        width: 100%;
        height: 43vw;
        object-fit: cover;
    }
    .card{
    width: 100%;
    height: 36vw;
    object-fit: cover;
    }
    .card-img-top {
        width: 100%;
        height: 10vw;
        object-fit: cover;
    }   

</style>