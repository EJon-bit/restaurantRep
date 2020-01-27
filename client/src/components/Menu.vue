<template>  
    <div class="container">    
        
        <b-tabs card vertical justified type="is-boxed">
            <b-tab-item label="Meat Lovers" v-for="menu in menus" :key="menu._id">
                <b-card
                    :title="menu.name"
                    :img-src="menu.image_url"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2">
                
                    <b-card-text>
                        {{ menu.description }}
                    </b-card-text>

                    <b-button href="#" variant="primary"> Add to Order </b-button>
                </b-card>                    
            </b-tab-item>

            <b-tab-item label="Vegetarians" v-for="menu in menus" :key="menu._id">
                <b-card
                    :title="menu.name"
                    :img-src="menu.image_url"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2">
                
                    <b-card-text>
                        {{ menu.description }}
                    </b-card-text>

                    <b-button href="#" variant="primary"> Add to Order </b-button>
                </b-card>                    
            </b-tab-item>

            <b-tab-item label="Sides" v-for="menu in menus" :key="menu._id">
                <b-card
                    :title="menu.name"
                    :img-src="menu.image_url"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2">
                
                    <b-card-text>
                        {{ menu.description }}
                    </b-card-text>

                    <b-button href="#" variant="primary"> Add to Order </b-button>
                </b-card>                    
            </b-tab-item>

            <b-tab-item label="Appetizers" v-for="menu in menus" :key="menu._id"> <!--:key provides unique bindings for each element in menus collection-->
                <b-card
                    :title="menu.name"
                    :img-src="menu.image_url"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2">
                
                    <b-card-text>
                        {{ menu.description }}
                    </b-card-text>

                    <b-button href="#" variant="primary"> Add to Order </b-button>
                </b-card>                    
            </b-tab-item>

            <b-tab-item label="Dessert" v-for="menu in menus" :key="menu._id">
                <b-card
                    :title="menu.name"
                    :img-src="menu.image_url"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2">
                
                    <b-card-text>
                        {{ menu.description }}
                    </b-card-text>

                    <b-button href="#" variant="primary"> Add to Order </b-button>
                </b-card>                    
            </b-tab-item>

            
        </b-tabs>       

    </div>
</template> 


<script> 
import axios from 'axios';

export default {  
    name: 'Menu',  
    
    data() {    
        return {      
            menus: [],    
            };  
        },  
        mounted() {    
            this.fetchMenu(); //fetches menu using axios request 
        },  
        methods: {    
            async fetchMenu() {      
                return axios({        
                    method: 'get',
                    url: 'http://localhost:8081/Menu',      
                })        
                .then((response) => {          
                    this.menus = response.data.menus;        
                })        
                .catch(() => {        

                });    
            },  
        }, 
}; 
</script> 