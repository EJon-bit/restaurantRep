import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export var store= new Vuex.Store({
    state:{        
        waiterCall:false,
        checkWait:false
    },

    mutations:{
        kitchenSend: state=>{
            state.waiterCall=true  
            state.checkWait=true          
        },
    },

    actions:{
        kitchenSend:context=>{
            setTimeout(function(){
                context.commit('kitchenSend')
            },1000)
        }
    }
})