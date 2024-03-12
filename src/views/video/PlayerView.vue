<template>
  <div class="common-layout">
    <el-button type="success" style="margin-left: 20px;" @click="addCollection">{{ collection }}</el-button>
        <el-container>
          <el-main>
            <div ref="playerContainer"></div>
            <comment :videoId="route.query.videoId"></comment>
          </el-main>
        </el-container>
  </div>
</template>

<script setup name="PlayerView">
import { ref, onMounted, defineComponent } from 'vue';
import DPlayer from 'dplayer';
import {useRoute} from 'vue-router'
import Comment from './Comment.vue';
import request from '@/utils/request';
import { ElMessage } from 'element-plus';

let collection = ref('收藏')
let isCollection = ref(-1)

const ComTestComponent = defineComponent({          // 注册组件
    components: {
        Comment
    }
});

const route = useRoute()
// 打印query参数
console.log(route.query)
const playerContainer = ref(null);

onMounted(() => {
  const videoBaseUrl = 'http://localhost:8088/videos';
  const videoUrl = `${videoBaseUrl}?uid=${route.query.uid}&videoId=${route.query.videoId}`;
  const imgBaseUrl = 'http://localhost:8088/images';
  const imgUrl = `${imgBaseUrl}?uid=${route.query.uid}&videoId=${route.query.videoId}`;
  const dp = new DPlayer({
    container: playerContainer.value,
    video: {
      url: videoUrl,
      pic: imgUrl,
      thumbnails: '',
    },
  });

  isCollectionMethod();
});

const isCollectionMethod = () => {      //判断用户是否收藏了该视频
  let user = JSON.parse(localStorage.getItem("user"))
  if( user != null ){
    request.get('/UserCollection/getSingleColltection', {params: { uid: user.uid, videoId: route.query.videoId}}).then( res => {
      let stateCode = res.code;
      if(stateCode === 200){
        isCollection.value = res.data.isExist;
        if(isCollection.value === -1){
          collection.value = '收藏'
        }
        else if(isCollection.value === 1){
          collection.value = '已收藏'
        }
      }
    }).catch(error => {
      console.error(error)
    })
  }
}

const addCollection = () => {     //用户收藏视频
  if(isCollection.value === -1){
    let user = JSON.parse(localStorage.getItem("user"))
    if( user === null ){
      ElMessage({ type: 'error', message: '请登录！' });
    }
    else {
      let UserCollection = {
        uid: user.uid,
        videoId: route.query.videoId,
        videoName: '',
        videoImg: ''
      }
      console.log("UserCollection："+UserCollection)
      request.post('/UserCollection/addCollection', UserCollection).then( res => {
        let stateCode = res.code;
        if(stateCode === 200){
          isCollection.value = 1
          collection.value = '已收藏'
        }
      }).catch(error => {
        console.error(error);
      })
    }
  }
  else{
    let user = JSON.parse(localStorage.getItem("user"))
    if( user === null ){
      ElMessage({ type: 'error', message: '请登录！' });
    }
    else {      //用户取消收藏
      request.delete('/UserCollection/deleteCollection', {params: { uid: user.uid, videoId: route.query.videoId}}).then( res => {
        let stateCode = res.code;
        if(stateCode === 200){
          isCollection.value = -1;
          collection.value = '收藏'
        }
      }).catch(error => {
        console.error(error);
      })
    }
  }
}
</script>

<style>
/* 样式可以根据你的需求进行自定义 */
</style>