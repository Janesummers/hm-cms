<template>
  <div id="goodsManage">
    <DialogBox 
      v-show="shadow" 
      :data="imgs" 
      @closeShadow="close" 
      :title="title" 
      :content="text" 
      @cencelClick="close" 
      @confirmClick="comfirmBtn"
      :cencelBtn="cencelShow"
     />
    <alterGoods v-show="alterShow" @close="closeAlter" :id="alterId" />
    <div class="list">
      <div class="top">
        <div>序号</div>
        <div>商品图片</div>
        <div class="goodsName">商品名称</div>
        <div>轮播图</div>
        <div>详情图</div>
        <div>商品售价</div>
        <div>商品原价</div>
        <div>商品状态</div>
        <div>商品库存</div>
        <div class="opc">商品操作</div>
      </div>
      <div class="box">
        <div class="item" v-for="(item, index) in goodsList" :key="item.id">
          <div class="flex">{{index + 1}}</div>
          <div class="flex img">
            <div class="img_box">
              <img :src="item.img" alt="">
            </div>
          </div>
          <div class="goodsName">
            <div class="name">{{item.name}}</div>
          </div>
          <div class="flex">
            <span class="pointer" @click="getImg(item.id, '轮播图')">查看</span>
          </div>
          <div class="flex">
            <span class="pointer" @click="getImg(item.content_id, '详情图')">查看</span>
          </div>
          <div class="flex">{{item.new_price}}元</div>
          <div class="flex">{{item.old_price}}元</div>
          <div class="flex">{{item.status}}</div>
          <div class="flex">{{item.left_count}}</div>
          <div class="opc flex">
            <span class="pointer" @click="alterGoods(item.id, item.content_id)">修改</span>
            <span class="pointer" @click="delGoods(item.id, item.content_id, item.name)">删除</span>
          </div>
        </div>
      </div>
    </div> 
    <table style="display: none;"> 
      <tr>
        <td>序号</td>
        <td>商品图片</td>
        <td class="goodsName">商品名称</td>
        <td>轮播图</td>
        <td>详情图</td>
        <td>商品售价</td>
        <td>商品原价</td>
        <td>商品状态</td>
        <td>商品库存</td>
        <td class="opc">商品操作</td>
      </tr>
      <tr v-for="(item, index) in goodsList" :key="item.id">
        <td>{{index + 1}}</td>
        <td>
          <div class="img_box">
            <img :src="item.img" alt="">
          </div>
        </td>
        <td class="goodsName">
          <div class="name">{{item.name}}</div>
        </td>
        <td>
          <span class="pointer" @click="getImg(item.id, '轮播图')">查看</span>
        </td>
        <td>
          <span class="pointer" @click="getImg(item.content_id, '详情图')">查看</span>
        </td>
        <td>{{item.new_price}}元</td>
        <td>{{item.old_price}}元</td>
        <td>{{item.status}}</td>
        <td>{{item.left_count}}</td>
        <td class="opc">
          <span class="pointer" @click="alterGoods(item.id, item.content_id)">修改</span>
          <span class="pointer" @click="delGoods(item.id, item.content_id, item.name)">删除</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import DialogBox from '../DialogBox'
import alterGoods from './alterGoods'
export default {
  name: 'GoodsManage',
  data () {
    return {
      goodsList: [],
      shadow: false,
      imgs: '',
      title: '',
      text: '',
      id: '',
      contentId: '',
      alterShow: false,
      alterId: '',
      option: '',
      cencelShow: false
    }
  },
  methods: {
    getImg (id, title) {
      this.title = title;
      this.shadow = true;
      this.$store.commit('postRequest', {
        uri: '/getImgs',
        data: {
          belongId: id,
          pageSize: 10
        },
        callBack: res => {
          this.imgs = res.data.data;
        }
      })
    },
    closeAlter (msg) {
      let alterShow = this.alterShow;
      this.alterShow = !alterShow;
      this.alterId = {
        id: '',
        contentId: ''
      };
      if (msg) {
        this.text = msg;
        this.title = '提示';
        this.shadow = true;
        this.cencelShow = false;
        this.getGoods();
      }
    },
    alterGoods (id, contentId) {
      let alterShow = this.alterShow;
      this.alterShow = !alterShow;
      this.alterId = {
        id,
        contentId
      };
    },
    delGoods (id, contentId, text) {
      this.text = `确定要删除 <span style="color: #ea4131;">${text}</span> 吗?`;
      this.shadow = true;
      this.title = '提示';
      this.id = id;
      this.contentId = contentId;
      this.option = 'del';
      this.cencelShow = true;
    },
    close () {
      this.shadow = false;
      this.imgs = [];
      this.title = '';
      this.text = '';
      this.id = '';
      this.option = '';
    },
    comfirmBtn () {
      if (this.option == 'del') {
        this.confirmDel();
      } else {
        this.close();
      }
    },
    confirmDel () {
      let list = this.goodsList;
      this.$store.commit('postRequest', {
        uri: '/delGoods',
        data: {
          id: this.id,
          contentId: this.contentId
        },
        callBack: res => {
          if (res.data.data == 'ok') {
            this.text = '删除成功！';
            setTimeout(() => {
              this.goodsList = list.filter(item => item.id != this.id);
              this.close();
            }, 1500);
          } else {
            this.text = '删除失败！网络错误';
          }
        }
      })
    },
    getGoods () {
      this.$store.commit('postRequest', {
        uri: '/getGoods',
        data: {
          pageSize: 100
        },
        callBack: res => {
          this.goodsList = res.data.data
        }
      })
    }
  },
  created () {
    this.getGoods();
  },
  components: {
    DialogBox,
    alterGoods
  }
}
</script>

