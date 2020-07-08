
<template>    
    <div >
        <br/>
        <div class="container is-fullscreen">
            <div id="menuContainer" class="columns is-variable is-6-widescreen">        
                <div class="column is-variable is-three-quarters-widescreen is-two-thirds-tablet is-12-mobile">
                    <div id="boxPad" class="box">                
                        <foodmenu @changed="onChange"></foodmenu>
                    </div>
                </div>
                <div class="column is-variable is-one-quarter-widescreen is-one-third-tablet is-12-mobile">
                    <div id="reserveBox" class="box">                 
                    
                        <addreserve :cost="checkCosts" :msg="checkItem"></addreserve>
                    </div>
                </div>
            </div> 
        </div>
        
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
            
            
            checkItem:[],
            checkCosts:0,
           
            
        };
    },
    methods: {
        onChange(value){
            this.checkCosts=0;
            this.checkItem=[];
            value.forEach((element, index, arr) => {
                this.checkItem[index]=element.itemName;
                
                this.checkCosts+=element.itemCost;
            });
            
        }
    },
}  
    
         
</script> 

<style scoped>
    @import '../css/menuTwo.css';    
</style>