
<template>
    <div id="userPage">           
        <template>
            <div id="margin" class="column is-variable is-6-widescreen is-10-desktop"> 
                <div id="best" class="box" v-if="(password.length!=6 & pass.length!=6 && sessionReload==null)|| reservation==null"> 
                    <h1 class="title is-4">Enter Password Here</h1>
                    
                    <b-field id="passField" 
                        ref="form"                 
                        label="Password"    
                        name=password                              
                        custom-class="is-small has-text-warning" 
                        type="is-primary">
                        <b-input v-model="password"/>  
                                        
                    </b-field>                    
                </div>
            </div>
        </template>
        <template>
            <div id="customContent" class="container is-fullscreen"> 
                <div id="subContent" class="columns is-multiline is-variable is-0-mobile is-2-tablet is-2-desktop is-2-widescreen">  
                    <div id="contentOfSub" class="column is-variable is-one-third-desktop is-12-tablet is-10-mobile">                 
                            
                        <div id="good" class="box" v-if="reservation!=null"> 
                            <h1 class="title is-4" v-if="reservation.onSite && orders.length">Your Order will be ready In:</h1><br/>
                            <div v-if="reservation.onSite && orders.length">
                                <flip-countdown :deadline="reservation.dateReserved"></flip-countdown>
                            </div>  

                            <p class="title is-4" v-if="orders.length">Bill Total: ${{reservation.orderCost}}</p>
                            
                            <div id="waiterNotice" v-if="callWaiter">                            
                                <b-notification type="is-info" aria-close-label="Close notification">
                                    A Waiter will be arriving shortly
                                </b-notification>
                            </div>

                            <div id="customerNotice" v-if="foodUpdateMessage">                            
                                <b-notification type="is-info" aria-close-label="Close notification">
                                    Your Order has been prepared and is on its way to your Table
                                </b-notification>
                            </div>
                            
                            <div>
                               
                                <button :disabled="!checkItem.length" v-if="!orders.length||orderAdd" class="button field is-link" @click="isComponentModalActive = true">                                    
                                    <span>Add Order</span>
                                </button>
                                <b-modal :active.sync="isComponentModalActive"
                                    has-modal-card
                                    trap-focus
                                    aria-role="dialog"
                                    aria-modal>
                                    <modal-form                                     
                                        :orders="checkItem" 
                                        :cost="checkCosts"                                          
                                        :defaultPass="password" 
                                        :sessionPass="sessionReload"
                                        :pass="pass">
                                    </modal-form>
                                </b-modal>

                                <button class="button field is-warning" @click="kitchenSend" v-if="reservation.onSite">                                    
                                    <span>Call Waiter</span>
                                </button>
                                <button class="button field is-warning" v-if="!reservation.onSite" @click="deleteReservation=true">                                    
                                    <span>Delete Reservation</span>
                                </button>
                                <b-modal
                                    :active.sync="deleteReservation"
                                    has-modal-card
                                    trap-focus
                                    aria-role="dialog"
                                    aria-modal>
                                    <delete-res                                                
                                        :seat="reservation.seatsReserved"                                                                                                                                                
                                        :table="reservation.tableNo._id" 
                                        :password="reservation.password">                                                    
                                    </delete-res>
                                </b-modal>

                            </div>  
                            
                        </div>                 
                    </div>
                    <div id="menuContainer" class="column is-variable is-two-thirds-desktop is-12-tablet is-12-mobile">
                        <div class="columns is-multiline is-variable is-0-mobile is-2-tablet is-2-desktop is-2-widescreen is-centered">
                            <div id="seeMenu" class="column is-variable is-11-desktop is-full-touch is-full-tablet is-full-mobile">
                                <div id="menuBox" class="box" v-if="(pass.length==6||password.length==6||sessionReload!=null) && !orders.length && reservation!=null" style="margin-top:20px">
                                        <p class="title is-4">No Orders have been Made yet....Add order now!</p>
                                </div>
                                <div id="tabBox" class="box" v-if="(pass.length==6||password.length==6||sessionReload!=null) && (!orders.length||orderAdd) && reservation!=null" style="margin-top:20px"> 

                                    <div class="box" v-if="orderAdd">
                                        <p id="addOrders" class="title is-4">Select additional items for your order!</p>
                                    </div>
                                    <foodmenu @changed="onChange"></foodmenu> 
                                    <button class="button field is-warning" v-if="orderAdd" @click="orderAdd = false">                                    
                                        <span>Close Menu</span>
                                    </button>                       
                                </div>                     
                            </div>  <br/>   

                            <div id="orders" class="column is-variable is-11-desktop is-12-tablet is-10-mobile" v-if="orders.length">         
                                
                                <div class="box">
                                    <p class="title is-4">Your Order</p>
                                </div>
                                <div id="nice" class="box">                         
                                    <div class="columns is-multiline is-variable is-2-mobile is-2-tablet is-2-desktop is-2-widescreen">
                                        <div class="column is-variable is-one-third-widescreen is-half-desktop is-half-tablet is-full-mobile" v-for="order in paginatedOrders" :key="order.name">   
                                            <b-card                                     
                                                :img-src="`../../static/img/${order.image_url}`"
                                                img-alt="Image"
                                                img-top
                                                tag="article"                                                                                    
                                                class="box">
                                                
                                                <b-card-text  name="name" class="title is-4">{{order.name}}</b-card-text>

                                                <p class="title is-6"> Cost: ${{order.cost}}</p>

                                                <div id="checkBox" class="field">
                                                    <b-checkbox size="is-large" v-model="checkboxOrders" :native-value="order.name"></b-checkbox><br/>
                                                    <p>Check to Delete</p>
                                                </div>
                                                
                                                <b-card-text id="text" name="description">
                                                    {{order.description}} <br/>                                            
                                                </b-card-text>                                                                                
                                            </b-card>
                                        </div> 
                                        <br/>
                                        <div class="column is-variable is-12-desktop is-12-tablet is-11-mobile">
                                            <b-pagination
                                                :total="total"
                                                :current.sync="current"
                                                :per-page="perPage">
                                            </b-pagination>  
                                        </div>
                                                    
                                    </div> 
                                    <div>                                    
                                        <button class="button field is-danger" :disabled="!checkboxOrders.length" v-if="!reservation.onSite" @click="deleteModal=true">
                                            <b-icon icon="delete"></b-icon>
                                            <span>Delete</span>
                                        </button> 
                                        <b-modal :active.sync="deleteModal"
                                            has-modal-card
                                            trap-focus
                                            aria-role="dialog"
                                            aria-modal>
                                            <delete-item                                                
                                                :checkboxOrders="checkboxOrders"                                                                                                                                                
                                                :defaultPass="password" 
                                                :sessionPass="sessionReload"
                                                :pass="pass">                                                    
                                            </delete-item>
                                        </b-modal>
                                        <button class="button field is-warning" v-if="!orderAdd" @click="menuSee">                                    
                                            <span>See Menu</span>
                                        </button>   
                                                             
                                    </div>                                 
                                </div> 
                            </div> 
                        </div>
                    </div>    
                </div>
            </div>
        </template>        
    </div>
