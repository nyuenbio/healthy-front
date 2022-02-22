import request from '@/utils/request'
const appendUrl = '/api-wechat'
import store from '@/store'

export class userApi {
    static reportSendSms(params: any) { // 发送消息
        return request({
            url: appendUrl + '/user/reportSendSms',
            method: 'get',
            params,
            headers: { // headers里面加openid,并且采用base64编码
                openid: window.btoa('nyuen&&' + store.state.openId)
            }
        })
    }
    static sendSms(params: any) { // 发送消息
        return request({
            url: appendUrl + '/user/sendSms',
            method: 'get',
            params,
            headers: { // headers里面加openid,并且采用base64编码
                openid: window.btoa('nyuen&&' + store.state.openId)
            }
        })
    }
    static checkVerifiry(data: any) { // 校验验证码
        return request({
            url: appendUrl + '/user/checkVerifiry',
            method: 'post',
            data
        })
    }
    static validateCode (data:any) {
        return request({
            url: appendUrl + '/user/validateCode',
            method: 'post',
            data
        })
    }
}