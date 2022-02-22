<template>
  <div>
    <div class="box" v-if="show">
      <div class="header">
        <div class="header-item" @click="openJi">
          <div class="front_logo"><span>寄</span></div>
          <div class="header-item-content" style="border-bottom: 1px solid rgba(0,0,0,0.1); ">
            <div class="message">
              <div>{{ `${form.jContact}${form.jTel}` || '寄件人信息' }}</div>
              <div class="addressDetails">{{ `${form.jAddress}` || '点击输入寄件人信息' }}</div>
            </div>
            <div class="action">
              <span>修改</span>
            </div>
          </div>
        </div>
        <div class="header-item" @click="openDao">
          <div class="front_logo"><span style="background: #ca3b47">收</span></div>
          <div class="header-item-content">
            <div class="message">
              <div>{{ `${form.dContact}${form.dTel}` || '收件人信息' }}</div>
              <div class="addressDetails">{{ `${form.dAddress}` || '点击输入收件人信息' }}</div>
            </div>
            <div class="action">
              <span>去选择</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <van-cell-group>
          <van-field readonly v-model="form.isDocallText" label="寄件方式" placeholder="选择寄件方式"/>
          <van-field @click="openExpressType" readonly v-model="form.expressTypeText" label="快递产品类别"
                     placeholder="选择快递产品类别"/>
          <van-field @click="openPayMethod" readonly v-model="form.payMethodText" label="付款方式" placeholder="选择付款方式"/>
          <van-field @click="openSendStartTime" readonly v-model="form.sendStartTimeText" label="期望上门时间"
                     placeholder="选择上门时间"/>
        </van-cell-group>
      </div>
      <div class="confirm">
        <div class="confirm_tips">
          <div @click="btnTips" class="btn-tips" :class="{'btn-tips-true' :(btn === 1)}">
            <van-icon v-if="btn === 1" style="transform: translate(0,7%)" name="success"/>
          </div>
          <span>阅读并同意<span class="text-tips" @click="openAgreement">《电子运单契约条款》</span></span>
        </div>
        <div class="confirm_button" @click="submit">
          <span>提交</span>
        </div>
      </div>
      <ExpressType ref="ExpressType"></ExpressType>
      <PayMethod ref="PayMethod"></PayMethod>
      <SendStartTime ref="SendStartTime"></SendStartTime>
      <Agreement ref="Agreement"></Agreement>
    </div>
    <div class="empty" v-else>
      <van-empty
          class="custom-image"
          image="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fupload-images.jianshu.io%2Fupload_images%2F18702291-e8ecd2f3c72a6c22.gif&refer=http%3A%2F%2Fupload-images.jianshu.io&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644646974&t=eefac1c3f013af29db93522b1766fa3a"
          description="下单成功，正在等待快递小哥来取货！"
      >
        <van-button round type="danger" @click="back" class="bottom-button">返回</van-button>
        <van-button round type="danger" @click="cancelOrder" class="bottom-button-cancel">取消订单</van-button>
      </van-empty>
    </div>
  </div>
</template>

<script>
import ExpressType from './components/expressTypeDialog/index'
import PayMethod from './components/payMethodDiaolog/index'
import SendStartTime from './components/sendStartTimeDialog/index'
import Agreement from './components/agreementDialog/index'
import {Toast} from "vant";
import {formatDate} from "../../utils/dateTime";
import {createOrderService, orderConfirmService} from "../../api/shunfeng";
import {orderController} from "../../api/order";
import {sampleRegister} from "../../api/sample";
import {LogisticsController} from "../../api/logistics";

