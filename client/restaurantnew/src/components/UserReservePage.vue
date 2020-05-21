
<template>
    <div id="userPage">           
        <template>
            <div class="column is-variable is-6-widescreen is-10-desktop" style="margin:auto"> 
                <div id="best" class="box" :style="myStyle" v-if="password.length!=6 && orders.length==0"> 
                    <h1 class="title is-4" style="font-family:Gabriola;font-weight:bold; color:gold;font-size:35px;margin-top:10px">Enter Password Here</h1>
                    
                    <b-field                     
                        label="Password"    
                        name=password                              
                        custom-class="is-small has-text-warning" 
                        type="is-primary" 
                        style="margin-bottom:50px">
                        <b-input v-model="password"/>  
                                        
                    </b-field>                    
                </div>
            </div>
        </template>
        <template>
            <div class="container is-fullscreen" style="margin-bottom:50px"> 
                <div class="columns is-multiline is-variable is-0-mobile is-2-tablet is-2-desktop is-2-widescreen" style="margin-top:0px" >  
                    <div class="column is-variable is-one-third-desktop is-12-tablet is-10-mobile" style="margin:auto;margin-top:85px">                 
                            
                        <div id="good" class="box" :style="myStyle" v-if="orders.length"> 
                            <h1 class="title is-4" style="font-family:Gabriola;font-weight:bold; color:gold; font-size:35px;">Your Order will be ready In:</h1><br/>
                            <div>
                                <flip-countdown :deadline="reservation.dateReserved"></flip-countdown>
                            </div>  

                            <p class="title is-4" style="color:orange;font-size:20px;">Bill Total: ${{reservation.orderCost}}</p>
                            
                            <div v-if="callWaiter" style="margin-bottom:40px">                            
                                <b-notification type="is-info" aria-close-label="Close notification">
                                    A Waiter will be arriving shortly
                                </b-notification>
                            </div>
                            
                            <div>
                                <button class="button field is-danger" @click="makePayment" v-if="reservation.onSite">                                    
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
                                    <modal-form                                     
                                        :orders="checkItem" 
                                        :cost="checkCosts"                                          
                                        :defaultPass="password" 
                                        :pass="pass">
                                    </modal-form>
                                </b-modal>

                                <button class="button field is-warning" @click="kitchenSend" v-if="reservation.onSite">                                    
                                    <span>Call Waiter</span>
                                </button>
                                <button class="button field is-warning" v-if="!reservation.onSite" @click="delRes">                                    
                                    <span>Delete Reservation</span>
                                </button>
                            </div>  
                            
                        </div>                 
                    </div>
                    <div class="column is-variable is-two-thirds-desktop is-12-tablet is-12-mobile" style="margin-top:65px">
                        <div class="columns is-multiline is-variable is-0-mobile is-2-tablet is-2-desktop is-2-widescreen">
                            <div id="seeMenu" class="column is-variable is-11-desktop is-12-tablet is-11-mobile" style="margin-left:20px">
                                <div class="box" :style="myStyle" v-if="(password.length==6) && !orders.length" style="margin-top:20px">
                                        <p class="title is-4" style="color:orange;font-size:20px;">No Orders have been Made yet....Add order now!</p>
                                </div>
                                <div class="box" :style="tabStyle" v-if="(pass.length==6||password.length==6) && (!orders.length||orderAdd)" style="margin-top:20px"> 

                                    <div class="box" v-if="orderAdd" :style="myStyle">
                                        <p class="title is-4" style="color:orange;font-size:20px;">Select additional items for your order!</p>
                                    </div>
                                    <foodmenu @changed="onChange"></foodmenu> 
                                    <button class="button field is-warning" v-if="orderAdd" @click="orderAdd = false">                                    
                                        <span>Close Menu</span>
                                    </button>                       
                                </div>                     
                            </div>  <br/>   

                            <div class="column is-variable is-11-desktop is-12-tablet is-10-mobile" v-if="orders.length" style="margin-left:20px"> <!--v-for="menu in paginatedItems" :key="menu.name"-->                                     
                                
                                <div class="box" :style="myStyle">
                                    <p class="title is-4" style="font-family:Gabriola;color:gold;font-size:35px;">Your Order</p>
                                </div>
                                <div id="nice" class="box" style="margin-top:15px" :style="tabStyle">                         
                                    <div class="columns is-multiline is-variable is-1-mobile is-2-tablet is-2-desktop is-2-widescreen">
                                        <div class="column is-variable is-one-third-widescreen is-half-desktop is-half-tablet is-12-mobile" v-for="order in paginatedOrders" :key="order.name">   
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
                                                    <p style="font-weight:bold">Check to Delete</p>
                                                </div>
                                                
                                                <b-card-text name="description" style="margin-top: 10px">
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
                                        <button class="button field is-danger" v-if="!reservation.onSite" @click="deleteModal =true">
                                            <b-icon icon="delete"></b-icon>
                                            <span>Delete</span>
                                        </button> 
                                        <b-modal :active.sync="deleteModal"
                                            has-modal-card
                                            trap-focus
                                            aria-role="dialog"
                                            aria-modal>
                                            <delete-form 
                                                :checkboxGroup="checkItem"
                                                :cost="checkCosts"
                                                :checkboxOrders="checkboxOrders" 
                                                :orders="orders"                                                                                                 
                                                :defaultPass="password" 
                                                :pass="pass">                                                    
                                            </delete-form>
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
    props: ['orders', 'cost', 'defaultPass', 'pass'],

    created(){
        if (this.defaultPass==null){
            this.defaultPass==this.pass;
        }
    },

    methods: {    
        async addTime(){
            var timePrep= this.orders.sort((a,b)=>(b.prepTime-a.prepTime))
            console.log("Time to prepare meal is", timePrep[0].prepTime)
            await axios({        
                method: 'put',  
                data:{
                    orders: this.orders,
                },           
                url: `http://localhost:5000/reservation/user/addtime/${this.defaultPass}/${timePrep[0].prepTime}`,      

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
                        <button class="button is-primary" @click="update">Add Order</button>                       
                    </footer>
                </div>
            </form>
        `
}

var DeleteForm={
    props: ['orders','cost','checkboxOrders', 'checkboxGroup', 'defaultPass', 'pass'], 

    created(){
        if (this.defaultPass==null){
            this.defaultPass==this.pass;
        }
    },

    mounted(){
        this.toDelete()
    },

    methods:{

        toDelete(){
            this.orders.sort()
            this.checkboxOrders.sort()
            for(var k=0; k>this.checkboxOrders.length; ++k){
                var same= this.checkboxOrders.filter(item=>(item==this.checkboxOrders[k]))
                console.log("same length:", same)
                var identical= this.orders.filter(thing=>(thing.name==this.checkboxGroup[k]))                    
                console.log("identical length:", identical)

                if((same.length==identical.length)||((same.length>0) &&(identical.length>same.length))){
                    this.orders.splice(k, same.length)
                    this.same.forEach((element,index,arr) =>{
                        this.cost-=this.arr[k].cost;
                    })
                    break;
                }                  
            }     
        },
        
        async removeThing(){
           
            await axios({        
                method: 'put',  
                data:{
                    orders: this.orders,
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
                    'Sorry! Items could not be deleted',
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
                            <p>Are you sure you want to Delete these items from your order?</p>                                                 
                        </div>                       
                                                      
                    </section>
                    <footer class="modal-card-foot">                       
                        <button class="button is-primary" @click="removeThing">Yes</button>                       
                    </footer>
                </div>
            </form>
        `
}

export default {
    name: 'UserReservePage',  
   
   components: {       
        ModalForm,
        DeleteForm,
        FlipCountdown,       
        'foodmenu':FoodMenu
    },

    data() {    
        return { 
            callWaiter:false,
            orderAdd:false,
            isComponentModalActive: false,
            deleteModal:false,
           
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
    created(){            
                       
        this.pass= this.$store.state.password;    
        if(this.pass.length==6){
            this.filteredReservations(this.pass);
            
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

        this.unwatch= this.$watch('password', function(newPassword){
            if(newPassword.length==6){
                this.filteredReservations(newPassword);
                //this.totalCost();
            }     
        })    
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },  
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    }, 
     
    methods: {  
        delRes(){

        },
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
        makePayment(){
            socket.emit('payReq', {status:'true', table:this.reservation.tableNo.tableNum})
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
            })        
            .catch(() => {        

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
   
    #great{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    #good{
        width: 100%;
        height: 30%;
        object-fit: cover;
    }
    #best{
        margin:auto;
        margin-top:200px;
        width:100%;
        height: 100%;
        object-fit: cover;
    }
    #nice{
        width: 100%;
        height: 85%;
        object-fit: cover;
    }
    #nice>div>div>.card>img{
        border-radius: 10px 10px 0px 0px;
    }
    
    #nice>div>div>.card{
        border-radius: 10px 10px 6px 6px;
        padding: 0.75rem;
        width: 100%;
        height: 100%;
        /* object-fit: cover; */
    }
    #nice>div>div>.card-img-top {
        width: 100%;
        height: 35%;
        /* object-fit: cover; */
    }
    
        
    

</style>