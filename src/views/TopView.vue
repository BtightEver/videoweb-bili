<template>
  <div class="common-layout">
    <el-container>
      <el-header><el-row>
          <el-col :span="6">
            <router-link :to="{ path: '/MainView' }">
              <div ref="icon">
                <svg style="transition:all .3s ease" ref="home_icon" xmlns="http://www.w3.org/2000/svg" width="32"
                  height="32" viewBox="0 0 24 24">
                  <path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z" />
                </svg>
                <el-text class="mx-1" type="primary">首页</el-text>
              </div>
            </router-link>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-input class="searchInput" v-model="input" placeholder="Please input" style="width: 300px">
              <template #append>
                <el-button :icon="Search" @click="handleSuffixClick" />
              </template>
            </el-input>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-dropdown class="userAvatar">
              <el-avatar :size="50" :src="circleUrl" />
              <template #dropdown>
                <el-dropdown-menu>
                  <router-link to="/Update">
                    <el-dropdown-item><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"
                        clip-rule="evenodd">
                        <path
                          d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" />
                      </svg>个人中心
                    </el-dropdown-item>
                  </router-link>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                  <el-dropdown-item>Action 3</el-dropdown-item>
                  <el-dropdown-item>Action 4</el-dropdown-item>
                  <router-link to="/Login">
                    <el-dropdown-item><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"
                        clip-rule="evenodd">
                        <path
                          d="M11 21h8.033v-2l1-1v4h-9.033v2l-10-3v-18l10-3v2h9.033v5l-1-1v-3h-8.033v18zm-1 1.656v-21.312l-8 2.4v16.512l8 2.4zm11.086-10.656l-3.293-3.293.707-.707 4.5 4.5-4.5 4.5-.707-.707 3.293-3.293h-9.053v-1h9.053z" />
                      </svg>退出登录</el-dropdown-item>
                  </router-link>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
          <el-divider />
        </el-row></el-header>
      <el-main>
        <router-view class="TopView_routerView" @update-user="updateUser">
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'TopView',
};
</script>


<script  setup>
import logo from "@/assets/logo.jpg"
import { ref } from 'vue'
import { Calendar, Search, User } from '@element-plus/icons-vue'
import { defineComponent } from 'vue'       // 导入子组件注册
import { reactive, toRefs } from 'vue'
import router from '../router'
import Update from './Update.vue'

const user = ref(JSON.parse(localStorage.getItem("user")))

// 根据 user 是否为 null 设置 circleUrl
let userAvatar = ''
if (user.value !== null) {
  userAvatar = user.value.avatar
}
else{
  userAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
}

const state = reactive({
  circleUrl:
    userAvatar,       //顶部导航栏显示的用户的头像图片
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'],
})
console.log()
const { circleUrl, squareUrl, sizeList } = toRefs(state)
const input = ref('')
const url =
  'http://localhost:8090/images/0/demo.jpg'
// 自定义图标组件
const handleSuffixClick = () => {
  console.log("点击了后缀图标")
  // 在这里执行后缀图标点击事件的逻辑
  console.log("在导航栏获取到input是" + input.value)
  router.push({ name: "/SearchView", query: { "input": input.value } })
}

const updateUser = (userData) => {
  user.value = userData
}

const UpdateComponent = defineComponent({
  components: {
    Update        // 注册子组件 Update
  }
})
</script>


<style scoped>
.el-row {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #e65564;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.nav-bar {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.icon {
  display: flex;
  height: 32px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all .3s ease;
}

.icon:hover {
  color: var(--ava);
}

.icon:hover svg {
  fill: var(--ava);
}

.icon span {
  font-size: 25px;
}

.userAvatar {
  margin-left: 200px;
}

.TopView_routerView {
  height: 100%;
}
</style>