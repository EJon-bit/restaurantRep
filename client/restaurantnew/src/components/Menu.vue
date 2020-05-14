
<template>    
    <div >
        <br/>
        <div class="container is-fullscreen">
            <div class="columns is-variable is-6-widescreen" style="margin-left:5px;margin-right:5px;margin-top:60px">        
                <div class="column is-variable is-three-quarters-widescreen is-two-thirds-tablet is-12-mobile">
                    <div id="boxPad" class="box" :style="tabStyle">                
                        <foodmenu @changed="onChange"></foodmenu>
                    </div>
                </div>
                <div class="column is-variable is-one-quarter-widescreen is-one-third-tablet is-12-mobile">
                    <div class="box" :style="myStyle">                 
                    
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
                       

            myStyle:{
                backgroundColor: 'rgba(63,63,63,.95)'
                
            },
            
            tabStyle:{
                backgroundColor: 'rgba(52,103,96,.89)'
            },
            


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
@media screen and (max-width: 768px), print {
    #boxPad{
        padding:20px 10px 10px 10px ;
    }
}

#app{
    background-size: 150% 100%;
}
   
    
</style>