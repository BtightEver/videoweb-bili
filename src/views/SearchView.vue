<template>
    <div class ="View">
    这是搜索页,输入的内容是{{ input }}
  </div>
</template>
<script setup name="SearchView">
defineProps(['input'])
console.log("SearchView setup阶段执行了")

</script>
<style scoped>
.View{
  height:1000px;
  background-color: red;
}
</style>