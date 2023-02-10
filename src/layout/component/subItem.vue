<template>
   <template v-for="val in c">
     <el-sub-menu :index="val.path" :key="val.path" v-if="val.children && val.children.length > 0">
       <template #title>
         <span>{{$t('routes.'+val.name) || val.title }}</span>
       </template>
       <sub-item :son="val.children" />
     </el-sub-menu>
     <template v-else>
       <el-menu-item :index="val.path" :key="val.path">
          <span>
             {{$t('routes.'+val.name) || val.title }}
          </span>
       </el-menu-item>
     </template>
   </template>
</template>

<script lang="ts" setup>
import {computed} from 'vue';

// 接收参数
let props = defineProps({
  son: Array
});

// 缓存 接收到的参数
let c =  computed(()=>{
  return <any>props.son
})

</script>
