import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Manage from '@/components/manage'
import GoodsManage from '@/components/goods/goodsManage'
import AddGoods from '@/components/goods/addGoods'

const routerPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/manage',
      name: 'Manage',
      component: Manage,
      children: [
        {
          path: 'goodsManage',
          name: 'GoodsManage',
          component: GoodsManage
        },
        {
          path: 'addGoods',
          name: 'AddGoods',
          component: AddGoods
        }
      ]
    }
  ]
})
