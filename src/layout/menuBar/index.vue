<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router="true">
            <el-menu-item index="/home">首页</el-menu-item>
            <el-submenu index="2">
            <template slot="title">产品</template>
            <el-submenu index="2-1">
                <template slot="title">数字金融</template>
                <el-menu-item index="/szjr/2-1-1">小额贷款</el-menu-item>
                <el-menu-item index="/szjr/2-1-2">投资管理</el-menu-item>
                <el-menu-item index="/szjr/2-1-3">资产管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2-2">
                <template slot="title">数字科技</template>
                <el-menu-item index="/szkj/2-2-1">供应链管理</el-menu-item>
                <el-menu-item index="/szkj/2-2-2">供应商关系</el-menu-item>
            </el-submenu>
            <el-submenu index="2-3">
                <template slot="title">智慧康养</template>
                <el-menu-item index="/zhky/2-3-1">居家养老</el-menu-item>
                <el-menu-item index="/zhky/2-3-2">社区养老</el-menu-item>
                <el-menu-item index="/zhky/2-3-3">机构养老</el-menu-item>
            </el-submenu>
            </el-submenu>
            <el-menu-item index="/videos">视频</el-menu-item>
            <el-menu-item index="/message">消息中心</el-menu-item>
            <el-menu-item index="/information">关于我们</el-menu-item>
            <el-menu-item><i class="fa fa-user"></i></el-menu-item>
        </el-menu>
    </div>
</template>
  
<script>
    export default {
      data() {
        return {
          activeIndex: '1',
          activeIndex2: '1'
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>