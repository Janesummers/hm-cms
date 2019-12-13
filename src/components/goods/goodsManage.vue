<template>
  <div id="goodsManage" :style="{'overflow-y': shadow ? 'hidden' : 'scroll'}">
    <DialogBox 
      v-show="shadow" 
      :data="imgs" 
      @closeShadow="close" 
      :title="title" 
      :content="text" 
      @cencelClick="close" 
      @confirmClick="comfirmDel"
     />
     <alterGoods />
    <table>
      <tr>
        <td>序号</td>
        <td>商品图片</td>
        <td>商品名称</td>
        <td>轮播图</td>
        <td>详情图</td>
        <td>商品售价</td>
        <td>商品原价</td>
        <td>商品状态</td>
        <td>商品库存</td>
        <td>商品操作</td>
      </tr>
      <tr v-for="(item, index) in goodsList" :key="item.id">
        <td>{{index + 1}}</td>
        <td>
          <div class="img_box">
            <img :src="item.img" alt="">
          </div>
        </td>
        <td>{{item.name}}</td>
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
        <td>
          <span class="pointer">修改</span>
          <span class="pointer" @click="delGoods(item.id, item.content_id)">删除</span>
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
      imgs: [],
      title: '',
      text: '',
      id: '',
      contentId: ''
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
    delGoods (id, contentId) {
      this.text = '确定删除吗?';
      this.shadow = true;
      this.title = '提示';
      this.id = id;
      this.contentId = contentId;
    },
    close () {
      this.shadow = false;
      this.imgs = [];
      this.title = '';
      this.text = '';
      this.id = '';
    },
    comfirmDel () {
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
            }, 1000);
          } else {
            this.text = '删除失败！网络错误';
          }
        }
      })
    }
  },
  created () {
    this.$store.commit('postRequest', {
      uri: '/getGoods',
      data: {
        pageSize: 100
      },
      callBack: res => {
        this.goodsList = res.data.data
      }
    })
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
    table {
      background: #fff;
      width: 100%;
      height: 100%;
      border-collapse: collapse;
      border: 1px solid #f3f2f2;
      border-width: 1px 0px 0px 1px;
      tr{
        >td:first-of-type {
          min-width: 60px;
        }
        >td:nth-of-type(2) {
          padding: 0px;
          position: relative;
          height: 80px;
          width: 80px;
          .img_box {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      tr:first-of-type {
        td {
          padding: 10px;
          height: auto;
        }
      }
      td {
        >span.pointer {
          cursor: pointer;
        }
        text-align: center;
        padding: 10px;
        border: 1px solid #f3f2f2;
        border-width: 0 1px 1px 0;
        min-width: 90px;
        .img_box {
          width: 60px;
          // height: 70px;
          max-height: 60px;
          overflow: hidden;
          line-height: 40px;
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
</style>
