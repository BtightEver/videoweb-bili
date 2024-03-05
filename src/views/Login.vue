<template>
  <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #0f9876">
    <div style="display: flex; background-color: white; width: 50%; border-radius: 5px; overflow: hidden;">
      <div style="flex: 1">
        <img src="@/assets/images/login.jpg" alt="" style="width: 100%;"> 
      </div>
      <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
        <el-form :model="user" style="width: 80%">
          <div style="font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 20px">欢迎登陆普惠金融视频分享平台</div>
          <el-form-item prop="uid">
            <el-input prefix-icon="el-icon-user" size="medium" placeholder="请输入用户账号" v-model="uid"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" prefix-icon="el-icon-lock" size="medium" placeholder="请输入用户密码" v-model="password"></el-input>
          </el-form-item>
          <el-form-item prop="validCode">
            <div style="display: flex;">
              <el-input prefix-icon="el-icon-lock" size="medium" style="flex: 1;" placeholder="请输入验证码" v-model="sidentifyMode"></el-input>
              <div class="code" @click="refreshCode">
                <SIdentify  :identifyCode="identifyCode"></SIdentify>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%;" @click="login">登 录</el-button>
          </el-form-item>
          <div style="display: flex;">
            <div style="flex: 1">还没有账号？立即<span style="color: #0f9876; cursor: pointer;" @click="toRegistery">注册</span></div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import SIdentify from "@/components/Sidentify.vue";
import request from '@/utils/request'
import { ElMessage } from 'element-plus'

export default{

  data() {
    return {
      stateCode: 0,
      uid: '',
      password: '',
      user: {
        id: 0,
        uid: '',
        password: '',
        user_name: '',
        create_time: new Date(),
        avatar: '',
        token: '',
      },
      sidentifyMode: '', // 输入框验证码
      identifyCode: '', // 图形验证码
      identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz' // 验证码出现的数字和字母
    }
  },

  mounted(){
    this.identifyCode = '';
    this.makeCode(this.identifyCodes, 4);
  },

  components:{
    SIdentify
  },

  methods: {
    login(){
      
      if (this.sidentifyMode == '') {     //验证验证码是否为空
        ElMessage({ type: 'error', message: '验证码不能为空!' });
        this.refreshCode();
      }
      else if (this.sidentifyMode != this.identifyCode) {     //验证验证码是否正确
        ElMessage({ type: 'error', message: '验证码错误' });
        this.refreshCode();
      } else {
        this.user.uid = this.uid;
        this.user.password = this.password;
        request.post('/User/login', this.user).then( res =>{
            this.stateCode = res.code;
            if(this.stateCode === 200){
              ElMessage({ type: 'success', message: '登录成功！' });
              this.user = JSON.stringify(res.data.user);
              localStorage.setItem("user", this.user);
              this.$router.push('/Update');     //可以设置登陆成功后跳转的页面
            }
            else {
              ElMessage({ type: 'error', message: '用户名或密码错误！' });
            }
          }).catch(error => {
            console.error(error);
        })
      }
    },

    toRegistery(){
      this.$router.push('/Registery');
    },

    // 生成随机数
    randomNum(min, max){
      max = max + 1
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 随机生成验证码字符串
    makeCode(o, l){
      for (let i = 0; i < l; i++) {
        this.identifyCode += o[this.randomNum(0, o.length)]
      }
    },
    // 更新验证码
    refreshCode(){
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    }
  }
}
</script>

<style>
</style>