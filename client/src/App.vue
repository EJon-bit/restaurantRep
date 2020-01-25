<template>
  <div class= "container">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Top Tier Cuisine Ja</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Menu" class="nav-link">Menu</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/AddReserve" class="nav-link">Make Reservation</router-link>
        </li>
      </ul>
    </nav><br />
   
    <Home />
    
    <transition name="fade">
      <router-view></router-view> <!--renders the component according to the routing path in our Vue application-->
    </transition>
   
    
  </div>

   
</template>

<script>
//import './assets/stylesheets/main.css';

import Home from './components/Home.vue';

export default {
  name: 'home',
  components:{
    Home    
  }

}
</script>
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>

