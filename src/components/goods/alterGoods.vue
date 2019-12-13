<template>
  <div id="alterGoods">
    <div class="shadow"></div>
    <add />
  </div>
</template>

<script>
import add from './addGoods'
export default {
  components: {
    add
  }
}
</script>

<style lang="less" scoped>
  #alterGoods {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 100;
    .shadow {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0,0,0,0.5);
    }
    #addGoods {
      z-index: 200;
      position: relative;
      width: 800px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 10px;
      overflow: hidden;
    }
  }
</style>
