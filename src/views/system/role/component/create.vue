<template>
  <el-dialog v-model="centerDialogVisible" title="新增角色" destroy-on-close>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" status-icon>
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="ruleForm.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="ruleForm.remark"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" prop="order">
            <el-input v-model.number="ruleForm.order"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0"/>
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
import {ref, defineExpose, reactive, defineEmits} from 'vue';
import type {FormInstance, FormRules} from 'element-plus';
import {AddRoleList} from '/@/api/system';
import {ElNotification} from 'element-plus';

// 表单 ref
const ruleFormRef = ref<FormInstance>();

// 表达 数据
const ruleForm = reactive({
  name: null,
  remark: null,
  order: null,
  status: null,
});

// 表单验证规则
const rules = reactive<FormRules>({
  name: [
    {required: true, message: '必填项不能为空', trigger: ['blur', 'change']},
  ],
});

// 弹框 ref
const centerDialogVisible = ref(false);

// 显示
const show = () => {
  centerDialogVisible.value = true;
};

// 隐藏
const hide = () => {
  centerDialogVisible.value = false;
};

// 创建
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      let res: any = await AddRoleList(ruleForm);
      if (res.code == 1000) {
        ElNotification({
          title: '添加成功',
          message: '添加用户成功',
          type: 'success',
        });
        emit('onSubmit');
        hide();
      }else {
        ElNotification({
          title: '添加失败',
          message: res.data,
          type: 'error',
        });
      }
    }
  });
};

// 子传父 传值
const emit = defineEmits(['onSubmit']);

// 向外暴露函数
defineExpose({hide, show});
</script>

<style scoped lang="scss"></style>
