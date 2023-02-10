<template>
  <el-drawer
      v-model="drawer"
      title="系统设置"
      direction="rtl"
      size="250px">
    <div>
      <el-row :gutter="20">
        <el-col :span="12" style="display: flex;align-items: center">语言切换</el-col>
        <el-col :span="12">
          <el-select v-model="getThemeConfig.locale" @change="changeLanguage" class="m-2" placeholder="Select"
          >
            <el-option
                label="中文"
                value="zh-cn"/>
            <el-option
                label="英文"
                value="en"/>
          </el-select>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" style="display: flex;align-items: center">背景切换</el-col>
        <el-col :span="12">
          <el-switch v-model="getThemeConfig.isIsDark" @change="changeIsIsDark"/>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" style="display: flex;align-items: center">水印文字</el-col>
        <el-col :span="12">
          <el-input v-model="getThemeConfig.warTerMarkText" placeholder="请输入水印文字" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" style="display: flex;align-items: center">全屏水印</el-col>
        <el-col :span="12">
          <el-switch v-model="getThemeConfig.isWarTerMark" @change="onWartermarkChange"/>
        </el-col>
      </el-row>
    </div>
  </el-drawer>
</template>
<script setup lang="ts">
import {defineExpose, ref, getCurrentInstance, computed, watch, onMounted} from 'vue'
import {Local} from "/@/utils/storage";//本地缓存
import {storeToRefs} from 'pinia'; // pinia响应式 refs
import {useThemeConfig} from '/@/stores/themeConfig' // 引入布局pinia
import Watermark from '/@/utils/wartermark'

const {themeConfig} = storeToRefs(useThemeConfig());// 响应解析
// 组件上下文
const {proxy} = <any>getCurrentInstance();
// 获取布局配置信息
const getThemeConfig = computed(() => {
  return themeConfig.value;
});

// 语言切换
const changeLanguage = () => {
  proxy.$i18n.locale = getThemeConfig.value.locale;
}

// 深色模式
const changeIsIsDark = () => {
  const body = document.documentElement as HTMLElement;
  if (getThemeConfig.value.isIsDark) body.setAttribute('data-theme', 'dark');
  else body.setAttribute('data-theme', '');
}
// 4、界面显示 --> 开启水印
const onWartermarkChange = () => {
  getThemeConfig.value.isWarTerMark ? Watermark.set(getThemeConfig.value.warTerMarkText) : Watermark.del();
};
// 存储布局
const setLocalThemeConfig = () => {
  Local.remove('theme');
  Local.set('theme', getThemeConfig.value);
};
// 监听 布局 变化 去本地存储布局
watch(getThemeConfig.value, () => {
  setLocalThemeConfig()
})
// drawer弹框ref
const drawer = ref(false)
// 显示
const show = () => {
  drawer.value = true
}
// 隐藏
const hide = () => {
  drawer.value = false
}
// 页面加载时
onMounted(() => {
  // 语言配置
  changeLanguage()
  // 深色模式
  changeIsIsDark()
  // 水印
  onWartermarkChange()
})
// 向外暴露函数
defineExpose({hide, show});
</script>

<style scoped lang="scss">
:deep .el-row {
  margin: 10px 0;

  .el-col {
    text-align: right;
  }
}
</style>
