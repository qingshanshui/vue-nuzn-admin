<template>
  <div class="container login_container">
    <div class="login_container_box">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="0" class="demo-ruleForm"
               size="large" status-icon>
        <el-form-item>
          <h3 class="title">nuzn管理系统平台</h3>
        </el-form-item>
        <el-form-item prop="username">
          <el-input clearable v-model="ruleForm.username" :prefix-icon="User"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input show-password clearable v-model="ruleForm.password" :prefix-icon="Lock"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)" style="width: 100%">登录</el-button>
        </el-form-item>
        <el-form-item>
          <div class="tips">
            <p>管理员：admin 123456</p>
            <p>普通用户：test 123456</p>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from 'vue';
import {FormInstance, FormRules, ElMessage} from 'element-plus';
import {useUserInfo} from '/@/stores/userInfo';
import {initBackEnd} from '/@/router/backEnd';
import {Login} from '/@/api/login';
import {Session} from '/@/utils/storage';
import {useRoute, useRouter} from 'vue-router';
import {Lock, User} from '@element-plus/icons-vue'
// 获取路由信息
let route = useRoute();
// 路由调整信息
let routers = useRouter();
// 表单ref
const ruleFormRef = ref<FormInstance>();
// 登录表单
const ruleForm = reactive({
  username: 'admin',
  password: '123456',
});
// 验证规则
const rules = reactive<FormRules>({
  username: [
    {required: true, message: '用户名必填', trigger: ['blur', 'change']},
    {min: 3, max: 16, message: '请输入 3 到 16个字符', trigger: ['blur', 'change']},
  ],
  password: [
    {required: true, message: '密码必填', trigger: ['blur', 'change']},
    {min: 3, max: 16, message: '请输入 3 到 16个字符', trigger: ['blur', 'change']},
  ],
});
// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      // 登录
      let {data, code}: any = await Login({
        username: ruleForm.username,
        password: ruleForm.password,
      });
      if (code != 1000) return ElMessage.error(data)
      // 存储用户信息
      let info = useUserInfo();
      info.userInfos.userName = data.data.nickname;
      info.userInfos.roles = data.data.roles;
      info.userInfos.uid = data.data.uid;
      //设置token
      Session.set('token', data.token);
      // 加载路由
      await initBackEnd();
      if (route.query?.redirect) {
        routers.push({
          path: <string>route.query?.redirect,
          query: Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : '',
        });
      } else {
        routers.push('/home');
      }
    }
  });
};
</script>

<style scoped lang="scss">
.login_container {
  min-height: 100%;
  width: 100%;
  color: #fff;
  background-color: #2d3a4b;
  overflow: hidden;

  .login_container_box {
    width: 520px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .title {
      font-size: 26px;
      color: #eee;
      margin: 0 auto 30px auto;
      text-align: center;
      font-weight: 700;
    }

    .tips {
      width: 100%;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
