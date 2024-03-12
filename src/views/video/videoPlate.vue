<template>
  <el-container>
    <el-aside width="200px" style="background-color: #ccd2d2">
      <el-menu text-color="#303133" active-text-color="#409EFF" router="false">
        <el-menu-item index="/videos/type/type1">type one</el-menu-item>
        <el-menu-item index="/videos/type/type2">type two</el-menu-item>
        <el-menu-item index="/videos/type/type3">type three</el-menu-item>
        <el-menu-item index="/videos/type/type4">type four</el-menu-item>
        <el-menu-item index="/videos/type/type5">type five</el-menu-item>
        <el-menu-item index="/videos/type/type6">type six</el-menu-item>
      </el-menu>
    </el-aside>
    <router-view></router-view>
  </el-container>
</template>
  
  <script>
  import MenuBar from '@/layout/menuBar/index.vue'
  export default {
      components: {
          MenuBar
      }
  }
  </script>
  
  <style>
  .header{
    flex-direction: row;
  }
  </style>