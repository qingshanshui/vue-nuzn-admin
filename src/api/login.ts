import request from '/@/utils/request';

// 登录
export function Login(params: object) {
    return request({
        url: '/basic/login',
        method: 'post',
        data: params,
    });
}

// 获取用户信息（菜单信息）
export function GetUserInfo() {
    return request({
        url: '/basic/login/userinfo',
        method: 'post',
    });
}
