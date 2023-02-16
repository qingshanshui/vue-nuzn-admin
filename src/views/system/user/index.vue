<template>
  <div class="user-container">
    <el-row>
      <el-col>
        <Search @onAdd="onAdd" @onSearch="onSearch" :searchData="{ title: '用户' }" />
      </el-col>
      <el-col>
        <el-table :data="state.tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column prop="uid" label="uid" show-overflow-tooltip />
          <el-table-column prop="nickname" label="昵称" show-overflow-tooltip />
          <el-table-column prop="username" label="账号" show-overflow-tooltip />
          <el-table-column prop="telephone" label="手机号" show-overflow-tooltip />
          <el-table-column prop="email" label="邮箱" show-overflow-tooltip />
          <el-table-column prop="order" label="关联角色" show-overflow-tooltip />
          <el-table-column prop="sex" label="性别" width="80" align="center" />
          <el-table-column prop="desc" label="状态" width="80" align="center">
            <template #default="scope">
              <el-tag type="success" v-if="scope.row.status">启用</el-tag>
              <el-tag type="info" v-else>禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="CreatedAt" label="创建时间" show-overflow-tooltip>
            <template #default="scope">
              {{ moment(scope.row.CreatedAt).format('YYYY-MM-DD hh:mm:ss ') }}
            </template>
          </el-table-column>
          <el-table-column prop="operations" label="操作" width="160" align="center">
            <template #default="scope">
              <el-button size="small" @click="editUser(scope.row)">修改</el-button>
              <el-popconfirm confirm-button-text="Yes" cancel-button-text="No" :icon="InfoFilled" icon-color="#626AEF"
                title="确定要删除吗？" @confirm="delUser(scope.row)">
                <template #reference>
                  <el-button size="small" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <CreateUserModel ref="createUsers" @onSubmit="onSubmit" />
    <EditUserModel ref="editUsers" @onSubmit="onSubmit" />
</div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { GetUserList, DelUserList } from '/@/api/system';
import moment from 'moment';
import Search from '/@/views/system/component/search.vue';
import CreateUserModel from '/@/views/system/user/component/create.vue';
import EditUserModel from '/@/views/system/user/component/edit.vue';
import { ElNotification } from 'element-plus';
import { InfoFilled } from '@element-plus/icons-vue'

// 刷新表格数据
const onSubmit = () => {
  initTableData();
};

// 列表数据
let state = reactive({
  tableData: [],
});

// 搜索
const onSearch = (con: any) => {
  console.log(con, "搜索")
};

// 添加用户
let createUsers = ref();
const onAdd = () => {
  createUsers.value.show();
};

// 编辑用户
let editUsers = ref();
const editUser = (row: any) => {
  editUsers.value.show(row);
};

// 删除用户
const delUser = async (row: any) => {
  let res: any = await DelUserList({ uid: row.uid });
  if (res.code == 1000) {
    ElNotification({
      title: '删除成功',
      message: '删除用户成功',
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

// 初始化用户列表
const initTableData = async () => {
  let res = await GetUserList({});
  state.tableData = res.data;
};

// 页面加载时
onMounted(() => {
  initTableData();
});
</script>

<style scoped></style>
