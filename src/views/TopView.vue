<template>
  <div class="common-layout">
    <div class="el-menu-layout">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router="true">
        <!--================================================================--><el-icon><Search /></el-icon>
        <el-input class="searchInput" v-model="searchContent" placeholder="Please input" style="width: 300px">      <!--搜索框-->
          <template #append>
            <el-button :icon="Search" circle @click="handleSuffixClick" class="searchButton" size="small"/>
          </template>
        </el-input>
        <!--================================================================-->
        <el-menu-item index="/MainView">首页</el-menu-item>
        <!--================================================================-->
        <el-menu-item style="float: right;">
          <el-dropdown @command="handleDFCommand">
            <span class="product">产品</span>
            <template v-slot:dropdown>
              <el-dropdown-menu class="dropdown-menu">
                <!--================================================================-->
                <el-menu-item>
                  <el-dropdown @command="handleDFCommand">
                    <span class="digitalFinance">数字金融</span>
                    <template v-slot:dropdown>
                      <el-dropdown-menu class="dropdown-menu">
                        <el-dropdown-item command="smallLoan">小额贷款</el-dropdown-item>
                        <el-dropdown-item command="investmentManagement">投资管理</el-dropdown-item>
                        <el-dropdown-item command="assetManagement">资产管理</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </el-menu-item>
                <!--================================================================-->
                <el-menu-item>
                  <el-dropdown @command="handleDTCommand">
                    <span class="digitalTechnology">数字科技</span>
                    <template v-slot:dropdown>
                      <el-dropdown-menu class="dropdown-menu">
                        <el-dropdown-item command="supplyChain-relationship">供应链管理</el-dropdown-item>
                        <el-dropdown-item command="supplier-relationship">供应商关系</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </el-menu-item>
                <!--================================================================-->
                <!--智慧康养-->
                <!--================================================================-->
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-menu-item>
        <!--================================================================-->
        <!--el-menu-item index="/video">视频</el-menu-item-->
        <!--el-menu-item index="/message">消息中心</el-menu-item-->
        <el-menu-item index="/information">关于我们</el-menu-item>
        <!--================================================================-->
        <el-menu-item>
          <el-dropdown @command="handleMyCommand">
            <span class="userAvatar">
              <el-avatar :size="50" :src="userAvatar" @click="login"/>
            </span>
            <template v-slot:dropdown>
              <el-dropdown-menu class="dropdown-menu">
                <el-dropdown-item command="profile">个人资料</el-dropdown-item>
                <el-dropdown-item command="update">修改信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>

    <el-container>
      <el-main>     <!--页面的主位置，渲染跳转之后的组件-->
        <router-view @update-user="handleUpdateUser"></router-view>   <!--跳转之后的组件，并接收子组件传过来的数据更新这个组件中的数据，并渲染视图-->
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
import { ref } from 'vue'
import { defineComponent } from 'vue'       // 导入子组件注册
import router from '../router'
import Update from './user/Update.vue'
import Login from './user/Login.vue'
import { Search } from '@element-plus/icons-vue'

const UpdateComponent = defineComponent({       //用于在 TopView 组件中注册子组件
  components: {
    Update,        // 注册子组件 Update
    Login        // 注册子组件 Login
  }
})

let userAvatar = ref('')
const user = ref(JSON.parse(localStorage.getItem("user")))    //获取登录的用户信息
if (user.value !== null) {      // 根据 user 是否为 null 设置 circleUrl
  userAvatar.value = user.value.avatar
}
else{
  userAvatar.value = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
}

const searchContent = ref('')

const handleSuffixClick = () => {     // 在这里执行后缀图标点击事件的逻辑

  //fetchData(1, 20)
  router.push({ name: "/SearchView", query: { "searchContent": searchContent.value } })
  //router.push({ name: '/SearchView', query: { searchContent: searchContent.value }})     //路由到点击的组件页面，并将在搜索框输入的参数searchContent传递过去
}

const handleUpdateUser =(userData)=> {
  user.value = userData;    // 获取子组件传过来的数据
  userAvatar.value = user.value.avatar;    // 将数据赋值给 userAvatar 并更新视图
}

const handleMyCommand = (command) => {      // 处理下拉菜单命令
  if(localStorage.getItem("user") != null){
    if (command === 'profile') {
        router.push('/UserView');
      }
      else if(command === 'update'){
        router.push('/Update');
      } 
      else if (command === 'logout') {
        localStorage.removeItem("user");      //退出登录后删除 localStorage 中的用户信息并跳转到登录页面
        router.push('/login');
        userAvatar.value = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      }
  }else{
      if (command === 'profile') {
        router.push('/login');
      }
      else if(command === 'update'){
        router.push('/login');
      } 
      else if (command === 'logout') {
        router.push('/login');
      }
  }
}

const handleDFCommand = (command) => {      //处理 产品 中的 数字金融
      if (command === 'smallLoan') {
        router.push('/DigitalFinance/1');
      } else if (command === 'investmentManagement') {
        router.push('/DigitalFinance/2');
      } else if (command === 'assetManagement') {
        router.push('/DigitalFinance/3');
      }
}

const handleDTCommand = (command) => {      //处理 产品 中的 数字科技
      if (command === 'supplyChain-relationship') {
        router.push('/DigitalTechnology/4');
      } else if (command === 'supplier-relationship') {
        router.push('/DigitalTechnology/5');
      }
}

const handleWHCCommand = (command) => {      //处理 产品 中的 智慧康养
      if (command === 'homeCare') {
        router.push('/WisdomHealth-care/1');
      } else if (command === 'communityCare') {
        router.push('/WisdomHealth-care/2');
      } else if (command === 'institutionCare') {
        router.push('/WisdomHealth-care/3');
      }
}

const login = () => {
  if(localStorage.getItem("user") === null){
    router.push('/login')
  }
}

</script>


<style scoped>

.el-menu-layout {
  text-align: right; /* 让内容居中 */
}

.searchInput {
  display: inline-block; /* 使搜索框在一行内居中显示 */
}

</style>