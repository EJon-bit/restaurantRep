<!-- for home page-->
<template>
  <div class="container is-fluid">
    <div class="column is-12">
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
    </div>
    <br/>
    <div class="column is-four-fifths">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                <br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>   
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
        
      }
    }
  }
</script>

<style scoped>




</style>