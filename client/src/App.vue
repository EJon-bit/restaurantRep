<template>
  <div id="app">
    <b-container>
        <b-navbar-brand href="/">Top Tier Ja</b-navbar-brand>
      
        <b-navbar-nav>
            
          <router-link to="/Menu" exact class="item">
            <b-nav-item>Menu</b-nav-item> 
          </router-link>
          
        </b-navbar-nav>
    </b-container>
   
    <Home />
    
    <router-view/>
    
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
  margin-top: 60px;
}
</style>

