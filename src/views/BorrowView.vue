<template>
  <div style="padding:20px">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h2>🔄 借还书中心</h2>
      <el-button type="success" @click="dialogVisible = true">办理借书</el-button>
    </div>

    <el-table :data="records" border style="width: 100%; margin-top: 20px;">
      <el-table-column prop="borrowId" label="记录ID" width="80" align="center" />
      <el-table-column prop="bookId" label="图书ID" width="100" align="center" />
      <el-table-column prop="readerId" label="读者ID" width="100" align="center" />
      
      <el-table-column prop="borrowTime" label="借出时间" width="180" />
      <el-table-column prop="returnTime" label="归还时间" width="180" />
      
      <el-table-column prop="status" label="状态" width="120" align="center">
        <template #default="scope">
          <el-tag :type="scope.row?.status === 'RETURNED' ? 'success' : 'warning'">
            {{ scope.row?.status === 'RETURNED' ? '已归还' : '借阅中' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="120" align="center">
        <template #default="scope">
          <el-button 
            v-if="scope.row?.status === 'BORROWED'" 
            type="primary" 
            size="small" 
            @click="returnBook(scope.row?.borrowId)"
          >
            办理还书
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="办理借书" width="400">
      <el-form label-width="80px">
        <el-dialog
  v-model="dialogVisible"
  title="办理借书"
  width="400"
>
  <el-form label-width="80px">

    <el-form-item label="图书ID">
      <el-input
        v-model="borrowForm.bookId"
        placeholder="请输入图书ID"
      />
    </el-form-item>

  </el-form>

  <template #footer>
    <el-button @click="dialogVisible = false">
      取消
    </el-button>

    <el-button
      type="success"
      @click="submitBorrow"
    >
      确认借书
    </el-button>
  </template>
</el-dialog>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="success" @click="submitBorrow">确认借出</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const records = ref([])
const dialogVisible = ref(false)

const readerId = localStorage.getItem('readerId')

const borrowForm = ref({
  bookId: ''
})

const API_BASE_URL = 'http://localhost:8080/borrow'

// 加载我的借阅记录
const loadRecords = async () => {
  try {

    const res = await axios.get(
      `${API_BASE_URL}/reader/${readerId}`
    )

    records.value = res.data

  } catch (error) {
    console.error(error)
    records.value = []
  }
}

// 借书
const submitBorrow = async () => {

  try {

    await axios.post(API_BASE_URL, {
      bookId: borrowForm.value.bookId,
      readerId: readerId,
      status: 'BORROWED'
    })

    ElMessage.success('借书成功')

    dialogVisible.value = false

    borrowForm.value.bookId = ''

    loadRecords()

  } catch (error) {
    console.error(error)
    ElMessage.error('借书失败')
  }
}

// 还书
const returnBook = async (borrowId) => {

  try {

    await axios.put(
      `${API_BASE_URL}/returnBook/${borrowId}`
    )

    ElMessage.success('还书成功')

    loadRecords()

  } catch (error) {
    console.error(error)
    ElMessage.error('还书失败')
  }
}

onMounted(() => {
  loadRecords()
})
</script>