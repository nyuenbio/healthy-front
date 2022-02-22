<template>
  <div class="box" v-loading = show >
    <div v-if="!show">
      <div class="QrCode">
        <img class="code" :src="url + value" alt="">
      </div>
      <div class="tips">
        <p>尊敬的恩元女神:</p>
        <p>请长按上方<span>【上海恩元生物】</span>官方微信公众号，识别进入之后，按流程操作绑定样本。</p>
        <p><span>提示：</span>进入公众号后，点击收到的提示消息即可进入样本绑定界面。</p>
        <!--        <p>您当前未关注公众号，为了便于之后的报告查询等操作，请先长按关注上方 <span>cns方案平台</span>公众号。</p>-->
        <!--        <p><span>提示：</span>请在关注公众号返回之后刷新页面，或者重新扫码进入绑定样本</p>-->
      </div>
    </div>
  </div>
</template>

<script>
import {getAccseToken, getUserInfo,sendWxtplMesByOpenId} from "../../api/wxControl";
import {getWXPublicQRCode} from "../../api/wxPublic";

export default {
  name: "index",
  data() {
    return {
      show:true,
      url: 'http://order.nyuen-group.com:8100/api-wechat/sampleRegister/preview?filePath=',
      value : '',
      token: '',
      openId: '',
    }
  },
  async created() {
    await this.getUserMessage()
    await this.getImg()
    this.show = false
  },
  methods: {
    async getUserMessage() {
      this.$store.commit('getOpenId')
      this.openId = this.$store.state.openId
      const openId = this.openId
      const aToken = await getAccseToken({openId})
      this.token = aToken.data.accessToken
    },
    async getImg() {
      console.log(this.$route.query.infoId)
      const wxAccessToken = this.token
      const codeType = 1
      const sceneStr = this.$route.query.infoId || 'NY12345678900'
      const res = await getWXPublicQRCode({wxAccessToken,codeType,sceneStr})
      console.log(res)
      this.value = res
    }

    // async getUser() {
    //   const wxInvoiceVo = {
    //     accessToken: this.token,
    //     openId: this.openId
    //   }
    //   const res = await getUserInfo(wxInvoiceVo)
    //   const data = JSON.parse(res.data)
    //   return data.subscribe
    // },
    // setTimer() {
    //   let timer
    //   timer = setTimeout(async () => {
    //     const type = await this.getUser()
    //     if (type === 1) {
    //       console.log('关注了，跳转')
    //       await this.sendWxMessage()
    //       await this.$router.push({
    //         name: 'Home',
    //         query: {product: this.$route.query.product, infoId: this.$route.query.infoId}
    //       })
    //     } else {
    //       this.show = true
    //       this.setTimer()
    //       console.log('没关注，先关注')
    //     }
    //     clearTimeout(timer)
    //     console.log(timer)
    //   },1000)
    // },
    // async sendWxMessage() { // 发送微信公众号信息
    //   const openId = 'o6HT1wJw1Zx_zEBiBoMSQw7EtwHo'
    //   let _keyword1 = 'infoId'
    //   let _keyword2 = '测试发消息'
    //   const data = {
    //     openId,
    //     proName: '收样模块PC端',
    //     templateName: '收样成功通知',
    //     templateValue: JSON.stringify({
    //       first: `尊敬的用户，您的样本已完成收样`, // 标题
    //       keyword1: `${_keyword1}`, //
    //       keyword2: `${_keyword2}`, //
    //       remark: `测试测试是`
    //     }),
    //   }
    //   const sendWxtplMesByOpenIdRes = await sendWxtplMesByOpenId(data).catch(() => false)
    //   if (!sendWxtplMesByOpenIdRes) return
    // },
    // async judge() {
    //   const type = await this.getUser()
    //   if (type === 1) {
    //     console.log('关注了，跳转')
    //     await this.$router.push({
    //       name: 'Home',
    //       query: {product: this.$route.query.product, infoId: this.$route.query.infoId}
    //     })
    //   } else {
    //     this.show = true
    //     console.log('没关注，先关注')
    //   }
    // }
  }
}
</script>

<style scoped>
.box {
  background: #ffffff;
  height: 100vh;
  padding: 100px 15px 20px;
}

.QrCode {
  text-align: center;
  padding: 20px;
}

.code {
  width: 100%;
}

.tips {
  color: #666666;
}

.tips > p {
  line-height: 1.5rem;
  margin-bottom: 1rem;
}

.tips > p > span {
  color: #d74242;
}

</style>