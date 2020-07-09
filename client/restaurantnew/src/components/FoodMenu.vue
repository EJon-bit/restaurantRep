
<template>    
                
    <b-tabs vertical type="is-boxed">
        <b-tab-item>
            <template slot="header">               
                <font-awesome-icon v-if="windowWidth<700" icon="cookie-bite" size="1x" inverse />
                <span v-if="windowWidth>=700">Appetizers</span>
            </template>
            
            <div class="columns is-multiline is-variable is-2-mobile is-1-tablet is-2-desktop is-2-widescreen" > 
                
                <div class="column is-variable is-one-third-widescreen is-half-desktop is-full-touch is-full-tablet is-full-mobile" v-for="menu in paginatedItems" :key="menu.name">                                    
                   
                    <b-card
                        :img-src="`static/img/${menu.image_url}`"
                        img-alt="Image"
                        img-top
                        tag="article"                       
                        class="box" id="cardOpacity">
                        
                        <p class="title is-4">{{menu.name}}</p>

                        <p id="cost" class="title is-6"> Cost: ${{menu.cost}}</p>
                        
                        <div id="checkBox" class="field">
                            <b-checkbox  type="is-warning" size="is-large" v-model="checkboxGroup" :native-value="checktheBox(menu.name, menu.cost)"></b-checkbox><br/>
                            <p>Check to Add</p>
                        </div>
                        <div class="field" v-if="checkBox(menu.name)">
                            <b-field>
                                <b-numberinput type="is-dark" min="1" v-model="menu.qty" controls-position="compact"></b-numberinput>
                            </b-field>
                        </div>
                        <b-card-text id="cardText">
                            {{menu.description}} <br/>                                            
                        </b-card-text>                                   
                                                                                    
                    </b-card>
                </div>
                <br/>
                <div class="column is-variable is-12-desktop is-12-tablet is-11-mobile">
                    <b-pagination
                        :total="total.appetizers"
                        :current.sync="current.appetizers"
                        :per-page="perPage">
                    </b-pagination>  
                </div>
            </div>  
        </b-tab-item>
        
        <b-tab-item>
            <template slot="header">               
                <font-awesome-icon v-if="windowWidth<700" icon="drumstick-bite" size="1x" inverse />
                <span v-if="windowWidth>=700">Meat Lover</span>
            </template>
            <div class="columns is-multiline is-variable is-2-mobile is-2-tablet is-2-desktop is-2-widescreen">  
                <div class="column is-variable is-one-third-widescreen is-half-desktop is-full-touch is-full-tablet is-full-mobile" v-for="menu in paginatedItems_one" :key="menu.name">
                    <b-card
                        :img-src="`static/img/${menu.image_url}`"
                        img-alt="Image"
                        img-top
                        tag="article"                       
                        class="box">
                        
                        <p class="title is-4">{{menu.name}}</p>
                        
                        <p id="cost" class="title is-6"> Cost: ${{menu.cost}}</p>
                        
                        <div id="checkBox" class="field">
                            <b-checkbox  type="is-warning" size="is-large" v-model="checkboxGroup" :native-value="checktheBox(menu.name, menu.cost)"></b-checkbox><br/>
                            <p>Check to Add</p>
                        </div>
                        <div class="field" v-if="checkBox(menu.name)">
                            <b-field>
                                <b-numberinput type="is-dark" min="1" v-model="menu.qty" controls-position="compact"></b-numberinput>
                            </b-field>
                        </div>
                        <b-card-text id="cardText">
                            {{menu.description}} <br/>                                            
                        </b-card-text>                        
                    </b-card>
                </div>
                <br/>
                <div class="column is-variable is-12-desktop is-12-tablet is-11-mobile">
                    <b-pagination
                        :total="total.meatLovers"
                        :current.sync="current.meatLovers"
                        :per-page="perPage">
                    </b-pagination>  
                </div>
            </div>
        </b-tab-item>
        
        <b-tab-item>
            <template slot="header">               
                <font-awesome-icon v-if="windowWidth<700" icon="seedling" size="1x" inverse />
                <span v-if="windowWidth>=700">Vegetarian</span>
            </template>
            <div class="columns is-multiline is-variable is-2-mobile is-2-tablet is-2-desktop is-2-widescreen">  
                <div class="column is-variable is-one-third-widescreen is-half-desktop is-full-touch is-12-tablet is-12-mobile" v-for="menu in paginatedItems_two" :key="menu.name">
                    <b-card 
                        :img-src="`static/img/${menu.image_url}`"
                        img-alt="Image"
                        img-top
                        tag="article"                       
                        class="box">
                        
                        <p class="title is-4">{{menu.name}}</p>
                        
                        <p id="cost" class="title is-6"> Cost: ${{menu.cost}}</p>
                        
                        <div id="checkBox" class="field">
                            <b-checkbox  type="is-warning" size="is-large" v-model="checkboxGroup" :native-value="checktheBox(menu.name, menu.cost)"></b-checkbox><br/>
                            <p>Check to Add</p>
                        </div>
                        <div class="field" v-if="checkBox(menu.name)">
                            <b-field>
                                <b-numberinput type="is-dark" min="1" v-model="menu.qty" controls-position="compact"></b-numberinput>
                            </b-field>
                        </div>
                        <b-card-text id="cardText">
                            {{menu.description}} <br/>                                            
                        </b-card-text>                     
                    </b-card>
                </div>
                <br/>
                <div class="column is-variable is-12-desktop is-12-tablet is-11-mobile ">
                    <b-pagination
                        :total="total.vegetarian"
                        :current.sync="current.vegetarian"
                        :per-page="perPage">
                    </b-pagination>  
                </div>
            </div>
            
        </b-tab-item>

        <b-tab-item>
            <template slot="header">               
                <font-awesome-icon v-if="windowWidth<700" icon="bread-slice" size="1x" inverse />
                <span v-if="windowWidth>=700">Sides</span>
            </template>
            <div class="columns is-multiline is-variable is-2-mobile is-2-tablet is-2-desktop is-2-widescreen">  
                <div class="column is-variable is-one-third-widescreen is-half-desktop is-full-touch is-12-tablet is-12-mobile" v-for="menu in paginatedItems_three" :key="menu.name">
                    <b-card
                        :img-src="`static/img/${menu.image_url}`"
                        img-alt="Image"
                        img-top
                        tag="article"                       
                        class="box">
                        
                        <p class="title is-4">{{menu.name}}</p>
                        
                        <p id="cost" class="title is-6"> Cost: ${{menu.cost}}</p>
                        
                        <div id="checkBox" class="field">
                            <b-checkbox  type="is-warning" size="is-large" v-model="checkboxGroup" :native-value="checktheBox(menu.name, menu.cost)"></b-checkbox><br/>
                            <p>Check to Add</p>
                        </div>
                        <div class="field" v-if="checkBox(menu.name)">
                            <b-field>
                                <b-numberinput type="is-dark" min="1" v-model="menu.qty" controls-position="compact"></b-numberinput>
                            </b-field>
                        </div>
                        <b-card-text id="cardText">
                            {{menu.description}} <br/>                                            
                        </b-card-text>                         
                    </b-card>
                </div>
                <br/>
                <div class="column is-variable is-12-desktop is-12-tablet is-11-mobile">
                    <b-pagination
                        :total="total.sides"
                        :current.sync="current.sides"
                        :per-page="perPage">
                    </b-pagination>  
                </div>
            </div>
        </b-tab-item>

        <b-tab-item>
            <template slot="header">               
                <font-awesome-icon v-if="windowWidth<700" icon="glass-cheers" size="1x" inverse />
                <span v-if="windowWidth>=700">Bevarages</span>
            </template>
            <div class="columns is-multiline is-variable is-2-mobile is-2-tablet is-2-desktop is-2-widescreen">  
                <div class="column is-variable is-one-third-widescreen is-half-desktop is-full-touch is-12-tablet is-12-mobile" v-for="menu in paginatedItems_four" :key="menu.name">
                    <b-card
                        :img-src="`static/img/${menu.image_url}`"
                        img-alt="Image"
                        img-top
                        tag="article"                       
                        class="box">
                        
                        <p class="title is-4">{{menu.name}}</p>
                        
                        <p id="cost" class="title is-6"> Cost: ${{menu.cost}}</p>
                        
                        <div id="checkBox" class="field">
                            <b-checkbox  type="is-warning" size="is-large" v-model="checkboxGroup" :native-value="checktheBox(menu.name, menu.cost)"></b-checkbox><br/>
                            <p>Check to Add</p>
                        </div>
                        <div class="field" v-if="checkBox(menu.name)">
                            <b-field>
                                <b-numberinput type="is-dark" min="1" v-model="menu.qty" controls-position="compact"></b-numberinput>
                            </b-field>
                        </div>
                        <b-card-text id="cardText">
                            {{menu.description}} <br/>                                            
                        </b-card-text>                          
                    </b-card>
                </div>
                <br/>
                <div class="column is-variable is-12-desktop is-12-tablet is-11-mobile">
                    <b-pagination
                        :total="total.beverages"
                        :current.sync="current.beverages"
                        :per-page="perPage">
                    </b-pagination>  
                </div>
            </div>
        </b-tab-item>

        <b-tab-item>
            <template slot="header">               
                <font-awesome-icon v-if="windowWidth<700" icon="ice-cream" size="1x" inverse />
                <span v-if="windowWidth>=700">Dessert</span>
            </template>
            <div class="columns is-multiline is-variable is-0-mobile is-2-tablet is-2-desktop is-2-widescreen">  
                <div class="column is-variable is-one-third-widescreen is-half-desktop is-full-touch is-12-tablet is-12-mobile" v-for="menu in paginatedItems_five" :key="menu.name">
                    <b-card
                        :img-src="`static/img/${menu.image_url}`"
                        img-alt="Image"
                        img-top
                        tag="article"                        
                        class="box">
                        
                        <p class="title is-4">{{menu.name}}</p>
                        
                        <p id="cost" class="title is-6"> Cost: ${{menu.cost}}</p>
                        
                        <div id="checkBox" class="field">
                            <b-checkbox  type="is-warning" size="is-large" v-model="checkboxGroup" :native-value="checktheBox(menu.name, menu.cost)"></b-checkbox><br/>
                            <p>Check to Add</p>
                        </div>
                        <div class="field" v-if="checkBox(menu.name)">
                            <b-field>
                                <b-numberinput type="is-dark" min="1" v-model="menu.qty" controls-position="compact"></b-numberinput>
                            </b-field>
                        </div>
                        <b-card-text id="cardText">
                            {{menu.description}} <br/>                                            
                        </b-card-text>                           
                    </b-card>
                </div>
                <br/>
                <div class="column is-variable is-12-desktop is-12-tablet is-11-mobile">
                    <b-pagination
                        :total="total.dessert"
                        :current.sync="current.dessert"
                        :per-page="perPage">
                    </b-pagination>  
                </div>
            </div>
        </b-tab-item>
    </b-tabs>
              
