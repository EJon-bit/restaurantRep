<template>
    <div class="container">
        
        <div class="columns is-mobile" style="margin-top:100px">
            <div class="column is-half is-offset-one-quarter">
                <div class="box">   
                    <h1 class="title is-4">Enter Password Here</h1><br/>
                    <b-form>
                        <b-field label="Password" label-position='on-border' style="margin-left:210px"><br>
                        <b-input>  <!--checks if value entered in name field is valid..passes an error if invalid and nothing if valid-->
                        </b-input>
                        
                        </b-field> <br/>

                        <b-button type="is-primary">
                            Login    
                        </b-button>
                    </b-form>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
    // import axios from 'axios';
    // import { required } from 'vuelidate/lib/validators'

    // export default{

    //     name: 'Login',
    //     mixins: [validationMixin],

    //     data () {            
                    
    //         formResponses:{
                
    //             password: ''
                
    //         }   
                    
                
    //     },
    //     validations: {
    //         formResponses: {
    //             password: {
    //                 required
    //             }
    //         }
    //     },

    //     methods:{
    //         login () {
    //                 if (this.$v.$invalid) {
    //                     this.submitStatus = 'ERROR'
    //                 } 
    //                 else {                        
    //                            //U NEED TO ADD SOME V-MODEL THING TO STORE THE PASSWORD ENTERED INTO A VARIABLE SO THE GET MENTHOD CAN FIND IT IN DATABASE
    //                     return axios({        
    //                         method: 'get',
    //                         url: 'http://localhost:8081/reservation/user',      
    //                     })        
    //                     .then((response) => {          
    //                         this.reservation = response.data.reservation;
    //                         this.$swal(            
    //                         'Great!',            
    //                         'Customer ID has been approved',            
    //                         'success',          
    //                         );         
    //                     })        
    //                     .catch(() => {        

    //                     });  
                        
    //                     this.submitStatus = 'PENDING'
    //                     setTimeout(() => {
    //                         this.submitStatus = 'OK'
    //                     }, 500)   
    //                 } 
    //         } 
                       
    //                     // .then((response) => {
    //                     //     //displays flash message to indicate that data was successfully added to DB
    //                     //         this.$swal(            
    //                     //         'Great!',            
    //                     //         'Reservation added successfully!',            
    //                     //         'success',          
    //                     //         ); 
                            
    //                     //     this.$router.push({ name: 'Menu' });  //redirects back to home          
    //                     //     this.$refs.form.reset();          
    //                     // })        
    //                 }
    //         }  
       // }
    //}
</script>
<style scoped>

    

</style>