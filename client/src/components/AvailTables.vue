<template>
    
    <div class="container">       
        <br/> 
        <p class="title is-4">Available Tables</p>             
        
            <b-table
                class="box"
                :data="tables"
                :columns="columns">           
                               
                   
            </b-table>     
          
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AvailTables',

    data() {
        
        return {

            tables:[],
            
            columns: [
                
                {
                    field: 'tableNum',
                    label: 'Table No.',
                    searchable: true,
                },
                {
                    field: 'seatNum',
                    label: 'No. Seats',
                    searchable: true,
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
    }    
    
}
</script>

<style scoped>

</style>
