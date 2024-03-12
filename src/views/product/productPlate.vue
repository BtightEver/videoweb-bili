<template>
    <div>
      <header></header>
      <main>这是产品界面</main>
      <footer></footer>
    </div>
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