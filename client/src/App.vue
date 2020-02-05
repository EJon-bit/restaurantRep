<template>
  <div id="app">        
    <b-navbar class="navbar is-dark">
      <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
              <img src="https://icons-for-free.com/iconfiles/png/512/restaurant-131979029122603130.png">Top Tier Cuisine JA
          </b-navbar-item>
      </template>

      <template slot="start">
          <b-navbar-item>
            <router-link to="/Menu" class="nav-link">Menu & Reservations</router-link>
          </b-navbar-item>

          <b-navbar-item>
            <router-link to="/AddReserve" class="nav-link">Edit Reservation</router-link>
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
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;  
  margin-top: 0px;
}
</style>

