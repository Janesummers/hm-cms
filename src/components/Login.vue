<template>
  <div id="login">
    <div class="loginBox">
      <p class="title">聚宝管理系统</p>
      <div class="userBox">
        <div class="username">
          <span class="iconfont icon-yonghuming ico"></span>
          <input type="text" placeholder="账号" v-model="username">
        </div>
        <div class="pwd">
          <span class="iconfont icon-mima ico"></span>
          <input type="password" placeholder="密码" v-model="pwd">
        </div>
        <div class="hint" v-if="isHint">
          {{errorMessage}}
        </div>
        <div class="loginBtn" @click="userLogin">登录</div>
        <!-- <div class="toReg" @click="toReg">还没有账号？快速注册！</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      pwd: '',
      isHint: false,
      errorMessage: ''
    };
  },
  methods: {
    userLogin () {
      this.$store.commit('postRequest', {
        uri: '/login',
        data: {
          name: this.username,
          pwd: this.pwd,
          rule: 1
        },
        callBack: (res) => {
          if (res.data.code == 'ok') {
            localStorage.setItem('userInfo', JSON.stringify({
              username: res.data.data.nick,
              userId: res.data.data.id
            }));
            this.$router.push('/manage');
          } else {
            this.errorMessage = res.data.data == '参数不合法' ? '非法访问' : '用户名或者密码错误';
            this.isHint = true;
          }
        }
      });
    },
    toReg () {
      // this.$router.push('/register')
    }
  },
  watch: {
    'username': {
      handler () {
        this.isHint = false;
      },
      deep: true
    },
    'pwd': {
      handler () {
        this.isHint = false;
      },
      deep: true
    }
  },
  created () {
    // if (localStorage.getItem('userInfo')) {
    //   this.$router.push('/notes')
    // }
  }
};
</script>

<style lang="less" scoped>
  #login{
    width: 100%;
    min-width: 500px;
    height: 100%;
    min-height: 700px;
    background: url('../../public/img/bg.jpg') no-repeat 0 0 / cover;
    position: relative;
    .loginBox{
      width:500px;
      height: 300px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .title {
        font-size: 44px;
        text-align: center;
        font-weight: 700;
        color: #5a5a5a;
        margin-bottom: 30px;
      }
      .userBox{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .username, .pwd{
          width: 300px;
          height: 46px;
          position: relative;
          .ico{
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
            color: #838383;
          }
          input{
            position: absolute;
            width: 100%;
            padding-left: 36px;
            height: 100%;
            border-radius: 5px 5px 0 0;
            font-size: 16px;
          }
        }
        .pwd{
          border-top: 1px solid #e6e6e6;
          input{
            border-radius: 0 0 5px 5px;
          }
        }
        .loginBtn{
          width: 300px;
          margin-top: 20px;
          height: 46px;
          line-height: 46px;
          background: #2e7ab5;
          color: #fff;
          text-align: center;
          border-radius: 6px;
          font-size: 18px;
          transition: 0.5s;
          cursor: pointer;
          &:hover{
            background: #0770c3;
          }
        }
        .hint{
          -moz-user-select:none;
          -webkit-user-select:none;
          -ms-user-select:none;
          -khtml-user-select:none;
          width: 300px;
          margin-top: 20px;
          color: #d8d8d8;
          height: 46px;
          line-height: 46px;
          border-radius: 6px;
          text-align: center;
          background: #b1261d;
        }
        .toReg{
          user-select:none;
          width: 300px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 14px;
          color: #d0d0d0;
          margin-top: 10px;
          cursor: pointer;
        }
      }
    }
  }
</style>
