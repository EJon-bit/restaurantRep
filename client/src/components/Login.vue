<template>
    <div id="backImage">        
        <div class="columns is-mobile" style="margin-top:100px">
            <div class="column is-half is-offset-one-quarter">
                <div class="box" :style="myStyle">   
                    <h1 class="title is-4" style="font-family:Gabriola;font-weight:bold; color:gold; font-size:35px;">Enter Password Here</h1><br/>
                    <b-form>
                        <b-field label="Password" custom-class="is-small has-text-warning" type="is-primary">
                            <b-input v-model="password" :message="loginLabelMessage">  
                            </b-input>                        
                        </b-field> <br/>

                        <b-button type="is-primary" :disabled="loginIsInDanger" @click="login">
                            Login    
                        </b-button>
                    </b-form>
                </div>                
            </div>
        </div>
    </div> 
</template>

<script>
import axios from 'axios'
   //insert code to get reservations for password...let b-input use v-mode=password and
   // find reservation with that specific password...when change on-site field to true....
   //each table must have specialised python code to check its specific table document for the onsite field 
export default{
    name:'Login',

    data(){
        return{

            password:'',
            reservation:[],
            // backImage: { 
            //     backgroundImage: "url(https://st.depositphotos.com/2158511/4377/v/950/depositphotos_43771103-stock-illustration-raw-food-seamless-background.jpg)" 
            // },
            myStyle:{
                backgroundColor: 'rgba(63,63,63,.95)'
                
            },
        }
    },
    // mounted() {    
    //     this.fetchReservation(); //fetches reservation using axios request 
       
    // },
    methods:{
        login() {      
        return axios({        
            method: 'put',
            url: 'http://localhost:5000/reservation/user/${password}',      
        })        
        .then(() => {              
                
                this.$swal(            
                    'Great!',            
                    'Reservation was successfully added!',            
                    'success',          
                );            
                        
                //this.$refs.form.reset();          
            })
            .catch(() => {

                this.$swal(            
                    'Sorry!',            
                    'Your reservation was NOT sucessfully added! Try again',            
                    'error',          
                ); 
            });      
        },
    },
    computed:{

        loginLabelMessage() {
                if (this.password !== "") {
                    return "";
                } 
                else {
                    return "This field is required";
                }
        },
        loginIsInDanger() {
                if (this.loginLabelMessage === "This field is required") {
                    return true;
                } 

                else {
                    return false;
                }
            },
    }
}
   
</script>
<style scoped>
    
    #backImage{
        background-image: url('https://st.depositphotos.com/2158511/4377/v/950/depositphotos_43771103-stock-illustration-raw-food-seamless-background.jpg');
        background-size: cover;
        /* background-repeat: no-repeat;  */
        
}

</style>