<template>
  <div class="upload-view">
    <router-link to="/UserView">返回</router-link>
    <div class="upload-title"><h1>上传视频</h1></div>
    <el-divider />
    <div class="upload-table">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="视频标题" prop="videoName">
          <el-input v-model="ruleForm.videoName"></el-input>
        </el-form-item>
        <!--el-form-item label="上传用户" prop="creatorName">         先注释掉，后面看情况恢复
          <el-select v-model="ruleForm.createName" placeholder="请选上传用户">
            <el-option label="用户" value="shanghai"></el-option>
          </el-select>
        </el-form-item-->
        <!--el-form-item label="上传时间" prop="uploadTime" required @click="updateUploadTime">       上传时间可以不需要在前端，后端会自动添加创建时间
          <el-input
            v-model="ruleForm.uploadTime"
            placeholder="点击自动获取当前时间"
            readonly
          ></el-input>
        </el-form-item-->
        <!--el-form-item label="上传视频">
          <el-input v-model="ruleForm.videoName"></el-input>
        </el-form-item-->
        <el-form-item label="视频简介" prop="videoDesc">
          <el-input type="textarea" v-model="ruleForm.videoDesc"></el-input>
        </el-form-item>

        <h3>下方选择上传视频</h3>
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :before-upload="beforeVideoUpload"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <h3>下方选择上传视频封面</h3>
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :before-upload="beforeImageUpload"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >上传视频</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import App from "@/App.vue";
import request from "@/utils/request";
import axios from "axios";

export default {
  components: { App },
  data() {
    return {
      imageUrl: '',
      ruleForm: {
        uid: "",
        videoName: "",
        creatorName: "",
        createTime: "",
        videoDesc: "",
      },
      videoFile: null,
      imageFile: null,
      rules: {
        videoName: [
          { required: true, message: "请输入视频标题", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        videoDesc: [
          { required: true, message: "请填写视频简介", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    updateUploadTime() {
      this.ruleForm.uploadTime = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " "); // 获取当前时间，精确到秒
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {      //  通过这种形式 this.$refs[formName] 调用表单
        if (valid) {
          const user = JSON.parse(localStorage.getItem("user"))
          this.ruleForm.uid = user.uid
          this.ruleForm.creatorName = user.userName

          const formData = new FormData();
          formData.append('uid', this.ruleForm.uid)
          formData.append('videoName', this.ruleForm.videoName)
          formData.append('creatorName', this.ruleForm.creatorName)
          formData.append('videoDescription', this.ruleForm.videoDesc)

          formData.append('videoFile', this.videoFile)
          formData.append('imageFile', this.imageFile)

          axios.post('/videos/', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then( res => {
            const stateCode = res.code
            if( stateCode === 200 ){
              console.log("res:"+JSON.stringify(res))
            }
          }).catch(error => {
            console.error(error)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    beforeImageUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      else {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log("imageUrl："+this.imageUrl)
        this.imageFile = file;
      }

      return isLt2M;
    },

    beforeVideoUpload(file) {
      // 获取文件名
      const fileName = file.name;
      // 检查文件名是否以 .mp4 结尾
      if (fileName.endsWith('.mp4')) {
          this.videoFile = file;
          return true;
      } else {
          this.$message.error("文件不是MP4文件");
          return false;
      }
    }
  },
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>