<template>
  <div class="View">
    <h1>{{ title }}</h1>
  </div>
</template>
<script>
export default {
  name: "EditInfoView",
  data: function () {
    return {
      title: "编辑资料",
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