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
        <div class="confirm_button" @click="submitConfirm">
          <span>提交</span>
        </div>
      </div>
      <ExpressType ref="ExpressType"></ExpressType>
      <PayMethod ref="PayMethod"></PayMethod>
      <SendStartTime ref="SendStartTime"></SendStartTime>
      <Agreement :btn="btn" @change="btnTips" ref="Agreement"></Agreement>
    </div>
    <div class="empty" v-else>
      <van-empty
          class="custom-image"
          image="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.616pic.com%2Fys_bnew_img%2F00%2F02%2F79%2FNcGBJrnxlP.jpg&refer=http%3A%2F%2Fpic.616pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648188768&t=ce9c5a5e8d740226a0291e7f16a47f38"
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
import { Dialog } from 'vant';
import {formatDate} from "../../utils/dateTime";
import {createOrderService, orderConfirmService} from "../../api/shunfeng";
import {orderController} from "../../api/order";
import {sampleRegister} from "../../api/sample";
import {LogisticsController} from "../../api/logistics";
import {JdB2cController} from "../../api/jd-b2c";

// 立即执行版
function debounce(func, wait) {
  let timer;
  return function () {
    let context = this; // 这边的 this 指向谁?
    let args = arguments; // arguments中存着e

    if (timer) clearTimeout(timer);

    let callNow = !timer;

    timer = setTimeout(() => {
      timer = null;
    }, wait)

    if (callNow) func.apply(context, args);
  }
}

// 顺丰的gif动图 https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fupload-images.jianshu.io%2Fupload_images%2F18702291-e8ecd2f3c72a6c22.gif&refer=http%3A%2F%2Fupload-images.jianshu.io&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644646974&t=eefac1c3f013af29db93522b1766fa3a

export default {
  data() {
    return {
      form: {},
      sampleTag: {},
      btn: 0,
      show: true,
      cancel: {
        mailNo: '',
        sfOrderId: ''
      },
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
      console.log('this.form.infoId', this.$store.state.HpvSample.infoId)
      const infoId = this.$store.state.HpvSample.infoId
      if (!infoId) return console.log('出错了，你不应该进来的')

      const res = (await this.getData()).data[0]
      console.log(res)
      this.$store.state.HpvSample = res
      if (res.department) {
        this.show = false
      } else {
        this.show = true
      }
    },
    async getData() {
      const infoId = this.$store.state.HpvSample.infoId
      const res = await sampleRegister.getByInfoIdAndCai({infoId})
      return res
    },
    back() {
      this.$router.push({name: 'useProcess', query: {infoId: this.$store.state.HpvSample.infoId}})
    },
    async cancelOrder() {
      const lwbNo = this.$store.state.HpvSample.department
      const reason = '暂时先取消邮寄'
      const res = await JdB2cController.cancelOrder({lwbNo, reason})
      if (res.code === 200) {
        await this.getOrder()
        const openid = this.$store.state.openId
        this.$store.state.HpvSample.department = ''
        const change = {
          department: '',
          infoId: this.$store.state.HpvSample.infoId
        }
        const updateData = {
          'sampleregistertemp': change,
          'order': this.order
        }
        const res = await sampleRegister.updateSample(updateData, {openid})
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
      const res = await orderController.getOrderByInfoId({infoId})
      this.order = res.data[0]
    },
    async updateState(mailNo) {
      await this.getOrder()
      const openid = this.$store.state.openId
      this.$store.state.HpvSample.department = mailNo
      const change = {
        department: mailNo,
        infoId: this.$store.state.HpvSample.infoId
      }
      const updateData = {
        'sampleregistertemp': change,
        'order': this.order
      }
      const res = await sampleRegister.updateSample(updateData, {openid})
    },
    submitConfirm: debounce(function () {
      console.log('为了防抖')
      this.submit()
    }, 2000),
    async submit() {
      if (this.form.jAddress === '' || this.form.jContact === '' || this.form.jTel === '') {
        return Toast.fail('请完善寄货人信息')
      } else if (this.form.dAddress === '' || this.form.dContact === '' || this.form.dTel === '') {
        return Toast.fail('请完善收货人信息')
      } else if (this.btn === 0) {
        return Toast.fail('请先阅读并同意电子运单契约条款')
      }
      if (this.form.sendStartTimeText === '一小时内') {
        const time = new Date().getTime() + 60 * 60 * 1000
        const sendStartTime = formatDate(new Date(time), 'yyyy-MM-ddThh:mm:ss')
        this.form.sendStartTime = sendStartTime
      } else {
        console.log(this.form.sendStartTimeText)
        this.form.sendStartTime = this.form.sendStartTimeText
      }
      const localOpenId = localStorage.getItem('openId')
      const openId = JSON.parse(localOpenId).content
      this.form.openId = openId
      const JD = {
        // addedService: "0",
        detPlatCode: 107,
        detPlatName: '京东物流',
        expressType: 1,
        expressTypeName: "京东特惠送",
        goods: 'HPV样本',
        goodsType: 1,
        packageCount: 1,
        payMethodName: '月结',
        productType: 268,
        receiverAddress: this.form.dAddress,
        receiverCompany: this.form.dCompany,
        receiverMobile: this.form.dTel,
        receiverName: this.form.dContact,
        remark: '',
        openId: this.$store.state.openId,
        detTypeCode: 110,
        detTypeName: '样本物流',
        detWayCode: 116,
        detWayName: '移动端端下单',
        senderAddress: this.form.jAddress,
        senderCompany: this.form.jCompany,
        senderMobile: this.form.jTel,
        senderName: this.form.jContact,
        infoId: this.$store.state.HpvSample.infoId,
        pickUpEndTime: formatDate(new Date(new Date(this.form.sendStartTime).getTime() + 1000 * 60 * 60), 'yyyy-MM-dd hh:mm:ss'),
        pickUpStartTime: this.form.sendStartTime.replace('T', ' '),
      }
      console.log(JD)
      const createOrderRes = await JdB2cController.createOrder(JD)
      if (createOrderRes.code === 200) {
        Toast.success('京东快递下单成功')
        const arr = createOrderRes.data.split('&&')
        await this.updateState(arr[0])
        this.show = false
      } else {
        Dialog({ message: createOrderRes.message });
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

.empty {
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

/deep/ .van-empty__bottom {
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