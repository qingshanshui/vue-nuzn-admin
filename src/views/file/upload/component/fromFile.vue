<template>
  <div class="upload-container">
    <form action="/v1/basic/files/upload/formFile" method="post" enctype="multipart/form-data" @change="changeUpload">
      <img :src="state.src" alt="" id="img">
      <input type="file" name="file" id="file">
      <el-button type="primary" native-type="submit">上传</el-button>
    </form>
</div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

// FormState 接口
interface FormState {
  src: any;
}

// 数据源
let state = reactive<FormState>({
  src: null,
})

// 监听form 表单的变动
const changeUpload = (e: any) => {
  let router = new FileReader(); //创建读取文件对象
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
