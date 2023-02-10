import {RouteRecordRaw} from 'vue-router';
import {GetUserInfo} from "/@/api/login";
import {dynamicRoutes, notFoundAndNoPower} from "/@/router/route"
import {router} from "/@/router/index";
import {routerLists} from '/@/stores/routerList'
import {arrayToTree} from '/@/utils/tool'
import {NextLoading} from "/@/utils/loading";
import { ElMessage } from 'element-plus'
/**
 * 获取.vue 所有文件
 */
const layoutModules: any = import.meta.glob('../layout/**/**.{vue,tsx}');
const viewsModules: any = import.meta.glob('../views/**/**.{vue,tsx}');

const dynamicViewsModules: Record<string, Function> = Object.assign({...layoutModules}, {...viewsModules});


/**
 * 初始化路由
 */
export async function initBackEnd() {
    NextLoading.start()

    let routerList = routerLists()

    // 获取后端路由
    let res: any = await GetUserInfo()
    if (res.code !== 1000) {
        setTimeout(()=>{
            NextLoading.done()
            ElMessage({
                showClose: true,
                message: res.data,
                type: 'error',
            })
        },1000)
        return false
    }
    let a = arrayToTree(res.data, 0)
    // 数组路由的过滤（component的转换）
    let b = backEndComponent(a)
    dynamicRoutes[0].children = [...b, ...notFoundAndNoPower]
    // 添加路由(addRouters)
    setAddRoute(dynamicRoutes)
    // 简单的存到pinia
    await routerList.setRouterList(b)

    return true
}

// 添加路由(addRouters)
export function setAddRoute(routes: any) {
    routes.forEach((item: RouteRecordRaw) => {
        router.addRoute(item)
    })
}

/**
 * 后端路由 component 转换
 */
export function backEndComponent(routes: any) {
    if (!routes) return;
    return routes.map((item: any) => {
        if (item.component) item.component = dynamicImport(dynamicViewsModules, item.component as string);
        item.children && backEndComponent(item.children);
        return item;
    });
}

/**
 * 后端路由 component 转换函数
 */
export function dynamicImport(dynamicViewsModules: Record<string, Function>, component: string) {
    const keys = Object.keys(dynamicViewsModules);
    const matchKeys = keys.filter((key) => {
        const k = key.replace(/..\/views|../, '');
        return k.startsWith(`${component}`) || k.startsWith(`/${component}`);
    });
    if (matchKeys?.length === 1) {
        const matchKey = matchKeys[0];
        return dynamicViewsModules[matchKey];
    }
    if (matchKeys?.length > 1) {
        return false;
    }
}
