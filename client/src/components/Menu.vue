<template>  
    <div class="container">
    
        <b-card no-body>
            <b-tabs card vertical justified type="is-boxed">
                <b-tab-item label="Meat Lovers" v-for="menu in menus" :key="menu._id">
                    <b-card
                        :title="menus.name"
                        :img-src="menus.image_url"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                    
                        <b-card-text>
                            {{ menus.description }}
                        </b-card-text>

                        <b-button href="#" variant="primary"> Add to Order </b-button>
                    </b-card>                    
                </b-tab-item>

                <b-tab-item label="Vegetarians" v-for="menu in Menus" :key="menu._id">
                    <b-card
                        :title="menus.name"
                        :img-src="menus.image_url"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                    
                        <b-card-text>
                            {{ menus.description }}
                        </b-card-text>

                        <b-button href="#" variant="primary"> Add to Order </b-button>
                    </b-card>                    
                </b-tab-item>

                <b-tab-item label="Sides" v-for="menu in Menus" :key="menu._id">
                    <b-card
                        :title="menus.name"
                        :img-src="menus.image_url"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                    
                        <b-card-text>
                            {{ menus.description }}
                        </b-card-text>

                        <b-button href="#" variant="primary"> Add to Order </b-button>
                    </b-card>                    
                </b-tab-item>

                <b-tab-item label="Appetizers" v-for="menu in Menus" :key="menu._id">
                    <b-card
                        :title="menus.name"
                        :img-src="menus.image_url"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                    
                        <b-card-text>
                            {{ menus.description }}
                        </b-card-text>

                        <b-button href="#" variant="primary"> Add to Order </b-button>
                    </b-card>                    
                </b-tab-item>

                <b-tab-item label="Dessert" v-for="menu in Menus" :key="menu._id">
                    <b-card
                        :title="menus.name"
                        :img-src="menus.image_url"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                    
                        <b-card-text>
                            {{ Menu.description }}
                        </b-card-text>

                        <b-button href="#" variant="primary"> Add to Order </b-button>
                    </b-card>                    
                </b-tab-item>

                
            </b-tabs>       
        
        </b-card>

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