<template>
  <div class="menu-container">
    <el-row>
      <el-col>
        <Search @onAdd="onAdd" @onSearch="onSearch" :searchData="{ title: '菜单' }" />
      </el-col>
      <el-col>
        <el-table :data="state.tableData" style="width: 100%; margin-bottom: 20px" row-key="uid">
          <el-table-column prop="title" label="菜单名称(title)" show-overflow-tooltip />
          <el-table-column prop="name" label="组件昵称(name)" show-overflow-tooltip />
          <el-table-column prop="path" label="路由" show-overflow-tooltip />
          <el-table-column prop="component" label="组件路径" show-overflow-tooltip />
          <el-table-column prop="redirect" label="重定向" show-overflow-tooltip />
          <el-table-column prop="order" label="排序" width="80" align="center" />
          <el-table-column prop="type" label="类型" width="80" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.type === '3'" class="ml-2" type="success">菜单</el-tag>
              <el-tag v-if="scope.row.type === '1'" class="ml-2" type="info">按钮</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="operations" label="操作" width="160" align="center">
            <template #default="scope">
              <el-button size="small" @click="editMenu(scope.row)">修改</el-button>
              <el-popconfirm confirm-button-text="Yes" cancel-button-text="No" :icon="InfoFilled" icon-color="#626AEF"
                title="确定要删除吗？" @confirm="delMenu(scope.row)">
                <template #reference>
                  <el-button size="small" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <CreateModel ref="createModels" @onSubmit="onSubmit" />
    <EditModel ref="editModels" @onSubmit="onSubmit" />
</div>
</template>

<script setup lang="ts">
import Search from '/@/views/system/component/search.vue';
import { onMounted, reactive, ref } from 'vue';
import { DelMenuList, GetMenuList } from '/@/api/system';
import { arrayToTree } from '/@/utils/tool';
import CreateModel from '/@/views/system/menu/component/create.vue';
import EditModel from '/@/views/system/menu/component/edit.vue';
import { ElNotification } from 'element-plus';
import { InfoFilled } from '@element-plus/icons-vue'

// TODO 按钮级别权限   我想要做到路由级别   不做到角色级别
// 角色级别是 一登录就获取到  [add,edit,del,look]
// 按钮级别是 访问每个路由时候 在每个路由底下的mete标签下[add,edit,del,look,...] 这样写更细致化

// 弹框ref
let createModels = ref();
let editModels = ref();

// 列表数据
let state = reactive({
  tableData: [] as any[],
});

// 刷新数据 --- 添加更新成功回填刷新列表
const onSubmit = () => {
  initTableData();
};
// 删除菜单
const delMenu = async (row: object) => {
  let res: any = await DelMenuList(row);
  if (res.code == 1000) {
    ElNotification({
      title: '删除成功',
      message: '删除菜单成功',
      type: 'success',
    });
    await initTableData();
  } else {
    ElNotification({
      title: '删除失败',
      message: res.data,
      type: 'error',
    });
  }
};
// 搜索
const onSearch = (con: any) => {
  console.log(con, "搜索")
};
// 编辑
const editMenu = (row: object) => {
  editModels.value.show(GetData(), row);
};
// 添加
const onAdd = () => {
  createModels.value.show(GetData());
};
// 转变数据
const GetData = () => {
  let setState = JSON.parse(JSON.stringify(state.tableData))
  setState.unshift({
    "uid": '0',
    "title": '最上级',
    "name": '最上级',
    "parentUid": '',
  });
  return setState
}

// 初始化
const initTableData = async () => {
  let res = await GetMenuList({});
  state.tableData = arrayToTree(res.data, 0);
};

// 页面加载时
onMounted(() => {
  initTableData();
});
</script>

<style scoped lang="scss"></style>
