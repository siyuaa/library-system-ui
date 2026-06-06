<template>
  <div class="login-container">
    
    <div class="login-box">
      <div class="login-header">
        <div class="logo-icon">📚</div>
        <h2>欢迎来到云端图书馆</h2>
        <p>EXPLORE THE KNOWLEDGE UNIVERSE</p>
      </div>

      <el-form :model="loginForm" class="login-form">
        
        <el-form-item>
          <el-radio-group v-model="loginForm.role" class="role-selector">
            <el-radio-button value="reader">👤 读者登录</el-radio-button>
            <el-radio-button value="admin">👑 管理员登录</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-input 
            v-model="loginForm.username" 
            placeholder="请输入您的专属编号 (如: 2024083202)" 
            size="large"
            clearable
          >
            <template #prefix><span>🆔</span></template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-input 
            v-model="loginForm.password" 
            type="password" 
            placeholder="请输入密码 (随便输，现在是模拟登录)" 
            size="large"
            show-password
          >
            <template #prefix><span>🔒</span></template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button 
            type="primary" 
            class="submit-btn" 
            size="large" 
            @click="handleLogin"
            :loading="isLoading"
          >
            🚀 开启云端阅读之旅
          </el-button>
        </el-form-item>
        
        <div class="extra-links">
          <span class="link">忘记密码？</span>
          <span class="link register-link">👉 还没有账号？立即注册</span>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'  
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const isLoading = ref(false)

const loginForm = ref({
  username: '',
  password: '',
  role: 'reader'
})

const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    ElMessage.warning('账号和密码都要填哦！')
    return
  }

  isLoading.value = true

  try {
    if (loginForm.value.role === 'reader') {
      const res = await axios.post('http://localhost:8080/readers/login', {
        readerId: loginForm.value.username,
        password: loginForm.value.password
      })

      if (res.data === '登录成功') {
        ElMessage.success('登录成功，欢迎回到你的精神家园！📖')
        localStorage.setItem('userRole', 'reader')
        localStorage.setItem('readerId', loginForm.value.username) 
        router.push('/my-center')
        setTimeout(() => window.location.reload(), 500)
      } else {
        ElMessage.error(res.data) 
      }
    } 
    else if (loginForm.value.role === 'admin') {
      if (loginForm.value.username === 'admin' && loginForm.value.password === '123456') {
        ElMessage.success('尊敬的管理员，欢迎回来！👑')
        localStorage.setItem('userRole', 'admin')
        router.push('/admin-board')
        setTimeout(() => window.location.reload(), 500)
      } else {
        ElMessage.error('管理员账号或密码错误！')
      }
    }
  } catch (error) {
    console.error("登录异常：", error)
    ElMessage.error('服务器开小差了，请检查后端是否启动！')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.login-box {
  width: 420px;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 24px;
  padding: 50px 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: floatUp 0.8s ease-out;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo-icon {
  font-size: 50px;
  margin-bottom: 10px;
}

.login-header h2 {
  margin: 0;
  font-size: 26px;
  color: #2c3e50;
  font-weight: 800;
}

.login-header p {
  margin: 5px 0 0 0;
  font-size: 12px;
  color: #7f8c8d;
  letter-spacing: 2px;
}

.role-selector {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

:deep(.el-radio-button__inner) {
  width: 150px;
  border-radius: 8px !important;
  margin: 0 5px;
  border: 1px solid #dcdfe6 !important;
}

.submit-btn {
  width: 100%;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #626aef, #9a84ec);
  border: none;
  transition: transform 0.2s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(98, 106, 239, 0.3);
}

.extra-links {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 14px;
}

.link {
  color: #909399;
  cursor: pointer;
  transition: color 0.3s ease;
}

.link:hover {
  color: #626aef;
}

.register-link {
  font-weight: bold;
  color: #626aef;
}

@keyframes floatUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>