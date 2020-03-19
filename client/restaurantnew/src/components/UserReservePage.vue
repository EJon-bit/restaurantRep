
<template>
    <div :style="backImage">
        <div class="container is-fullscreen">    
            
            <div class="columns is-multiline is-variable is-0-mobile is-2-tablet is-2-desktop is-2-widescreen" style="margin-top:0px" >  
                <div class="column is-variable is-one-third-desktop is-12-tablet is-12-mobile" style="margin-top:85px">
                    <div id="best" class="box" :style="myStyle"> 
                        <h1 class="title is-4" style="font-family:Gabriola;font-weight:bold; color:gold; font-size:35px;">Enter Password Here</h1><br/><br/>
                        
                        <b-field 
                          
                            label="Password"    
                            :name=password                              
                            custom-class="is-small has-text-warning" 
                            type="is-primary">
                            <b-input v-model.lazy="password">  
                            </b-input>
                        
                        </b-field>
                        
                    </div>
                    <br/>
                    <div id="good" class="box" :style="myStyle"> 
                        <h1 class="title is-4" style="font-family:Gabriola;font-weight:bold; color:gold; font-size:35px;">Your Order will be ready In:</h1><br/>
                        <div>
                            <flip-countdown :deadline="filteredRes.dateReserved"></flip-countdown>
                        </div>  
                        
                        <div v-if="!orders.length||orderAdd">                            
                            <message></message><br/>
                        </div>
                        
                        <div>
                            <button class="button field is-danger">                                    
                                <span>Pay Now</span>
                            </button>

                            <button class="button field is-link" @click="isComponentModalActive = true">                                    
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
                <div class="column is-variable is-two-thirds-desktop is-12-tablet is-12-mobile" v-if="orders.length" style="margin-top:85px"> <!--v-for="menu in paginatedItems" :key="menu.name"-->                                     
                    <div class="box" :style="myStyle">
                        <p class="title is-4" style="font-family:Gabriola;color:gold;font-size:35px;">Your Ordered Items</p>
                    </div>
                    <div id="nice" class="box" style="margin-top:15px" :style="tabStyle"> 
                        
                        <div class="columns is-multiline is-variable is-0-mobile is-2-tablet is-2-desktop is-2-widescreen">
                            <div class="column is-variable is-half-desktop is-12-tablet is-12-mobile" v-for="order in orders" :key="order.name">   
                                <b-card 
                                    
                                    :img-src="order.image_url"
                                    img-alt="Image"
                                    img-top
                                    tag="article"
                                    :style="cardStyle"                                   
                                    class="box">
                                    
                                    <b-card-text  name="name" class="title is-4">{{order.name}}</b-card-text>
                                    
                                    <b-card-text name="description" style="margin-top: 10px">
                                        {{order.description}} <br/>                                            
                                    </b-card-text>                                                                                
                                </b-card>
                            </div>                    
                            
                        </div>
                        <div class="column is-variable is-half-desktop is-12-tablet is-12-mobile">

                            <div class="box" :style="myStyle">    
                                <button class="button field is-danger" >
                                    <b-icon icon="delete"></b-icon>
                                    <span>Delete</span>
                                </button>
                                
                                <button class="button field is-link">
                                    <b-icon icon="pencil"></b-icon>
                                    <span>Update</span>
                                </button> 

                                <button class="button field is-info" @click="isComponentModalActive=true; orderAdd=true">                    
                                    <b-icon icon="plus"></b-icon>
                                    <span>Add Order</span>
                                </button>         
                            </div> 

                        </div> 
                    </div>                                

                </div> 
                <div class="column is-variable is-two-thirds-desktop is-12-tablet is-12-mobile" v-if="!orders.length||orderAdd" style="margin-top:85px">
                    <div class="box" :style="myStyle">
                            <p class="title is-4" style="color:orange;font-size:20px;">No Orders have been Made yet....Add order now!</p>
                    </div>
                    <div class="box" :style="tabStyle"> 
                        <b-tabs vertical type="is-boxed">
                            <b-tab-item :label="appetizers">
                                <div class="columns is-multiline is-variable is-two-thirds-desktop is-0-mobile is-2-tablet is-2-desktop is-2-widescreen" >  
                                    <div class="column is-variable is-one-third-widescreen is-8-desktop is-one-8-tablet is-8-mobile is-offset-2-mobile" v-for="menu in paginatedItems" :key="menu.name">                                    
                                        <b-card
                                            :img-src="menu.image_url"
                                            img-alt="Image"
                                            img-top
                                            tag="article"
                                            :style="cardStyle"
                                            class="box" id="cardOpacity">
                                            
                                            <p class="title is-4">{{menu.name}}<p>

                                            <p class="title is-6" style="margin-bottom: 25px; margin-top:25px"> Cost: ${{menu.cost}}</p>
                                            
                                            <div class="field" style="margin-bottom: 30px">
                                                <b-checkbox size="is-large" v-model="checkboxGroup" :native-value="menu.name"></b-checkbox><br/>
                                                <p style="font-weight:bold">Check to Add</p>
                                            </div>

                                            <b-card-text style="margin-top: 10px">
                                                {{menu.description}} <br/>                                            
                                            </b-card-text>                                     
                                                                                
                                                                                                            
                                        </b-card>
                                    </div>
                                    <br/>
                                    <div class="column is-variable is-12-desktop is-11-mobile">
                                        <b-pagination
                                            :total="total"
                                            :current.sync="current"
                                            :per-page="perPage" >
                                        </b-pagination>  
                                    </div>
                                </div>  
                            </b-tab-item>
                            
                            <b-tab-item :label="meatLovers">
                                <div class="columns is-multiline is-variable is-2-mobile is-2-tablet is-2-desktop is-2-widescreen">  
                                    <div class="column is-variable is-one-third-desktop is-12-tablet is-12-mobile" v-for="menu in paginatedItems_one" :key="menu.name">
                                        <b-card
                                            :img-src="menu.image_url"
                                            img-alt="Image"
                                            img-top
                                            tag="article"
                                            :style="cardStyle"
                                            class="box">
                                            
                                            <p class="title is-4">{{menu.name}}</p>
                                            
                                            <p class="title is-6" style="margin-bottom: 25px; margin-top:25px"> Cost: ${{menu.cost}}</p>
                                            
                                            <div class="field" style="margin-bottom: 30px">
                                                <b-checkbox size="is-large" v-model="checkboxGroup" :native-value="menu.name"></b-checkbox><br/>
                                                <strong>Check to Add</strong>
                                            </div>

                                            <b-card-text style="margin-top: 10px">
                                                {{menu.description}} <br/>                                            
                                            </b-card-text>                        
                                        </b-card>
                                    </div>
                                    <br/>
                                    <div class="column is-variable is-12-desktop is-11-mobile">
                                        <b-pagination
                                            :total="total"
                                            :current.sync="current"
                                            :per-page="perPage">
                                        </b-pagination>  
                                    </div>
                                </div>
                            </b-tab-item>
                            
                            <b-tab-item :label="vegetarian">
                                <div class="columns is-multiline is-variable is-2-mobile is-2-tablet is-2-desktop is-2-widescreen">  
                                    <div class="column is-variable is-one-third-desktop is-12-mobile is-12-tablet" v-for="menu in paginatedItems_two" :key="menu.name">
                                        <b-card 
                                            :img-src="menu.image_url"
                                            img-alt="Image"
                                            img-top
                                            tag="article"
                                            :style="cardStyle"
                                            class="box">
                                            
                                            <p class="title is-4">{{menu.name}}</p>
                                            
                                            <p class="title is-6" style="margin-bottom: 25px; margin-top:25px"> Cost: ${{menu.cost}}</p>
                                            
                                            <div class="field" style="margin-bottom: 30px">
                                                <b-checkbox size="is-large" v-model="checkboxGroup" :native-value="menu.name"></b-checkbox><br/>
                                                <strong>Check to Add</strong>
                                            </div>

                                            <b-card-text style="margin-top: 10px">
                                                {{menu.description}} <br/>                                            
                                            </b-card-text>                     
                                        </b-card>
                                    </div>
                                    <br/>
                                    <div class="column is-variable is-12-desktop is-11-mobile">
                                        <b-pagination
                                            :total="total"
                                            :current.sync="current"
                                            :per-page="perPage">
                                        </b-pagination>  
                                    </div>
                                </div>
                                
                            </b-tab-item>

                            <b-tab-item :label="sides">
                                <div class="columns is-multiline is-variable is-2-mobile is-2-tablet is-2-desktop is-2-widescreen">  
                                    <div class="column is-variable is-one-third-desktop is-12-mobile is-12-tablet" v-for="menu in paginatedItems_three" :key="menu.name">
                                        <b-card
                                            :img-src="menu.image_url"
                                            img-alt="Image"
                                            img-top
                                            tag="article"
                                            :style="cardStyle"
                                            class="box">
                                            
                                            <p class="title is-4">{{menu.name}}</p>
                                            
                                            <p class="title is-6" style="margin-bottom: 25px; margin-top:25px"> Cost: ${{menu.cost}}</p>
                                            
                                            <div class="field" style="margin-bottom: 30px">
                                                <b-checkbox size="is-large" v-model="checkboxGroup" :native-value="menu.name"></b-checkbox><br/>
                                                <strong>Check to Add</strong>
                                            </div>

                                            <b-card-text style="margin-top: 10px">
                                                {{menu.description}} <br/>                                            
                                            </b-card-text>                         
                                        </b-card>
                                    </div>
                                    <br/>
                                    <div class="column is-variable is-12-desktop is-11-mobile">
                                        <b-pagination
                                            :total="total"
                                            :current.sync="current"
                                            :per-page="perPage">
                                        </b-pagination>  
                                    </div>
                                </div>
                            </b-tab-item>

                            <b-tab-item :label="beverages" >
                                <div class="columns is-multiline is-variable is-2-mobile is-2-tablet is-2-desktop is-2-widescreen">  
                                    <div class="column is-variable is-one-third-desktop is-12-mobile is-12-tablet" v-for="menu in paginatedItems_four" :key="menu.name">
                                        <b-card
                                            :img-src="menu.image_url"
                                            img-alt="Image"
                                            img-top
                                            tag="article"
                                            :style="cardStyle"
                                            class="box">
                                            
                                            <p class="title is-4">{{menu.name}}</p>
                                            
                                            <p class="title is-6" style="margin-bottom: 25px; margin-top:25px"> Cost: ${{menu.cost}}</p>
                                            
                                            <div class="field" style="margin-bottom: 30px">
                                                <b-checkbox size="is-large" v-model="checkboxGroup" :native-value="menu.name"></b-checkbox><br/>
                                                <strong>Check to Add</strong>
                                            </div>

                                            <b-card-text style="margin-top: 10px">
                                                {{menu.description}} <br/>                                            
                                            </b-card-text>                          
                                        </b-card>
                                    </div>
                                    <br/>
                                    <div class="column is-variable is-12-desktop is-11-mobile">
                                        <b-pagination
                                            :total="total"
                                            :current.sync="current"
                                            :per-page="perPage">
                                        </b-pagination>  
                                    </div>
                                </div>
                            </b-tab-item>

                            <b-tab-item :label="dessert">
                                <div class="columns is-multiline is-variable is-0-mobile is-2-tablet is-2-desktop is-2-widescreen">  
                                    <div class="column is-variable is-one-third-desktop is-12-mobile is-12-tablet" v-for="menu in paginatedItems_five" :key="menu.name">
                                        <b-card
                                            :img-src="menu.image_url"
                                            img-alt="Image"
                                            img-top
                                            tag="article"
                                            :style="cardStyle"
                                            class="box">
                                            
                                            <p class="title is-4">{{menu.name}}</p>
                                            
                                            <p class="title is-6" style="margin-bottom: 25px; margin-top:25px"> Cost: ${{menu.cost}}</p>
                                            
                                            <div class="field" style="margin-bottom: 30px">
                                                <b-checkbox size="is-large" v-model="checkboxGroup" :native-value="menu.name"></b-checkbox><br/>
                                                <strong>Check to Add</strong>
                                            </div>

                                            <b-card-text style="margin-top: 10px">
                                                {{menu.description}} <br/>                                            
                                            </b-card-text>                           
                                        </b-card>
                                    </div>
                                    <br/>
                                    <div class="column is-variable is-12-desktop is-11-mobile">
                                        <b-pagination
                                            :total="total"
                                            :current.sync="current"
                                            :per-page="perPage">
                                        </b-pagination>  
                                    </div>
                                </div>
                            </b-tab-item>
                        </b-tabs> 
                        
                        
                    </div> 
                    
                </div>                
                    
            </div>            
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import FlipCountdown from 'vue2-flip-countdown'
import _ from 'lodash'
import Message from'./Message';
//import {mapActions, mapGetters} from 'vuex'

