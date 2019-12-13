<template>
  <div id="app">
    <router-view class="container" v-cloak />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    width: 100%;
  }
  [v-cloak]{
    display: none;
  }
  .container {
    width: 100%;
    height: 100%;
  }
</style>
