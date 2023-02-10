<template>
  <div class="upload-container">
    <img :src="state.src" alt="" id="img">
    <input type="file" name="file" id="file" @change="changeUpload">
    <el-button @click="handelClickUpload" type="primary" :loading="state.loading">上传</el-button>
  </div>
</template>

<script setup lang="ts">
import {reactive, getCurrentInstance} from "vue";
import {chunkFile, mergeFile} from '/@/api/file'
import {nanoid} from "nanoid";

// 获取上下文
const {proxy} = <any>getCurrentInstance()

// 开始上传
const handelClickUpload = async () => {
  state.loading = true
  try {
    // 创建切片
    let fileChunks:any = [] // 切片集合数组
    // let size = 1024 * 1024 * 10; // 10MB 切片大小
    let size = 1024 * 1024; // 1m 切片大小
    let index = 0 // 切片序号
    let file = state.files // file文件

    for (let i = 0; i < file.size; i += size) {
      fileChunks.push({
        hash: index++,
        chunk: file.slice(i, i + size)
      })
    }

    // 生成 文件统一的 nanoid
    let id = nanoid()
    for (let i = 0; i < fileChunks.length; i++) {
      let item = fileChunks[i]
      let formData = new FormData()
      formData.append('fileName', file.name)
      formData.append('fileId', id)
      formData.append('fileChunk', item.chunk)
      formData.append('fileIndex', item.hash)
      await chunkFile(formData)
    }
    let formData = new FormData()
    formData.append('fileId', id)
    formData.append('fileName', file.name)
    formData.append('fileIndex', fileChunks.length)
    let res: any = await mergeFile(formData)
    if (res.code != 1000) return proxy.$message.warning("上传失败" + res.msg)
    state.loading = false
    proxy.$message.success("上传成功：", res.data)
  } catch (error) {
    state.loading = false
  }

}

// 定义 FormState 接口
interface FormState {
  src: string | ArrayBuffer | null;
  files: any;
  loading: boolean,
}

// 数据源
let state = reactive<FormState>({
  src: null,
  files: null,
  loading: false,
})

// 监听表单变化
const changeUpload = (e: any) => {
  if (!e.target.files && !e.target.files[0]) return false;
  state.files = e.target.files[0]
  // 只要图片才走 预览图片功能
  if (e.target.files[0].type.indexOf('image') != -1) {
    let router = new FileReader(); //创建读取文件对象
    router.readAsDataURL(e.target.files[0]); //读取文件路劲
    router.onload = function () {
      state.src = router.result;
    }
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