var ModalForm = {
    props: ['orders', 'cost'],

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
        'message':Message
    },

    data() {    
        return { 
            appetizers:"Appetizers",
            meatLovers:"Meat Lover",
            vegetarian:"Vegetarian",
            sides:"Sides",
            beverages:"Beverages",
            dessert:"Dessert",

            checkboxGroup:[],
            menus: [],
            current: 1,
            perPage: 3,

            //callWait:false,
            orderAdd:false,
            isComponentModalActive: false,

            backImage: { 
                backgroundImage: "url(https://st.depositphotos.com/2158511/4377/v/950/depositphotos_43771103-stock-illustration-raw-food-seamless-background.jpg)"
                         
            },
            filteredRes:[],
            password:"",
            reservations: [], 
            orders:[],
           
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

    watch: {
        // whenever password changes, this function will run
        password: function (newPassword) {            
            this.filteredReservations()
        }
    },              
     
    methods: { 

                
        kitchenSend(){
           
            this.$store.dispatch('kitchenSend');
        },
        
        fetchMenu() {      
            return axios({        
                method: 'get',
                url: 'http://localhost:5000/menu',      
            })        
            .then((response) => {          
                this.menus = response.data.menus;        
            })        
            .catch(() => {        
            });    
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
        filteredReservations://waits for user to finish typing before function is run
            function(){
                
                this.filteredRes= this.reservations.filter(reservation=>{                        
                    return reservation.password.match(this.password)
                })                            
                
                var orders= this.filteredRes.orders.map(order=>{

                    return axios({        
                        method: 'get',
                        url: `http://localhost:5000/menu/user/${order}`,      
                    })        
                    .then((response) => { 
                                
                        response.data.menu;        
                    })        
                    .catch(() => {        

                    });   

                });             
                
            },
               
       
    },
    computed:{
        // callWait(){
        //     return this.$store.state.waiterCall
        // },
                
        filteredMenus: function(){
            return this.menus.filter((menu)=>{                        
                    return menu.category.match(this.appetizers)
            }).sort((a, b) => (a.cost - b.cost))                   
        },
        filteredMenus_two: function(){
            return this.menus.filter((menu)=>{                        
                    return menu.category.match(this.meatLovers)
            }).sort((a, b) => (a.cost - b.cost))                 
        },
        filteredMenus_three: function(){
            return this.menus.filter((menu)=>{                        
                    return menu.category.match(this.vegetarian)
            }).sort((a, b) => (a.cost - b.cost))                 
        },
        filteredMenus_four: function(){
            return this.menus.filter((menu)=>{                        
                    return menu.category.match(this.sides)
            }).sort((a, b) => (a.cost - b.cost))                 
        },
        filteredMenus_five: function(){
            return this.menus.filter((menu)=>{                        
                    return menu.category.match(this.beverages)
            }).sort((a, b) => (a.cost - b.cost))                 
        },
        filteredMenus_six: function(){
            return this.menus.filter((menu)=>{                        
                    return menu.category.match(this.dessert)
            }).sort((a, b) => (a.cost - b.cost))                 
        },

        total(){
            return this.filteredMenus.length + 2
        },
        
        paginatedItems() {
            let page_number = this.current-1
            
            return this.filteredMenus.slice(page_number * this.perPage, (page_number + 1) * this.perPage); 
                
        },
        paginatedItems_one() {
            let page_number = this.current-1
            
            return this.filteredMenus_two.slice(page_number * this.perPage, (page_number + 1) * this.perPage); 
                
        },
        paginatedItems_two() {
            let page_number = this.current-1
            
            return this.filteredMenus_three.slice(page_number * this.perPage, (page_number + 1) * this.perPage); 
                
        },
        paginatedItems_three() {
            let page_number = this.current-1
            
            return this.filteredMenus_four.slice(page_number * this.perPage, (page_number + 1) * this.perPage); 
                
        },
        paginatedItems_four() {
            let page_number = this.current-1                

            return this.filteredMenus_five.slice(page_number * this.perPage, (page_number + 1) * this.perPage); 
                
        },
        paginatedItems_five() {
            let page_number = this.current-1                

            return this.filteredMenus_six.slice(page_number * this.perPage, (page_number + 1) * this.perPage);
                
        }            

    
    }, 

    created() {    
        this.fetchMenu(); //fetches menu from db
        this.fetchReservations();//fetches reservations from db
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