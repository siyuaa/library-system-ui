<template>
  <div style="padding:20px">
    <h2>预约管理</h2>

    <div style="margin-bottom:15px">
      <el-input v-model="readerId" placeholder="读者ID" style="width:150px; margin-right:10px;" />
      <el-input v-model="bookId" placeholder="图书ID" style="width:150px; margin-right:10px;" />
      <el-button type="primary" @click="reserveBook">预约</el-button>
    </div>

    <el-table :data="reservations" border style="width:100%">
      <el-table-column prop="reservationId" label="预约ID" width="80" />
      <el-table-column prop="readerId" label="读者ID" width="80" />
      <el-table-column prop="bookId" label="图书ID" width="80" />
      <el-table-column prop="reservationTime" label="预约时间" />
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button type="danger" size="small" @click="cancelReservation(scope.row.reservationId)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const readerId = ref('')
const bookId = ref('')
const reservations = ref([])

const loadReservations = async () => {
  try{
    const res = await axios.get('http://localhost:8080/reservation')
    reservations.value = res.data || []
  }catch(err){
    console.error(err)
  }
}

const reserveBook = async () => {
  try{
    await axios.post('http://localhost:8080/reservation', { readerId: readerId.value, bookId: bookId.value })
    ElMessage.success('预约成功')
    loadReservations()
  }catch(err){
    console.error(err)
    ElMessage.error('预约失败')
  }
}

const cancelReservation = async (id) => {
  try{
    await axios.delete(`http://localhost:8080/reservation/${id}`)
    ElMessage.success('取消成功')
    loadReservations()
  }catch(err){
    console.error(err)
    ElMessage.error('取消失败')
  }
}

onMounted(() => { loadReservations() })
</script>