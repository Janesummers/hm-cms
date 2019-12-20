<template>
  <div id="sideBar">
    <div class="item" v-for="(item, index) in sideBarNav" :key="index" :class="selectIndex == index ? 'active' : ''">
      <p @click="item.children ? renderList(item.children.list.length, index) : chooseList(index)">{{item.name}}</p>
      <div class="items" :style="{'height': `${item.children.ch * 40}px`}" v-if="item.children">
        <router-link 
          tag="div"
          v-for="(items, i) in item.children.list" 
          :key="i" 
          :class="items.choose ? 'active' : ''"
          :to="items.path"
        >{{items.name}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data () {
    return {
      sideBarNav: [
        {
          name: '商品管理',
          children: {
            list: [
              {
                name: '商品修改',
                path: '/manage/goodsManage',
                choose: false
              },
              {
                name: '新增商品',
                path: '/manage/addGoods',
                choose: false
              }
            ],
            ch: 0,
            show: false
          }
        },
        {
          name: '留言反馈',
          path: '/manage/commentsManage'
        }
      ],
      selectIndex: null
    }
  },
  methods: {
    renderList (len, index) {
      let {sideBarNav} = this;
      sideBarNav.forEach((item, i) => {
        if (index != i && sideBarNav[i].children) {
          sideBarNav[i].children.ch = 0;
          sideBarNav[i].children.show = false;
        }
      })
      sideBarNav[index].children.ch = sideBarNav[index].children.show ? 0 : Number(len);
      sideBarNav[index].children.show = !sideBarNav[index].children.show;
      sideBarNav[index].children.list[0].choose = true;
      this.selectIndex = index;
      this.$router.push(sideBarNav[index].children.list[0].path)
      this.sideBarNav = sideBarNav;
    },
    routerChange () {
      let {sideBarNav} = this;
      sideBarNav.forEach((item, index) => {
        if (item.children) {
          item.children.list.forEach(items => {
            if (this.$route.path == items.path) {
              items.choose = true;
              item.children.ch = item.children.list.length;
              this.selectIndex = index;
            } else {
              items.choose = false;
            }
          });
        } else {
          if (this.$route.path == item.path) {
            this.selectIndex = index;
          }
        }
      });
      this.sideBarNav = sideBarNav;
    },
    chooseList (index) {
      let {sideBarNav} = this;
      this.selectIndex = index;
      sideBarNav.forEach((item, i) => {
        if (index != i && sideBarNav[i].children) {
          sideBarNav[i].children.ch = 0;
          sideBarNav[i].children.show = false;
        }
      })
      if (!sideBarNav[index].children) {
        this.$router.push(sideBarNav[index].path);
      }
      this.sideBarNav = sideBarNav;
    }
  },
  watch: {
    '$route': {
      handler: function () {
        this.routerChange();
      },
      deep: true
    }
  },
  created () {
    // if (this.sideBarNav.length == 1) {
    //   this.selectIndex = 0;
    // } 
    // this.selectIndex = 0;
    // this.
    this.routerChange();
  }
}
</script>

<style lang="less" scoped>
  #sideBar {
    background: #fff;
    width: 260px;
    height: calc(~'100% - 50px');
    padding: 20px 0;
    .item {
      // height: 40px;
      &.active {
        p {
          background: #f5f7fd;
          font-size: 18px;
          font-weight: 500;
        }
      }
      p {
        transition: font 0.5s;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        cursor: pointer;
      }
      .items {
        overflow: hidden;
        transition: 0.5s;
        div {
          cursor: pointer;
          padding-left: 30px;
          height: 40px;
          line-height: 40px;
          &.active {
            background: #0fa1ea;
            color: #fff;
          }
        }
      }
    }
  }
</style>
