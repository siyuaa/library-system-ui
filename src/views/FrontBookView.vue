<template>
  <div class="front-mall">
    
    <div class="hero-banner">
      <div class="hero-content">
        <h1>探索无界知识宇宙</h1>
        <p>EXPLORE THE KNOWLEDGE UNIVERSE</p>
        
        <div class="search-box">
          <el-input
            v-model="keyword"
            placeholder="输入你想看的书名或作者..."
            class="search-input"
            clearable
            @keyup.enter="searchBooks"
          >
            <template #append>
              <el-button color="#626aef" @click="searchBooks">
                🔍 搜索一下
              </el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>

    <div class="book-container">
      <div class="section-title">
        <h2>🔥 热门好书推荐</h2>
      </div>

      <el-empty 
        v-if="books.length === 0" 
        description="哎呀，这里暂时没有找到这本书哦~" 
      />

      <el-row :gutter="24" class="book-grid">
        <el-col 
          :xs="24" :sm="12" :md="8" :lg="6" 
          v-for="book in books" 
          :key="book.bookId"
          class="book-col"
        >
          <el-card shadow="hover" class="mall-book-card" :body-style="{ padding: '0px' }">
            
            <div class="book-cover">
              <span class="cover-icon">📖</span>
            </div>
            
            <div class="book-info">
              <h3 class="book-title">{{ book.title }}</h3>
              <p class="book-author">✍️ 作者：{{ book.author }}</p>
              <p class="book-publisher">🏢 出版：{{ book.publisher }}</p>
              
              <div class="stock-tag">
                <el-tag :type="book.availableCount > 0 ? 'success' : 'danger'" size="small" round>
                  {{ book.availableCount > 0 ? `有货 (可借 ${book.availableCount} 本)` : '已抢空' }}
                </el-tag>
              </div>

              <div class="action-bar">
                <el-button 
                  color="#ff6b81" plain round size="small"
                  @click="handleAction('favorite', book)"
                >
                  ❤️ 收藏
                </el-button>
                <el-button 
                  color="#626aef" round size="small" 
                  :disabled="book.availableCount <= 0"
                  @click="handleAction('borrow', book)"
                >
                  🚀 立即借阅
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const books = ref([])
const keyword = ref('')

// 1. 加载所有图书
const loadBooks = async () => {
  try {
    const res = await axios.get('http://localhost:8080/books')
    books.value = Array.isArray(res.data) ? res.data : (res.data.data || [])
  } catch (error) {
    console.error("加载图书失败：", error)
  }
}

// 2. 搜索图书
const searchBooks = async ()=> {
  if (!keyword.value) {
    loadBooks()
    return
  }
  try {
    const res = await axios.get('http://localhost:8080/books/search', {
      params: { keyword: keyword.value }
    })
    books.value = Array.isArray(res.data) ? res.data : (res.data.data || [])
  } catch (error) {
    console.error("搜索失败：", error)
  }
}

// 3. 🌟 彻底重写的核心逻辑：真实的借书与收藏！
const handleAction = async (type, book) => {
  // 第一步：先去问浏览器，这个人到底登没登录？
  const userRole = localStorage.getItem('userRole')
  const readerId = localStorage.getItem('readerId')

  // 如果没登录，或者不是读者身份，直接踢去登录页！
  if (userRole !== 'reader' || !readerId) {
    ElMessage.warning('亲，请先登录读者账号再操作哦！🔐')
    router.push('/login') // 顺便贴心地帮他跳转到登录门
    return
  }

  // 第二步：开始干正事！
  try {
    if (type === 'favorite') {
      // 发送真实收藏请求
      await axios.post('http://localhost:8080/favorite', {
        bookId: book.bookId,
        readerId: readerId
      })
      ElMessage.success(`❤️ 成功将《${book.title}》收入囊中！去我的主页看看吧！`)
    } 
    
    else if (type === 'borrow') {
      // 发送真实借书请求
      await axios.post('http://localhost:8080/borrow/borrowBook', {
        bookId: book.bookId,
        readerId: readerId,
        status: 'BORROWED'
      })
      ElMessage.success(`🚀 借阅成功！快去我的借阅记录里查看吧！`)
      
      // 借完书，库存少了，赶紧刷新一下大厅的展示！
      loadBooks() 
    }
  } catch (error) {
    console.error("操作失败：", error)
    ElMessage.error('操作失败啦，可能是网络不好，或者你已经操作过这本书了！')
  }
}

onMounted(() => {
  loadBooks()
})
</script>

<style scoped>
/* 原有的高颜值样式完全保留，一行没动！ */
.front-mall {
  background-color: #f7f9fc;
  min-height: 100vh;
  padding-bottom: 50px;
}
.hero-banner {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  padding: 80px 20px;
  text-align: center;
  color: white;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  box-shadow: 0 10px 30px rgba(37, 117, 252, 0.2);
}
.hero-content h1 {
  font-size: 42px;
  font-weight: 900;
  margin: 0;
  letter-spacing: 2px;
}
.hero-content p {
  font-size: 14px;
  opacity: 0.8;
  letter-spacing: 5px;
  margin-top: 10px;
  margin-bottom: 40px;
}
.search-box {
  max-width: 600px;
  margin: 0 auto;
}
:deep(.el-input-group__append) {
  background-color: #626aef;
  color: white;
  border: none;
}
:deep(.el-input__wrapper) {
  border-radius: 20px 0 0 20px;
  padding-left: 20px;
}
.book-container {
  max-width: 1200px;
  margin: -40px auto 0; 
  padding: 0 20px;
}
.section-title h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  margin-top: 60px;
}
.book-col {
  margin-bottom: 30px;
}
.mall-book-card {
  border: none;
  border-radius: 16px;
  transition: all 0.3s ease;
  overflow: hidden;
}
.mall-book-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}
.book-cover {
  height: 200px;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover-icon {
  font-size: 80px;
  filter: drop-shadow(0 10px 10px rgba(0,0,0,0.1));
}
.book-info {
  padding: 20px;
}
.book-title {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.book-author, .book-publisher {
  font-size: 13px;
  color: #7f8c8d;
  margin: 5px 0;
}
.stock-tag {
  margin: 15px 0;
}
.action-bar {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  border-top: 1px dashed #ebeef5;
  padding-top: 15px;
}
</style>