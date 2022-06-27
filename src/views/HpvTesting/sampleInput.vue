<template>
  <div class="box">
    <div>
      <van-tabs ref="tabs" v-model="activeName" :swipeable="swipeAble" animated :before-change="beforeChange">
        <van-tab title="样本录入" name="0">
          <div class="content">
            <Input_1 ref="Input_1" @nextone="next_1"></Input_1>
          </div>
        </van-tab>
        <van-tab title="知情同意书" name="1">
          <div class="content">
            <Input_2 @nexttwo="next_2" @backone="back_1" ref="Input_2"></Input_2>
          </div>
        </van-tab>
        <van-tab title="个人信息" name="2">
          <div class="content">
            <Input_3 @nextthree="nextthree" @backtwo="back_2" ref="Input_3"></Input_3>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Input_1 from "./components/input_1"
import Input_2 from "./components/input_2"
import Input_3 from "./components/input_3"
import {sampleRegister} from "../../api/sample";
import { Toast } from 'vant';
import {orderController} from "../../api/order";

export default {
  name: "sampleInput",
  components:{
    Input_1,
    Input_2,
    Input_3
  },
  data() {
    return{
      activeName: '0',
      swipeAble:false,
      form:{
        oldInfoId:'',
        infoId:'',
        userName: '',
        age: '',
        defined3: '',
        patientPhone: '',
        agreement: 0
      },
      openId : ''
    }
  },
  mounted() {
  },
  methods:{
    async beforeChange(index) {
      return false
    },
    back_1() {
      this.activeName = '0'
    },
    back_2() {
      this.activeName = '1'
    },
    next_1(value) {
      this.activeName = '1'
    },
    next_2(value) {
      this.activeName = '2'
    },
    async nextthree(value) {
      this.form = this.$store.state.HpvSample
      await this.submit()
    },
    async submit() {
      this.$store.commit('getOpenId')
      const openId = this.$store.state.openId
      console.log(this.form)
      const data = {
        'sampleregistertemp': this.form,
        'order': {
          cId: this.form.organizeId,
          wOpenid: openId,
          feetype: 2, // feetype取自路由query中的feetype，默认是2
          dictCode: 4, // 设置dictCode
          priceCodeNum: 1,
          sampletempInfoid: this.form.infoId,
          status: 3
        }
      }
      const openid = window.btoa('nyuen&&' + openId)
      const res = await sampleRegister.sampleInsert(data,{openid})
      if (res.data.code === 200) {
        const orderId = res.data.data // 第一次更新  使之状态改为4  变成待完善状态
        const orderRes = await sampleRegister.getOrder(orderId)
        const update =  orderRes.data[0]
        update.status = 4
        const updateData = {
          'sampleregistertemp':this.form,
          'order': update
        }
        const last = await sampleRegister.updateSample(updateData,{openid})
        if (!last || last.code !== 200)  return Toast.fail('更新样本失败');
        const orderRes2 = await sampleRegister.getOrder(orderId) // 第二次更新  使同步到正式
        const update2 =  orderRes2.data[0]
        const updateData2 = {
          'sampleregistertemp':this.form,
          'order': update2
        }
        const last2 = await sampleRegister.updateSample(updateData2,{openid})
        if (!last2 || last2.code !== 200)  return Toast.fail('更新样本失败');
        await Toast.success('绑定样本成功');
        await this.$router.push({ name: 'useProcess', query: {infoId: this.form.infoId}})
      } else {
        Toast.fail('绑定样本失败');
      }
    },
    sampleTag() {
    }
  }
}
</script>

<style scoped>
.box{
  padding:  20px;
  background: #ffffff;
  min-height: calc(100vh - 40px);
  height: auto;
  flex-grow: 1;
}
.content{
  padding-top: 40px;
  height: auto;
}
.box >>>.van-tab {
  font-size: 0.95em;
}
.disable{
  pointer-events: none;
}
.box >>> .van-tab--active {
  color: #000000;
  font-weight: 600;
}
.box >>>.van-tabs__line {
  position: absolute;
  bottom: 15px;
  left: 0;
  z-index: 1;
  width: 40px;
  height: 3px;
  background-color: #f6aed0;
  border-radius: 3px;
}


</style>