import request from '/@/utils/request';

// 登录
export function Tree(data: object) {
    return request({
        url: '/basic/tree',
        method: 'post',
        data,
    });
}
