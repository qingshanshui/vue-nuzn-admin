<template>
  <el-dialog v-model="centerDialogVisible" title="编辑菜单" destroy-on-close>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" status-icon>
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级菜单" prop="parentUid">
            <el-cascader style="width: 100%" v-model="ruleForm.parentUid" :options="state.tableData" :props="cascadeProps"
              placeholder="请选择上级菜单" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单类型" prop="type">
            <el-radio-group v-model="ruleForm.type">
              <el-radio label="3">菜单</el-radio>
              <el-radio label="1">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单title" prop="title">
            <el-input v-model="ruleForm.title" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组件名称" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="路由路径" prop="path">
            <el-input v-model="ruleForm.path" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="重定向" prop="redirect">
            <el-input v-model="ruleForm.redirect" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组件路径" prop="component">
            <el-input v-model="ruleForm.component" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单排序" prop="order">
            <el-input v-model.number="ruleForm.order" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hide()">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
      </span>
    </template>
</el-dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose, reactive, defineEmits } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { EditMenuList } from '/@/api/system';
import { ElNotification } from 'element-plus';

// 表单ref
const ruleFormRef = ref<FormInstance>();
// 表单数据
const ruleForm = reactive({
  parentUid: ref([]),
  type: null,
  name: null,
  path: null,
  component: null,
  order: null,
  redirect: null,
  title: null,
  uid: null,
});

// 表单验证规则
const rules = reactive<FormRules>({
  parentUid: [
    { required: true, message: '必填项不能为空', trigger: ['blur', 'change'] },
  ],
  type: [
    { required: true, message: '必填项不能为空', trigger: ['blur', 'change'] },
  ],
  title: [
    { required: true, message: '必填项不能为空', trigger: ['blur', 'change'] },
  ],
  path: [
    { required: true, message: '必填项不能为空', trigger: ['blur', 'change'] },
  ],
  name: [
    { required: true, message: '必填项不能为空', trigger: ['blur', 'change'] },
  ],
  component: [
    { required: true, message: '必填项不能为空', trigger: ['blur', 'change'] },
  ],
});

// 上级菜单配置
const cascadeProps = {
  checkStrictly: true,
  label: 'title',
  value: 'uid',
};

// 上级菜单的 数据源
let state = reactive({
  tableData: [],
});

// create 弹出框 ref
const centerDialogVisible = ref(false);

// 打开弹框
const show = (data: any, row: any) => {
  state.tableData = data;
  ruleForm.parentUid = row.parentUid;
  ruleForm.type = row.type;
  ruleForm.name = row.name;
  ruleForm.path = row.path;
  ruleForm.component = row.component;
  ruleForm.order = row.order;
  ruleForm.redirect = row.redirect;
  ruleForm.title = row.title;
  ruleForm.uid = row.uid;
  centerDialogVisible.value = true;
};

// 关闭弹框
const hide = () => {
  centerDialogVisible.value = false;
};

// 编辑
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      let res: any = await EditMenuList({
        ...ruleForm,
        parentUid: Array.isArray(ruleForm.parentUid) ? ruleForm.parentUid[ruleForm.parentUid.length - 1] : ruleForm.parentUid,
      });
      if (res.code == 1000) {
        ElNotification({
          title: '编辑成功',
          message: '编辑菜单成功',
          type: 'success',
        });
        emit('onSubmit');
        hide();
      } else {
        ElNotification({
          title: '编辑失败',
          message: res.data,
          type: 'error',
        });
      }
    }
  });
};
// 子传父传值
const emit = defineEmits(['onSubmit']);
// 向外暴露函数
defineExpose({ hide, show });
</script>

<style scoped lang="scss"></style>
