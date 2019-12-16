<template>
  <div id="addGoods">
    <dialogBox 
      v-show="dialogInfo.shadow" 
      :content="dialogInfo.text" 
      :title="dialogInfo.title" 
      @closeShadow="close"
      @confirmClick="close"
      :cencelBtn="false"
    />
    <table>
      <tr>
        <td>商品名称</td>
        <td>
          <input type="text" placeholder="请输入商品名称" v-model="goodsName">
        </td>
      </tr>
      <tr>
        <td>商品图片</td>
        <td>
          <input type="text" placeholder="请输入商品图片地址" v-model="goodsImg">
        </td>
      </tr>
      <tr>
        <td>商品价格</td>
        <td class="price">
          <input type="text" placeholder="请输入商品售价" v-model="goodsPrice">
          <input type="text" placeholder="请输入商品原价" v-model="goodsOldPrice">
        </td>
      </tr>
      <tr>
        <td>商品库存</td>
        <td>
          <input type="text" placeholder="请输入商品库存数量" v-model="left_count">
        </td>
      </tr>
      <tr>
        <td>商品banner</td>
        <td>
          <div v-for="(item, index) in bannerImg" :key="index">
            <input 
              type="text" 
              placeholder="请输入图片地址" 
              v-model="bannerImg[index]"
            >
            <span 
              v-if="bannerImg.length > 1 && index != 0"
              class="delPhoto"
              @click="del('bannerImg', index)"
            >×</span>
          </div>
          <p class="addPhoto" @click="addImg('bannerImg')">新增图片</p>
        </td>
      </tr>
      <tr>
        <td>商品详情图</td>
        <td>
          <div v-for="(item, index) in detailImg" :key="index" >
            <input 
              type="text" 
              placeholder="请输入图片地址" 
              v-model="detailImg[index]"
            >
            <span 
              v-if="detailImg.length > 1 && index != 0"
              class="delPhoto"
              @click="del('detailImg', index)"
            >×</span>
          </div>
          <p class="addPhoto" @click="addImg('detailImg')">新增图片</p>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <input type="button" value="保存" @click="save">
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import dialogBox from '../DialogBox'
export default {
  name: 'AddGoods',
  data () {
    return {
      goodsName: '',
      goodsImg: '',
      goodsPrice: '',
      goodsOldPrice: '',
      left_count: '',
      bannerImg: [''],
      detailImg: [''],
      dialogInfo: {
        shadow: false,
        title: '',
        text: ''
      }
    }
  },
  methods: {
    save () {
      this.$store.commit('postRequest', {
        uri: '/setGoods',
        data: {
          img: this.goodsImg,
          title: this.goodsName,
          price: this.goodsPrice,
          oldPrice: this.goodsOldPrice,
          left_count: this.left_count,
          bannerImg: this.bannerImg,
          detailImg: this.detailImg
        },
        callBack: res => {
          let {dialogInfo} = this;
          if (res.data.data == 'ok') {
            dialogInfo.text = '添加成功！';
          } else {
            dialogInfo.text = '添加失败，网络异常！';
          }
          dialogInfo.title = '提示';
          dialogInfo.shadow = true;
          this.dialogInfo = dialogInfo;
          this.resetData();
        }
      })
    },
    addImg (name) {
      this[name].push('');
    },
    del (name, index) {
      this[name].splice(index, 1);
    },
    close () {
      let {dialogInfo} = this; 
      dialogInfo.shadow = false;
      dialogInfo.title = '';
      dialogInfo.text = '';
      this.dialogInfo = dialogInfo;
    },
    resetData () {
      this.goodsName = '';
      this.goodsImg = '';
      this.goodsPrice = '';
      this.goodsOldPrice = '';
      this.left_count = '';
      this.bannerImg = [''];
      this.detailImg = [''];
    }
  },
  components: {
    dialogBox
  }
}
</script>

<style lang="less" scoped>
  #addGoods {
    table {
      background: #fff;
      width: 100%;
      height: 100%;
      border-collapse: collapse;
      border: 1px solid #f3f2f2;
      border-width: 1px 0px 0px 1px;
      tr{
        >td:first-of-type {
          width: 160px;
        }
      }
      td {
        &:nth-of-type(odd) {
          text-align: center;
        }
        padding: 10px;
        border: 1px solid #f3f2f2;
        border-width: 0 1px 1px 0;
        min-width: 100px;
        &.price {
          display: flex;
          input {
            display: inline-block;
          }
        }
        input {
          width: 50%;
          height: 30px;
          display: inline-block;
          font-size: 16px;
        }
        input[type='button'] {
          cursor: pointer;
          width: 100%;
        }
        .addPhoto {
          text-align: center;
          width: 80px;
          border: 1px solid #ccc;
          border-radius: 4px;
          border-style: dashed;
          font-size: 14px;
          padding: 2px 0px;
          margin-top: 10px;
          color: #ccc;
          cursor: pointer;
        }
        .delPhoto {
          cursor: pointer;
          margin-left: 10px;
        }
      }
    }
  }
</style>
