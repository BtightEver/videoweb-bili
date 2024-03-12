<template>                                                <!--此组件冗余，可以删除-->
    <div class="video-container" @click="redirectToPlayerView(video)">
      <div class="video-content">
        <img :src="require('@/assets/轮播01.jpg')" alt="Video Image" />
        <h3>{{ video.videoName }}</h3>
        <p>视频ID: {{ video.videoId }}</p>
        <p>作者: {{ video.author }}</p>
      </div>
    </div>
  </template>
  

<script setup>
import { onMounted } from "vue";
import router from '../../router'

const Stringtest = ref('123123')

const props = defineProps({
    video: Object,         // 定义 video 属性为object类型
});

const redirectToPlayerView =(video)=> {

    const videoString = JSON.stringify(props.video)
    router.push({ name: "/PlayerView", query: { "Stringtest": Stringtest.value }})
}

onMounted(() =>{
    console.log("videoName："+props.video.videoName)
})
</script>

<style scoped>
.video-container {
  width: 250px; /* 设置组件宽度 */
  padding: 10px; /* 添加内边距 */
  border: 1px solid #ccc; /* 添加边框样式 */
  border-radius: 10px; /* 设置微圆角 */
  margin: 5px; /* 添加外边距 */
}

.video-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  width: 100%; /* 图片宽度占满容器 */
  height: auto; /* 让高度自适应 */
}

h3 {
  font-size: 14px; /* 设置标题字体大小 */
  margin: 5px 0; /* 设置标题上下边距 */
}

p {
  font-size: 12px; /* 设置段落字体大小 */
  margin: 3px 0; /* 设置段落上下边距 */
}
</style>