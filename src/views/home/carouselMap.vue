<template>
  <div class="swiper-demo">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(item, index) in banner" :key="index" class="swiper-slide">
          <router-link :to="'banner' + (index+1)"><img :src="item" style="width: 100%;"></router-link>
        </div>
      </div>
      <!-- 分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <!-- 滚动条 -->
      <div class="swiper-scrollbar"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  mounted(){
    var mySwiper = new Swiper(".swiper-container",{
      //direction: "vertical",
      loop: true,
      autoplay: true,
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      scrollbar: {
        el: ".swiper-scroll-bar"
      },
    });
    mySwiper.$el.onmouseover = function(){
      mySwiper.autoplay.stop();
    }
    mySwiper.$el.onmouseout = function(){
      mySwiper.autoplay.start();
    }
  },
  methods: {
  },
  data: function(){
    return{
      banner:[
        require("../../assets/banner/banner1.jpg"),
        require("../../assets/banner/banner2.jpg"),
        require("../../assets/banner/banner3.jpg"),
        require("../../assets/banner/banner4.jpg"),
        require("../../assets/banner/banner5.jpg"),
      ]
    }
  }

}
</script>

<style>
.swiper-container{
  height: 600px;
  width: 1000px;
  margin: 0 auto;
}
</style>