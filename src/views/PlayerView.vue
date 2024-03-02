<template>
    <div ref="playerContainer"></div>
</template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import DPlayer from 'dplayer';
  
  export default {
    name: 'PlayerView',
    setup() {
      const playerContainer = ref(null);
      onMounted(() => {
        const dp = new DPlayer({
          container: playerContainer.value,
          video: {
            url: 'http://localhost:8090/videos/1/1.mp4',
            pic: 'http://localhost:8090/images/1/userImage.jpg',
            thumbnails: '',
          },
        });
      });
    
      return {
        playerContainer,
      };
    },
  };
  </script>
  
  <style>
  /* 样式可以根据你的需求进行自定义 */
  </style>