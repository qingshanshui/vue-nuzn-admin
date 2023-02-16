<script setup lang="ts">
import { watch, computed, onMounted } from 'vue';
import Tool from "/@/utils/tool";
import enLocale from 'element-plus/lib/locale/lang/en';
import zhLocale from 'element-plus/lib/locale/lang/zh-cn';
import { useRoute } from 'vue-router';
import { useThemeConfig } from '/@/stores/themeConfig'
import { Local } from "/@/utils/storage";

// 路由信息
let route: any = useRoute();
// 模板信息
const stores = useThemeConfig();
// 多语言设置
let locale = computed(() => {
  return stores.themeConfig.locale == 'en' ? enLocale : zhLocale
})
// 页面加载时
onMounted(() => {
  // 获取缓存的布局
  if (Local.get('theme')) {
    stores.setThemeConfig(Local.get("theme"))
  }
  // 批量设置css，js
  Tool.setCssCdn()
  Tool.setJsCdn()
})
// 监听path 变化设置标题的
watch(
  () => route.path,
  () => {
    document.title = `${route.name}||${new Date().getTime()}`
  },
  { deep: true }
);
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
</el-config-provider>
</template>

<style scoped lang="scss"></style>
