<template>
  <div class="main-container">
    <!--    TODO 需要动态记录 高度-->
    <el-scrollbar height="776px">
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {NextLoading} from "/@/utils/loading";

// 页面加载完毕 关闭全局loading
onMounted(() => {
  setTimeout(()=>{
    NextLoading.done()
  },500)
})
</script>

<style scoped lang="scss">
.main-container {
  background-color: #ffffff;
  padding: 20px;
}
</style>
