<template>
  <i v-if="isShowIconFontIcon" class="iconfont" :class="props.name" />
  <el-icon v-else>
    <component :is="props.name" />
</el-icon>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
  name: {
    type: String
  },
  size: {
    type: Number,
    default: () => 14
  },
  color: {
    type: String
  }
})

// 判断 是否是 iconfont图标
const isShowIconFontIcon = computed(() => {
  return props?.name?.startsWith('icon-')
})
</script>
<style scoped lang="scss"></style>
