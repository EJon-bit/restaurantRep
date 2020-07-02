<!-- for home page-->
/* eslint-disable */
<template>
  <div id="home">
    <!-- <div class="column is-12"> -->
      <b-carousel            
            :indicator="indicator"
            :indicator-background="indicatorBackground"
            :indicator-inside="indicatorInside"
            :indicator-mode="indicatorMode"
            :indicator-position="indicatorPosition"
            :indicator-style="indicatorStyle">
            
            <b-carousel-item>
              <span class="image">
                <img src="../pics/restaurantWine.jpg">
                <div class="overlay">User friendly Customer Management System.
                  <br/><p id="carouselDescrip"> Make your Reservation. Collect password in Email. See and Edit your Order any time </p> 
                </div>
              </span> 
              
            </b-carousel-item>

            <b-carousel-item>
              <span class="image">
                <img src="../pics/restPlate.jpg">
                <div class="overlay">No tables Available? No problem! <br/>
                  <p id="carouselDescrip"> Save your Reservation. We will Send you an Email as soon as a table becomes available</p>
                </div>
              </span>
              
            </b-carousel-item>
            
            <b-carousel-item>
              <span class="image">
                <img src="../pics/roundTable.jpg">
                <div class="overlay">Arrive and Find your table with No Hassle and No Assistance.<br/>
                  <p id="carouselDescrip">Verify your ID at the entrance, Then look for a table with a blinking light.<br/>
                  That table is yours! Impossible to miss!</p>
                </div>
              </span>
            </b-carousel-item>

            <b-carousel-item>
              <span class="image">
                <img src="../pics/restBreakfast.jpg">
                <div class="overlay"> User friendly Digital Display at each table!<br/>
                  <p id="carouselDescrip">Add items or extra items to your order at your table with the a few button clicks. <br/>No waiter needed!</p>
                </div>
              </span>
            </b-carousel-item>
        </b-carousel> 
        
        <div class="container is-fullscreen" style="margin-top:-10px; overflow: hidden;"> 
          <!-- <div id="lights"/>           -->
          <div class="columns is-multiline is-variable is-8-widescreen">
            <div class="column is-variable is-one-third-widescreen is-two-thirds-tablet">
              <div class="container is-fullscreen" id="woodback">
                <div class="container is-fullscreen" id="plate" style="font-family:Segoe Script;font-weight:bold;font-size:34px;color:#363101;"><br/><br/>
                   The <br> Food                 
                </div>
                
                <div class="container is-fullscreen" id="hex"><br/>
                    Enjoy our vast <br/>culinary selections, <br/>catering to every palate. <br/> Customize your dish as you<br/> see fit. <br/> We Aim to please.
                </div>                                 
              </div>
            </div><br/>
            <div id="stuffs" class="column is-variable is-7-widescreen is-two-thirds-tablet">
                <div class="box" style="background-color: #024047;opacity:0.9">                  
                  <p class="title is-4" style="font-family:Segoe Script;color:gold;">Beens! Greens! Potatoes! Tomatoes! Chicken! Lamb!...</p>
                  <p class="subtitle" style="font-family:Segoe Script;color:gold;margin-top:10px;"> You Name It! </p>         
                </div>
                <div id="food" class="box" />                

            </div> 
            <hr class="featurette-divider" style="margin-top:10px;">
            <div class="column is-variable is-7-widescreen is-two-thirds-tablet">
                <div class="box" style="background-color: #024047;opacity:0.9">                  
                  <p class="title is-4" style="font-family:Segoe Script;color:gold;">Laugh! Unwind! Dine! Rejuvinate!...</p>
                  <p class="subtitle" style="font-family:Segoe Script;color:gold;margin-top:10px;"> A Sensory Expedition! </p>         
                </div>
                <div id="box" class="box" />
            </div> 
            <div class="column is-variable is-one-third-widescreen is-two-thirds-tablet">
              <div class="container is-fullscreen" id="woodbackthing">
                <div class="container is-fullscreen" id="plate">   
                  <div id=text style="font-family:Segoe Script;font-weight:bold;font-size:30px;color:#363101"><br/><br/>            
                   The <br/>Experience
                  </div>
                </div>
                <div class="container is-fullscreen" id="hex" style="margin-top:7px;"><br/>
                    Ambiance
                </div>                                 
              </div>
            </div> 
                 
          </div>
        </div>
             
  </div>
  
  
  
</template>

<script>
  export default {
    data() {
      return {
            indicator: true,
            indicatorBackground: false,
            indicatorInside: true,
            indicatorMode: 'hover',
            indicatorPosition: 'is-bottom',
            indicatorStyle: 'is-dots',

            backImage: { 
                backgroundImage: "url(https://i.imgur.com/ZOcLM7h.jpg)"
                         
            },
           
            myStyle:{
                backgroundColor: 'rgba(89,124,134)'
                
            },
           
        
      }
    }
  }
</script>

<style scoped>
  
  @import '../css/homePage.css';




</style>