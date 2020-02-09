<template>
 <div :style="backImage">   
    <div class="container is-fluid">       
        <br/> 
        <div class="box" :style="myStyle"> 
            <p class="title is-4" style="font-family:Gabriola;font-weight:bold; color:gold; font-size:35px;">Edit Menu</p>             
        </div>
            <b-table 
                class="box"
                :data="menus"
                :columns="columns"                    
                checkable
                :checkbox-position="checkboxPosition" :style="cardStyle">
                
                
                <template slot="bottom-left">
                    <b>Total checked</b>: {{ checkedRows.length }}
                </template>
                   
            </b-table>       
        <div class="box" :style="myStyle">    
            <button class="button field is-danger" >
                <b-icon icon="delete"></b-icon>
                <span>Delete</span>
            </button>

            <button class="button field is-link">
                <b-icon icon="pencil"></b-icon>
                <span>Update</span>
            </button> 

            <button class="button field is-dark">                    
                <b-icon icon="plus"></b-icon>
                <span>Add</span>
            </button>         
        </div>
    </div>
 </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'EditMenu',

    data() {
        

        return {

             myStyle:{
                backgroundColor: 'rgba(63,63,63,.95)'
                
            },
            cardStyle:{
                backgroundColor:"#a9d3cd"
            },

            backImage: { 
                backgroundImage: "url(https://st.depositphotos.com/2158511/4377/v/950/depositphotos_43771103-stock-illustration-raw-food-seamless-background.jpg)" 
            },

            menus:[],

            checkboxPosition: 'left',
            checkedRows: [],
            columns: [
                
                {
                    field: 'name',
                    label: 'Menu Item',
                    searchable: true,
                },
                {
                    field: 'category',
                    label: 'Food Category',
                    searchable: true,
                },
                {
                    field: 'cost',
                    label: 'Item Price',
                    searchable: true,
                }
                
                
            ]
        }
    },
    created: function () {
        axios({        
                method: 'get',
                url: 'http://localhost:5000/menu',      
            })        
            .then((response) => {          
                this.menus = response.data.menus;        
            })        
            .catch(() => {})
    }
    
    // mounted() {    
    //         this.fetchMenu(); //fetches menu using axios request 
    // },  

    // methods: {    
    //     async fetchMenu() {      
    //         return axios({        
    //             method: 'get',
    //             url: 'http://localhost:5000/menu',      
    //         })        
    //         .then((response) => {          
    //             this.menus = response.data.menus;        
    //         })        
    //         .catch(() => {        

    //         });    
    //     },  
    // },
   
}
</script>

<style scoped>

</style>
