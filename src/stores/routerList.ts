import { defineStore } from "pinia"

/**
 * 权限路由表
 * @methods setUserInfos 设置权限路由表
 */
export const routerLists = defineStore('routerList', {
    state: () => ({
        routesList: [],// 权限路由表缓存数据
    }),
    actions: {
        // 设置路由数据
        async setRouterList(data: any) {
            this.routesList = data
        },
    }
})
