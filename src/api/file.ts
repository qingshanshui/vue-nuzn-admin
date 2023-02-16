import request from '/@/utils/request';

// 上传文件
export function SaveUpload(data: object) {
    return request({
        url: '/basic/files/upload/formFile',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

// 上传切片
export function chunkFile(data: object) {
    return request({
        url: '/basic/files/upload/chunkFile',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

// 合并切片
export function mergeFile(data: object) {
    return request({
        url: '/basic/files/upload/mergeFile',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
