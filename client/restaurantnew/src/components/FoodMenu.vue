
<template>    
                
    <b-tabs vertical type="is-boxed">
        <b-tab-item :label="appetizers">
            <div class="columns is-multiline is-variable is-2-mobile is-1-tablet is-2-desktop is-2-widescreen" >  
                <div class="column is-variable is-one-third-desktop is-two-fifths-tablet is-12-mobile" v-for="menu in paginatedItems" :key="menu.name">                                    
                    <b-card
                        :img-src="menu.image_url"
                        img-alt="Image"
                        img-top
                        tag="article"
                        :style="cardStyle"
                        class="box" id="cardOpacity">
                        
                        <p class="title is-4">{{menu.name}}</p>

                        <p class="title is-6" style="margin-bottom: 25px; margin-top:25px"> Cost: ${{menu.cost}}</p>
                        
                        <div class="field" style="margin-bottom: 30px">
                            <b-checkbox  type="is-warning" size="is-large" v-model="checkboxGroup" :native-value="menu.name"></b-checkbox><br/>
                            <p style="font-weight:bold">Check to Add</p>
                        </div>
                        <div class="field" v-if="checkBox(menu.name)">
                            <b-field>
                                <b-numberinput type="is-dark" min="1" v-model="menu.qty" controls-position="compact"></b-numberinput>
                            </b-field>
                        </div>
                        <b-card-text style="margin-top: 10px">
                            {{menu.description}} <br/>                                            
                        </b-card-text>                                   
                                                                                    
                    </b-card>
                </div>
                <br/>
                <div class="column is-variable is-12-desktop is-11-mobile">
                    <b-pagination
                        :total="total.appetizers"
                        :current.sync="current.appetizers"
                        :per-page="perPage">
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
                            <b-checkbox type="is-warning" size="is-large" v-model="checkboxGroup" :native-value="menu.name"></b-checkbox><br/>
                            <p style="font-weight:bold">Check to Add</p>
                        </div>
                        <div class="field" v-if="checkBox(menu.name)">
                            <b-field>
                                <b-numberinput type="is-dark" min="1" v-model="menu.qty" controls-position="compact"></b-numberinput>
                            </b-field>
                        </div>
                        <b-card-text style="margin-top: 10px">
                            {{menu.description}} <br/>                                            
                        </b-card-text>                        
                    </b-card>
                </div>
                <br/>
                <div class="column is-variable is-12-desktop is-11-mobile">
                    <b-pagination
                        :total="total.meatLovers"
                        :current.sync="current.meatLovers"
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
                            <b-checkbox type="is-warning" size="is-large" v-model="checkboxGroup" :native-value="menu.name"></b-checkbox><br/>
                            <p style="font-weight:bold">Check to Add</p>
                        </div>
                        <div class="field" v-if="checkBox(menu.name)">
                            <b-field>
                                <b-numberinput type="is-dark" min="1" v-model="menu.qty" controls-position="compact"></b-numberinput>
                            </b-field>
                        </div>
                        <b-card-text style="margin-top: 10px">
                            {{menu.description}} <br/>                                            
                        </b-card-text>                     
                    </b-card>
                </div>
                <br/>
                <div class="column is-variable is-12-desktop is-11-mobile">
                    <b-pagination
                        :total="total.vegetarian"
                        :current.sync="current.vegetarian"
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
                            <b-checkbox type="is-warning" size="is-large" v-model="checkboxGroup" :native-value="menu.name"></b-checkbox><br/>
                            <p style="font-weight:bold">Check to Add</p>
                        </div>
                        <div class="field" v-if="checkBox(menu.name)">
                            <b-field>
                                <b-numberinput type="is-dark" min="1" v-model="menu.qty" controls-position="compact"></b-numberinput>
                            </b-field>
                        </div>
                        <b-card-text style="margin-top: 10px">
                            {{menu.description}} <br/>                                            
                        </b-card-text>                         
                    </b-card>
                </div>
                <br/>
                <div class="column is-variable is-12-desktop is-11-mobile">
                    <b-pagination
                        :total="total.sides"
                        :current.sync="current.sides"
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
                            <b-checkbox type="is-warning" size="is-large" v-model="checkboxGroup" :native-value="menu.name"></b-checkbox><br/>
                            <p style="font-weight:bold">Check to Add</p>
                        </div>
                        <div class="field" v-if="checkBox(menu.name)">
                            <b-field>
                                <b-numberinput type="is-dark" min="1" v-model="menu.qty" controls-position="compact"></b-numberinput>
                            </b-field>
                        </div>
                        <b-card-text style="margin-top: 10px">
                            {{menu.description}} <br/>                                            
                        </b-card-text>                          
                    </b-card>
                </div>
                <br/>
                <div class="column is-variable is-12-desktop is-11-mobile">
                    <b-pagination
                        :total="total.beverages"
                        :current.sync="current.beverages"
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
                            <b-checkbox type="is-warning" size="is-large" v-model="checkboxGroup" :native-value="menu.name"></b-checkbox><br/>
                            <p style="font-weight:bold">Check to Add</p>
                        </div>
                        <div class="field" v-if="checkBox(menu.name)">
                            <b-field>
                                <b-numberinput type="is-dark" min="1" v-model="menu.qty" controls-position="compact"></b-numberinput>
                            </b-field>
                        </div>
                        <b-card-text style="margin-top: 10px">
                            {{menu.description}} <br/>                                            
                        </b-card-text>                           
                    </b-card>
                </div>
                <br/>
                <div class="column is-variable is-12-desktop is-11-mobile">
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
import AddReserve from'./AddReserve';

