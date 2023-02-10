<template>
  <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(v,i) in state.breadcrumbList" :key="i" :to="{ path: v.path }">{{v.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import {onMounted,reactive} from 'vue'
import {useRoute,onBeforeRouteUpdate} from  'vue-router'

import {routerLists} from '/@/stores/routerList'
let routesList = routerLists()

const route = useRoute();

// 动态面包屑，需要通过路由的 path 一层一层的去判断，必须规范路由写法 不然会失效
// 定义接口来定义对象的类型
interface BreadcrumbState {
  breadcrumbList: Array<any>;
  routeSplit: Array<string>;
  routeSplitFirst: string;
  routeSplitIndex: number;
}

// 数据源
let state = reactive<BreadcrumbState>({
  routeSplit:[],
  breadcrumbList: [],
  routeSplitFirst: '',
  routeSplitIndex:1
})

// 处理面包屑数据
const getBreadcrumbList = (arr: any) => {
  arr.forEach((item: any) => {
    state.routeSplit.forEach((v: any, k: number, arrs: any) => {
      if (state.routeSplitFirst === item.path) {
        state.routeSplitFirst += `/${arrs[state.routeSplitIndex]}`;
        state.breadcrumbList.push(item)
        state.routeSplitIndex++;
        if (item.children) getBreadcrumbList(item.children);
      }
    });
  });
};

// 初始化数据
const initRouteSplit = (path: string) => {
  state.breadcrumbList = [];
  state.routeSplit = path.split('/');
  state.routeSplit.shift()
  state.routeSplitFirst = `/${state.routeSplit[0]}`;
  state.routeSplitIndex = 1;
  getBreadcrumbList(routesList.routesList)

}

// 页面加载时
onMounted(()=>{
  initRouteSplit(route.path);
})

// 路由更新时
onBeforeRouteUpdate((to:any) => {
  initRouteSplit(to.path);
});
</script>

<style scoped>

</style>
