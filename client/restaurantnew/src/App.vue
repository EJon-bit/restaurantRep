/* eslint-disable */
<template>
  <div id="app">       
    <div id="wrapContent">
      <b-navbar class="navbar is-dark is-fixed-top" v-if="($route.name!='ReserveList')&&($route.name!='Login')&&($route.name!='UserReservePage')">
        <template slot="brand">
            <b-navbar-item  id="logo" tag="router-link" :to="{ path: '/' }" >
                <img src="static/img/logo.png">Top Tier Cuisine JA
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
          <i>
            <img src="static/img/uwiLogo.png" style="width:7%">
          </i>
          <a id="footerAtt">
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

