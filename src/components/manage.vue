<template>
  <div id="manage">
    <topBar />
    <SideBar />
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import topBar from './topBar';
import SideBar from './sideBar';
export default {
  name: 'Manage',
  data () {
    return {}
  },
  components: {
    topBar,
    SideBar
  }
}
</script>

<style lang="less" scoped>
  #manage {
    display: flex;
    width: 100%;
    min-width: 1200px;
    height: 100%;
    position: relative;
    flex-wrap: wrap;
    background: #f5f7fd;
    #content {
      height: calc(~'100% - 50px');
      width: calc(~'100% - 260px');
      padding: 8px;
      overflow: hidden;
      position: relative;
    }
  }
</style>
