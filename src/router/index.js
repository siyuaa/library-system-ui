import { createRouter, createWebHistory } from 'vue-router'

// 🌟 1. 引入咱们即将打造的绝美封面页
import HomeView from '../views/HomeView.vue' 

import BookView from '../views/BookView.vue'
import ReaderView from '../views/ReaderView.vue'
import BorrowView from '../views/BorrowView.vue'
import ReservationView from '../views/ReservationView.vue'
import FavoriteView from '../views/FavoriteView.vue'
import FrontBookView from '../views/FrontBookView.vue'
import ReaderCenterView from '../views/ReaderCenterView.vue'
import AdminDashboardView from '../views/AdminDashboardView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [

  { 
    path: '/login', 
    component: LoginView 
  }
  ,
 { 
    path: '/admin-board', 
    component: AdminDashboardView 
  }, 

{ 
    path: '/my-center', 
    component: ReaderCenterView 
  },

  // 🌟 2. 首页默认展示封面大厅
  { path: '/', component: FrontBookView },
  
  
  // 🌟 3. 图书管理挪到专属的 /books 路径
  { path: '/books', component: BookView }, 
  
  { path: '/readers', component: ReaderView },
  { path: '/borrow', component: BorrowView },
  { path: '/reservation', component: ReservationView },
  { path: '/favorite', component: FavoriteView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router