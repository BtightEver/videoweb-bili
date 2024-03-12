<template>
  <div class="MainView">
    <ul class="infinite-list" style="overflow: auto">
      <li v-for="video in videoList" :key="video.id">
        <div class="border-container" @click="handleClickVideo(video.videoId, video.uid)">    <!--将视频id，创建人id传到函数中，点击视频跳转到播放页面--> 
          <!--==========================================================================================================-->
          <div class="img-container">
            <img :src="`${baseApi}/images/?uid=${video.uid}&videoId=${video.videoId}`" alt="" loading="lazy">     <!--显示用户视频图片-->
          </div>
          <div class="main-recommend-li-title" :title="video.videoName">    <!--显示视频标题-->
            {{ video.videoName }}
          </div>
          <!--==========================================================================================================-->
          <div class="main-recommend-li-detail-container">
            <div class="main-recommend-li-detail" :title="video.creatorName">
              <a :href="'https://kotokawa-akira-mywife.site/web/Mine/' + video.up" target="_blank">
                <div class="upName_span">
                  {{ video.creatorName }}
                </div>
              </a>
            </div>
            <!--==========================================================================================================-->
            <div style="width:47%" class="main-recommend-li-detail ">
              <div class="main-recommend-li-detail-play">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                  <path
                    d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" />
                </svg>

                <span>
                  {{ video.views }}
                </span>
              </div>
              <div class="main-recommend-li-detail-play">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                  <path
                    d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z" />
                </svg>
                <span>{{ video.uploadTime }}</span>
              </div>
            </div>
            <!--==========================================================================================================-->
          </div>
        </div>

      </li>
    </ul>
    <div class="loadmore" v-show="isNoMore" ref="loadmore">没有更多了</div>
    <el-button type="primary" :loading="isLoading" v-show="!isNoMore" @click="loadMore">
      <template #loading>
        <div class="custom-loading">
          <svg class="circular" viewBox="-10, -10, 50, 50">
            <path class="path" d="
            M 30 15
            L 28 17
            M 25.61 25.61
            A 15 15, 0, 0, 1, 15 30
            A 15 15, 0, 1, 1, 27.99 7.5
            L 15 15
          " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)" />
          </svg>
        </div>
      </template>
      加载更多
    </el-button>
  </div>
</template>

<script setup name="MainView">
console.log("MainView setup阶段执行了")
import logo from "@/assets/logo.jpg"
import request from '@/utils/Axios'
import { ref, onMounted, reactive } from 'vue';
import router from '../router'
console.log("VUE_APP_BASE_URL:", process.env.VUE_APP_BASE_API);
const baseApi = process.env.VUE_APP_BASE_API
let i = 1;
let step = 20;
fetchData(i, step)
let videoList = reactive([]);
let isLoading = ref(true);
let isNoMore = ref(false);

async function fetchData(pageIndex, size) {
  try {
    const response = await request.get('/videos/list', {
      params: {
        pageIndex: pageIndex,
        size: size,
      },
    });
    const responseData = response.data;       // 将响应数据赋值给变量
    console.log("responseData是" + JSON.stringify(responseData))
    videoList.push(...responseData.data.videoList.records);       //将返回数据放入 videoList 中
    videoList.forEach(video => {        // 循环视频列表 videoList 中的每个视频 video，给每个视频的时间都转换为 yyyy-MM-dd 格式
      video.uploadTime=TimeTrans(video.uploadTime);
    });
    console.log("videoList是" + JSON.stringify(videoList))

    isLoading.value = !isLoading.value;
    if (responseData.data.videoList.current >= responseData.data.videoList.pages) {       // 根据视频的数量决定是否加载更多
      isNoMore = !isNoMore
    }
    // 在这里可以对响应数据进行进一步处理
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

const TimeTrans =(timestamp)=> {
        // 创建一个新的 Date 对象，将时间戳作为参数传入
        const date = new Date(timestamp);

        // 使用 Date 对象的方法获取年、月、日信息
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 月份是从0开始的，需要加1
        const day = date.getDate();

        // 格式化日期输出
        const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        return formattedDate;
    }

const loadMore = () => {
  isLoading.value = !isLoading.value;
  i = i + 1;
  fetchData(i, step)
}

const handleClickVideo = (videoId, uid) => {
  console.log("点击了视频图标")
  // 在这里执行后缀图标点击事件的逻辑
  console.log("获取到videoId是" + videoId)
  console.log("获取到uid是" + uid)
  //router.push({ name: "/PlayerView", query: { "videoId": videoId, "uid": uid } })
  router.push({ path: '/PlayerView', query: { videoId: videoId, uid: uid }})
};

</script>

<style scoped>
.el-button .custom-loading .circular {
  margin-right: 6px;
  width: 18px;
  height: 18px;
  animation: loading-rotate 2s linear infinite;
}

.el-button .custom-loading .circular .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-button-text-color);
  stroke-linecap: round;
}

