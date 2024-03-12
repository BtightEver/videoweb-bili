<template>
  <div class="collection-view">
    <div class="collection-title"><h1>我的收藏</h1></div>
    <el-divider />
    <div class="collection-video">
      <div v-for="video in videoData" :key="video.id" class="video-item">
        <div class="video-thumbnail" @click="play(video.uid)">
          <img :src="require(`@/assets/${video.videoImg}`)" alt="Video Image" />
        </div>
        <div class="video-details">
          <div style="color: #a1adc5; margin-right: 20px">{{video.videoName}}</div>
          <i class="fa fa-window-close" @click="deleteButton(video.uid, video.videoId)"/>
          <!-- <el-button plain @click="deleteButton(video.uid, video.videoId)">移除</el-button> -->
        </div>
      </div>
      <template v-if="!videoData || videoData.length <= 0">
        <div class="none-data"><i class="fa fa-smile"></i>暂无收藏的视频，快去收藏视频吧！</div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  data() {
    return {
      videoData: [],
    };
  },
  created() {
    this.fetchVideoData();
  },
  methods: {
    fetchVideoData() {
      axios
        .get("http://localhost:8088/UserCollection/getUserCollection/123")
        .then((response) => {
          console.log(JSON.stringify(response));
          this.videoData = response.data.data.collectionList;
          console.log("111");
          console.log(this.videoData);
        })
        .catch((error) => {
          console.error("Error fetching video data: ", error);
        });
    },
    deleteVideo(uid, videoId) {
      axios
        .delete(
          `http://localhost:8088/UserCollection/deleteCollection/${uid}/${videoId}`
        )
        .then(() => {
          // 删除成功后更新视图
          this.videoData = this.videoData.filter(
            (video) => !(video.uid === uid && video.videoId === videoId)
          );
        })
        .catch((error) => {
          console.error("Error deleting video: ", error);
        });
    },
    deleteButton(uid, videoId){
      ElMessageBox.confirm(
      '是否将该视频移除收藏',
      '移除收藏',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
      )
      .then(() => {
        this.deleteVideo(uid, videoId);   //执行删除操作
        ElMessage({
          type: 'success',
          message: '移除成功',
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '移除取消',
        })
      })
    },
    play(videoId){
      alert("播放视频")
    },
  },
};
</script>

<style>
.collection-video {
  display: flex;
  flex-wrap: wrap;
}

.video-item {
  width: 20%;
  padding: 10px;
  box-sizing: border-box;
}

.video-thumbnail img {
  width: 100%;
  height: auto;
}

.video-details {
  text-align: center;
  margin-top: 10px;
}

.video-details button {
  padding: 5px 10px;
  background-color: #3ca6c0;
  color: #fff;
  border: none;
  cursor: pointer;
}

.video-details{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
}

.none-data {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform: scale(1.2);
  color: #5d6364;
}
</style>
