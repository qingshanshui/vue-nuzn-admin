<template>
  <div class="upload-container">
    <img :src="state.src" alt="" id="img">
    <input type="file" name="file" id="file" @change="changeUpload">
    <el-button @click="handelClickUpload" type="primary">上传</el-button>
</div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance } from "vue";
import { SaveUpload } from '/@/api/file'

// 获取上下文
const { proxy } = <any>getCurrentInstance()

// 上传文件
const handelClickUpload = async () => {
  let formData = new FormData()
  formData.append('file', state.files)
  let res: any = await SaveUpload(formData)
  if (res.code != 1000) {
    proxy.$message.warning("上传失败" + res.msg)
  }
  proxy.$message.success("上传成功" + res.data)

}

// 定义FormState接口
interface FormState {
  src: any;
  files: any;
}

// 数据源
let state = reactive<FormState>({
  src: null,
  files: null,
})

// 监听表单变化
const changeUpload = (e: any) => {
  let router = new FileReader(); //创建读取文件对象
  if (!e.target.files && !e.target.files[0]) return false;
  state.files = e.target.files[0]
  router.readAsDataURL(e.target.files[0]); //读取文件路劲
  router.onload = function () {
    state.src = router.result;
  }
}
</script>

<style scoped lang="scss">
.upload-container {
  img {
    max-width: 300px;
    max-height: 300px;
  }
}
</style>
