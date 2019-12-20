<template>
  <div id="comment">
    <div class="isData" v-if="list.length == 0">暂无用户反馈</div>
    <div class="list" v-else>
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="userInfo">
          <div class="img_box">
            <img src="../../../public/img/t.jpeg" alt="">
          </div>
          <div class="info">
            <div class="username">{{item.user_name}}</div>
            <div class="time">{{item.time}}</div>
          </div>
        </div>
        <div class="commentMessage">{{item.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentsManage',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.$store.commit('postRequest', {
      uri: '/getUserComments',
      data: {
        pageSize: 30
      },
      callBack: res => {
        if (res.data.code == 'ok') {
          let data = res.data.data;
          var regExp;
          data.forEach((item, index) => {
            if (item.user_name.length == 2) {
              regExp = new RegExp("/(?<=.{1})[\w\W]/");
              data[index].user_name = data[index].user_name.replace(regExp, '****');
            } else if (item.user_name.length > 2) {
              regExp = new RegExp("/(?<=.{1})[\w\W]*(?=.{1})/");
              data[index].user_name = data[index].user_name.replace(regExp, '****');
            } else {
              data[index].user_name = '匿名';
            }
          })
          this.list = res.data.data;
        }
      }
    })
  }
}
</script>

<style lang="less" scoped>
  #comment {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    .item {
      margin: 14px;
      border-radius: 10px;
      overflow: hidden;
      background: #fff;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      .userInfo {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        padding: 20px 0 20px 20px;
        .img_box {
          width: 40px;
          height: 40px;
          overflow: hidden;
          border-radius: 50%;
          margin-right: 15px;
          img {
            width: 100%;
          }
        }
      }
      .commentMessage {
        background: #f8f8f8;
        padding: 20px;
      }
    }
  }
</style>
