<template>
  <div id="topBar">
    <div class="logo">
      <div class="img_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <div class="title">聚宝管理系统</div>
    </div>
    <div class="user">
      <div class="img_box">
        <img src="../../public/img/user.jpg" alt="">
      </div>
      <div class="name">{{username}}</div>
      <div class="loginOut" @click="loginOut">退出登录</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: ''
    }
  },
  methods: {
    loginOut () {
      localStorage.removeItem('userInfo');
      this.$router.replace('/login');
    }
  },
  created () {
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      this.username = userInfo.username;
    }
  }
}
</script>

<style lang="less" scoped>
  #topBar {
    background: #fff;
    width: 100%;
    height: 50px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
    z-index: 10;
    .logo {
      display: flex;
      align-items: center;
      .img_box {
        width: 30px;
        height: 30px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .title {
        font-size: 20px;
        margin-left: 14px;
      }
    }
    .user {
      display: flex;
      align-items: center;
      .img_box {
        width: 30px;
        height: 30px;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 20px;
        img {
          width: 100%;
        }
      }
      .loginOut {
        font-size: 12px;
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }
</style>