<style lang="less" scoped>
  #goodsManage {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .list {
      background: #fff;
      width: 100%;
      height: 100%;
      .box {
        height: calc(~"100% - 43px");
        overflow: hidden;
        overflow-y: scroll;
      }
      .top {
        height: 43px;
        display: flex;
        div {
          flex: 1;
          display: flex;
          padding: 10px 0;
          align-items: center;
          border: 1px solid #f3f2f2;
          border-width: 0 1px 1px 0;
          justify-content: center;
        }
        .goodsName {
          max-width: 180px;
          min-width: 180px;
        }
      }
      .item {
        min-height: 36px;
        .flex {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .img {
          overflow: hidden;
          padding: 10px 0;
        }
      }
      .item {
        display: flex;
        transition: 0.1s;
        &:hover {
          background: #0ca1ea;
          color: #fff;
        }
        >div {
          min-height: 36px;
          &.opc {
            min-width: 92px;
            justify-content: space-evenly;
          }
          &.goodsName {
            display: block;
            max-width: 180px;
            min-width: 180px;
            overflow: hidden;
            position: relative;
          }
          .name {
            max-width: 180px;
            min-width: 180px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 10px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          >span.pointer {
            cursor: pointer;
          }
          text-align: center;
          border: 1px solid #f3f2f2;
          border-width: 0 1px 1px 0;
          min-width: 84px;
          .img_box {
            max-width: 36px;
            max-height: 36px;
            overflow: hidden;
            line-height: 20px;
            display: inline-block;
            border-radius: 6px;
            img {
              width: 100%;
              vertical-align: middle;
            }
          }
        }
      }
    }
    // table {
    //   display: none;
    //   background: #fff;
    //   width: 100%;
    //   height: 100%;
    //   border-collapse: collapse;
    //   border: 1px solid #f3f2f2;
    //   border-width: 1px 0px 0px 1px;
    //   tr{
    //     &:first-of-type {
    //       td {
    //         padding: 8px;
    //       }
    //     }
    //     >td:first-of-type {
    //       min-width: 60px;
    //     }
    //     >td:nth-of-type(2) {
    //       padding: 0px;
    //       position: relative;
    //       height: 50px;
    //       width: 70px;
    //       .img_box {
    //         position: absolute;
    //         left: 50%;
    //         top: 50%;
    //         transform: translate(-50%, -50%);
    //       }
    //     }
    //   }
    //   tr:first-of-type {
    //     td {
    //       // padding: 5px;
    //       height: auto;
    //     }
    //   }
    //   td {
    //     &.opc {
    //       min-width: 92px;
    //     }
    //     &.goodsName {
    //       width: 180px;
    //       min-width: 180px;
    //       overflow: hidden;
    //       position: relative;
    //     }
    //     .name {
    //       // width: 100%;
    //       width: 180px;
    //       min-width: 180px;
    //       overflow: hidden;
    //       text-overflow: ellipsis;
    //       white-space: nowrap;
    //       padding: 10px;
    //       position: absolute;
    //       top: 50%;
    //       left: 50%;
    //       transform: translate(-50%, -50%);
    //     }
    //     >span.pointer {
    //       cursor: pointer;
    //     }
    //     text-align: center;
    //     // padding: 5px;
    //     border: 1px solid #f3f2f2;
    //     border-width: 0 1px 1px 0;
    //     min-width: 84px;
    //     .img_box {
    //       width: 36px;
    //       // height: 70px;
    //       max-height: 36px;
    //       overflow: hidden;
    //       line-height: 20px;
    //       display: inline-block;
    //       border-radius: 6px;
    //       img {
    //         width: 100%;
    //         vertical-align: middle;
    //       }
    //     }
    //   }
    // }
  }
</style>
