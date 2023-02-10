<template>
  <!--  模板渲染组件-->
  <component :is="themeConfig.layout"/>
</template>
<script setup lang="ts">
import {reactive, defineAsyncComponent, markRaw} from 'vue'

// layout模板
const defaults = defineAsyncComponent(() => import('/@/layout/main/default.vue'))
const drak = defineAsyncComponent(() => import('/@/layout/main/drak.vue'))

// 初始化模板
const themeConfig = reactive({
  layout: markRaw(defaults)
})

</script>
<style scoped lang="scss">

</style>
