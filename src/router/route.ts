import { RouteRecordRaw } from 'vue-router';

// 动态路由 目前先手写定义
// 写一个 layout 是考虑的模板切换, 所有 以后的路由都应该在 children里面
export const dynamicRoutes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: '/',
		component: () => import('/@/layout/index.vue'),
		redirect: '/home',
		meta: {
			isKeepAlive: true,
		},
		children: [],
	},
];

export const notFoundAndNoPower = [
	{
		path: '/login',
		name: 'login',
		component: () => import('/@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
	// TODO 未 解决   404 也有过度效果
	{
		path: '/401',
		name: 'noPower',
		component: () => import('/@/views/error/401.vue'),
		meta: {
			title: '401',
			isHide: true,
		},
	},
	{
		path: '/:path(.*)*',
		name: 'notFound',
		component: () => import('/@/views/error/404.vue'),
		meta: {
			title: '404',
			isHide: true,
		},
	},
];
