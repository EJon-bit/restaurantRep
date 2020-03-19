<!-- for home page-->
/* eslint-disable */
<template>
  <div id="home" :style="myStyle">
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
        <div class="container is-fullscreen">
          <div class="tile is-ancestor">
            <div class="tile is-vertical is-4">
              <div class="tile">
                <div class="tile is-parent">
                  <article class="tile is-child notification">
                    <p class="title">Vertical...</p>
                    <p class="subtitle">Top tile</p>
                  </article>
                  <!-- <article class="tile is-child notification">
                    <p class="title">...tiles</p>
                    <p class="subtitle">Bottom tile</p>
                  </article> -->
                </div>
              </div>
            </div>
          </div>
          
          <article class="tile is-child is-6 notification">
            <p class="title">Wide tile</p>
            <p class="subtitle">Aligned with the right tile</p>
            <div class="content">
              <!-- Content -->
            </div>
          </article>                       
          <br/>       
          <article class="tile is-child is-9 notification" style="margin-bottom:10px">
            <div class="content">
              <p class="title">Tall tile</p>
              <p class="subtitle">With even more content</p>
              <div class="content">
                
              </div>
            </div>
          </article>         
          
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


</style>