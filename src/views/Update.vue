<template>
    <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #0f9876">
      <div style="display: flex; background-color: white; width: 50%; border-radius: 5px; overflow: hidden;">
        <div style="flex: 1">
          <img src="@/assets/images/login.jpg" alt="" style="width: 100%;"> 
        </div>
        <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
          <el-form :model="user" style="width: 80%" label-width="80px">
            <div style="font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 20px">修改个人信息</div>
            <div style="font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 20px; color: blue;">   
                <el-upload
                    class="avatar-uploader"
                    action="http://localhost:8088/User/avatarUpload"
                    :show-file-list="false"
                    :headers="{ token: user.token }"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="user.avatar" :src="user.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <el-form-item label="ID" prop="uid">
              <el-input prefix-icon="el-icon-user" size="medium" placeholder="用户ID" v-model="user.uid" disabled></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="userName">
              <el-input prefix-icon="el-icon-user" size="medium" placeholder="用户名称" v-model="user.userName"></el-input>
            </el-form-item>
            <el-form-item style="display: flex;">
                <el-button type="primary" style="flex: 1;" @click="registery">保 存</el-button>
                <el-button type="primary" style="flex: 1;" @click="back">返 回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </template>

<script>
import request from '@/utils/request'
import { ElMessage } from 'element-plus'

export default{
    name: "Update",

    data() {
        return {
            msg: '',
            stateCode: 0,
            user: JSON.parse(localStorage.getItem('user') || '{}'),
            checkPassword: ''
        }
    },
    created(){

    },
    methods:{
        registery(){
        
            if( this.user.userName === ''){
                ElMessage({ type: 'error', message: '用户名称不能为空' });
            }else{
                request.post('/User/update', this.user).then( res =>{
                    this.stateCode = res.code
                    if(this.stateCode === 200){
                        ElMessage({ type: 'success', message: '保存成功' });
                        this.user = res.data.user;      // 更新 user 信息
                        localStorage.setItem("user", JSON.stringify(this.user));        //更新成功后更新 localStorage 中的 user 信息
                        this.$emit('update-user', this.user);     //出发父组件的自定义事件 update-user
                    }
                }).catch(error => {
                    console.error(error);
                })
            }
        },

        back(){

        },

        //头像上传函数
        handleAvatarSuccess(res, file, fileList) {
          console.log(res.data.path)
          this.user.avatar = res.data.path;     //因为修改前后 user.avatar 相同，所以不会触发下载
          /*this.user.avatar = '111'
          setTimeout(() => {
            this.user.avatar = res.data.path;
          }, 1000); // 1000毫秒，即1秒*/
        },

        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>