<template>
  <div id="dialog">
    <div class="shadow"></div>
    <div id="dialogBox" :style="{'max-width': maxWidth, 'min-width': minWidth}">
      <div class="title">
        {{title}}
        <div class="close" @click="close" title="关闭">×</div>
      </div>
      <div v-if="data">
        <div class="box" v-if="data.length > 0">
          <div class="img_box" v-for="(item, index) in data" :key="index">
            <img :src="item.src" alt="">
          </div>
        </div>
      </div>
      <div v-if="content" class="text">
        <div class="hint" v-html="content"></div>
        <div class="btn">
          <span class="cencel" @click="cencelClick" v-if="cencelBtn">取消</span>
          <span class="confirm" @click="confirmClick" :style="{width: cencelBtn ? '42%' : '90%'}">确认</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'title', 'content', 'cencelBtn'],
  data () {
    return {
      maxWidth: '400px',
      minWidth: '280px'
    }
  },
  methods: {
    close () {
      this.$emit('closeShadow');
    },
    cencelClick () {
      this.$emit('cencelClick');
    },
    confirmClick () {
      this.$emit('confirmClick');
    }
  },
  updated () {
    if (!this.data) {
      this.maxWidth = '280px';
      this.minWidth = '280px';
      return;
    }
    if (this.data.length <= 0) {
      this.maxWidth = '280px';
      this.minWidth = '280px';
    }
  },
  watch: {
    'data': {
      handler (n, o) {
        if (!n) {
          this.maxWidth = '280px';
          this.minWidth = '280px';
        } else {
          if (n.length <= 0) {
            this.maxWidth = '280px';
            this.minWidth = '280px';
          } else {
            this.maxWidth = '400px';
            this.minWidth = '400px';
          }
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
  #dialog {
    z-index: 20;
    .shadow {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      position: fixed;
      z-index: 15;
      left: 0;
      top: 0;
    }
    #dialogBox {
      position: fixed;
      max-height: 560px;
      left: 50%;
      top: 50%;
      background: #fff;
      transform: translate(-50%, -50%);
      z-index: 20;
      overflow: hidden;
      border-radius: 8px;
      .title {
        height: 50px;
        box-shadow: 0px 1px 6px rgba(0,0,0,0.2);
        line-height: 50px;
        text-align: center;
        position: relative;
      }
      .close {
        position: absolute;
        right: 20px;
        top: 50%;
        font-size: 24px;
        transform: translateY(-50%);
        cursor: pointer;
      }
      .box {
        overflow: hidden;
        overflow-y: scroll;
        width: 100%;
        max-height: 510px;
        min-height: 150px;
        padding: 20px;
        .img_box {
          // flex: 1;
          width: 360px;
          overflow: hidden;
          margin-bottom: 10px;
          img {
            width: 100%;
          }
        }
      }
      .text {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
      }
      .hint {
        padding: 20px;
        display: inline-block;
      }
      .btn {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-around;
        span {
          width: 42%;
          text-align: center;
          line-height: 36px;
          height: 36px;
          border-radius: 36px;
          cursor: pointer;
          &.cencel {
            border: 2px solid #cac7c7;
            line-height: 32px;
            color: #cac7c7;
          }
          &.confirm {
            background: #ea4131;
            color: #fff;
          }
        }
      }
    }
  }
</style>
