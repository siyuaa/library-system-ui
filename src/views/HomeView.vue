<template>
  <div class="home-container">
    
    <div class="hero-section">
      <h1 class="main-title">云端智慧图书馆</h1>
      <p class="subtitle">EXPLORE THE KNOWLEDGE UNIVERSE</p>
    </div>

    <div class="nav-grid">
      
      <div class="nav-card book-card" @click="goTo('/books')">
        <div class="icon-wrapper">📚</div>
        <h2>馆藏浩瀚</h2>
        <p>探索与管理所有图书资源</p>
      </div>

      <div class="nav-card reader-card" @click="goTo('/readers')">
        <div class="icon-wrapper">👤</div>
        <h2>读者星图</h2>
        <p>管理读者档案与权限</p>
      </div>

      <div class="nav-card borrow-card" @click="goTo('/borrow')">
        <div class="icon-wrapper">🔄</div>
        <h2>流转枢纽</h2>
        <p>极速办理借阅与归还手续</p>
      </div>

      <div class="nav-card reserve-card" @click="goTo('/reservation')">
        <div class="icon-wrapper">📅</div>
        <h2>时空契约</h2>
        <p>查看与处理专属预约请求</p>
      </div>

      <div class="nav-card favorite-card" @click="goTo('/favorite')">
        <div class="icon-wrapper">💖</div>
        <h2>心动印记</h2>
        <p>浏览属于你的绝美私人书单</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 🌟 点击卡片，丝滑跳转！
const goTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
/* 整个封面的炫酷背景 */
.home-container {
  min-height: 100vh;
  /* 高级渐变背景，像清晨的云端天空 */
  background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
}

/* 欢迎语设计 */
.hero-section {
  text-align: center;
  margin-bottom: 60px;
  animation: fadeInDown 1s ease-out;
}

.main-title {
  font-size: 48px;
  font-weight: 900;
  color: #fff;
  letter-spacing: 4px;
  text-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  margin: 0;
}

.subtitle {
  font-size: 16px;
  letter-spacing: 8px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 10px;
  font-weight: bold;
}

/* 导航卡片网格布局 */
.nav-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  max-width: 1200px;
}

/* 🌟 高级毛玻璃卡片核心样式 */
.nav-card {
  width: 280px;
  height: 320px;
  background: rgba(255, 255, 255, 0.4); /* 半透明背景 */
  backdrop-filter: blur(10px); /* 毛玻璃特效 */
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeInUp 1s ease-out;
}

/* 鼠标悬浮时的弹跳与发光效果 */
.nav-card:hover {
  transform: translateY(-15px) scale(1.03);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 20px 40px 0 rgba(31, 38, 135, 0.15);
}

/* 大图标设计 */
.icon-wrapper {
  font-size: 64px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.nav-card:hover .icon-wrapper {
  transform: scale(1.1) rotate(5deg);
}

/* 卡片里的文字 */
.nav-card h2 {
  font-size: 22px;
  color: #2c3e50;
  margin: 0 0 15px 0;
  font-weight: 800;
}

.nav-card p {
  font-size: 14px;
  color: #545c64;
  line-height: 1.6;
  margin: 0;
  padding: 0 10px;
}

/* 动画特效定义 */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>