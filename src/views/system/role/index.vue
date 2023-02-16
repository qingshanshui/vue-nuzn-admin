<template>
  <div class="role-container">
    <el-row>
      <el-col>
        <Search @onAdd="onAdd" @onSearch="onSearch" :searchData="{ title: '角色' }" />
      </el-col>
      <el-col>
        <el-table :data="state.tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column prop="name" label="角色名称" show-overflow-tooltip />
          <el-table-column prop="remark" label="角色描述" show-overflow-tooltip />
          <el-table-column prop="CreatedAt" label="创建时间" show-overflow-tooltip>
            <template #default="scope">
              {{ moment(scope.row.CreatedAt).format('YYYY-MM-DD hh:mm:ss ') }}
            </template>
          </el-table-column>
          <el-table-column prop="order" label="排序" width="80" align="center" />
          <el-table-column prop="status" label="角色状态" width="80" align="center">
            <template #default="scope">
              <el-tag type="success" v-if="scope.row.status === 1">启用</el-tag>
              <el-tag type="info" v-else>禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="operations" label="操作" width="220px" align="center">
            <template #default="scope">
              <el-button size="small" @click="editRole(scope.row)">修改</el-button>
              <el-button size="small" type="warning" @click="GiveRoleAll(scope.row)">授权</el-button>
              <el-popconfirm confirm-button-text="Yes" cancel-button-text="No" :icon="InfoFilled" icon-color="#626AEF"
                title="确定要删除吗？" @confirm="delRole(scope.row)">
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
    <GiveRoleAuthorize ref="giveRoleAuthorizes" />
</div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { DelRoleList, GetRoleList } from '/@/api/system';
import moment from 'moment';
import Search from '/@/views/system/component/search.vue';
import CreateModel from '/@/views/system/role/component/create.vue';
import EditModel from '/@/views/system/role/component/edit.vue';
import GiveRoleAuthorize from '/@/views/system/role/component/giveRoleAuthorize.vue';
import { ElNotification } from 'element-plus';
import { InfoFilled } from '@element-plus/icons-vue'
// 列表数据
let state = reactive({
  tableData: [],
});

// 刷新列表数据
const onSubmit = () => {
  initTableData();
};

// 搜索
const onSearch = (con: any) => {
  console.log(con, "搜索")
};


// 添加角色
let createModels = ref();
const onAdd = () => {
  createModels.value.show();
};

// 编辑角色
let editModels = ref();
const editRole = (row: object) => {
  editModels.value.show(row);
};

// 角色授权
let giveRoleAuthorizes = ref();
const GiveRoleAll = (row: object) => {
  giveRoleAuthorizes.value.show(row);
};
// 删除
const delRole = async (row: object) => {
  let res: any = await DelRoleList(row);
  if (res.code == 1000) {
    ElNotification({
      title: '删除成功',
      message: '删除权限成功',
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
// 获取权限列表
const initTableData = async () => {
  let res = await GetRoleList({});
  state.tableData = res.data;
};

// 页面加载时
onMounted(() => {
  initTableData();
});
</script>

<style scoped></style>
