<template>
  <div class="reader-center">
    
    <div class="profile-header">
      <el-card class="profile-card" shadow="hover">
        <div class="profile-content">
          <div class="avatar-box">
            <el-avatar :size="80" class="custom-avatar">👤</el-avatar>
          </div>
          
          <div class="info-box">
            <h2>欢迎回来，{{ userInfo.name }}！👋</h2>
            <p class="reader-id">读者专属编号：{{ userInfo.readerId }}</p>
            <div class="tags">
              <el-tag type="success" effect="dark" round>🌿 信用良好</el-tag>
              <el-tag type="warning" effect="dark" round style="margin-left: 10px;">👑 书山攀登者</el-tag>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <h3 class="section-title">✨ 我的图书馆</h3>
    
    <el-row :gutter="24" class="action-grid">
      
      <el-col :xs="24" :sm="8" class="grid-col">
        <div class="action-card favorite-card" @click="goTo('/favorite')">
          <div class="icon">💖</div>
          <h3>我的心动书单</h3>
          <p>查看你收藏的所有好书</p>
        </div>
      </el-col>

      <el-col :xs="24" :sm="8" class="grid-col">
        <div class="action-card borrow-card" @click="goTo('/borrow')">
          <div class="icon">📖</div>
          <h3>我的借阅记录</h3>
          <p>查看在借图书与归还进度</p>
        </div>
      </el-col>

      <el-col :xs="24" :sm="8" class="grid-col">
        <div class="action-card reserve-card" @click="goTo('/reservation')">
          <div class="icon">📅</div>
          <h3>我的时空契约</h3>
          <p>查看排队中的预约请求</p>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const userInfo = ref({
  name: '',
  readerId: ''
})

const loadUserInfo = async () => {

  const readerId =
    localStorage.getItem('readerId')

  if (!readerId) {
    router.push('/login')
    return
  }

  try {

    const res = await axios.get(
      `http://localhost:8080/readers/${readerId}`
    )

    userInfo.value = {
      name: res.data.name,
      readerId: res.data.readerId
    }

  } catch (e) {
    console.error(e)
  }
}

const goTo = (path) => {
  router.push(path)
}

onMounted(() => {
  loadUserInfo()
})
</script>

<style scoped>
.reader-center {
  padding: 30px;
  max-width: 1000px;
  margin: 0 auto;
  min-height: 100vh;
}

/* 个人信息卡片设计 */
.profile-header {
  margin-bottom: 40px;
  animation: fadeInDown 0.8s ease-out;
}

.profile-card {
  border-radius: 20px;
  background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
  border: none;
}

.profile-content {
  display: flex;
  align-items: center;
  padding: 20px;
}

.avatar-box {
  margin-right: 30px;
}

.custom-avatar {
  background-color: #626aef;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(98, 106, 239, 0.3);
}

.info-box h2 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 26px;
}

.reader-id {
  color: #7f8c8d;
  font-size: 15px;
  margin-bottom: 15px;
  font-family: monospace;
  background: #e0e6ed;
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
}

/* 导航区标题 */
.section-title {
  font-size: 22px;
  color: #34495e;
  margin-bottom: 25px;
  padding-left: 10px;
  border-left: 5px solid #626aef;
}

/* 快捷入口卡片设计 */
.action-grid {
  margin-top: 10px;
}

.grid-col {
  margin-bottom: 20px;
}

.action-card {
  background: white;
  border-radius: 16px;
  padding: 30px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  height: 100%;
  border: 1px solid #f0f2f5;
  animation: fadeInUp 0.8s ease-out;
}

.action-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.1);
}

.icon {
  font-size: 50px;
  margin-bottom: 15px;
  transition: transform 0.3s ease;
}

.action-card:hover .icon {
  transform: scale(1.15) rotate(5deg);
}

.action-card h3 {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 18px;
}

.action-card p {
  margin: 0;
  color: #909399;
  font-size: 13px;
}

/* 为不同卡片加上一点点主题色暗示 */
.favorite-card:hover { border-bottom: 4px solid #ff6b81; }
.borrow-card:hover { border-bottom: 4px solid #626aef; }
.reserve-card:hover { border-bottom: 4px solid #e6a23c; }

/* 进场动画 */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>