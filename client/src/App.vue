<template>
  <div id="app">        
    <b-navbar class="navbar is-dark">
      <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }" style="font-family:Segoe Script;font-size:25px;color:gold;">
              <img src="https://cdn0.iconfinder.com/data/icons/building-and-location-filled-outline-1/64/Location-map-pin-marker-food-512.png">Top Tier Cuisine JA
          </b-navbar-item>
      </template>
      
      <template slot="start">
          <b-navbar-item tag="router-link" :to="{ path: '/Menu' }" style="font-family:Gabriola;font-size:25px;"> Menu & Reservations
            <!-- <router-link to="/Menu" class="nav-link">Menu & Reservations</router-link> -->
          </b-navbar-item>

          <b-navbar-item tag="router-link" :to="{ path: '/Reservation/User' }" style="font-family:Gabriola;font-size:25px;"> Edit Reservation
            <!-- <router-link to="/Reservation/User" class="nav-link">Edit Reservation</router-link> -->
          </b-navbar-item> 
                   
      </template>        
        
    </b-navbar>       
    
    <transition name="fade">
      <router-view></router-view> <!--renders the component according to the routing path in our Vue application-->
    </transition>
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
#app {
  
  /* font-family: Florence, cursive; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;  
  margin-top: 0px;
   
}

</style>

