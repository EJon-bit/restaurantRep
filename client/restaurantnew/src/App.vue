/* eslint-disable */
<template>
  <div id="app">       
     
    <b-navbar class="navbar is-dark is-fixed-top">
      <template slot="brand">
          <b-navbar-item  id="logo" tag="router-link" :to="{ path: '/' }" >
              <img src="https://cdn0.iconfinder.com/data/icons/building-and-location-filled-outline-1/64/Location-map-pin-marker-food-512.png">Top Tier Cuisine JA
          </b-navbar-item>
      </template>
      
      <template slot="start">
          <b-navbar-item id="links" tag="router-link" :to="{ path: '/Menu' }"> Menu & Reservations
            <!-- <router-link to="/Menu" class="nav-link">Menu & Reservations</router-link> -->
          </b-navbar-item>

          <b-navbar-item id="links" tag="router-link" :to="{ path: '/Reservation/User' }"> Edit Reservation
            <!-- <router-link to="/Reservation/User" class="nav-link">Edit Reservation</router-link> -->
          </b-navbar-item> 
                   
      </template>        
        
    </b-navbar>          
    
    <transition name="fade">
      <router-view></router-view> <!--renders the component according to the routing path in our Vue application-->
    </transition>
    
    <footer class="footer">
      <div class="columns is-variable is-0-desktop"> 
        <div class="column is-variable is-one-third-desktop" align="left">        
          <i style="vertical-align: middle;">
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Coat_of_arms_of_the_University_of_the_West_Indies.png/220px-Coat_of_arms_of_the_University_of_the_West_Indies.png" style="width:7%">
          </i>
          <a style="vertical-align: middle;">
            UWI Final Year Project.
          </a>
        </div>
        <div class="column is-variable is-one-third-desktop" align="middle">
          <strong>TopTierJA</strong> by <a>E-Jon Thomas</a>        
        </div>
        <div class="column is-variable is-one-third-desktop" align="right">  
          <a>Restaurant Customer Detection & Management App</a>.
        </div>  
      </div>  
    </footer> 
  </div>
   
</template>

<script>
//import './assets/stylesheets/main.css';

//import Home from './components/Home.vue';


export default {
  name: 'App',
  
}
</script>

<style scoped>
@media screen and (min-width: 769px), print {
  #logo{
    font-family:Segoe Script;
    font-size:30px;
    color:gold;
  }
  #links{
    font-family:Gabriola;
    font-size:32px;
  }
}
@media screen and (max-width: 768px), print {
  #logo{
    font-family:Segoe Script;
    font-size:12px;
    font-weight:bold;
    color:gold;
  }
  #links{
    font-family:Gabriola;
    font-size:22px;
  }
}
#app {
  
  /* font-family: Florence, cursive; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;  
  margin-top: 0px;
  justify-content: center;
  align-items: center;
   
}

</style>

