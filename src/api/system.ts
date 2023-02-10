import request from '/@/utils/request';

///////////////////////用户列表//////////////////////////////
// 用户列表
export function GetUserList(params: object) {
    return request({
        url: '/basic/user/list',
        method: 'post',
        data: params,
    });
}

// 添加用户
export function AddUserList(params: object) {
    return request({
        url: '/basic/user/create',
        method: 'post',
        data: params,
    });
}

// 删除用户
export function DelUserList(params: object) {
    return request({
        url: '/basic/user/del',
        method: 'post',
        data: params,
    });
}

// 编辑用户
export function EditUserList(params: object) {
    return request({
        url: '/basic/user/update',
        method: 'post',
        data: params,
    });
}

///////////////////////菜单列表//////////////////////////////
// 获取菜单列表（数组格式列表）
export function GetMenuList(params: object) {
    return request({
        url: '/basic/menu/list',
        method: 'post',
        data: params,
    });
}

// 添加菜单
export function AddMenuList(params: object) {
    return request({
        url: '/basic/menu/create',
        method: 'post',
        data: params,
    });
}
// 删除菜单
export function DelMenuList(params: object) {
    return request({
        url: '/basic/menu/del',
        method: 'post',
        data: params,
    });
}
// 编辑菜单
export function EditMenuList(params: object) {
    return request({
        url: '/basic/menu/update',
        method: 'post',
        data: params,
    });
}

///////////////////////权限列表//////////////////////////////
// 权限列表
export function GetRoleList(params: object) {
    return request({
        url: '/basic/role/list',
        method: 'post',
        data: params,
    });
}

// 添加权限
export function AddRoleList(params: object) {
    return request({
        url: '/basic/role/create',
        method: 'post',
        data: params,
    });
}
// 修改权限
export function EditRoleList(params: object) {
    return request({
        url: '/basic/role/update',
        method: 'post',
        data: params,
    });
}

// 删除权限
export function DelRoleList(params: object) {
    return request({
        url: '/basic/role/del',
        method: 'post',
        data: params,
    });
}

// 授权权限
export function GiveRolesRoleList(params: object) {
    return request({
        url: '/basic/role/setCurrentRoleAuthorization',
        method: 'post',
        data: params,
    });
}

// 获取当前角色的授权情况
export function GetOneRoleRoleList(params: object) {
    return request({
        url: '/basic/role/getCurrentRoleAuthorizationMenu',
        method: 'post',
        data: params,
    });
}

