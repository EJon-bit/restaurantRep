
<template>    
    <div :style="backImage">
        <br/>
        <div class="container is-fullscreen">
            <div class="columns is variable is-6-widescreen" style="margin-top:60px">        
                <div class="column is-variable is-three-quarters-widescreen is-two-thirds-tablet">
                    <div class="box" :style="tabStyle">                
                        <b-tabs vertical type="is-boxed">
                            <b-tab-item :label="appetizers">
                                <div class="columns is-multiline is-variable is-2-mobile is-2-tablet is-2-desktop is-2-widescreen" >  
                                    <div class="column is-variable is-one-third-desktop is-half-tablet is-8-mobile is-offset-2-mobile" v-for="menu in paginatedItems" :key="menu.name">                                    
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
                                            :per-page="perPage">
                                        </b-pagination>  
                                    </div>
                                </div>
                            </b-tab-item>
                        </b-tabs>
                    </div>
                </div>
                <div class="column is-variable is-one-quarter-widescreen is-one-third-tablet">
                    <div class="box" :style="myStyle">                  
                    
                        <addreserve :msg="checkboxGroup"></addreserve>
                    </div>
                </div>
            </div> 
        </div>
        <br/> <br/>
    </div>   
                  
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

            checkboxGroup:[],
            menus: [],
            current: 1,
            perPage: 3,

            myStyle:{
                backgroundColor: 'rgba(63,63,63,.95)'
                
            },
            cardStyle:{
                backgroundColor:"#a9d3cd"
            },
            tabStyle:{
                backgroundColor: 'rgba(52,103,96,.89)'
            },
            backImage: { 
                backgroundImage: "url(https://st.depositphotos.com/2158511/4377/v/950/depositphotos_43771103-stock-illustration-raw-food-seamless-background.jpg)" 
            }


        };
    },
   
        mounted() {    
            this.fetchMenu(); //fetches menu using axios request
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

        }   
}            
         
</script> 

<style scoped>
.card{
    width: 100%;
    height: 43vw;
    object-fit: cover;
}
.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}

#boxOpacity{

    opacity: 0.89;

}
#cardOpacity{

    opacity: 1;

}

</style>