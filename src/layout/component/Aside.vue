<template>
  <div class="aside-container">
    <el-scrollbar>
      <el-menu
          router
          class="aside-container-menu"
          active-text-color="#ffd04b"
          background-color="#545c64"
          :default-active="onRoutes"
          text-color="#fff"
          style="overflow-x: hidden"
      >
        <template v-for="val in state.menuList">
          <el-sub-menu :index="val.path" v-if="val.children && val.children.length > 0" :key="val.path">
            <template #title>
<!--              <NzunIcon name="Edit"></NzunIcon>-->
              <span> {{$t('routes.'+val.name) || val.title }}</span>
            </template>
            <SubItem :son="val.children" />
          </el-sub-menu>
          <template v-else>
            <el-menu-item :index="val.path" :key="val.path">
              <template #title >
                <span>{{$t('routes.'+val.name) || val.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed,reactive,onBeforeMount} from "vue";
import SubItem from '/@/layout/component/subItem.vue'

// 取出状态管理数据
import {routerLists} from '/@/stores/routerList'
let routesList = routerLists()

// 数据源
const state = reactive({
  menuList: [],
});

// 页面加载前
onBeforeMount(()=>{
  state.menuList = routesList.routesList
})

// 获取路由信息
const route = useRoute();

// 默认激活菜单的  index // 当前展开的菜单项
const onRoutes = computed(() => {
  return route.path;
});
</script>

<style scoped lang="scss">
.aside-container {
  height: 100vh;
  ::v-deep .el-scrollbar__view{
    height: 100%;
  }
  .aside-container-menu {
    height: 100%;
  }
}
</style>
