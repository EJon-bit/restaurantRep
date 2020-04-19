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
              </span>              
              
            </b-carousel-item>

            <b-carousel-item>
              <span class="image">
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80">
              </span>
              
            </b-carousel-item>

            <b-carousel-item>
              <span class="image">
                <img src="http://www.herecomesthefood.com.au/wp-content/uploads/2018/12/food-and-table.jpg">
              </span>
            </b-carousel-item>

            <b-carousel-item>
              <span class="image">
                <img src="https://media-cdn.tripadvisor.com/media/photo-s/15/63/cf/92/salle-du-restaurant-bistro.jpg">
              </span>
            </b-carousel-item>

            <b-carousel-item>
              <span class="image">
                <img src="https://www.athenaspahotel.com/media/cache/jadro_resize/rc/q71gJJGT1579080551/jadroRoot/medias/_a1a5606.jpg">
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
                    ygvhj
                </div>                                 
              </div>
            </div><br/>
            <div class="column is-variable is-7-widescreen is-two-thirds-tablet" style="margin-left:100px;">
                <div class="box" style="background-color: #024047;opacity:0.9">                  
                  <p id="brush" class="title is-4" style="font-family:Segoe Script;color:gold;">Beens! Greens! Potatoes! Tomatoes! Chicken! Lamb!...</p>
                  <p class="subtitle" style="font-family:Segoe Script;color:gold;margin-top:10px;"> You Name It! </p>         
                </div>
                <div class="box" style="opacity:0.9; background:rgba(89,124,134)">
                  <div id="food" class="box"/>
                  <div id="meal" class="box" />                                   
                </div>

            </div> 
            <hr class="featurette-divider" style="margin-top:10px;">
            <div class="column is-variable is-7-widescreen is-two-thirds-tablet">
                <div class="box" style="background-color: #024047;opacity:0.9">                  
                  <p id="bruh" class="title is-4" style="font-family:Segoe Script;color:gold;">Laugh! Unwind! Dine! Rejuvinate!...</p>
                  <p class="subtitle" style="font-family:Segoe Script;color:gold;margin-top:10px;"> A Sensory Expedition! </p>         
                </div>
                <div class="box" style="opacity:0.9; background:rgba(89,124,134)">
                  <div id="box" class="box" style="opacity:1;"/>
                  <div id="eat" class="box" style="opacity:1;"/>                                     
                </div>
            </div> 
            <div class="column is-variable is-one-third-widescreen is-two-thirds-tablet">
              <div class="container is-fullscreen" id="woodback" style="margin-left:50px;">
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
        <br/><br/>      
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

img{
    position: relative;
    top: 0;
    left: 0;
    min-height: 680px;

}
#plate {
  background-image : url('../pics/plate.png');  
  background-position: center ;
  background-size: 100% 100%;
  height: 300px;
  width: 300px;
}
#home {
  background-image : url('../pics/websitewall.jpg');  
  background-position: center ;
  background-size: 150% 50%;
 
}
#woodback {
  background-image : url('../pics/woodback.png');
  background-repeat :no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  height: 600px;
  width: 460px;
}
#lights {
  background-image : url('../pics/lights.png');
  background-repeat :repeat-x;
  background-size: 10% 100%;
  height: 150px; 
}
#hex {
  background-image : url('../pics/hexagon.png');  
  background-position: center ;
  background-size: 100% 100%;
  height: 250px;
  width: 330px;
}
#brush {
  background-image : url('../pics/brushstroke.png'); 
  background-repeat :no-repeat; 
  background-position: center ;
  background-size: 90% 100%; 
}
#bruh {
  background-image : url('../pics/brushstroke.png'); 
  background-repeat :no-repeat; 
  background-position: center ;
  background-size: 70% 100%; 
}
#box.box{
  background-image : url('../pics/laughingpeople.jpg'); 
  background-repeat :no-repeat; 
  background-position: center ;
  background-size: 100% 100%; 
  height: 200px;
  width: 250px;

}
#eat.box{
  background-image : url('../pics/eat.jpg'); 
  background-repeat :no-repeat; 
  background-position: center ;
  background-size: 100% 100%; 
  height: 200px;
  width: 250px;
  margin-left:400px;
  margin-top:-50px;
}
#food.box{
  background-image : url('../pics/foods.jpg'); 
  background-repeat :no-repeat; 
  background-position: center ;
  background-size: 100% 100%; 
  height: 200px;
  width: 250px;
}
#meal.box{
  background-image : url('../pics/meal.jpg'); 
  background-repeat :no-repeat; 
  background-position: center ;
  background-size: 100% 100%; 
  height: 200px;
  width: 250px;
  margin-left:400px;
  margin-top:-50px;
}

</style>