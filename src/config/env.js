/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 老项目域名地址
 * khglUrl: 客户管理域名地址
 * dicUrl : 字典服务器地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * welUrl :默认欢迎页
 *
 */

// 备注，测试环境、正式环境切换，修改appid、baseUrl，和开发环境的服务器的host，以及本地的host文件

// let appid = 'wx4cefd44642234d58' // 测试公众号的appid
// let baseUrl = 'http://weixin.nyuen-group.com:8100' // 测试公众号的接口
// let appid = 'wx07842cc183956d11'
// let baseUrl = 'http://weixin.nyuen-group.com:8000'
const env = process.env
let baseUrl = ''
let appid = ''
let baseUrlNew = ''
let imageUrl= ''
let baseUrlAddress= ''

// appid = 'wx4cefd44642234d58' // 测试公众号的appid
// baseUrl = 'http://weixin.nyuen-group.com:8100' // 测试公众号的接口
// baseUrlNew = 'http://system.nyuen-group.com:7100' // 测试公众号的接口
// imageUrl = 'http://order.nyuen-group.com:8100/api-wechat/sampleRegister/preview?filePath=' // 测试项管后台接口
// baseUrl = 'http://192.168.10.23:7100' // 本地开发的接口


// appid = 'wx07842cc183956d11' // 正式公众号的appid
// baseUrl = 'http://weixin.nyuen-group.com:8000' // 正式公众号的接口
// baseUrlNew = 'http://weixin.nyuen-group.com:7100' // 正式项管后台接口
// imageUrl = 'http://order.nyuen-group.com:8000/api-wechat/sampleRegister/preview?filePath=' // 测试项管后台接口


if (env.NODE_ENV === 'development') { // 开发环境
  appid = 'wx4cefd44642234d58' // 测试公众号的appid
  // baseUrl = 'http://192.168.10.23:7100' // 本地开发的接口
  baseUrl = 'http://weixin.nyuen-group.com:8100' // 可能连本地，可能连服务器的测试公众号的接口
  baseUrlNew = 'http://system.nyuen-group.com:7100' // 测试项管后台接口
  imageUrl = 'http://order.nyuen-group.com:8100/api-wechat/sampleRegister/preview?filePath=' // 测试项管后台接口
  baseUrlAddress = 'http://test.nhwa-hexin.com/'
} else { // 正式环境
  appid = 'wx07842cc183956d11' // 正式公众号的appid
  baseUrl = 'http://weixin.nyuen-group.com:8000' // 正式公众号的接口
  baseUrlNew = 'http://weixin.nyuen-group.com:7100' // 正式项管后台接口
  imageUrl = 'http://order.nyuen-group.com:8000/api-wechat/sampleRegister/preview?filePath=' // 测试项管后台接口
  baseUrlAddress = 'http://gene.nhwa-hexin.com/'
}

const iconfontVersion = ['567566_r22zi6t8noas8aor']
const iconfontUrl = `//at.alicdn.com/t/font_$key.css`
const codeUrl = `${baseUrl}/code`

const appendUrl = '/api-wechat'
const uploadImgUrl = `${baseUrl}${appendUrl}/sampleRegister/upload`
const uploadMoreImgUrl = `${baseUrl}${appendUrl}/sampleRegister/moreUpload`
const previewImgUrl = `${baseUrl}${appendUrl}/sampleRegister/preview?filePath=`
const previewReserveImgUrl = `${baseUrl}${appendUrl}/reserveRecord/previewReserveImage?filePath=`
const previewInvoiceUrl = `http://weixin.nyuen-group.com:8000/api-invoice/invoice/download?path=`
// const previewIp = `http://116.247.88.158:8077`
// const uploadImgUrl = `http://192.168.10.77:8100/api-wechat/sampleRegister/upload`
// const previewImgUrl = `http://192.168.10.77:8100/api-wechat/sampleRegister/preview?filePath=`
// const nyKey = 'bnkmJmhyZjQzODl0aDU0Z3V2aWFkZjR1aDN0MzR2c2R2MzRy' // 旧的
const nyKey = 'bnkmJjdhMTU4ZGE2YzI4NWMxZTNiZmE2NWRjN2YzZjQ3MDU5' // 新的(医检所的)
const previewPDFUrl = 'http://gene.nhwa-hexin.com/js/pdfjs/web/viewer.html?file='

export {
  appid,
  baseUrl,
  iconfontUrl,
  iconfontVersion,
  codeUrl,
  env,
  appendUrl,
  uploadImgUrl,
  uploadMoreImgUrl,
  previewImgUrl,
  nyKey,
  // previewIp,
  previewPDFUrl,
  previewInvoiceUrl,
  previewReserveImgUrl,
  baseUrlNew,
  imageUrl,
  baseUrlAddress
}
