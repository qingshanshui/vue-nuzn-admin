<template>
  <div class="search">
    <el-input class="search-input" v-model="formInline" placeholder="请输入" />
    <el-button type="primary" @click="onSearch">查询</el-button>
    <el-button type="success" @click="onAdd">新增{{ props.searchData.title || '---' }}</el-button>
</div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue';

// 接收props参数
const props = defineProps({
  searchData: {
    type: Object,
    default: () => {
      return {
        title: '',
      };
    },
  },
});

// input的参数
const formInline = ref();

// 查询search
const onSearch = () => {
  emit('onSearch', formInline);
};

// 添加事件
const onAdd = () => {
  emit('onAdd');
};

// 向外暴露函数
const emit = defineEmits(['onAdd', 'onSearch']);
</script>

<style scoped lang="scss">
.search {
  display: flex;
  align-items: center;
  margin: 20px 0;

  .search-input {
    width: 200px;
    margin-right: 10px
  }
}
</style>
