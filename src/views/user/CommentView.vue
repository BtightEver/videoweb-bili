<template>
  <div class="View">
    <h1>{{ title }}</h1>
  </div>
</template>
<script>
export default {
  name: "CommentView",
  data: function () {
    return {
      title: "我的评论",
    };
  },
};

</script>
<script setup>

</script>
<style scoped>
.View {
  height: 500px;
  background-color: rgb(120, 114, 124);
}
</style>