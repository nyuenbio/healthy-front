import request from "@/utils/request";
const appendUrl = '/api-wechat'

export function getSignature(data) {
    return request({
        url: appendUrl + '/wx/getSignature',
        method: 'post',
        data: data
    })
}

export function getAccseToken(params) {
    return request({
        url: appendUrl + '/wx/getAccseToken',
        method: 'get',
        params: params
    })
}

export function getUserInfo(data) {
    return request({
        url: appendUrl + '/wx/getUserInfo',
        method: 'post',
        data: data
    })
}

export function sendWxtplMesByOpenId (data) { // 供其他项目调用微信消息模板接口-openId
    return request({
        url: `${appendUrl}/message/sendWxtplMesByOpenId`,
        method: 'post',
        data
    })
}