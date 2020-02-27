
<template>
    
    <div :style="backImage">       
        <br/> 
        <div class="box" :style="myStyle"> 
            <p class="title is-4" style="font-family:Gabriola; font-weight:bold; color:gold; font-size:35px;">Available Tables</p>             
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
        <div class="box" :style="myStyle">    
            
            <button class="button field is-warning" @click="isComponentModalActive = true">                    
                <b-icon icon="plus"></b-icon>
                <span>Reserve Table</span>
            </button>       
            <b-modal :active.sync="isComponentModalActive"
                has-modal-card
                trap-focus
                aria-role="dialog"
                aria-modal>
                <modal-form :seatsReserved="checkedRows"></modal-form>
            </b-modal>  
        </div>
          
    </div>
</template>

<script>
import axios from 'axios';

var ModalForm = {
    props: ['customerName', 'seatsReserved','datetime'],

    template: 
`        <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Make Reservation</p>
                </header>
                <section class="modal-card-body">
                    <b-field 
                    custom-class="is-medium has-text-danger" 
                    :type="isNameLabelDanger"
                    :name="customerName" 
                    :message="nameLabelMessage"
                    label="Name">
                    
                <b-input placeholder="John Doe" v-model="customerName" required></b-input>
                
            </b-field>
            <br/>
            <b-field label="No. of Persons" custom-class="is-medium has-text-danger" :type="ispersonNumLabelDanger" :message="personNumLabelMessage">
                    <b-input :value="seatsReserved" required>
                    </b-input>
            </b-field><br/>
            <b-field label="Arrival Date and Time" custom-class="is-medium has-text-danger" :type="isdateLabelDanger" :message="dateLabelMessage">
                <b-datetimepicker v-model="datetime"
                    placeholder="Click to select..."
                    :min-datetime="minDatetime"
                    :max-datetime="maxDatetime">
                </b-datetimepicker>
            </b-field><br/>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>
                    <button class="button is-primary">Add Reservation</button>
                </footer>
            </div>
        </form>
    `
}

export default {
    name: 'AvailTables',

    components: {
            ModalForm
    },

    data() {
        
        return {
            isComponentModalActive: false,

            myStyle:{
                backgroundColor: 'rgba(63,63,63,.95)'
                
            },
            cardStyle:{
                backgroundColor:"#a9d3cd"
            },

            backImage: { 
                backgroundImage: "url(https://st.depositphotos.com/2158511/4377/v/950/depositphotos_43771103-stock-illustration-raw-food-seamless-background.jpg)" 
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
        //create if statements based on number of persons entered into given form field
        // and if a table to accommadate that number is available
        //for eg...if number entered && number>3 && tables.length=0 then divide entered number in half and filter this.tables for any available
        // if customer agrees to split number as suggested..then store return value(that is the tableNo of the available table) of a filter function  in this.checkedRows
    }    
    
}
</script>

<style scoped>

</style>
