<template>
    <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #0f9876">
      <div style="display: flex; background-color: white; width: 50%; border-radius: 5px; overflow: hidden;">
        <div style="flex: 1">
          <img src="@/assets/images/login.jpg" alt="" style="width: 100%;"> 
        </div>
        <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
          <el-form :model="user" style="width: 80%">
            <div style="font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 20px">欢迎注册普惠金融视频分享平台</div>
            <el-form-item prop="uid">
              <el-input prefix-icon="el-icon-user" size="medium" placeholder="请设置用户账号" v-model="user.uid"></el-input>
            </el-form-item>
            <el-form-item prop="userName">
              <el-input prefix-icon="el-icon-user" size="medium" placeholder="请设置用户名称" v-model="user.userName"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" prefix-icon="el-icon-lock" size="medium" placeholder="请设置用户密码" v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item prop="checkPassword">
              <el-input type="password" prefix-icon="el-icon-lock" size="medium" placeholder="再输入用户密码,保证两次输入相同" v-model="checkPassword"></el-input>
            </el-form-item>
            <el-form-item style="display: flex;">
                <el-button type="primary" style="flex: 1;" @click="registery">注 册</el-button>
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

    data() {
        return {
          imageUrl: '',
            stateCode: 0,
            user: {
                id: 0,
                uid: '',
                password: '',
                userName: '',
                createTime: new Date(),
                avatar: '',
                token: '',
            },
            checkPassword: ''
        }
    },

    methods:{
        registery(){
            if(this.user.uid === '' || this.user.userName === '' || this.user.password === ''){
              ElMessage({ type: 'error', message: '用户信息不能为空！' });
            }
            else if(this.user.uid.length > 20 || this.user.userName.length > 20 || this.user.password.length > 20){
              ElMessage({ type: 'error', message: '用户信息长度不能超过20！' });
            }
            else if(this.user.password != this.checkPassword){
              ElMessage({ type: 'error', message: '两次输入密码不一致！' });
            }else{
              request.post('/User/registery', this.user).then( res =>{
                this.stateCode = res.code
                if(this.stateCode === 200){
                  ElMessage({ type: 'success', message: '注册成功' });
                  this.$router.push('/Login');
                }
                }).catch(error => {
                  console.error(error);
                })
            }
        },

        back(){
          this.$router.push('/Login');
        },
    }
}
</script>

<style>
</style>