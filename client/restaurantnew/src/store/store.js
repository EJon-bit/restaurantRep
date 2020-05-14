import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export var store= new Vuex.Store({
    state:{        
        
        password:'',       
        derived:null,        
    },

    mutations:{
        
        pass: (state, payload)=>{
            
            state.password= payload;
                   
        },
        
        isDerived:(state, payload)=>{
            state.derived=payload;
        }

    },

    // actions:{
        
    // }
})