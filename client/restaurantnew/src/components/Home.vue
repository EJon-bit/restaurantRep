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
                <img src="https://www.intelligenthq.com/wp-content/uploads/2019/08/restaurant-1024x683.jpg">
                <div class="overlay">User friendly Customer Management System.
                  <br/> Make your Reservation. Collect password in Email. See and Edit your Order any time </div>
              </span> 
              
            </b-carousel-item>

            <b-carousel-item>
              <span class="image">
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80">
                <div class="overlay">No tables Available? No problem! Save your Reservation.<br/>
                 We will Send you an Email as soon as a table becomes available</div>
              </span>
              
            </b-carousel-item>
            
            <b-carousel-item>
              <span class="image">
                <img src="https://media-cdn.tripadvisor.com/media/photo-s/15/63/cf/92/salle-du-restaurant-bistro.jpg">
                <div class="overlay">Arrive and Find your table with No Hassle and No Assistance.<br/>
                Verify your ID at the entrance, Then look for a table with a blinking light.<br/>
                That table is yours! Impossible to miss!
                </div>
              </span>
            </b-carousel-item>

            <b-carousel-item>
              <span class="image">
                <img src="https://www.athenaspahotel.com/media/cache/jadro_resize/rc/q71gJJGT1579080551/jadroRoot/medias/_a1a5606.jpg">
                <div class="overlay"> User friendly Digital Display at each table!<br/>
                Add items or extra items to your order at your table with the a few button clicks. <br/>No waiter needed!
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
                
                <div class="container is-fullscreen" id="hex" style="margin-top:7px;"><br/>
                    Enjoy our vast culinary <br/>selections,catering to every <br/>palate. Customize your dish as you<br/> see fit. We Aim to please.
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
.overlay {
  position: absolute;
  bottom: 50px;
  
  background-image : url('../pics/stroke.png');
  background-repeat :no-repeat;
  background-position: center center;
  background-size: 90% 150%;/* Black see-through */
  color: gold;
  width: 100%;
  transition: .5s ease;
  opacity:0;
  color: gold;
  font-family:Gabriola;
  font-weight:bold;
  font-size: 35px;
  padding: 20px;
  text-align: center;
}
span:hover .overlay {
  opacity: 0.8;
}
@media screen and (min-width: 769px), print {
  img{
    position: relative;
    top: 0;
    left: 0;
    height: 630px;
  }
  .carousel {
    max-height: 630px;
    position: relative;
   box-shadow: 0px 0px 10px 8px #3a403f;
  }
  #woodbackthing {
    margin-left:50px;
    background-image : url('../pics/woodback.png');
    background-repeat :no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    height: 600px;
    width: 100%;
  }
  #stuffs{
    margin-left:100px;
  }
  #food.box{
    border-radius: 50px 50px 50px 50px;
    background-image : url('../pics/foods.jpg'); 
    background-repeat :no-repeat; 
    background-position: center ;
    background-size: 100% 100%; 
    height: 400px;
    /* width: 250px; */
  }
  
  #box.box{
    border-radius: 50px 50px 50px 50px;
    background-image : url('../pics/laughingpeople.jpg'); 
    background-repeat :no-repeat; 
    background-position: center ;
    background-size: 100% 100%; 
    height: 420px;
    /* width: 250px; */

  }
  
}

@media screen and (max-width: 768px), print {
  img{
    position: relative;
    top: 0;
    left: 0;
    height: 300px;
  }
  .carousel {
    max-height: 300px;
    position: relative;
   box-shadow: 0px 0px 10px 8px #3a403f;
  }
  #woodbackthing {
    margin-left:0px;
    background-image : url('../pics/woodback.png');
    background-repeat :no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    height: 600px;
    width: 100%;
  }
  #stuffs{
    margin-left:1px;
  }
  #food.box{
    border-radius: 50px 50px 50px 50px;
    background-image : url('../pics/foods.jpg'); 
    background-repeat :no-repeat; 
    background-position: center ;
    background-size: 100% 100%; 
    height: 250px;
    /* width: 250px; */
  }
  #box.box{
    border-radius: 50px 50px 50px 50px;
    background-image : url('../pics/laughingpeople.jpg'); 
    background-repeat :no-repeat; 
    background-position: center ;
    background-size: 100% 100%; 
    height: 300px;
    /* width: 250px; */
  }
  
  
}
#plate {
  background-image : url('../pics/plate.png');  
  background-position: center ;
  background-size: 100% 100%;
  height: 300px;
  width: 300px;
}

#woodback {
  background-image : url('../pics/woodback.png');
  background-repeat :no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  height: 600px;
  width: 100%;
}

#hex {
  background-image : url('../pics/hexagon.png');  
  background-position: center ;
  background-size: 100% 100%;
  height: 40%;
  width: 80%;
}




</style>