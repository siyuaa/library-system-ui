<template>
  <div style="padding:20px">
    <div
    style="display:flex;
    justify-content:space-between;
    align-items:center"
>

  <h2>图书管理</h2>

  <el-button
      type="success"
      @click="dialogVisible=true"
  >
    新增图书
  </el-button>

</div>
    
    <div style="margin-bottom:15px">
      <el-input
          v-model="keyword"
          placeholder="请输入书名或作者"
          style="width:300px; margin-right: 10px;"
      />
      <el-button type="primary" @click="searchBooks">搜索</el-button>
      <el-button @click="loadBooks">全部</el-button>
    </div>

    <el-table :data="books" border style="width: 100%">
      <el-table-column prop="bookId" label="ID" width="80" align="center" />
      <el-table-column prop="title" label="书名" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="publisher" label="出版社" />
      <el-table-column prop="availableCount" label="可借数量" width="100" align="center" />

      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button
    type="primary"
    size="small"
    @click="editBook(scope.row)"
>
  编辑
</el-button>

<el-button
    type="danger"
    size="small"
    @click="deleteBook(scope.row.bookId)"
>
  删除
</el-button>
        </template>
      </el-table-column>
    </el-table> </div>

<el-dialog
    v-model="dialogVisible"
    title="新增图书"
    width="500"
>

  <el-form>

    <el-form-item label="ISBN">
      <el-input v-model="form.isbn"/>
    </el-form-item>

    <el-form-item label="书名">
      <el-input v-model="form.title"/>
    </el-form-item>

    <el-form-item label="作者">
      <el-input v-model="form.author"/>
    </el-form-item>

    <el-form-item label="出版社">
      <el-input v-model="form.publisher"/>
    </el-form-item>

    <el-form-item label="分类ID">
      <el-input v-model="form.categoryId"/>
    </el-form-item>

    <el-form-item label="总数量">
      <el-input v-model="form.totalCount"/>
    </el-form-item>

    <el-form-item label="可借数量">
      <el-input v-model="form.availableCount"/>
    </el-form-item>

  </el-form>

  

  <template #footer>

    <el-button
        @click="dialogVisible=false"
    >
      取消
    </el-button>

    <el-button
        type="primary"
        @click="addBook"
    >
      保存
    </el-button>

  </template>

</el-dialog>

<el-dialog
    v-model="editDialogVisible"
    title="编辑图书"
    width="500"
>

  <el-form>

    <el-form-item label="ISBN">
      <el-input v-model="editForm.isbn"/>
    </el-form-item>

    <el-form-item label="书名">
      <el-input v-model="editForm.title"/>
    </el-form-item>

    <el-form-item label="作者">
      <el-input v-model="editForm.author"/>
    </el-form-item>

    <el-form-item label="出版社">
      <el-input v-model="editForm.publisher"/>
    </el-form-item>

    <el-form-item label="分类ID">
      <el-input v-model="editForm.categoryId"/>
    </el-form-item>

    <el-form-item label="总数量">
      <el-input v-model="editForm.totalCount"/>
    </el-form-item>

    <el-form-item label="可借数量">
      <el-input v-model="editForm.availableCount"/>
    </el-form-item>

  </el-form>

  <template #footer>

    <el-button
        @click="editDialogVisible=false"
    >
      取消
    </el-button>

    <el-button
        type="primary"
        @click="updateBook"
    >
      保存修改
    </el-button>

  </template>

</el-dialog>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const books = ref([])
const keyword = ref('')

const dialogVisible = ref(false)

const editDialogVisible = ref(false)

const editForm = ref({
  bookId:null,
  isbn:'',
  title:'',
  author:'',
  publisher:'',
  categoryId:1,
  totalCount:1,
  availableCount:1
})

const form = ref({
  isbn:'',
  title:'',
  author:'',
  publisher:'',
  categoryId:1,
  totalCount:1,
  availableCount:1
})

// 加载全部图书
const loadBooks = async () => {
  try {
    const res = await axios.get('http://localhost:8080/books')
    books.value = res.data || []
  } catch (error) {
    console.error("加载图书失败：", error)
    books.value = []
  }
}

// 搜索图书
const searchBooks = async () => {
  try {
    const res = await axios.get('http://localhost:8080/books/search', {
      params: {
        keyword: keyword.value
      }
    })
    books.value = res.data || []
  } catch (error) {
    console.error("搜索图书失败：", error)
    books.value = []
  }
}

// 删除图书
const deleteBook = async (id) => {
  if (!confirm("确定删除吗？")) return

  try {
    await axios.delete(`http://localhost:8080/books/${id}`)
    ElMessage.success('删除成功')
    loadBooks()
  } catch (error) {
    console.error("删除失败：", error)
    ElMessage.error('删除失败')
  }
}

const addBook = async () => {

  try{

    await axios.post(
        'http://localhost:8080/books',
        form.value
    )

    ElMessage.success('新增成功')

    dialogVisible.value=false

    loadBooks()

  }catch(err){

    ElMessage.error('新增失败')

    console.log(err)

  }
}

const editBook = (row) => {

  editForm.value = {
    ...row
  }

  editDialogVisible.value = true
}

const updateBook = async () => {

  try{

    await axios.put(
        'http://localhost:8080/books',
        editForm.value
    )

    ElMessage.success('修改成功')

    editDialogVisible.value = false

    loadBooks()

  }catch(err){

    ElMessage.error('修改失败')

    console.log(err)

  }
}


// 页面加载时立刻请求数据
onMounted(() => {
  loadBooks()
})
</script>