</template>

<script>
import axios from 'axios'
import FlipCountdown from 'vue2-flip-countdown'
import _ from 'lodash'
import FoodMenu from './FoodMenu.vue';
import openSocket from "socket.io-client";
var socket = openSocket("http://localhost:5000");


var ModalForm = {
    props: ['orders', 'cost', 'defaultPass', 'sessionPass', 'pass'],

    created(){
        if (this.defaultPass=="" && this.sessionPass==null){
            this.defaultPass=this.pass;
        }
        else if(this.sessionPass!=null){
            this.defaultPass=this.sessionPass
        }
    },

    methods: {    
        async updateOrder(){
            
            axios({        
                method: 'put',  
                data:{
                    orders: this.orders,
                    cost: this.cost
                },           
                url: `http://localhost:5000/reservation/user/addtime/${this.defaultPass}`,      

            })       
            
            .then(() => { 
                                
                socket.emit('fromClient', 'true');
                socket.emit('reloadCustomer', 'true');
                this.$swal(            
                    'Great!',            
                    'Menu Item was successfully updated!',            
                    'success',          
                );     
                          
            })
            .catch(() => {

                this.$swal(            
                    'Sorry! Menu Item could not be Updated.',
                    'Try Again',
                    'error'
                           
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
                                :value="orders.toString()"                            
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
                        <button class="button is-primary" @click="updateOrder">Add Order</button>                       
                    </footer>
                </div>
            </form>
        `
}

var DeleteItem={
    props: ['checkboxOrders', 'defaultPass', 'sessionPass', 'pass'], 

    created(){
        if (this.defaultPass=="" && this.sessionPass==null){
            this.defaultPass=this.pass;
        }
        else if(this.sessionPass!=null){
            this.defaultPass=this.sessionPass
        }
    },

   
    methods:{
        
        async removeThing(){         
            await axios({        
                method: 'put',  
                data:{
                    orders: this.checkboxOrders,
                },           
                url: `http://localhost:5000/reservation/user/${this.defaultPass}`,      

            })   
            .then(() => { 
                
                socket.emit('fromClient', 'true');
                socket.emit('reloadCustomer', 'true');
                this.$swal(            
                    'Great!',            
                    'Items were successfully deleted!',            
                    'success',          
                );               
                         
            })
            .catch(() => {
                this.$swal(            
                    'Sorry!',
                    'Items could not be deleted',
                    'Try Again',       
                    'error'       
                ); 
            });          
            
        },
    },
    template: 
        `   <form>
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">                        
                        <p class="modal-card-title">Delete Items</p>
                    </header>
                    
                    <section class="modal-card-body">
                        <div>                        
                            <p>Are you sure you want to Delete these items from your order?</p>                                                 
                        </div>                       
                                                      
                    </section>
                    <footer class="modal-card-foot"> 
                        <button class="button" type="button" @click="$parent.close()">Cancel</button>                      
                        <button class="button is-primary" @click="removeThing">Yes</button>                       
                    </footer>
                </div>
            </form>
        `
}

var DeleteRes={
    props: ['seat', 'table', 'password'], 

   
    methods:{        
        async delRes(){
            
            axios({
                method: 'delete',          
                   
                url: `http://localhost:5000/reservation/user/${this.seat}/${this.table}/${this.password}`          
                
            })          
            .then(() => { 
                
                this.$swal(            
                    'Great!',            
                    'Menu Item(s) was successfully Deleted!',            
                    'success',          
                ); 
                          
                       
            })
            .catch(() => {

                this.$swal(            
                    'Sorry!', 
                    'Menu Item(s) could not be Deleted.',
                    'Try Again'           
                           
                ); 
            });      
        },            
       
    },
    template: 
        `   <form>
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">                        
                        <p class="modal-card-title">Delete Items</p>
                    </header>
                    
                    <section class="modal-card-body">
                        <div>                        
                            <p>Are you sure you want to Delete your reservation?</p>                                                 
                        </div>                       
                                                      
                    </section>
                    <footer class="modal-card-foot"> 
                        <button class="button" type="button" @click="$parent.close()">Cancel</button>                      
                        <button class="button is-primary" @click="delRes">Yes</button>                       
                    </footer>
                </div>
            </form>
        `
}

export default {
    name: 'UserReservePage',  
   
   components: {       
        ModalForm,
        DeleteItem,
        DeleteRes,
        FlipCountdown,       
        'foodmenu':FoodMenu
    },

    data() {    
        return { 
            callWaiter:false,
            foodUpdateMessage:false,
            orderAdd:false,
            isComponentModalActive: false,
            deleteModal:false,
            deleteReservation:false,
            sessionReload:null,
            checkItem:[],
            checkCosts:null,
            checkboxOrders:[],
            reservation:null,
            password:'',
            deleteItem:false,
            orders:[],
            remove:false,
            orderTotal:0,
            unwatch:null,
            pass:null,
            table: 0,
            current:1,
            perPage: 3,
            total:null,                      
            
        };  
    }, 
    created(){            
                       
        this.pass= this.$store.state.password; 
        if(sessionStorage.password!= undefined){
            this.sessionReload= sessionStorage.password
        }
        
        if(this.pass.length==6){
            this.filteredReservations(this.pass);            
        } 
        else if(this.sessionReload!=null){
            this.filteredReservations(this.sessionReload);
        }
       
        socket.on("customerOpen", (data)=>{
            console.log(data);
            this.table= localStorage.table
            if(data.table==this.table){
                
                this.pass= data.password
                this.filteredReservations(this.pass);
            }
            
        })

        socket.on("customerReload", (data)=>{
            console.log("Customer Page Reload", data);
            
            if(data=='true'){
                if(this.pass==null){
                    this.pass= this.password
                }
                this.filteredReservations(this.pass);
            }
            
        })

        socket.on("customerFoodUpdate", (data)=>{
            console.log(data);
            if(data==this.pass||data==this.sessionReload){
                console.log('The data matches the password')
                this.foodUpdateMessage=true;
            }            
        })

        this.unwatch= this.$watch('password', function(newPassword){
            if(newPassword.length==6){
                this.filteredReservations(newPassword);                
            }     
        })    
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },  
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    }, 
     
    methods: {  
        
        menuSee(){
            this.orderAdd = true
            document.querySelector('#seeMenu').scrollIntoView({ behavior: 'smooth' });
        },
        
        handleResize() {
            this.windowWidth=window.innerWidth;
            if(this.windowWidth<=800) {
                this.perPage=1
            }
            else if(this.windowWidth>800 && this.windowWidth<=1215){
                this.perPage=2
            }
            else{
                this.perPage=3
            }
           
        },
        
        onChange(value){
            this.checkCosts=0;
            this.checkItem=[];
            value.forEach((element, index, arr) => {
                this.checkItem[index]=element.itemName;
                
                this.checkCosts+=element.itemCost;
            });
            
        },
         
        kitchenSend(){
            if(this.callWaiter){
                this.callWaiter=false;
                setTimeout(()=>{
                    
                    this.callWaiter=true; 
                },2000)  
                                      
                socket.emit('callWaiter', {status:'true', table:this.reservation.tableNo.tableNum})
                
            }
            else{
                
                this.callWaiter=true;     
                      
                socket.emit('callWaiter', {status:'true', table:this.reservation.tableNo.tableNum})
               
            }            
            
        },      
                
        
        filteredReservations(object){
            if(object==this.password){
                this.unwatch();                
            }
            else if(object==this.pass){
                console.log(object)
                
            }
            axios({        
                method: 'get',
                url: `http://localhost:5000/reservation/password/${object}`,      
            })        
            .then((response)=>{ 
                                 
                this.orders= response.data.menuItems;
                this.orders.sort();
                this.reservation= response.data.order 
                
                sessionStorage.setItem('password', object)
            })        
            .catch((error) => {
                //if user enters wrong passcode
                if (error.response){                    
                    this.$swal(            
                    'Sorry', 
                    'Passcode incorrect!',  
                    'error'); 
                    
                   
                }                    
            });           
        },
     
    },
    computed:{
        paginatedOrders(){
            let page_number = this.current-1
            this.total=this.orders.length
            return this.orders.slice(page_number * this.perPage, (page_number + 1) * this.perPage); 
                
        },
    }

    
    

}
</script>
<style scoped>
   
    @import '../css/userPage.css';    

</style>