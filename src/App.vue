<template>
  <TopView></TopView>
</template>

<script>
import PlayerView from './views/video/PlayerView.vue';
import TopView from './views/TopView.vue';
import MainView from './views/MainView.vue';
import { UploadFilled } from '@element-plus/icons-vue';
import {ref} from "vue";
export default {
  name: 'App',
  components: {
    PlayerView,
    TopView,
    MainView,
  },
};
</script>

<script setup>
const formData = ref({
      video: {videoId:7,authorId:1},
      file: null,
    });
</script>./views/video/PlayerView.vue