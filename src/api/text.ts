import request from '@/utils/request'
const appendUrl = 'http://192.168.10.23:7100/api-cms'

export class cmsAPI {
    static getAll(data : {}) { // 增加角色
        return request({
            url: appendUrl + '/info/getAllInfo',
            method: 'post',
            data
        })
    }
}