export default {  
    name: 'Menu',  

    components:{
        'addreserve':AddReserve
    },
    data() {    
        return {
            
            appetizers:"Appetizers",
            meatLovers:"Meat Lover",
            vegetarian:"Vegetarian",
            sides:"Sides",
            beverages:"Beverages",
            dessert:"Dessert",
            check:[],
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
            cardStyle:{
                backgroundColor:"#a9d3cd"
            },
            
        };
    },
    
   
    created() {    
        this.fetchMenu(); //fetches menu using axios request
    }, 
    watch: {
        // whenever password changes, this function will run
        checkboxGroup: function(newcheckboxGroup){
            this.$emit('changed', this.checkboxGroup)
            if(this.checkboxGroup.length<this.check.length){
                
            }
            else{
                this.check=this.checkboxGroup;
            }
            
        },

        menus:{
            handler(){
                this.checkboxGroup.forEach((checkBox, index, arr)=>{
                    
                    var repeated=arr.filter(item=> item==checkBox)                    
                    console.log(repeated.length)                    
                    var things=this.menus.filter(menu=> menu.name.match(checkBox))
                   
                    console.log("Quantity is:", things[0].qty)
                    console.log(arr)
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
                    this.$emit('changed', arr)
                })        
            },
            deep:true
        }
            
    },         
    methods: {    
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
        checkBox: function(object) {
            
            if(this.checkboxGroup.length){
                
                var stuff= this.checkboxGroup.filter(checkbox=> checkbox==object)
                
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
            
        }      
    },
    
    computed:{
        
        
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

        
        
        paginatedItems() {
            let page_number = this.current.appetizers-1
            this.total.appetizers=this.filteredMenus.length
            return this.filteredMenus.slice(page_number * this.perPage, (page_number + 1) * this.perPage); 
                
        },
        paginatedItems_one() {
            let page_number = this.current.meatLovers-1
            this.total.meatLovers=this.filteredMenus_two.length
            return this.filteredMenus_two.slice(page_number * this.perPage, (page_number + 1) * this.perPage); 
                
        },
        paginatedItems_two() {
            let page_number = this.current.vegetarian-1
            this.total.vegetarian=this.filteredMenus_three.length
            return this.filteredMenus_three.slice(page_number * this.perPage, (page_number + 1) * this.perPage); 
                
        },
        paginatedItems_three() {
            let page_number = this.current.sides-1
            this.total.sides=this.filteredMenus_four.length
            return this.filteredMenus_four.slice(page_number * this.perPage, (page_number + 1) * this.perPage); 
                
        },
        paginatedItems_four() {
            let page_number = this.current.beverages-1                
            this.total.beverages=this.filteredMenus_five.length
            return this.filteredMenus_five.slice(page_number * this.perPage, (page_number + 1) * this.perPage); 
                
        },
        paginatedItems_five() {
            let page_number = this.current.dessert-1                
            this.total.dessert=this.filteredMenus_six.length
            return this.filteredMenus_six.slice(page_number * this.perPage, (page_number + 1) * this.perPage);
                
        },  
        

    }   
}            
         
</script> 

<style scoped>
    .card>img{
        border-radius: 10px 10px 0px 0px;
        
    }
    .card.box{
        border-radius: 10px 10px 6px 6px;
        padding: 0.75rem;
    }
    .card{
        width: 100%;
        height: 100%;
        /* object-fit: cover; */
    }
    .card-img-top {
        width: 100%;
        height: 36%;
        object-fit: cover;
    }

    #boxOpacity{

        opacity: 0.89;

    }
    #cardOpacity{

        opacity: 1;

    }

</style>