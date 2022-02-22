import request from '@/utils/request'
const appendUrl = '/api-wechat'

export class LogisticsController {
    static getLogistics(data : {}) { //
        return request({
            url: appendUrl + '/jLogistics/getLogistics',
            method: 'post',
            data
        })
    }

}