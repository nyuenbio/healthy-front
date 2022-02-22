import request from '@/utils/request'
const appendUrl = '/api-wechat'

export class sampleRegister {
    static add(data : {}) { // 增加正式样本
        return request({
            url: appendUrl + '/sampleRegister/add',
            method: 'post',
            data
        })
    }
    static getOrder(orderId:string) { // 通过orderId获取详情
        return request({
            url: appendUrl + `/sampleRegister/getOrder/${orderId}`,
            method: 'post',
        })
    }
    static sampleInsert (data:{}, headers:{}) {
        return request({
            url: appendUrl + '/sampleRegister/insertSample',
            method: 'post',
            data,
            headers
        })
    }
    static updateSample (data:{}, headers:{}) {
        return request({
            url: appendUrl + '/sampleRegister/updateSample',
            method: 'post',
            data,
            headers
        })
    }
    static getInfo (infoId: any, type: any) { // 校验infoid是否存在在
        let _type = type || '' // 默认为‘’
        return request({
            url: appendUrl + `/sampleRegister/getInfo/${infoId}?type=${_type}`,
            method: 'get'
        })
    }
    static copySampleTemp (infoId: any) { // 同步临时 到正式
        return request({
            url: appendUrl + `/sampleRegister/copySampleTemp`,
            method: 'get'
        })
    }
    static getByInfoIdAndCai (params:{}) {
        return request({
            url: appendUrl + `/sampleRegister/getByInfoIdAndCai`,
            method: 'get',
            params
        })
    }
    static getByInfoId (params:{}) { // 根据样本编号查询正式表样本信息
        return request({
            url: appendUrl + `/sampleRegister/getByInfoId`,
            method: 'get',
            params
        })
    }

}