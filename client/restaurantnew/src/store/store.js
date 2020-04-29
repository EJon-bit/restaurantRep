import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export var store= new Vuex.Store({
    state:{        
        waiterCall:false,
        checkWait:false,
        password:'',
    },

    mutations:{
        kitchenSend: state=>{
            state.waiterCall=true
            state.checkWait=true         
        },
        pass: (state, payload)=>{
            
            state.password= payload;
                   
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