<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="250px">
        <div class="mine-infos-view">
          <div class="info-box flex-view">
            <div class="name-box">
              <h2 class="nick">测试用户</h2>
              <el-divider border-style="dashed" />
              <div class="mine-item flex-view" @click="showUploadView">
                <i class="fa fa-arrow-circle-up" style="font-size: 18px; color: grey"></i>
                <span>上传视频</span>
              </div>
            </div>
          </div>

          <div class="counts-view"></div>

          <div class="order-box">
            <div class="title">交互中心</div>
            <div class="list">
              <div class="mine-item flex-view" @click="showCollectionView">
                <i class="fa fa-star" style="font-size: 18px; color: grey"></i>
                <span>我的收藏</span>
              </div>

              <div class="mine-item flex-view" @click="ShowFavoriteView">
                <i class="fa fa-heart" style="font-size: 18px; color: grey"></i>
                <span>我的喜欢</span>
              </div>
              <div class="mine-item flex-view" @click="ShowCommentView">
                <i
                  class="fa fa-comments"
                  style="font-size: 18px; color: grey"
                ></i>
                <span>我的评论</span>
              </div>
            </div>
          </div>

          <div class="setting-box">
            <div class="title">个人设置</div>
            <div class="list">
              <div class="mine-item flex-view" @click="ShowEditInfoView">
                <i class="fa fa-edit" style="font-size: 18px; color: grey"></i>
                <span>编辑资料</span>
              </div>
              <div class="mine-item flex-view" @click="ShowEditAccountView">
                <i
                  class="fa fa-th-large"
                  style="font-size: 18px; color: grey"
                ></i>
                <span>修改密码</span>
              </div>
              <div class="mine-item flex-view" @click="ShowMessageView">
                <i
                  class="fa fa-envelope-open"
                  style="font-size: 20px; color: grey"
                ></i>
                <span>消息管理</span>
              </div>
            </div>
          </div>
        </div>
      </el-aside>
      <el-main>
        <div class="right-content">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </div>

  <!--div style="background-color: grey">
    这是个人中心
    <el-upload
      class="upload-demo"
      drag
      action="http://localhost:8090/videos/"
      multiple
      :data="formData"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖入文件或者 <em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip"></div>
      </template>
    </el-upload>
  </div-->
</template>

<script setup name="UserView">
console.log("UserView setup阶段执行了");
import { useRouter } from "vue-router";
import axios from "axios";


const router = useRouter();

const showUploadView = () => { //router.push({ name: "UploadView" }); 
router.push('/UploadView');};

const showCollectionView = () => { //router.push({ name: "CollectionView" }); 
router.push('/CollectionView');};

const ShowFavoriteView = () => { //router.push({ name: "FavoriteView" }); 
router.push('/FavoriteView');};

const ShowCommentView = () => { //router.push({ name: "CommentView" }); 
router.push('/CommentView');};

const ShowEditInfoView = () => { //router.push({ name: "EditInfoView" }); 
router.push('/Update');};

const ShowEditAccountView = () => { //router.push({ name: "EditAccountView" }); 
router.push('/UpdatePassword');};

const ShowMessageView = () => { //router.push({ name: "MessageView" }); 
router.push('/MessageView');};
</script>

<style scoped lang="less">
.flex-view {
  display: flex;
}

.mine-infos-view {
  width: 180px;
  margin-right: 20px;
  border: 1px solid #cedce4;
  height: fit-content;

  .info-box {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 16px 16px 0;
    overflow: hidden;
  }

  .name-box {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow: hidden;

    .nick {
      color: #152844;
      font-weight: 600;
      font-size: 18px;
      line-height: 24px;
      height: 24px;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 0;
      overflow: hidden;
    }

    .up-button {
      font-size: 12px;
      color: #6f6f6f;
      height: 16px;
      line-height: 16px;
      margin-top: 8px;
    }

    .give-point {
      color: #4684e2;
      cursor: pointer;
      float: right;
    }
  }

  .counts-view {
    border: none;
    padding: 16px;
  }

  .counts {
    margin-top: 12px;
    text-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

    .flex-item {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      cursor: pointer;
    }

    .text {
      height: 16px;
      line-height: 16px;
      color: #6f6f6f;
    }

    .num {
      height: 18px;
      line-height: 18px;
      color: #152844;
      font-weight: 600;
      font-size: 14px;
      margin-top: 4px;
    }

    .split-line {
      width: 1px;
      height: 24px;
      background: #dae6f9;
    }
  }

  .intro-box {
    border-top: 1px solid #cedce4;
    padding: 16px;

    .title {
      color: #6f6f6f;
      font-size: 12px;
      line-height: 16px;
    }

    .intro-content {
      color: #152844;
      font-size: 14px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 8px 0;
    }
  }

  .create-box {
    cursor: pointer;
    border-top: 1px solid #cedce4;
    padding: 16px;

    .title {
      position: relative;
      color: #152844;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      height: 18px;
    }

    .counts {
      margin-top: 12px;
      text-align: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      .flex-item {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        cursor: pointer;
      }

      .split-line {
        width: 1px;
        height: 24px;
        background: #dae6f9;
      }
    }
  }

  .order-box {
    border-top: 1px solid #cedce4;
    padding: 16px;

    .title {
      color: #152844;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      height: 18px;
      margin-bottom: 8px;
    }

    .list {
      padding-left: 16px;

      .mine-item {
        border-top: 1px dashed #cedce4;
        cursor: pointer;
        height: 48px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;

        img {
          width: 24px;
          margin-right: 8px;
          height: 24px;
        }

        span {
          color: #152844;
          font-size: 14px;
        }
      }

      .mine-item:first-child {
        border: none;
      }
    }
  }

  .setting-box {
    border-top: 1px solid #cedce4;
    padding: 16px;

    .title {
      color: #152844;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      height: 18px;
      margin-bottom: 8px;
    }

    .list {
      padding-left: 16px;
    }

    .mine-item {
      border-top: 1px dashed #cedce4;
      cursor: pointer;
      height: 48px;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      img {
        width: 24px;
        margin-right: 8px;
        height: 24px;
      }

      span {
        color: #152844;
        font-size: 14px;
      }
    }

    .mine-item:first-child {
      border: none;
    }
  }
}
</style>