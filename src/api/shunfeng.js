import request from "@/utils/request";
const appendUrl = '/api-wechat'

export function createOrderService(data) {
    return request({
        url: appendUrl + '/shunFeng/createOrderService',
        method: 'post',
        data: data
    })
}
export function orderConfirmService(params) {  // 取消订单接口
    return request({
        url: appendUrl + '/shunFeng/orderConfirmService',
        method: 'get',
        params: params
    })
}