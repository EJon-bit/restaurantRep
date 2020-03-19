<template>
    
    <b-notification v-if="callWait" type="is-info" aria-close-label="Close notification">
        Calling Waiter to table
    </b-notification>
     
</template>

<script>

export default {
    name: 'Message',  

    data:{
        messages:'',
        
    },

     computed:{
        callWait(){
            return this.$store.state.waiterCall
        },

        

        
    }

    // methods:{
    
}
</script>

