<template>
 <div>   
    <div class="container is-fullscreen">        
        <br/> 
        <div id="spacing">
            <div class="box"> 
                <p class="title is-4">Edit Menu</p>             
            </div>
        </div>
        <br/>
            <b-table 
                class="box"
                :data="menus"
                :columns="columns"  
                :checked-rows.sync="checkedRows"                   
                checkable
                :checkbox-position="checkboxPosition">
                
                
                <template slot="bottom-left">
                    <b>Total checked</b>: {{ checkedRows.length }}
                </template>
                   
            </b-table>       
        <div id="editMenu" class="box">    
            <button class="button field is-danger" @click="deleteItems=true" >
                <b-icon icon="delete"></b-icon>
                <span>Delete</span>
            </button>
            <b-modal :active.sync="deleteItems"
                has-modal-card
                trap-focus
                aria-role="dialog"
                aria-modal>
                <delete-menu :dataDelete="checkedRows"></delete-menu>
            </b-modal>


            <button class="button field is-link" @click="isComponentModTwoActive = true">
                <b-icon icon="pencil"></b-icon>
                <span>Update</span>
            </button> 
            <b-modal :active.sync="isComponentModTwoActive"
                has-modal-card
                trap-focus
                aria-role="dialog"
                aria-modal>
                <update-menu-form :formData="checkedRows"></update-menu-form>
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
    <br/><br/>
 </div>
</template>

<script>
import axios from 'axios';

var AddMenuForm = {
   

    data() {        

        return {
            name: "",
            category:"", 
            description:"",           
            cost:'',                
            image_url:"",
        }
    },

    methods: {    
        submit() {
            return axios({
                method: 'post',          
                data: {            
                    name: this.name,            
                    category: this.category,                               
                    cost:this.cost,
                    description:this.description,
                    image_url:this.image_url  
                },          
                url: 'http://192.168.1.178:5000/menu/editmenu/add'          
            // headers: {            
            //     'Content-Type': 'application/json',          
            // },        
            })          
            .then(() => { 
                
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
   

    template: 
    `   <form method="post">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Add Menu Item</p>
                </header>
                <section class="modal-card-body">
                    <b-field custom-class="is-small has-text-warning" label="Name of Item">
                        <b-input                            
                            v-model="name"                             
                            required>
                        </b-input>
                    </b-field>

                    <b-field custom-class="is-small has-text-warning" label="Category">
                        <b-input                            
                            v-model="category"                            
                            required>
                        </b-input>
                    </b-field>
                    <b-field custom-class="is-small has-text-warning" label="Description">
                        <b-input
                            type="textarea"
                            v-model="description"                           
                            required>
                        </b-input>
                    </b-field>
                    <b-field custom-class="is-small has-text-warning" label="Cost">
                        <b-input
                            v-model="cost"                           
                            required>
                        </b-input>
                    </b-field>
                    <b-field custom-class="is-small has-text-warning" label="Image URL">
                        <b-input
                            type="textarea"
                            v-model="image_url"                          
                            required>
                        </b-input>
                    </b-field>
                    
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>
                    <button class="button is-primary" @click="submit">Add Item</button>
                </footer>
            </div>
        </form>
    `,      
        
}
var UpdateMenuForm = {
    //props: ['name','category','description', 'cost','image_url'],

    props:{
            formData: {
                type: Array,
                required: true
            }
    }, 
    
    
    methods: {    
        update() {
            return axios({
                method: 'put',          
                data: {            
                    name: this.formData[0].name,            
                    category: this.formData[0].category,                               
                    cost:this.formData[0].cost,
                    description:this.formData[0].description,
                    image_url:this.formData[0].image_url  
                },          
                url: `http://192.168.1.178:5000/menu/editmenu/update/${this.formData[0]._id}`          
                
            })          
            .then(() => { 
                
                this.$swal(            
                    'Great!',            
                    'Menu Item was successfully updated!',            
                    'success',          
                );               
                        
                        
            })
            .catch(() => {

                this.$swal(            
                    'Sorry! Menu Item could not be Updated.',
                    'Try Again'           
                           
                ); 
            });      
        },    
   
    },
   

    template: 
    `   <form method="put">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Update Menu Item</p>
                </header>
                <section class="modal-card-body">
                    <b-field custom-class="is-small has-text-warning" label="Name of Item">
                        <b-input                            
                            v-model="formData[0].name" 
                                                       
                            required>
                        </b-input>
                    </b-field>

                    <b-field custom-class="is-small has-text-warning" label="Category">
                        <b-input                            
                            v-model="formData[0].category"                            
                            required>
                        </b-input>
                    </b-field>
                    <b-field custom-class="is-small has-text-warning" label="Description">
                        <b-input
                            type="textarea"
                            v-model="formData[0].description"                            
                            required>
                        </b-input>
                    </b-field>
                    <b-field custom-class="is-small has-text-warning" label="Cost">
                        <b-input                           
                            v-model="formData[0].cost"                            
                            required>
                        </b-input>
                    </b-field>
                    <b-field custom-class="is-small has-text-warning" label="Image URL">
                        <b-input
                            type="textarea"
                            v-model="formData[0].image_url"                            
                            required>
                        </b-input>
                    </b-field>
                    
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>
                    <button class="button is-primary" type="button" @click="update">Update Item</button>
                </footer>
            </div>
        </form>
    `
    
}

var DeleteMenu = {
   
    props:{
            dataDelete: {
                type: Array,
                required: true
            }
    }, 
    
    
    methods: {    
        removeItems() {
            axios({
                method: 'delete',          
                data: {            
                    itemsforDelete: this.dataDelete
                },          
                url: `http://192.168.1.178:5000/menu/deleteItems`          
                
            })          
            .then(() => { 
                
                this.$swal(            
                    'Great!',            
                    'Menu Item(s) was successfully Deleted!',            
                    'success',          
                );               
                        
                //this.$refs.form.reset();          
            })
            .catch(() => {

                this.$swal(            
                    'Sorry!', 
                    'Menu Item(s) could not be Deleted.',
                    'Try Again'           
                           
                ); 
            });      
        },    
   
    },
   

    template: 
    `    <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Deleting Menu Item(s)</p>
            </header>
            <section class="modal-card-body">
                <p> Are you sure you want to delete these?</p>                    
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Cancel</button>
                <button class="button is-primary" type="button" @click="removeItems">Yes</button>
            </footer>
        </div>
        
    `
    
}

export default {
    name: 'EditMenu',
    components: {
            AddMenuForm,
            UpdateMenuForm,
            DeleteMenu,
    },

    data() {        

        return {
            isComponentModalActive: false,
            isComponentModTwoActive:false,
            deleteItems:false,
            
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
                url: 'http://192.168.1.178:5000/menu',      
            })        
            .then((response) => {          
                this.menus = response.data.menus;        
            })        
            .catch(() => {})
    },  
   
   
    
}

</script>

<style scoped>
    @import '../css/editMenu.css';
</style>
