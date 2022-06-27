<template>
  <div id="app" v-loading="!isShow">
    <router-view v-if="isShow" />
  </div>
</template>

<script>
import {Toast} from "vant";
import {userApi} from "@/api/user";
import {appid} from "@/config/env";

export default {
  data() {
    return{
      isShow: false
    }
  },
  async created() {
    if (this.localOpenIdTrue()) return this.isShow = true
    if (!this.getQueryString('code')) {
      await this.wxAuthRedirect()
    }
    await this.getOpenId()
    this.isShow = true
  },
  methods:{
    localOpenIdTrue() {
      const localOpenId = localStorage.getItem('openId')
      if (localOpenId) {
        return true
      } else {
        return false
      }
    },
    async getOpenId() {
      const localOpenId = localStorage.getItem('openId')
      if (localOpenId) {
        // console.log('通过本地缓存获取的openId')
      } else if (this.isWeiXin()){
        let code = this.getQueryString('code')
        const res = await userApi.validateCode({code})
        let openId = res.data.openid
        const date = new Date().getTime()
        const box = `{"dataType":"string","content":"${openId}","datetime":"${date}"}`
        localStorage.setItem('openId', box)
        // console.log('通过code获取的openId',openId)
      } else {
        Toast('openId获取失败')
      }
    },
    isWeiXin() {
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      } else {
        return false
      }
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    wxAuthRedirect() { // code验证失败，并且本地localStorage也没有openId时，跳转进入微信授权页面。再次返回本页面时会带有code
      // 加上跳转次数限制
      let redirect_times = this.$route.query.times || 1
      if (parseInt(redirect_times) > 3) {
        this.$alert('跳转次数超过5次，请从公众号重新进入。', '访问失败', {
          confirmButtonText: '确定'
        })
        return
      }
      redirect_times = parseInt(redirect_times) + 1
      // 注意这里要加上？因为会影响到支付时的支付目录，微信会截取？之前的字符串和配置的支付目录进行匹配，所以在这里就分开一下
      let url_1 = location.origin + location.pathname + '?a=1' // 获取前面的域名、端口号、路径，也就是项目地址
      let url_2 = '#' + location.href.split('#')[1] // 获取后面的query部分，匹配页面
      if (url_2.indexOf('times=') > -1) { // 如果url_2中有times，则说明有多次跳转
        url_2 = url_2.replace(/times=\d+/g, `times=${redirect_times}`)
      } else { // 没有，说明第一次跳转，加上times参数
        if (url_2.indexOf('?') > -1) {
          url_2 += '&times=1'
        } else {
          url_2 += '?times=1'
        }
      }
      let redirect_uri = encodeURIComponent(`${url_1}${url_2}`) // URL编码转义，暂时先不跳转到路由页面
      let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base#wechat_redirect`
      location.href = url
    },
  }


}
</script>

<style>
</style>
