/* eslint-disable */
<template>
  <div id="app">       
    <div id="wrapContent">
      <b-navbar class="navbar is-dark is-fixed-top" v-if="($route.name!='ReserveList')&&($route.name!='Login')&&($route.name!='UserReservePage')">
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
      
      <transition name="fade" >
        <router-view></router-view> <!--renders the component according to the routing path in our Vue application-->
      </transition>
    </div>

    <footer id="footer">
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

export default {
  name: 'App',
  
  data(){
    return{
      onSite:null,
    }
  },
  created(){
    localStorage.onSite=false;
    this.onSite=localStorage.onSite
    
  }
}
</script>

<style>

@import 'css/App.css';


</style>