.border-container {
  padding: 5px;
  border: 1px solid transparent;
  border-radius: 6px;
  transition: all .3s ease;
}

.border-container:hover {
  border: 1px solid var(--ava);
}

.load-more {
  display: flex;
  justify-content: center;
  align-items: center;
  writing-mode: tb;
  width: 38px;
  padding: 12px 5px 12px 5px;
  cursor: pointer;
  user-select: none;
  border-radius: 10px;
  border: 1px solid var(--line_regular);
  position: fixed;
  right: 30px;
  top: 40%;
  background-color: rgba(255, 255, 255, 0.6);
  transition: all .3s ease;
  letter-spacing: 2px;
}

.load-more:hover {
  background-color: rgb(225, 225, 225, 0.6);
}

.btn-hold {
  transform: scale(0.9);
}

.MainView ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
}

.MainView li {
  aspect-ratio: 16/11;
  width: 20%;
  padding: 5px;
  box-sizing: border-box;
}

.MainView li img {
  object-fit: cover;
  aspect-ratio: 16/9;
  width: 100%;
  cursor: pointer;
}

.img-container {
  border-radius: 6px;
  overflow: hidden;
}

.MainView {
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.MainView section {
  padding-top: 20px;
  width: 80%;
}


.main-recommend-li-title {
  height: 54px;
  overflow: hidden;
  word-wrap: break-word;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 20px;
  text-align: left;
  transition: color .3s ease;
  cursor: pointer;
  color: #000;
}

.main-recommend-li-detail {
  font-size: 18px;
  display: flex;
  flex-direction: column;
  width: 53%;
  justify-content: flex-start;
  align-items: flex-start;
  color: rgb(129, 129, 129);
  transition: color .3s ease;
  cursor: pointer;
  text-align: left;
}

.upName_span {
  text-align: left;
  width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  word-wrap: break-word;
}

.main-recommend-li-detail svg {
  fill: rgb(129, 129, 129);
  transition: fill .3s ease;
}

.main-recommend-li-detail-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 5px;
}

.main-recommend-li-detail-container span {
  padding-top: 2.5px;
  margin-left: 5px;
}

.main-recommend-li-detail-play {
  padding-right: 5px;
  white-space: nowrap;
}

.main-recommend-li-detail:hover {
  color: var(--ava);
}

.main-recommend-li-detail:hover svg {
  fill: var(--ava);
}

.main-recommend-li-title:hover {
  color: var(--ava);
}

.loadmore {
  font-size: 25px;
  padding: 5px 0px 20px 0px;
}

.aside {
  position: fixed;
  right: 50px;
  bottom: 50px;
}

.backtopShow-enter-active,
.backtopShow-leave-active {
  transition: all .3s ease;
}

.backtopShow-enter-from,
.backtopShow-leave-to {
  opacity: 0.0 !important;
}

.backtopShow-enter-to,
.backtopShow-leave-from {
  opacity: 1.0 !important;
}

@media screen and (max-width:550px) {
  .MainView section {
    width: 100%;
  }

  .MainView li {
    width: 50%;
    padding: 10px;
  }

  .aside {
    bottom: 65px;
    right: 30px;
  }

  .main-recommend-li-detail {
    font-size: 14px;
  }

  .main-recommend-li-detail span {
    font-size: 10px;
    margin-left: 5px;
  }

  .main-recommend-li-detail svg {
    height: 10px;
    width: 10px;
  }

  .main-recommend-li-title {
    font-size: 14px;
    height: 35px;
  }

  .load-more {
    display: none;
  }

  .options-li {
    margin: 0 !important;
  }
}

@media screen and (550px<width<=800px) {
  .main-recommend-li-detail {
    font-size: 14px;
  }

  .main-recommend-li-detail span {
    font-size: 10px;
    margin-left: 5px;
  }

  .main-recommend-li-detail svg {
    height: 10px;
    width: 10px;
  }

  .main-recommend-li-title {
    font-size: 14px;
    height: 35px;
  }

  .MainView li {
    width: 33%;
  }
}

@media screen and (800px<width<=1100px) {
  .main-recommend-li-detail {
    font-size: 14px;
  }

  .main-recommend-li-detail span {
    font-size: 10px;
    margin-left: 5px;
  }

  .main-recommend-li-detail svg {
    height: 10px;
    width: 10px;
  }

  .main-recommend-li-title {
    font-size: 14px;
    height: 35px;
  }

  .MainView li {
    width: 25%;
  }
}

@media screen and (1100px<width<=1500px) {
  .main-recommend-li-detail {
    font-size: 16px;
  }

  .main-recommend-li-detail span {
    font-size: 12px;
    margin-left: 5px;
  }

  .main-recommend-li-detail svg {
    height: 12px;
    width: 12px;
  }

  .main-recommend-li-title {
    font-size: 16px;
    height: 40px;
  }
}
</style>