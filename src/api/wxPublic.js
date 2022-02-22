import request from "@/utils/request";
const appendUrl = '/api-wechat'

export function getWXPublicQRCode(params) {
    return request({
        url: appendUrl + '/wxPublic/getWXPublicQRCode',
        method: 'get',
        params: params
    })
}

export function verifyWxToken(data) {
    return request({
        url: appendUrl + '/wxPublic/verifyWxToken',
        method: 'post',
        data: data
    })
}