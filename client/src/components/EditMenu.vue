<template>
    
    <div class="container">       
        <br/> 
        <p class="title is-4">Edit Menu</p>             
        
            <b-table
                class="box"
                :data="menus"
                :columns="columns"                    
                checkable
                :checkbox-position="checkboxPosition">
                
                
                <template slot="bottom-left">
                    <b>Total checked</b>: {{ checkedRows.length }}
                </template>
                   
            </b-table>       
            
        <button class="button field is-danger" @click="checkedRows = []">
            <b-icon icon="delete"></b-icon>
            <span>Delete</span>
        </button>

        <button class="button field is-link" @click="checkedRows = []">
            <b-icon icon="pencil"></b-icon>
            <span>Update</span>
        </button> 

        <button class="button field is-dark" @click="add" :disabled="!valid">                    
            <b-icon icon="plus"></b-icon>
            <span>Add</span>
        </button>         

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'EditMenu',

    data() {
        

        return {

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
    mounted() {    
            this.fetchMenu(); //fetches menu using axios request 
    },  

    methods: {    
        async fetchMenu() {      
            return axios({        
                method: 'get',
                url: 'http://localhost:5000/menu',      
            })        
            .then((response) => {          
                this.menus = response.data.menus;        
            })        
            .catch(() => {        

            });    
        },  
    },
   
}
</script>

<style scoped>

</style>
