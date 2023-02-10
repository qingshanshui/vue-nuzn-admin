<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="220px">
        <Aside/>
      </el-aside>
      <el-container>
        <el-header style="display:flex;align-items: center; background-color: var(--next-bg-main)">
          <Header/>
        </el-header>
        <el-main>
          <Main/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Aside from "/@/layout/component/Aside.vue"
import Header from "/@/layout/component/Header.vue"
import Main from "/@/layout/component/Main.vue"
</script>

<style scoped lang="scss">
</style>
