<template>
    <div>
      <div class="title" style="font-size: 40px; margin: 30px 50px;">消息中心</div>
      <el-collapse v-model="activeNames" @change="handleChange" style="margin: 0 50px;">
        <el-collapse-item  v-for="(item, index) in message" :key="index" :title="item.title">
          <div class="list">
            <p style="margin-left: 0 20px; color: #606266;">{{ item.detail }}</p>
            <span style="position: absolute; right: 100px; color: #909399;">{{ item.time }}</span>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </template>
  
  <script>
  import MenuBar from '@/layout/menuBar/index.vue'
  export default {
      components: {
          MenuBar
      },
      data:function(){
        return{
          message:[
            {
              title: "message 1",
              time: "2024/3/4",
              detail: "这是您的第一份信息！"
            },
            {
              title: "message 2",
              time: "2024/2/29",
              detail: "这是您的第二份信息！"
            }
          ]
        }
      }
  }
  </script>
  
  <style>
  .header{
    flex-direction: row;
  }
  .list{
    padding: 10px;
  }

  </style>