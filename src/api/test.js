import request from "../utils/request";
const appendUrl = 'http://192.168.10.23:7100/api-cms'

export function getAll (data) {
    return request({
        url: appendUrl + '/info/getAllInfo',
        method: 'post',
        data
    })
}


export function createInfoNo(id) { // 创建角色编号
    return request({
        url: appendUrl + `/cLog/getById/${id}`,
        method: 'get',
    })
}
