
<template>    
    <div :style="backImage">
        <br/>
        <div class="container is-fullscreen">
            <div class="columns is-variable is-6-widescreen" style="margin-left:5px;margin-right:5px;margin-top:60px">        
                <div class="column is-variable is-three-quarters-widescreen is-two-thirds-tablet is-12-mobile">
                    <div class="box" :style="tabStyle">                
                        <foodmenu @changed="onChange"></foodmenu>
                    </div>
                </div>
                <div class="column is-variable is-one-quarter-widescreen is-one-third-tablet is-12-mobile">
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
import FoodMenu from './FoodMenu.vue';

export default {  
    name: 'Menu',  

    components:{
        'addreserve':AddReserve,
        'foodmenu':FoodMenu
    },
    data() {    
        return {
            
            
            checkboxGroup:[],
                       

            myStyle:{
                backgroundColor: 'rgba(63,63,63,.95)'
                
            },
            
            tabStyle:{
                backgroundColor: 'rgba(52,103,96,.89)'
            },
            backImage: { 
                backgroundImage: "url(https://i.imgur.com/ZOcLM7h.jpg)"
            }


        };
    },
    methods: {
        onChange(value){
            this.checkboxGroup=value;
        }
    },
}  
    
         
</script> 

<style scoped>
    
    #boxOpacity{

        opacity: 0.89;

    }
    
</style>