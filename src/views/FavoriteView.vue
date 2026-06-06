<template>
  <div class="favorite-container">
    
    <div class="header-section">
      <div class="title-box">
        <span class="emoji-icon">✨</span>
        <h2 class="main-title">我的心动书单</h2>
        <span class="subtitle">记录你的每一次阅读悸动</span>
      </div>
      <el-button color="#626aef" class="add-btn" round @click="dialogVisible = true">
        ➕ 捕捉好书
      </el-button>
    </div>

    <el-empty 
      v-if="favorites.length === 0" 
      image-size="200" 
      description="你的收藏夹空空如也，快去寻宝吧~" 
    />

    <el-row :gutter="24" class="card-grid" v-else>
      <el-col 
        :xs="24" :sm="12" :md="8" :lg="6" 
        v-for="item in favorites" 
        :key="item.favoriteId" 
        class="card-col"
      >
        <el-card class="book-card" shadow="hover" :body-style="{ padding: '0px' }">
          
          <div class="card-top-bar"></div>
          
          <div class="card-content">
            <div class="cover-placeholder">📖</div>
            
            <div class="info-group">
              <h3 class="book-id">图书编号：No.{{ item.bookId }}</h3>
              <p class="reader-info">👤 收藏者：{{ item.readerId }}</p>
              <el-tag size="small" type="info" class="time-tag">
                🕒 {{ item.favoriteTime }}
              </el-tag>
            </div>

            <div class="card-footer">
              <span class="status-text">❤️ 已收藏</span>
              <el-button 
                type="danger" 
                circle 
                plain 
                class="delete-btn"
                @click="removeFavorite(item.favoriteId)"
                title="取消收藏"
              >
                🗑️
              </el-button>
            </div>
          </div>

        </el-card>
      </el-col>
    </el-row>

    <el-dialog v-model="dialogVisible" title="🌟 记录心动" width="400px" class="custom-dialog">
      <div class="dialog-desc">输入图书与读者编号，将其收入囊中。</div>
      <el-form label-width="70px" style="margin-top: 20px;">
        <el-form-item label="图书ID">
          <el-input v-model="form.bookId" placeholder="请输入好书的编号" />
        </el-form-item>
        <el-form-item label="读者ID">
          <el-input v-model="form.readerId" placeholder="请输入你的读者编号" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false" round>再想想</el-button>
        <el-button color="#626aef" @click="submitFavorite" round>❤️ 确认收藏</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 🌟 这里精准对接咱们刚刚写好的后端门牌号！
const API_BASE_URL = 'http://localhost:8080/favorite'

const favorites = ref([])
const dialogVisible = ref(false)

const form = ref({
  bookId: '',
  readerId: ''
})

const loadFavorites = async () => {

  try {

    const readerId =
      localStorage.getItem('readerId')

    const res = await axios.get(
      `http://localhost:8080/favorite/reader/${readerId}`
    )

    favorites.value = res.data

  } catch (error) {

    console.error("加载收藏失败：", error)

    favorites.value = []
  }
}

// 新增收藏
const submitFavorite = async () => {
  if (!form.value.bookId || !form.value.readerId) {
    ElMessage.warning('图书ID和读者ID都要填哦！')
    return
  }
  try {
    await axios.post(API_BASE_URL, form.value)
    ElMessage.success('心动好书收藏成功！🎉')
    dialogVisible.value = false
    form.value.bookId = '' // 清空表单
    loadFavorites()
  } catch (error) {
    console.error(error)
    ElMessage.error('收藏失败，服务器开小差了！')
  }
}

// 取消收藏
const removeFavorite = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`)
    ElMessage.success('已移出收藏夹 💔')
    loadFavorites()
  } catch (error) {
    console.error(error)
    ElMessage.error('取消失败！')
  }
}

onMounted(() => {
  loadFavorites()
})
</script>

<style scoped>
/* 整个页面的底色与内边距 */
.favorite-container {
  padding: 30px;
  background-color: #f7f9fc;
  min-height: 100vh;
  border-radius: 12px;
}

/* 头部设计 */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  background: white;
  padding: 20px 30px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
}

.title-box {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.emoji-icon {
  font-size: 28px;
}

.main-title {
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  color: #2c3e50;
  background: linear-gradient(45deg, #626aef, #b485cf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 14px;
  color: #909399;
}

.add-btn {
  font-weight: bold;
  letter-spacing: 1px;
}

/* 网格与卡片间距 */
.card-grid {
  margin-top: 10px;
}

.card-col {
  margin-bottom: 24px;
}

/* 卡片本体设计 */
.book-card {
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: #ffffff;
}

/* 鼠标悬浮时的丝滑放大特效 */
.book-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 14px 28px rgba(98, 106, 239, 0.1), 0 10px 10px rgba(98, 106, 239, 0.05) !important;
}

/* 卡片顶部的一抹紫色 */
.card-top-bar {
  height: 6px;
  background: linear-gradient(90deg, #626aef, #9a84ec);
}

.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 大大的Emoji作为封面 */
.cover-placeholder {
  font-size: 60px;
  margin-top: 10px;
  margin-bottom: 20px;
  background: #f0f2f5;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.05);
}

/* 文字信息区 */
.info-group {
  text-align: center;
  width: 100%;
}

.book-id {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 700;
  color: #303133;
}

.reader-info {
  margin: 0 0 15px 0;
  font-size: 14px;
  color: #606266;
}

.time-tag {
  border-radius: 8px;
}

/* 底部操作栏 */
.card-footer {
  margin-top: 25px;
  padding-top: 15px;
  border-top: 1px dashed #ebeef5;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-text {
  font-size: 13px;
  color: #f56c6c;
  font-weight: bold;
}

.delete-btn {
  border: none;
  font-size: 16px;
}

.delete-btn:hover {
  background-color: #fee2e2;
  transform: scale(1.1);
}

/* 弹窗文字设计 */
.dialog-desc {
  font-size: 13px;
  color: #909399;
  text-align: center;
  margin-bottom: 10px;
}
</style>