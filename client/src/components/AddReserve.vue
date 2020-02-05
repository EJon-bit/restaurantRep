<template> 
    <div class="container">
        
        <b-field label="Name" label-position='on-border'>
            <b-input placeholder="John Doe"></b-input>
        </b-field>
        <br/>
        <b-field label="No. of Persons" label-position='on-border'>
                <b-select placeholder="Select a number">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>                
                </b-select>
        </b-field><br/>
        <b-field label="Arrival Date and Time" label-position='on-border'>
            <b-datetimepicker
                placeholder="Click to select..."
                :min-datetime="minDatetime"
                :max-datetime="maxDatetime">
            </b-datetimepicker>
        </b-field><br/>        
        
        <b-button type="is-primary">Submit Reservation</b-button>

    </div>
    
    <!-- <div class="col-sm-4">
        <br/>
        <b-form @submit.stop.prevent="onSubmit">
            <b-field label="Name"><br>
            <b-input 
                placeholder="John Doe"
                v-model="$v.formResponses.customerName.$model"
                :state="$v.formResponses.customerName.$dirty ? !$v.formResponses.customerName.$error : null" 
                aria-describedby="input-1-live-feedback">   checks if value entered in name field is valid..passes an error if invalid and nothing if valid-->
            <!-- </b-input>
            <b-form-invalid-feedback id="input-1-live-feedback">
                This is a required field
            </b-form-invalid-feedback>
            </b-field> 
            <br>

            <b-field label="No. of Persons"> <br>
                    <b-select v-model="$v.formResponses.seatsReserved.$model" :state="$v.formResponses.seatsReserved.$dirty ? !$v.formResponses.seatsReserved.$error : null" aria-describedby="input-2-live-feedback" placeholder="1">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>                
                    </b-select>
                    <b-form-invalid-feedback id="input-2-live-feedback">
                        This is a required field
                    </b-form-invalid-feedback>
            </b-field> 
            <br>

            <b-field label="Arrival Date and Time"><br>
                <b-datetimepicker
                    placeholder="Click to select..."
                    :min-datetime="minDatetime"
                    :max-datetime="maxDatetime">
                </b-datetimepicker>
            </b-field>
            <br>

            <b-button type="submit" variant="primary" :disabled="$v.formResponses.$invalid">
                Submit
            </b-button>
        </b-form> -->
    <!-- </div>     --> 
</template> 

<script>  
    import axios from 'axios';
    // import { validationMixin } from 'vuelidate'
    // import { required } from 'vuelidate/lib/validators'
    
    export default {  
        
        name: 'AddReserve',
         //look up form validations
        //mixins: [validationMixin],
        data () {
            
            const min = new Date()
            min.setDate(min.getDate() - 7)
            min.setHours(9)
            min.setMinutes(0)
            min.setSeconds(0)
            const max = new Date()
            max.setDate(max.getDate() + 7)
            max.setHours(18)
            max.setMinutes(0)
            max.setSeconds(0)
            return {
                minDatetime: min,
                maxDatetime: max,
                
                // formResponses:{
                //     customerName: '',
                //     seatsReserved:'',
                //     dateReserved:''
                // }   
                
            }
        },
        // validations: {
        //     formResponses: {
        //         customerName: {
        //         required
        //         },
        //         seatsReserved: {
        //         required,                
        //         },
        //         dateReserved: {
        //         required,                
        //         }
        //     }
        // },
        // methods: {      
        //     onsubmit () {
        //         if (this.$v.$invalid) {
        //             this.submitStatus = 'ERROR'
        //         } 
        //         else {
        //             // do your submit logic here
        //             return axios({            
        //                 method: 'post',            
        //                 data: {              
        //                     customerName: this.customerName,              
        //                     seatsReserved: this.seatsReserved,              
        //                     dateReserved: this.dateReserved,              
                                        
        //                 },            
        //                 url: 'http://localhost:8081/reservation',            
        //                 headers: {              
        //                     'Content-Type': 'application/json'            
        //                 }          
        //             })          
        //             this.submitStatus = 'PENDING'
        //             setTimeout(() => {
        //             this.submitStatus = 'OK'
        //             }, 500) 

        //             .then((response) => {
        //                 //displays flash message to indicate that data was successfully added to DB
        //                     this.$swal(            
        //                     'Great!',            
        //                     'Reservation added successfully!',            
        //                     'success',          
        //                     ); 
                        
        //                 this.$router.push({ name: 'Menu' });  //redirects back to home          
        //                 this.$refs.form.reset();          
        //             })        
        //         }
        //     }  
        // } 
    }
</script>

<style scoped>

</style>