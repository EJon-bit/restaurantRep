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
                :checked-rows.sync="checkedRows"                   
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

            <button class="button field is-link" @click="isComponentModTwoActive = true">
                <b-icon icon="pencil"></b-icon>
                <span>Update</span>
            </button> 
            <b-modal :active.sync="isComponentModTwoActive"
                has-modal-card
                trap-focus
                aria-role="dialog"
                aria-modal>
                <update-menu-form></update-menu-form>
            </b-modal>

            <button class="button field is-warning" @click="isComponentModalActive = true">                    
                <b-icon icon="plus"></b-icon>
                <span>Add</span>
            </button>       
            <b-modal :active.sync="isComponentModalActive"
                has-modal-card
                trap-focus
                aria-role="dialog"
                aria-modal>
                <add-menu-form></add-menu-form>
            </b-modal>  
        </div>
    </div>
 </div>
</template>

<script>
import axios from 'axios';

var AddMenuForm = {
    props: ['name','category','description', 'cost','image_url'],

    template: 
    `   <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Add Menu Item</p>
                </header>
                <section class="modal-card-body">
                    <b-field label="Name of Item">
                        <b-input                            
                            :v-model="name"                            
                            required>
                        </b-input>
                    </b-field>

                    <b-field label="Category">
                        <b-input                            
                            :v-model="category"                            
                            required>
                        </b-input>
                    </b-field>
                    <b-field label="Description">
                        <b-input
                            type="textarea"
                            :v-model="description"                            
                            required>
                        </b-input>
                    </b-field>
                    <b-field label="Cost">
                        <b-input
                            :v-model="cost"                            
                            required>
                        </b-input>
                    </b-field>
                    <b-field label="Image URL">
                        <b-input
                            type="textarea"
                            :v-model="image_url"                            
                            required>
                        </b-input>
                    </b-field>
                    
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>
                    <button class="button is-primary">Add Item</button>
                </footer>
            </div>
        </form>
    `
}
var UpdateMenuForm = {
    props: ['name','category','description', 'cost','image_url'],

    template: 
    `   <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Update Menu Item</p>
                </header>
                <section class="modal-card-body">
                    <b-field label="Name of Item">
                        <b-input                            
                            :v-model="name"                            
                            required>
                        </b-input>
                    </b-field>

                    <b-field label="Category">
                        <b-input                            
                            :v-model="category"                            
                            required>
                        </b-input>
                    </b-field>
                    <b-field label="Description">
                        <b-input
                            type="textarea"
                            :v-model="description"                            
                            required>
                        </b-input>
                    </b-field>
                    <b-field label="Cost">
                        <b-input
                            :v-model="cost"                            
                            required>
                        </b-input>
                    </b-field>
                    <b-field label="Image URL">
                        <b-input
                            type="textarea"
                            :v-model="image_url"                            
                            required>
                        </b-input>
                    </b-field>
                    
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>
                    <button class="button is-primary">Add Item</button>
                </footer>
            </div>
        </form>
    `
}

export default {
    name: 'EditMenu',
    components: {
            AddMenuForm,
            UpdateMenuForm
    },

    data() {
        

        return {
            isComponentModalActive: false,
            isComponentModTwoActive:false,

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
    },
    
    // mounted() {    
    //         this.fetchMenu(); //fetches menu using axios request 
    // },  

    methods: {    
        submit() {
            return axios({
                method: 'post',          
                data: {            
                    name: this.name,            
                    category: this.category,                               
                    cost:this.cost,
                    description:this.description,
                    imageUrl:this.image_url  
                },          
                url: 'http://localhost:5000/editmenu/add'          
            // headers: {            
            //     'Content-Type': 'application/json',          
            // },        
            })          
            .then(() => { 
                $parent.close();  

                this.$swal(            
                    'Great!',            
                    'Menu Item was successfully added!',            
                    'success',          
                );            
                        
                //this.$refs.form.reset();          
            })
            .catch(() => {

                this.$swal(            
                    'Sorry! Menu Item could not be Added.',
                    'Try Again'           
                           
                ); 
            });      
        },
    
   
    },
}

</script>

<style scoped>

</style>
