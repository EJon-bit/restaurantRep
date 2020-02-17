<!-- for home page-->
<template>
  <div :style="myStyle">
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
              <div class="tile is-parent">
                <!-- <article class="tile is-child box">
                  <p class="title">Hello World</p>
                  <p class="subtitle">What is up?</p>
                </article> -->
              </div>
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
        </b-carousel>
    <!-- </div> -->
   
    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">First featurette heading. <span class="text-muted">It’ll blow your mind.</span></h2>
        <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
      </div>
      <div class="col-md-5">
        <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 500x500"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>
      </div>
    </div>

    <hr class="featurette-divider">

    <div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading">Oh yeah, it’s that good. <span class="text-muted">See for yourself.</span></h2>
        <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
      </div>
      <div class="col-md-5 order-md-1">
        <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 500x500"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>
      </div>
    </div>

    <hr class="featurette-divider">
       
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
            indicator: true,
            indicatorBackground: true,
            indicatorInside: true,
            indicatorMode: 'hover',
            indicatorPosition: 'is-bottom',
            indicatorStyle: 'is-lines',

            myStyle:{
                backgroundColor: 'rgba(89,124,134)'
                
            },
        
      }
    }
  }
</script>

<style scoped>




</style>