<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="name">
      <el-input v-model="formInline.name" placeholder="请输入名称" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
<el-tree :props="props" :load="loadNode" lazy show-checkbox @current-change="currentChangeTree" />
</template>
<script setup lang="ts">
import { Tree } from '/@/api/tree'
import { reactive } from "vue";

const formInline = reactive({
  name: '',
})

const onSubmit = () => {
  console.log("搜索")
}

const state = reactive({
  treeData: null,
  nodes: null,
  resolve: null,
})

const props = {
  label: 'name',
  children: 'zones',
  isLeaf: 'leaf',
}

const loadNode = async (node: any, resolve: any) => {
  state.resolve = resolve
  if (node.level === 0) {
    const { data } = await Tree({ id: "10", types: '1', ...formInline })
    return resolve(data)
  }
  if (node.level == 1) {
    const { data } = await Tree({ id: "10", types: '2', ...formInline })
    return resolve(data)
  }
  if (node.level == 2) {
    const { data } = await Tree({ id: node.data.id, types: '3', ...formInline })
    return resolve(data)
  }
  if (node.level > 2) return resolve([])
}

const currentChangeTree = async (data: any, node: any) => {
  node.loaded = !node.loaded;
  node.loadData()
  state.treeData = data
  state.nodes = node
}
</script>

<style scoped lang="scss"></style>
