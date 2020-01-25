<template> 
    <div class="container">
   <b-form @submit.stop.prevent="onSubmit">
    <b-field label="Name" >
      <b-input 
        placeholder="John Doe"
        v-model="$v.form.name.$model"
        :state="$v.form.name.$dirty ? !$v.form.name.$error : null" 
        aria-describedby="input-1-live-feedback">  <!--checks if value entered in name field is valid..passes an error if invalid and nothing if valid-->
      </b-input>
      <b-form-invalid-feedback id="input-1-live-feedback">
          This is a required field
      </b-form-invalid-feedback>
    </b-field>

    <b-field label="No. of Persons">
            <b-select v-model="$v.form.seatsReserved.$model" :state="$v.form.seatsReserved.$dirty ? !$v.form.seatsReserved.$error : null" aria-describedby="input-2-live-feedback" placeholder="1">
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

    <b-field label="Arrival Date and Time">
        <b-datetimepicker
            placeholder="Click to select..."
            :min-datetime="minDatetime"
            :max-datetime="maxDatetime">
        </b-datetimepicker>
    </b-field>

    <b-button type="submit" variant="primary" :disabled="$v.form.$invalid">
        Submit
    </b-button>
   </b-form>
</div>
    
</template> 
<script>  
    import axios from 'axios';
    import { validationMixin } from 'vuelidate'
    import { required } from 'vuelidate/lib/validators'

    export default {    
         //look up form validations
        mixins: [validationMixin],
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
                
                form:{
                    name: '',
                    seatsReserved:'',
                    dateReserved:''
                }   
                
            }
        },
        validations: {
            form: {
                name: {
                required
                },
                seatsReserved: {
                required,                
                },
                dateReserved: {
                required,                
                }
            }
        },
        methods: {      
            onsubmit () {
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } 
                else {
                    // do your submit logic here
                    return axios({            
                        method: 'post',            
                        data: {              
                            name: this.name,              
                            seatsReserved: this.seatsReserved,              
                            dateReserved: this.dateReserved,              
                                        
                        },            
                        url: 'http://localhost:8081/reservation',            
                        headers: {              
                            'Content-Type': 'application/json'            
                        }          
                    })          
                    this.submitStatus = 'PENDING'
                    setTimeout(() => {
                    this.submitStatus = 'OK'
                    }, 500) 

                    .then((response) => {
                        //displays flash message to indicate that data was successfully added to DB
                            this.$swal(            
                            'Great!',            
                            'Reservation added successfully!',            
                            'success',          
                            ); 
                        
                        this.$router.push({ name: 'Menu' });  //redirects back to home          
                        this.$refs.form.reset();          
                    })        
                }
            }  
        } 
    }
</script>

<style scoped>

</style>