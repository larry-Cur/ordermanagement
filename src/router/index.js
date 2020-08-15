import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import {
  checktoken
} from '@/api/apis'

Vue.use(VueRouter)
//路由报错
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {

  return originalPush.call(this, location).catch(err => err)

}

var router = new VueRouter({
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'login',
    component: Login
  }, {
    path: '/main',
    name: 'main',
    component: () => import('../pages/Main'),
    children: [

      { // 首页
        path: '/main/index',
        name: '/main/index',
        component: () => import('../pages/main/Index'),
        meta: {
          power: ['super', 'normal'],
          hashname: ['']
        }
      },
      { // 订单管理
        path: '/main/order',
        name: '/main/order',
        component: () => import('../pages/main/Order'),
        meta: {
          power: ['super', 'normal'],
          hashname: ['订单管理']
        }
      },
      // ---------------------------------- 商品管理 -------------------------------------//
      { // 商品管理-添加商品
        path: '/main/items/itemadd',
        name: '/main/items/itemadd',
        component: () => import('../pages/main/items/ItemAdd'),
        meta: {
          power: ['super', 'normal'],
          hashname: ['商品管理', '添加商品']
        }
      },
      {
        path: '/main/items/itemlist',
        name: '/main/items/itemlist',
        component: () => import('../pages/main/items/ItemList'),
        meta: {
          power: ['super', 'normal'],
          hashname: ['商品管理', '商品列表']
        }
      },
      {
        path: '/main/items/itemcategory',
        name: '/main/items/itemcategory',
        component: () => import('../pages/main/items/ItemCategory'),
        meta: {
          power: ['super', 'normal'],
          hashname: ['商品管理', '商品分类']
        }
      }, { //店铺管理
        path: '/main/store',
        name: '/main/store',
        component: () => import('../pages/main/Store'),
        meta: {
          power: ['super'],
          hashname: ['店铺管理']
        }
      },
      // ---------------------------------- 账号管理 -------------------------------------//
      { //账号管理
        path: '/main/users/accountlist',
        name: '/main/users/accountlist',
        component: () => import('../pages/main/users/AccountList'),
        meta: {
          power: ['super'],
          hashname: ['账号管理', '账号列表']
        }
      }, {
        path: '/main/users/accountadd',
        name: '/main/users/accountadd',
        component: () => import('../pages/main/users/AccountAdd'),
        meta: {
          power: ['super'],
          hashname: ['账号管理', '账号添加']
        }
      },
      {
        path: '/main/users/accountchange',
        name: '/main/users/accountchange',
        component: () => import('../pages/main/users/AccountChange'),
        meta: {
          power: ['super'],
          hashname: ['账号管理', '密码修改']
        }
      },
      // ---------------------------------- 销售管理 -------------------------------------//
      { //销售统计
        path: '/main/sales',
        name: '/main/sales',
        component: () => import('../pages/main/sales/Sales.vue'),
        meta: {
          power: ['super'],
          hashname: ['销售统计', '商品统计']
        }
      },
      {
        path: '/main/salesorder',
        name: '/main/salesorder',
        component: () => import('../pages/main/sales/SalesOrder'),
        meta: {
          power: ['super'],
          hashname: ['销售统计', '订单统计']
        }
      }, { //个人中心
        path: '/main/person',
        name: '/main/person',
        component: () => import('../pages/main/Person'),
        meta: {
          power: ['super', 'normal'],
          hashname: ['个人中心']
        }
      },
    ]
  }, ]
})

router.beforeEach((to, from, next) => {
  if (to.path != '/') {
    checktoken(localStorage.token).then(res => {
      if (res.data.code == 0) {
        if (to.meta.power.includes(localStorage.role)) {
          next()
        } else {
          next('/')
        }
        next()
      } else
        next('/')
    })
  } else
    next()

})

export default router