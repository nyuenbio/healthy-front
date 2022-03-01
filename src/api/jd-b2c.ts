import request from '@/utils/request'
import {baseUrlNew} from "@/config/env.js";

const appendUrl = baseUrlNew + '/api-logitics'



export class JdB2cController {

    static createOrder(data: any) { // B2c普通物流下单接口
        return request({
            url: appendUrl + `/jdb2c/createOrder`,
            method: 'post',
            data
        })
    }

    static cancelOrder(data: any) { // B2c普通物流取消订单
        return request({
            url: appendUrl + `/jdb2c/cancelOrder`,
            method: 'post',
            data
        })
    }

    static getRouteOrder(params: any) {  // B2c普通物流信息查询
        return request({
            url: appendUrl + `/jdb2c/getRouteOrder`,
            method: 'get',
            params
        })
    }
}

