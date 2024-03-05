<template>
    <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #0f9876">
      <div style="display: flex; background-color: white; width: 50%; border-radius: 5px; overflow: hidden;">
        <div style="flex: 1">
          <img src="@/assets/images/login.jpg" alt="" style="width: 100%;"> 
        </div>
        <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
          <el-form :model="user" style="width: 80%">
            <div style="font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 20px">修改密码</div>
            <el-form-item prop="password">
              <el-input type="password" prefix-icon="el-icon-user" size="medium" placeholder="请输入原密码" v-model="password"></el-input>
            </el-form-item>
            <el-form-item prop="newPassword">
              <el-input type="password" prefix-icon="el-icon-lock" size="medium" placeholder="请输入新密码" v-model="newPassword"></el-input>
            </el-form-item>
            <el-form-item prop="checknewPassword">
              <el-input type="password" prefix-icon="el-icon-lock" size="medium" placeholder="请输入新密码" v-model="checknewPassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width: 100%;" @click="updatePassword">修 改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </template>

<script>
import { ElMessage } from 'element-plus'
import request from '@/utils/request'

export default{
    data(){
        return {
            stateCode: 0,
            user: JSON.parse(localStorage.getItem('user') || '{}'),
            password: '',
            newPassword: '',
            checknewPassword: ''
        }
    },

    methods:{
        updatePassword(){
            if(this.password === ''){
                ElMessage({ type: 'error', message: '密码不能为空' });
            }
            else if(this.password != this.user.password){
                ElMessage({ type: 'error', message: '密码错误' });
            }
            else if(this.newPassword === ''){
                ElMessage({ type: 'error', message: '新密码不能为空' });
            }
            else if(this.newPassword != this.checknewPassword){
                ElMessage({ type: 'error', message: '两次输入密码不一致' });
            }
            else{
                this.user.password = this.newPassword; 
                console.log("===="+JSON.stringify(this.user));
                request.post('/User/updatePassword', this.user).then( res =>{
                    this.stateCode = res.code;
                    if(this.stateCode === 200){
                        ElMessage({ type: 'success', message: '修改密码成功' });
                        localStorage.removeItem("user");
                        this.$router.push('/Login');
                    }
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }
} 
</script>
  