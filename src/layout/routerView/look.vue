<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
  <!--   TODO bug 使用vue推荐的router-view slot代码会影响transition的过渡效果-->
  <!--<div style="height: 100% !important;">-->
  <!--  <router-view v-slot="{ Component }">-->
  <!--    <transition name="fade">-->
  <!--      <component :is="Component" />-->
  <!--    </transition>-->
  <!--  </router-view>-->
  <!--</div>-->
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

.fade-enter-from,
.fade-leave-to {
  /*定义进入开始和离开结束的透明度为0*/
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  /*定义进入结束和离开开始的透明度为1*/
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  /*定义进入和离开过渡状态的透明度变化的时间和变化曲线*/
  transition: opacity 2s ease;
}
</style>
