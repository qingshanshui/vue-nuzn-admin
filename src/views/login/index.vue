<script setup lang="ts">
import { onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useUserInfo } from '/@/stores/userInfo';
import { initBackEnd } from '/@/router/backEnd';
import { Login } from '/@/api/login';
import { Session } from '/@/utils/storage';
import { useRoute, useRouter } from 'vue-router';
// 获取路由信息
let route = useRoute();
// 路由调整信息
let routers = useRouter();
onMounted(() => {
  let btn: any = document.querySelector(".login-content .login-content-submit .btn")
  btn.addEventListener("click", () => {
    let user: any = document.querySelector("#inputAccountExampleUser")
    let pass: any = document.querySelector("#inputPasswordExamplePass")
    Login({ username: user.value, password: pass.value }).then(async (res: any) => {
      const { code, data } = res
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
    })
  })
})
</script>
<template>
  <div class="login">
    <div class="container">
      <div class="login-content">
        <div class="login-content-logo ">
          <img src="https://blog.dbsgw.com/logo.png" alt="前端笔记">
        </div>
        <div class="login-content-user">
          <div class="input-control has-icon-left">
            <input id="inputAccountExampleUser" type="text" class="form-control" placeholder="用户名" value="">
            <label for="inputAccountExampleUser" class="input-control-icon-left"><i class="icon icon-user "></i></label>
          </div>
        </div>
        <div class="login-content-pass">
          <div class="input-control has-icon-left">
            <input id="inputPasswordExamplePass" type="password" class="form-control" placeholder="密码" value="">
            <label for="inputPasswordExamplePass" class="input-control-icon-left"><i class="icon icon-key"></i></label>
          </div>
        </div>
        <div class="login-content-submit">
          <button class="btn btn-block btn-primary" type="button">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f7f8fa;
}

.container {
  width: 100%;
  background-color: var(--bag);
  height: auto;
}

.login-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 390px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 10px 30px -5px rgb(0 0 0 / 30%);
}

.login-content>div {
  padding: 8px;
  width: 100%;
}

.login-content-logo {
  text-align: center;
}

.login-content-logo img {
  width: 150px;
}
</style>

