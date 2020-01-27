<!-- for home page-->
<template>
  <div>
      
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#3e7367"
      img-width="720"
      img-height="200"
     
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd">
    
      
      <b-carousel-slide img-src="https://www.intelligenthq.com/wp-content/uploads/2019/08/restaurant-1024x683.jpg">
        <b-card title="Superior Dining Experience" >
          <b-card-text>
           Experience customer service at never before seen speeds
            using our efficient entrance system and interactive touch 
            system to make orders from table no waiter needed.
          </b-card-text>        
        </b-card>
      </b-carousel-slide>

      
      <b-carousel-slide img-src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80">
        <b-card>  
          <h1>Wide Variety of Dishes</h1>
          <p>
            We cater to all palletes and accomdate various cultural
            and dietary prefernces with a wide range of options. 
          </p>
        </b-card>
      </b-carousel-slide>

     
      <b-carousel-slide img-src="http://www.herecomesthefood.com.au/wp-content/uploads/2018/12/food-and-table.jpg">
        <b-card>
          <h1>Peculiar pallete? or Have Allergies?</h1>
          <p>
            Our system allows you to customise any of our dishes provided
            to remove item that you might not want or be allergic to. 
            Specialised Orders can be made in  reservations or in restaurant 
            at table.
          </p>
        </b-card>  
      </b-carousel-slide>
    </b-carousel>

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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>