</template> 


<script> 
import axios from 'axios';


export default {  
    name: 'Menu',  

    data() {    
        return {
            diplo: "garlicbread.jpg",
            windowWidth:0,
            appetizers:"Appetizers",
            meatLovers:"Meat Lover",
            vegetarian:"Vegetarian",
            sides:"Sides",
            beverages:"Beverages",
            dessert:"Dessert",
            check:[],
            checkless:[],
            checkboxGroup:[],
            menus: [],
            current:{
                "appetizers":1,
                "meatLovers":1,
                "vegetarian":1,
                "sides":1,
                "beverages":1,
                "dessert":1,
            },
            perPage: 3,
            total:{
                "appetizers":1,
                "meatLovers":1,
                "vegetarian":1,
                "sides":1,
                "beverages":1,
                "dessert":1,
            },
            
            
        };
    },
    
   
    created(){ 
        window.addEventListener('resize', this.handleResize);
        this.handleResize();   
        this.fetchMenu(); //fetches menu using axios request

    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    }, 
    watch: {
        //whenever password changes, this function will run
        checkboxGroup(){
         
            this.$emit('changed', this.checkboxGroup)
            
            
        },

        menus:{
            handler(){
                this.checkboxGroup.forEach((checkBox, index, arr)=>{
                    
                    var repeated=arr.filter(item=> item.itemName==checkBox.itemName)                    
                    //console.log(repeated.length)                    
                    var things=this.menus.filter(menu=> menu.name.match(checkBox.itemName))
                   
                    //console.log("Quantity is:", things[0].qty)
                    //console.log(arr)
                    var i=1;                    
                    
                    if(repeated.length<=1 && things[0].qty>repeated.length){
                                                
                        while(i<things[0].qty){                        
                        
                            arr.push(checkBox);
                            this.check.push(checkBox)
                            i++;                            
                        }
                       
                    }
                    else if(repeated.length>1 && things[0].qty>repeated.length){
                        i=repeated.length
                        
                        while(i<things[0].qty){                        
                        
                            arr.push(checkBox);
                            this.check.push(checkBox)
                            i++;                            
                        }
                                      
                    }
                    else if(things[0].qty<repeated.length){
                        arr.pop(checkBox);
                    }
                    this.$emit('changed', arr)
                })        
            },
            deep:true
        }
            
    },         
    methods: { 

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

        checktheBox(obj1, obj2){
            return {itemName:obj1, itemCost:obj2}
        },   
        async fetchMenu() {      
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
        checkBox(object){
            
            if(this.checkboxGroup.length){
                
                var stuff= this.checkboxGroup.filter(checkbox=> checkbox.itemName==object)
                
                if(stuff.length>0){
                    
                    return true
                }
                else{
                    return false
                }
            }
            else{
                return false
            }
            
        } ,          
       
    },
    
    computed:{
        
        
        filteredMenus: function(){
            return this.menus.filter((menu)=>{                        
                return menu.category.match(this.appetizers)
            }).sort((a, b) => (a.cost - b.cost))                   
        },
        filteredMenus_two:function(){
            return this.menus.filter((menu)=>{                        
                return menu.category.match(this.meatLovers)
            }).sort((a, b) => (a.cost - b.cost))                 
        },
        filteredMenus_three:function(){
            return this.menus.filter((menu)=>{                        
                return menu.category.match(this.vegetarian)
            }).sort((a, b) => (a.cost - b.cost))                 
        },
        filteredMenus_four:function(){
            return this.menus.filter((menu)=>{                        
                return menu.category.match(this.sides)
            }).sort((a, b) => (a.cost - b.cost))                 
        },
        filteredMenus_five: function(){
            return this.menus.filter((menu)=>{                        
                return menu.category.match(this.beverages)
            }).sort((a, b) => (a.cost - b.cost))                 
        },
        filteredMenus_six:function(){
            return this.menus.filter((menu)=>{                        
                return menu.category.match(this.dessert)
            }).sort((a, b) => (a.cost - b.cost))                 
        },

        
        
        paginatedItems(){
            let page_number = this.current.appetizers-1
            this.total.appetizers=this.filteredMenus.length
            return this.filteredMenus.slice(page_number * this.perPage, (page_number + 1) * this.perPage); 
                
        },
        paginatedItems_one(){
            let page_number = this.current.meatLovers-1
            this.total.meatLovers=this.filteredMenus_two.length
            return this.filteredMenus_two.slice(page_number * this.perPage, (page_number + 1) * this.perPage); 
                
        },
        paginatedItems_two(){
            let page_number = this.current.vegetarian-1
            this.total.vegetarian=this.filteredMenus_three.length
            return this.filteredMenus_three.slice(page_number * this.perPage, (page_number + 1) * this.perPage); 
                
        },
        paginatedItems_three(){
            let page_number = this.current.sides-1
            this.total.sides=this.filteredMenus_four.length
            return this.filteredMenus_four.slice(page_number * this.perPage, (page_number + 1) * this.perPage); 
                
        },
        paginatedItems_four(){
            let page_number = this.current.beverages-1                
            this.total.beverages=this.filteredMenus_five.length
            return this.filteredMenus_five.slice(page_number * this.perPage, (page_number + 1) * this.perPage); 
                
        },
        paginatedItems_five(){
            let page_number = this.current.dessert-1                
            this.total.dessert=this.filteredMenus_six.length
            return this.filteredMenus_six.slice(page_number * this.perPage, (page_number + 1) * this.perPage);
                
        },  
        

    }   
}            
         
</script> 

<style scoped>
    @import '../css/menu.css';    


</style>