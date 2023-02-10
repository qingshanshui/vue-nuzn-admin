<template>
  <el-dialog v-model="centerDialogVisible" title="新增用户" destroy-on-close>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="ruleForm.nickname"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username" disabled/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="telephone">
            <el-input v-model="ruleForm.telephone" disabled/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" disabled/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关联角色" prop="role">
            <el-select v-model="ruleForm.role" placeholder="请选择">
              <el-option v-for="(v, i) in state.role" :key="i" :label="v.name" :value="v.uid"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="ruleForm.sex" placeholder="请选择">
              <el-option label="男" value="0"/>
              <el-option label="女" value="1"/>
            </el-select>
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
import {ref, reactive, onMounted, defineEmits} from 'vue';
import {GetRoleList, EditUserList} from '/@/api/system';
import {ElNotification, FormInstance, FormRules} from 'element-plus';

// 表单 ref
const ruleFormRef = ref<FormInstance>();

// 表单 数据
let ruleForm = reactive({
  nickname: null,
  username: null,
  telephone: null,
  email: null,
  role: null,
  sex: null,
  password: null,
  status: null,
  uid: null,
});

// 页面加载
onMounted(async () => {
  // 获取权限列表
  let res = await GetRoleList({});
  state.role = res.data;
});

// 数据源
const state = reactive({
  role: [],
});

// 弹框 ref
const centerDialogVisible = ref(false);

// 显示
const show = (row: any) => {
  ruleForm.nickname = row.nickname;
  ruleForm.username = row.username;
  ruleForm.telephone = row.telephone;
  ruleForm.email = row.email;
  ruleForm.role = row.role_Uid;
  ruleForm.sex = row.sex;
  ruleForm.status = row.status;
  ruleForm.uid = row.uid;
  centerDialogVisible.value = true;
};

// 隐藏
const hide = () => {
  centerDialogVisible.value = false;
};

// 表单验证规则
const rules = reactive<FormRules>({
  nickname: [
    {required: true, message: '必填项不能为空', trigger: ['blur', 'change']},
  ],
  username: [
    {required: true, message: '必填项不能为空', trigger: ['blur', 'change']},
  ],
  telephone: [
    {required: true, message: '必填项不能为空', trigger: ['blur', 'change']},
  ],
  password: [
    {required: true, message: '必填项不能为空', trigger: ['blur', 'change']},
  ],
  role: [
    {required: true, message: '必填项不能为空', trigger: ['blur', 'change']},
  ],
});

// 编辑
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      let res: any = await EditUserList(ruleForm);
      if (res.code == 1000) {
        ElNotification({
          title: '修改成功',
          message: '修改用户成功',
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

// 向父组件传值
const emit = defineEmits(['onSubmit']);

// // 向外暴露函数
defineExpose({hide, show});
</script>

<style scoped lang="scss"></style>
