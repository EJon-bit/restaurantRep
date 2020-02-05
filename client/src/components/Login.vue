<template>
    <div class="container">  
        <b-form>
            <b-field label="Name"><br>
            <b-input                 
                v-model="$v.formResponses.password.$model"
                :state="$v.formResponses.password.$dirty ? !$v.formResponses.password.$error : null" 
                aria-describedby="input-1-live-feedback">  <!--checks if value entered in name field is valid..passes an error if invalid and nothing if valid-->
            </b-input>
            <b-form-invalid-feedback id="input-1-live-feedback">
                This is a required field
            </b-form-invalid-feedback>
            </b-field> 

            <b-button type="submit" variant="primary" :disabled="$v.formResponses.$invalid">
                Login    
            </b-button>
        </b-form>
    </div> 
</template>

<script>
    import axios from 'axios';
    import { required } from 'vuelidate/lib/validators'

    export default{

        name: 'Login',
        mixins: [validationMixin],

        data () {            
                    
            formResponses:{
                
                password: ''
                
            }   
                    
                
        },
        validations: {
            formResponses: {
                password: {
                    required
                }
            }
        },

        methods:{
            login () {
                    if (this.$v.$invalid) {
                        this.submitStatus = 'ERROR'
                    } 
                    else {                        
                               //U NEED TO ADD SOME V-MODEL THING TO STORE THE PASSWORD ENTERED INTO A VARIABLE SO THE GET MENTHOD CAN FIND IT IN DATABASE
                        return axios({        
                            method: 'get',
                            url: 'http://localhost:8081/reservation/user',      
                        })        
                        .then((response) => {          
                            this.reservation = response.data.reservation;
                            this.$swal(            
                            'Great!',            
                            'Customer ID has been approved',            
                            'success',          
                            );         
                        })        
                        .catch(() => {        

                        });  
                        
                        this.submitStatus = 'PENDING'
                        setTimeout(() => {
                            this.submitStatus = 'OK'
                        }, 500)   
                    } 
            } 
                       
                        // .then((response) => {
                        //     //displays flash message to indicate that data was successfully added to DB
                        //         this.$swal(            
                        //         'Great!',            
                        //         'Reservation added successfully!',            
                        //         'success',          
                        //         ); 
                            
                        //     this.$router.push({ name: 'Menu' });  //redirects back to home          
                        //     this.$refs.form.reset();          
                        // })        
                    }
            }  
       // }
    //}
</script>