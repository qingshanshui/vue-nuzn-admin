import { defineStore } from 'pinia';
import { Session } from '/@/utils/storage';
import { Login } from '/@/api/login';

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
	state: () => ({
		userInfos: {
			uid: '', // 用户唯一id
			userName: '', // 用户名称
			photo: '', // 头像
			time: 0, // 登录时间
			roles: [], // 角色标识   ['admin','common']
			authBtnList: [], // 按钮权限标识 ['btn.add', 'btn.del', 'btn.edit', 'btn.link']
		},
	}),
	actions: {
		async setUserInfos(obj: object) {
			// 存储用户信息到浏览器缓存
			if (Session.get('userInfo')) {
				this.userInfos = Session.get('userInfo');
			} else {
				const userInfos: any = await Login(obj);
				this.userInfos = userInfos;
				Session.set('userInfo', userInfos);
			}
		},
	},
});
