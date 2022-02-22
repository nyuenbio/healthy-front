import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    meta:{
      title:'恩元检测'
    },
    component: Home
  },
  {
    path: '/transfer',
    name: 'transfer',
    meta:{
      title:'恩元检测'
    },
    component: () => import('../views/Transfer/index')
  },
  {
    path: '/productList',
    name: 'productList',
    meta:{
      title:'产品列表'
    },
    component: () => import('../views/ProductList/index.vue')
  },
  {
    path: '/useProcess',
    name: 'useProcess',
    meta:{
      title:'使用流程'
    },
    component: () => import('../views/HpvTesting/useProcess.vue')
  },
  {
    path: '/sampleInput',
    name: 'sampleInput',
    meta:{
      title:'样本绑定'
    },
    component: () => import('../views/HpvTesting/sampleInput.vue')
  },
  {
    path: '/sampleDetails',
    name: 'sampleDetails',
    meta:{
      title:'样本详情'
    },
    component: () => import('../views/HpvTesting/sampleDetails.vue')
  },
  {
    path: '/sampleCollection',
    name: 'sampleCollection',
    meta:{
      title:'样本采集'
    },
    component: () => import('../views/HpvTesting/sampleCollection.vue')
  },
  {
    path: '/mailIndex',
    name: 'mailIndex',
    meta:{
      title:'样本邮寄'
    },
    component: () => import('../views/Mail/mailIndex.vue')
  },
  {
    path: '/jiAddress',
    name: 'jiAddress',
    meta:{
      title:'样本邮寄'
    },
    component: () => import('../views/Mail/address/jiAddress.vue')
  },
  {
    path: '/daoAddress',
    name: 'daoAddress',
    meta:{
      title:'样本邮寄'
    },
    component: () => import('../views/Mail/address/daoAddress.vue')
  },
  {
    path: '/orderList',
    name: 'orderList',
    meta:{
      title:'我的订单'
    },
    component: () => import('../views/MineOrder/orderList.vue')
  },
  {
    path: '/orderDetails',
    name: 'orderDetails',
    meta:{
      title:'我的订单'
    },
    component: () => import('../views/MineOrder/orderDetails.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
