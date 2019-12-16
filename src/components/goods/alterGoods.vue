<template>
  <div id="alterGoods">
    <div class="shadow"></div>
    <div class="box">
      <div class="top">修改商品<span class="close" title="关闭" @click="close">×</span></div>
      <div id="alterDialog">
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
              <div class="detailList">
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
              </div>
              <p class="addPhoto" @click="addImg('detailImg')">新增图片</p>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <div class="save" @click="save">保存</div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      goodsName: '',
      goodsImg: '',
      goodsPrice: '',
      goodsOldPrice: '',
      left_count: '',
      bannerImg: [],
      bannerImgOrigin: [],
      detailImg: [],
      detailImgOrigin: []
    }
  },
  methods: {
    close () {
      this.$emit('close');
    },
    save () {
      let {id, contentId} = this.id;
      let bannerLen = this.bannerImgOrigin.length;
      let bannerImg = this.bannerImg.slice(bannerLen);
      let detailImgLen = this.detailImgOrigin.length;
      let detailImg = this.detailImg.slice(detailImgLen);
      this.$store.commit('postRequest', {
        uri: '/alterGoods',
        data: {
          id,
          content_id: contentId,
          img: this.goodsImg,
          title: this.goodsName,
          price: this.goodsPrice,
          oldPrice: this.goodsOldPrice,
          left_count: this.left_count,
          bannerImg,
          detailImg
        },
        callBack: res => {
          if (res.data.data == 'ok') {
            this.resetData();
            this.$emit('close', '修改成功！');
          } else {
            this.resetData();
            this.$emit('close', '修改失败，网络异常！');
          }
        }
      })
    },
    addImg (name) {
      this[name].push('');
    },
    resetData () {
      this.goodsName = '';
      this.goodsImg = '';
      this.goodsPrice = '';
      this.goodsOldPrice = '';
      this.left_count = '';
      this.bannerImg = [];
      this.detailImg = [];
    },
    del (name, index) {
      this[name].splice(index, 1);
    },
    getGoodsInfo () {
      let {id, contentId} = this.id;
      let getOnceGoods = new Promise((resolve, reject) => {
        this.$store.commit('postRequest', {
          uri: '/getOnceGoods',
          data: {
            id
          },
          callBack: res => {
            if (res.data.code == 'ok') {
              resolve(res.data.data);
            }
          }
        })
      });

      let getGoodsBanner = new Promise((resolve, reject) => {
        this.$store.commit('postRequest', {
          uri: '/getImgs',
          data: {
            belongId: id,
            pageSize: 10
          },
          callBack: res => {
            if (res.data.code == 'ok') {
              resolve(res.data.data);
            }
          }
        })
      });

      let getDetailImg = new Promise((resolve, reject) => {
        this.$store.commit('postRequest', {
          uri: '/getImgs',
          data: {
            belongId: contentId,
            pageSize: 100
          },
          callBack: res => {
            if (res.data.code == 'ok') {
              resolve(res.data.data);
            }
          }
        })
      });

      let allDone = Promise.all([getOnceGoods, getGoodsBanner, getDetailImg]);
      allDone.then(([goodsInfo, goodsBanner, goodsDetailImg]) => {
        this.goodsName = goodsInfo[0].name;
        this.goodsImg = goodsInfo[0].img;
        this.goodsPrice = goodsInfo[0].new_price;
        this.goodsOldPrice = goodsInfo[0].old_price;
        this.left_count = goodsInfo[0].left_count;
        let banner = [];
        goodsBanner.forEach(item => banner.push(item.src));
        this.bannerImg = banner;
        this.bannerImgOrigin = banner.concat();
        let detailImg = [];
        goodsDetailImg.forEach(item => detailImg.push(item.src));
        this.detailImg = detailImg;
        this.detailImgOrigin = detailImg.concat();
      });
    }
  },
  watch: {
    'id': {
      handler (n, o) {
        if (n) {
          this.getGoodsInfo();
        }
      },
      deep: true
    }
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
    .box {
      z-index: 200;
      position: relative;
      width: 800px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 10px;
      overflow: hidden;
      .top {
        height: 40px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        background: #fff;
        line-height: 40px;
        padding: 0 20px;
        font-size: 18px;
        .close {
          cursor: pointer;
          font-size: 24px;
        }
      }
      #alterDialog {
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
            padding: 10px;
            border: 1px solid #f3f2f2;
            border-width: 0 1px 1px 0;
            min-width: 100px;
            &:nth-of-type(odd) {
              text-align: center;
            }
            .save {
              background: #ea4131;
              color: #fff;
              width: 300px;
              height: 40px;
              line-height: 40px;
              border-radius: 40px;
              margin: 0 auto;
              cursor: pointer;
            }
            &.price {
              display: flex;
              input {
                display: inline-block;
              }
            }
            input {
              width: 95%;
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
            .detailList {
              min-height: 30px;
              max-height: 200px;
              overflow-y: scroll;
            }
          }
        }
      }
    }
  }
</style>
