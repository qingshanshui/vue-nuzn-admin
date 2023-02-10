<template>
  <div class="header-container">
    <div class="header-container-breadcrumb">
      <!--导航栏-->
      <HeaderBreadcrumb/>
    </div>
    <div class="header-container-user">
      <div class="header-container-user-operation" @click="handelDrawer">
        <span>系统设置</span>
        <NzunIcon name="icon-pingtaiguanli"></NzunIcon>
      </div>
      <el-dropdown @command="ClickCommand">
        <el-avatar :size="30" src="/user.png"/>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="github">github仓库</el-dropdown-item>
            <el-dropdown-item command="nuzn">博客</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <!--  系统管理-->
  <HeaderDrawer ref="HeaderDrawers"/>
</template>

<script setup lang="ts">
import {ref} from "vue";
import HeaderBreadcrumb from './HeaderBreadcrumb.vue'
import HeaderDrawer from './HeaderDrawer.vue'
import {Session} from '/@/utils/storage'

// 打开系统管理
let HeaderDrawers = ref()
const handelDrawer = () => {
  HeaderDrawers.value.show()
}

// 下拉 点击事件
const ClickCommand = (str: string) => {
  switch (str) {
    case "logout":
      Session.clear()
      window.location.reload()
      break;
    case "github":
      window.open("https://github.com/dbsgw/vue-nuzn-admin.git/")
      break;
    case "nuzn":
      window.open("https://blog.nuzn.cn/")
      break;
    default:
      break;
  }
};
</script>

<style scoped lang="scss">
.header-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;


  .header-container-user {
    display: flex;
    justify-content: center;
    align-items: center;

    .header-container-user-operation {
      margin: 10px;
      cursor: pointer;
    }
  }
}
</style>
