<template>
  <div class="admin-dashboard">
    
    <div class="dashboard-header">
      <div class="header-content">
        <div class="title-area">
          <h1>🛡️ 云端图书馆总控室</h1>
          <p>SYSTEM COMMAND CENTER</p>
        </div>
        <div class="admin-badge">
          <el-avatar :size="50" style="background: #e6a23c;">👑</el-avatar>
          <div class="badge-info">
            <span class="role">超级管理员</span>
            <span class="status">🟢 系统运行正常</span>
          </div>
        </div>
      </div>
    </div>

    <h3 class="section-title">⚡ 核心业务管理</h3>
    
    <el-row :gutter="24" class="control-grid">
      
      <el-col :xs="24" :sm="12" :md="6" class="grid-col">
        <div class="control-card book-card" @click="goTo('/books')">
          <div class="card-top">📚</div>
          <div class="card-bottom">
            <h3>图书库存管理</h3>
            <p>上架新书、修改库存与分类</p>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="6" class="grid-col">
        <div class="control-card reader-card" @click="goTo('/readers')">
          <div class="card-top">👥</div>
          <div class="card-bottom">
            <h3>读者档案管理</h3>
            <p>查看注册用户与权限控制</p>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="6" class="grid-col">
        <div class="control-card borrow-card" @click="goTo('/borrow')">
          <div class="card-top">🔄</div>
          <div class="card-bottom">
            <h3>借阅流转大盘</h3>
            <p>处理全局借书与归还业务</p>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="6" class="grid-col">
        <div class="control-card reserve-card" @click="goTo('/reservation')">
          <div class="card-top">📅</div>
          <div class="card-bottom">
            <h3>预约审批中心</h3>
            <p>查看与处理所有排队请求</p>
          </div>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 专属传送门：点击直达各个管理表格
const goTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.admin-dashboard {
  padding: 30px;
  background-color: #f0f2f5;
  min-height: 100vh;
}

/* 顶部指挥官面板 */
.dashboard-header {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border-radius: 16px;
  padding: 30px 40px;
  color: white;
  margin-bottom: 40px;
  box-shadow: 0 10px 25px rgba(30, 60, 114, 0.2);
  animation: fadeInDown 0.8s ease-out;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.title-area h1 {
  margin: 0;
  font-size: 32px;
  letter-spacing: 2px;
}

.title-area p {
  margin: 8px 0 0 0;
  color: #a0bcdc;
  letter-spacing: 5px;
  font-size: 14px;
}

.admin-badge {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  border-radius: 50px;
  backdrop-filter: blur(5px);
}

.badge-info {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.role {
  font-weight: bold;
  font-size: 16px;
}

.status {
  font-size: 12px;
  color: #67c23a;
  margin-top: 5px;
}

/* 控制台标题 */
.section-title {
  font-size: 20px;
  color: #2c3e50;
  margin-bottom: 25px;
  border-left: 5px solid #1e3c72;
  padding-left: 10px;
}

/* 核心业务控制面板 */
.control-grid {
  margin-top: 10px;
}

.grid-col {
  margin-bottom: 24px;
}

.control-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: fadeInUp 0.8s ease-out;
}

.control-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

/* 卡片上半部分：大图标 */
.card-top {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  background: #f8f9fa;
  transition: background 0.3s ease;
}

.control-card:hover .card-top {
  background: #eef2f9;
}

/* 卡片下半部分：说明文字 */
.card-bottom {
  padding: 20px;
  text-align: center;
}

.card-bottom h3 {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 18px;
  font-weight: bold;
}

.card-bottom p {
  margin: 0;
  color: #909399;
  font-size: 13px;
  line-height: 1.5;
}

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