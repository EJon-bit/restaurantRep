<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top bg-dark">
        <a class="navbar-brand">
          <router-link to="/" class="nav-link">Top Tier Cuisine Ja</router-link>
        </a>
        <ul class="navbar-nav">
          
          <li class="nav-item">
            <router-link to="/Menu" class="nav-link">Menu</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/AddReserve" class="nav-link">Make Reservation</router-link>
          </li>
        </ul>
    </nav>  
      
    
    
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>

