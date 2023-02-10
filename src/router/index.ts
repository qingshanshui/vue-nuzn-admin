import {createRouter, createWebHistory} from 'vue-router';
import {dynamicRoutes, notFoundAndNoPower} from './route';
import {Session} from '/@/utils/storage';
import NProgress from 'nprogress';
import {initBackEnd} from '/@/router/backEnd';
import {routerLists} from '/@/stores/routerList';

// 创建 路由实例
export const router = createRouter({
    history: createWebHistory(),
    routes: [...dynamicRoutes, ...notFoundAndNoPower],
});

// 路由加载前
router.beforeEach(async (to, from, next) => {
    NProgress.configure({showSpinner: false});
    const token = Session.get('token');
    if (to.path === '/login' && !token) {
        next();
        NProgress.done();
    } else {
        // 没有 token 就 跳转登录页面 , 携带： 参数 和 重定向地址
        if (!token) {
            next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`);
            Session.clear();
            // 有token 切访问的url是 /login  就跳转到 首页
        } else if (token && to.path === '/login') {
            next('/home');
            NProgress.done();
        } else {
            // 有token 访问的也不是 /login 页面
            // 先取 缓存路由数据看看    有就放行  没有就获取路由在放行
            let rootViewList = routerLists();
            if (rootViewList.routesList.length === 0) {
                let bool: boolean|undefined = await initBackEnd();
                if (bool) {
                    console.log(rootViewList.routesList.length, "rootViewList.routesList.length")
                    next({path: to.path});
                }else {
                    Session.clear()
                    next(`/login`);
                }
            } else {
                next();
            }
        }
    }
});

// 路由加载后
router.afterEach(() => {
    NProgress.done();
});
