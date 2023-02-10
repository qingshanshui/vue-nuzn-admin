<template>
  <div class="upload">
    <el-row>
      <el-col>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>表单上传</span>
            </div>
          </template>
          <FromFile/>
        </el-card>
      </el-col>
      <el-col>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>FormDate+axios上传</span>
            </div>
          </template>
          <FormData/>
        </el-card>
      </el-col>
      <el-col>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>大文件上传（FormDate + 切片）</span>
            </div>
          </template>
          <ChunkFile/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import FromFile from './component/fromFile.vue';
import FormData from './component/FormData.vue';
import ChunkFile from './component/chunkFile.vue';
</script>
<style scoped lang="scss">
.upload {
  .el-row {
    .el-col {
      margin-bottom: 20px;
    }
  }
}
</style>
