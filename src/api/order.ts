import request from '@/utils/request'
const appendUrl = '/api-wechat'

export class orderController {
    static add(data : {}) { //
        return request({
            url: appendUrl + '/order/add',
            method: 'post',
            data
        })
    }
    static getOrderAndSamByPage(data : {}) { //
        return request({
            url: appendUrl + '/order/getOrderAndSamByPage',
            method: 'post',
            data
        })
    }
    static getOrderList(params : {},type:'') { //
        return request({
            url: appendUrl + '/order/orderManage/' + type,
            method: 'post',
            data:params
        })
    }
    static getOrderByInfoId(params : {},) { //
        return request({
            url: appendUrl + '/order/getOrderByInfoId',
            method: 'get',
            params
        })
    }

}