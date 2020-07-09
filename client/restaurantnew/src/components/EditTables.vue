
<template>
    <div>
        <div class="container is-fullscreen" >       
            <br/> 
            <div id="heading" class="box"> 
                <p class="title is-4">Available Tables</p>             
            </div>
            <br/>          
            
            <b-table
                class="box"
                :data="tables" 
                :columns="columns"
                :checked-rows.sync="checkedRows"  
                checkable
                :checkbox-position="checkboxPosition">                      
            </b-table>     
            <div id="editTables" class="box">    
                
                <button class="button field is-warning" @click="isComponentModalActive = true">                    
                    <b-icon icon="plus"></b-icon>
                    <span>Add Table</span>
                </button>       
                <b-modal :active.sync="isComponentModalActive"
                    has-modal-card
                    trap-focus
                    aria-role="dialog"
                    aria-modal>
                    <modal-form></modal-form>
                </b-modal>  
            </div>
        </div>
        <br/><br/>  
    </div>
</template>

<script>
import axios from 'axios';

var ModalForm = {
    
    data(){
        return{
            tableNum:'',
            seatNum:''
        }
    },

    methods: {                         
        addTable() {      
            axios({        
                method: 'post',
                data: {            
                        tableNum: this.tableNum,            
                        seatNum: this.seatNum, 
                                
                },          
                url: 'http://localhost:5000/table/addTable',       
            })        
            .then((response) => {          
                

                this.$swal(            
                    'Great!',            
                    'Reservation was successfully added!',            
                    'success',          
                );            
                           
                             
            })
            .catch(() => {
                this.$swal(            
                    'Sorry!',
                    'Table could not be be Added',                        
                    'error',          
                ); 
            });      
        }
    },

    template: 
    `   <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Make Reservation</p>
                </header>
                <section class="modal-card-body">
                    <b-field 
                        custom-class="has-text-warning"                        
                        name="tableNo"                         
                        label="Name">
                    
                        <b-input v-model="tableNum" required></b-input>
                
                    </b-field>
                    <br/>
                    
                    <b-field 
                        custom-class="has-text-warning"                         
                        name="seatNo"                         
                        label="No. of Seats">
                            
                        <b-input v-model="seatNum" required></b-input>
                        
                    </b-field><br/>
                    
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>
                    <button class="button is-primary" @click="addTable">Add Table</button>
                </footer>
            </div>
        </form>
    `
}

export default {
    name: 'EditTables',

    components: {
            ModalForm
    },

    data() {
        
        return {
            isComponentModalActive: false,
            
            cardStyle:{
                backgroundColor:"#a9d3cd"
            },

            tables:[],
            checkboxPosition: 'left',
            checkedRows: [],
            columns: [
                
                {
                    field: 'tableNum',
                    label: 'Table No.',
                    //searchable: true,
                },
                {
                    field: 'seatNum',
                    label: 'No. Seats',
                    //searchable: true,
                },                               
                
            ]
        }
    },
    created: function () {
        axios({        
            method: 'get',
            url: 'http://localhost:5000/table',      
        })        
        .then((response) => {          
            this.tables = response.data.tables;        
        })        
        .catch(() => {})
    },
    computed:{
       
    }    
    
}
</script>

<style scoped>
    @import '../css/editTables.css';
</style>
