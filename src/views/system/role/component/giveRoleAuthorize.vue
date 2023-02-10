<template>
  <el-dialog v-model="dialogVisible" title="授权">
    <el-tree
        ref="treeRef"
        :data="state.tableData"
        node-key="uid"
        :props="defaultProps"
        show-checkbox
        default-expand-all
    />
    <template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="saveRole">确定</el-button>
			</span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {defineExpose, reactive, ref, nextTick} from 'vue';
import {ElNotification} from 'element-plus';
import {GetMenuList, GetOneRoleRoleList, GiveRolesRoleList} from '/@/api/system';
import {arrayToTree} from '/@/utils/tool';

// 回选  选中节点
const setCheckedKeys = (arr: Array<any>) => {
  arr.forEach((item) => {
    nextTick(() => {
      let node = treeRef.value.getNode(item.uid);
      if (node.isLeaf) {
        //判断是否是子节点
        treeRef.value.setChecked(node, true);
      }
    });
  });
};

// 获取数据
const initTableData = async () => {
  // 获取菜单/获取当前角色授权菜单
  let [res, oneRes] = await Promise.all([GetMenuList({}), GetOneRoleRoleList({roleUid: state.row.uid})]);
  state.tableData = arrayToTree(res.data, 0);
  setCheckedKeys(oneRes.data || []);
};

// 数据源
let state = reactive({
  tableData: [],
  row: {
    uid: null,
  },
});

// tree 的 ref
const treeRef = ref();

// 保存授权
const saveRole = async () => {
  // 获取选择的数据
  let arr = treeRef.value!.getCheckedKeys().concat(treeRef.value!.getHalfCheckedKeys());
  let res: any = await GiveRolesRoleList({roleUid: state.row.uid, menuUidList: arr});
  if (res.code == 1000) {
    ElNotification({
      title: '授权成功',
      message: '授权用户成功',
      type: 'success',
    });
    hide();
  }else {
    ElNotification({
      title: '授权失败',
      message: res.data,
      type: 'error',
    });
  }
};

// tree 配置项
const defaultProps = {
  children: 'children',
  label: 'title',
};

// 弹框 的 ref
const dialogVisible = ref(false);

// 显示
const show = (row: any) => {
  state.row = row;
  initTableData();
  dialogVisible.value = true;
};

// 隐藏
const hide = () => {
  dialogVisible.value = false;
};
// 导出函数
defineExpose({hide, show});
</script>

<style scoped lang="scss"></style>
