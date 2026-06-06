<template>
  <div style="padding:20px">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h2>读者管理</h2>
      <el-button type="success" @click="dialogVisible = true">新增读者</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-input v-model="keyword" placeholder="请输入姓名或电话" style="width:300px; margin-right:10px;" />
      <el-button type="primary" @click="searchReaders">搜索</el-button>
      <el-button @click="loadReaders">全部</el-button>
    </div>

    <el-table :data="readers" border style="width:100%">
      <el-table-column prop="readerId" label="ID" width="80" align="center" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="gender" label="性别" width="80" align="center" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="status" label="状态" width="100" align="center" />

      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" @click="editReader(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteReader(scope.row.readerId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增读者弹窗 -->
    <el-dialog v-model="dialogVisible" title="新增读者" width="500">
      <el-form>
        <el-form-item label="姓名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.gender" placeholder="请选择">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="addReader">保存</el-button>
      </template>
    </el-dialog>

    <!-- 编辑读者弹窗 -->
    <el-dialog v-model="editDialogVisible" title="编辑读者" width="500">
      <el-form>
        <el-form-item label="姓名">
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="editForm.gender" placeholder="请选择">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="editForm.phone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="editForm.status" placeholder="请选择">
            <el-option label="正常" value="1" />
            <el-option label="挂失/冻结" value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDialogVisible=false">取消</el-button>
        <el-button type="primary" @click="updateReader">保存修改</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const readers = ref([])
const keyword = ref('')

// 新增弹窗
const dialogVisible = ref(false)
const form = ref({ name:'', gender:'男', phone:'', email:'', password:'123456' })

// 编辑弹窗
const editDialogVisible = ref(false)
const editForm = ref({ readerId:null, name:'', gender:'男', phone:'', email:'', status:1 })

// 加载所有读者
const loadReaders = async () => {
  try{
    const res = await axios.get('http://localhost:8080/readers')
    readers.value = res.data || []
  }catch(err){
    console.error(err)
  }
}

// 搜索读者
const searchReaders = async () => {
  try{
    const res = await axios.get('http://localhost:8080/readers/search', {
      params:{ keyword: keyword.value }
    })
    readers.value = res.data || []
  }catch(err){ console.error(err) }
}

// 新增读者
const addReader = async () => {
  try{
    await axios.post('http://localhost:8080/readers', form.value)
    ElMessage.success('新增成功')
    dialogVisible.value=false
    loadReaders()
  }catch(err){
    console.error(err)
    ElMessage.error('新增失败')
  }
}

// 编辑读者
const editReader = (row) => {
  editForm.value = { ...row }
  editDialogVisible.value = true
}

const updateReader = async () => {
  try{
    await axios.put('http://localhost:8080/readers', editForm.value)
    ElMessage.success('修改成功')
    editDialogVisible.value = false
    loadReaders()
  }catch(err){
    console.error(err)
    ElMessage.error('修改失败')
  }
}

// 删除读者
const deleteReader = async (id) => {
  if(!confirm('确定删除吗？')) return
  try{
    await axios.delete(`http://localhost:8080/readers/${id}`)
    ElMessage.success('删除成功')
    loadReaders()
  }catch(err){
    console.error(err)
    ElMessage.error('删除失败')
  }
}

onMounted(() => { loadReaders() })
</script>