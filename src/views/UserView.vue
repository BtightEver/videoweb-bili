<template>
    <div style="background-color: rgb(30, 0, 255);">
    这是个人中心
    <el-upload class="upload-demo" drag action="http://localhost:8090/videos/" multiple :data="formData">
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">

      </div>
    </template>
  </el-upload>
  </div>
</template>
<script setup name="UserView">
console.log("UserView setup阶段执行了")
</script>
<style>
</style>