export default {
  data() {
    return {
      form: {},
      sampleTag:{},
      btn: 0,
      show: true,
      cancel:{
        mailNo:'',
        sfOrderId:''
      }
    }
  },
  components: {
    ExpressType,
    PayMethod,
    SendStartTime,
    Agreement
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.$store.commit('getOpenId')
      this.form = this.$store.state.MailForm
      let beginTime = formatDate(new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 90),'yyyy-MM-dd')
      let endTime = formatDate(new Date(),'yyyy-MM-dd')
      const data = {
        beginTime: beginTime,
        endTime: endTime,
        openId: this.$store.state.openId,
        platName: "",
        productType: "",
      }
      const res = await LogisticsController.getLogistics(data)
      const order = res.data
      if (order.length !== 0) {
        this.show = false
        this.cancel.sfOrderId = order[0].sfOrderId
        this.cancel.mailNo = order[0].mailNo
      } else {
        this.show = true
      }
    },
    back() {
      this.$router.push('/useProcess')
    },
    async cancelOrder() {
      const mailNo = this.cancel.mailNo
      const orderId = this.cancel.sfOrderId
      const res = await orderConfirmService({mailNo,orderId})
      if (res.code === 200 ){
        await this.getOrder()
        const openid = this.$store.state.openId
        this.$store.state.HpvSample.department = '0'
        const change = {
          department: '0',
          infoId:this.$store.state.HpvSample.infoId
        }
        const updateData = {
          'sampleregistertemp':change,
          'order': this.order
        }
        const res = await sampleRegister.updateSample(updateData,{openid})
        Toast.success('快递取消成功')
        this.sampleTag.mail = '0'
        this.sampleTag.sfID = ''
        this.show = true
      } else {
        Toast.success(res.message)
      }
    },
    openExpressType() {
      this.$refs.ExpressType.show = true
    },
    openPayMethod() {
      this.$refs.PayMethod.show = true
    },
    openSendStartTime() {
      this.$refs.SendStartTime.show = true
    },
    openAgreement() {
      this.$refs.Agreement.show = true
    },
    openJi() {
      this.$router.push('/jiAddress')
    },
    openDao() {
      this.$router.push('/daoAddress')
    },
    btnTips() {
      if (this.btn === 0) {
        this.btn = 1
      } else if (this.btn === 1) {
        this.btn = 0
      } else return
    },
    async getOrder() {
      const infoId = this.$store.state.HpvSample.infoId
      const  res = await orderController.getOrderByInfoId({infoId})
      this.order = res.data[0]
    },
    async updateState() {
      await this.getOrder()
      const openid = this.$store.state.openId
      this.$store.state.HpvSample.department = '1'
      const change = {
        department: '1',
        infoId:this.$store.state.HpvSample.infoId
      }
      const updateData = {
        'sampleregistertemp':change,
        'order': this.order
      }
      const res = await sampleRegister.updateSample(updateData,{openid})
    },
    async submit() {
      console.log(this.form)
      if (this.form.jAddress === '' || this.form.jContact === '' || this.form.jTel === '') {
        return Toast.fail('请完善寄货人信息')
      } else if (this.form.dAddress === '' || this.form.dContact === '' || this.form.dTel === '') {
        return Toast.fail('请完善收货人信息')
      } else if (this.btn === 0) {
        return Toast.fail('请先阅读并同意电子运单契约条款')
      }
      if (this.form.sendStartTimeText === '一小时内') {
        const time = new Date().getTime() + 60 * 60 * 1000
        const sendStartTime = formatDate(new Date(time), 'yyyy-M-dd hh:mm:ss')
        this.form.sendStartTime = sendStartTime
      } else {
        this.form.sendStartTime = this.sendStartTimeText
      }
      const localOpenId = localStorage.getItem('openId')
      const openId = JSON.parse(localOpenId).content
      this.form.openId = openId
      const orderXmlVo = this.form
      const res = await createOrderService(orderXmlVo)
      if (res.code === 200) {
        Toast.success('快递下单成功')
        this.sampleTag.mail = '1'
        this.sampleTag.sfID = res.data
        this.sampleTag.mailTime = new Date().getTime()
        localStorage.setItem('sampleTag',JSON.stringify(this.sampleTag))
        await this.updateState()
        this.show = false
      } else {
        Toast.fail(res.message)
      }
    }
  }

}
</script>

<style scoped>
.box {
  background: #f6f6f6;
  padding: 10px;
}

.header {
  height: 200px;
  width: 100%;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin-bottom: 20px;
}

.header-item {
  display: flex;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  height: 90px;
}

.front_logo {
  width: 50px;
  text-align: center;
  height: 90px;
  line-height: 90px;
  margin-right: 10px;
}

.front_logo > span {
  font-size: 0.8em;
  background: black;
  padding: 3px;
  border-radius: 2px;
  color: #f6f6f6;
}

.header-item-content {
  padding-top: 30px;
  box-sizing: border-box;
  height: 90px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.message > :first-child {
  font-weight: 600;
  font-size: 0.9em;
  margin-bottom: 5px;
}

.message > :nth-child(2) {
  font-size: 0.9em;
  color: #666666;
}

.action {
  width: 60px;
  height: 40px;
  line-height: 40px;
  font-size: 0.9em;
  font-weight: 600;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #333333;
}

.content {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 10px;
  overflow: hidden;
}

/deep/ .van-field__control {
  text-align: right;
}

.confirm {
  width: 100%;
  height: 60px;
  background: #ffffff;
  position: absolute;
  bottom: 0px;
  left: 0px;
  display: flex;
  line-height: 60px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  justify-content: space-between;
}

.confirm_tips {
  display: flex;
  font-size: 0.8rem;
  color: #666666;
  padding: 0px;
}

.text-tips {
  font-weight: 600;
}

.btn-tips {
  margin-top: 30px;
  transform: translate(0, -50%);
  line-height: 12px;
  color: #ffffff;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #333333;
  margin-right: 5px;
}

.btn-tips-true {
  margin-top: 30px;
  transform: translate(0, -50%);
  line-height: 12px;
  color: #ffffff;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #409eff;
  margin-right: 5px;
  background: #409eff;
}

.confirm_button {
  position: relative;
}

.confirm_button > span {
  right: 0px;
  position: absolute;
  top: 50%;
  text-align: center;
  color: #ffffff;
  transform: translate(0, -50%);
  display: block;
  width: 50px;
  height: 30px;
  font-size: 0.8rem;
  line-height: 30px;
  background: #5ea0ff;
  border-radius: 5px;
}

/deep/ .van-radio {
  margin-top: 30px;
  transform: translate(0, -50%);
  font-size: 7px;
  color: #999999;
}

.addressDetails {
  white-space: nowrap;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.empty{
  background: #ffffff;
  height: 100vh;
  padding-top: 100px;
}
.bottom-button {
  margin-top: 50px;
  background: #409eff;
  border: #409eff;
  width: 160px;
  height: 40px;
}
/deep/.van-empty__bottom {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
}
.bottom-button-cancel {
  margin-top: 40px;
  width: 160px;
  height: 40px;
}
</style>