<template>
  <div class="app-wrapper">
    <el-menu 
      mode="horizontal" 
      :ellipsis="false" 
      class="top-navbar"
      router
    >
      <div class="logo">📚 云端图书馆</div>
      
      <el-menu-item index="/">🏠 逛书大厅</el-menu-item>
      <div style="flex-grow: 1"></div>

      <el-menu-item v-if="!userRole" index="/login">
        <el-button type="primary" round>登录 / 注册</el-button>
      </el-menu-item>

      <el-sub-menu v-if="userRole === 'reader'" index="user-center">
        <template #title>👤 我的主页</template>
        <el-menu-item index="/my-center">🏠 个人中心</el-menu-item>
        <el-menu-item index="/favorite">💖 我的收藏</el-menu-item>
        <el-menu-item index="/borrow">📖 我的借阅</el-menu-item>
        <el-menu-item @click="logout">退出登录</el-menu-item>
      </el-sub-menu>

      <el-sub-menu v-if="userRole === 'admin'" index="admin-center">
        <template #title>👑 后台管理</template>
        <el-menu-item index="/admin-board">🛡️ 总控大屏</el-menu-item>
        
        <el-menu-item index="/books">🛠️ 图书库存管理</el-menu-item>
        
        <el-menu-item index="/readers">👥 读者档案管理</el-menu-item>
       <el-menu-item index="/logout" @click="logout">退出登录</el-menu-item>
      </el-sub-menu>

    </el-menu>

    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const userRole = ref(null) 

// 🌟 页面一加载，就去浏览器的记忆面包里找身份！
onMounted(() => {
  userRole.value = localStorage.getItem('userRole')
})

const logout = () => {
  // 退出时清空身份
  localStorage.removeItem('userRole')
  userRole.value = null
  // 顺便把人踢回首页逛书大厅
  window.location.href = '/' 
}
</script>

<style scoped>
.top-navbar {
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  align-items: center;
}
.logo {
  font-size: 20px;
  font-weight: bold;
  color: #626aef;
  margin-right: 30px;
}
.main-content {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);
}
</style>
