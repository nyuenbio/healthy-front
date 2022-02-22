<template>
  <div class="box"  v-loading="loading" element-loading-spinner="el-icon-loading">
    <div class="tips"><i class="el-icon-warning" ></i>请按流程操作每一步哦!</div>
    <el-timeline class="timeline" v-if="!loading">
      <el-timeline-item timestamp="" hide-timestamp  size="large" :color=" step === 1 ? '#409EFF' : '#e4e7ed'" type="primary">
        <template slot="dot">
          <img v-if="step === 1" class="logo" src="@/assets/hpv/first.jpg" alt="">
          <img v-else class="logo" src="@/assets/hpv/firstDis.jpg" alt="">
        </template>
        <div class="item-box">
          <div class="text-box">
            <div  class="line-1">
              <div>样本绑定</div>
              <div v-if="step === 0" class="pass-button" @click="toSampleInput">样本绑定</div>
              <div v-else class="pass-button" @click="toSampleDetails">查看样本</div>
            </div>
            <div class="line-2">
              绑定后无法退货，如您暂不适合使用请勿绑定
            </div>
            <el-divider></el-divider>
          </div>
        </div>
      </el-timeline-item>
      <el-timeline-item hide-timestamp :color=" step1 === 1 ? '#409EFF' : '#e4e7ed'">
        <template slot="dot">
          <img v-if="step1=== 1" class="logo" src="@/assets/hpv/second.jpg" alt="">
          <img v-else class="logo" src="@/assets/hpv/secondDis.jpg" alt="">
        </template>
        <div class="item-box">
          <div class="text-box">
            <div  class="line-1">
              <div>样本采集</div>
              <div class="pass-button" @click="toSampleCollection" >采样教程</div>
            </div>
            <div class="line-2">
              参照盒内说明书或线上采样教程，完成自取样
            </div>
            <el-divider></el-divider>
          </div>
        </div>
      </el-timeline-item>
      <el-timeline-item hide-timestamp :color=" step2 === 1 ? '#409EFF' : '#e4e7ed'">
        <template slot="dot">
          <img v-if="step2 === 1" class="logo" src="@/assets/hpv/third.jpg" alt="">
          <img v-else class="logo" src="@/assets/hpv/thirdDis.jpg" alt="">
        </template>
        <div class="item-box">
          <div class="text-box">
            <div  class="line-1">
              <div>样本回寄</div>
              <div v-if="step1 === 0" class="reject-button" @click="tips">邮寄地址</div>
              <div v-else class="pass-button" @click="toMail">邮寄地址</div>
            </div>
            <div class="line-2">
              可一键预约顺丰，免费邮寄
            </div>
            <el-divider></el-divider>
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>
<!--    <div class="item-box">-->
<!--      <div class="icon-box">-->
<!--        <i class="el-icon-folder-add icon"></i>-->
<!--      </div>-->
<!--      <div class="text-box">-->
<!--        <div  class="line-1">-->
<!--          <div>样本绑定</div>-->
<!--          <div>样本绑定</div>-->
<!--        </div>-->
<!--        <div class="line-2">-->
<!--          绑定后无法退货，如您暂不适合使用请勿绑定-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import {Dialog, Toast} from "vant";
import {orderController} from "../../api/order";
import {sampleRegister} from "../../api/sample";

export default {
  name: "useProcess",
  data() {
    return{
      step: 0,
      step1: 0,
      step2: 0,
      sampleTag:{},
      loading:true
    }
  },
  async created() {
    this.loading = true
    // await this.getIndoId()
    await this.getProcess()
    await this.judgeProcess()
    this.loading = false
  },
  methods:{
    getIndoId() {
      if (this.$route.query.infoId) {
        this.$store.state.HpvSample.infoId = this.$route.query.infoId
      }
    },
    judgeProcess() { // 根据获取到的当前的样本状态  判断应该处于什么结点
      if (this.sampleTag.infoId){
        this.step = 1
      }
      if (this.sampleTag.collection === '1'){
        this.step1 = 1
      }
      if (this.sampleTag.mail === '1'){
        this.step2 = 1
      }
    },
    async getProcess() {   // 获取自己的订单 证明自己有正在处理的订单 通过样本编号 比对  确定是否是自己的样本 是的话 展示  不是的话  下一步
      const infoId = this.$route.query.infoId || this.$store.state.hpvInfoId
      const arr = await this.getData()   // 获取到自己的订单
      console.log(arr)
      const resLife = arr.find(item => item.sampleregistertemp.infoId === infoId)
      console.log('resLife',resLife)
      if(!infoId) return console.log('infoId 不存在')
      const res =  await sampleRegister.getByInfoIdAndCai({infoId}) // 通过样本编号和姓名 获取 受检者的所有样本信息
      if(!res || res.data.length === 0) {
        this.$store.state.HpvSample.infoId = infoId
      } else {
        if (res.data[0].state1 === 217) {
          Dialog.alert({
            title: '温馨提醒',
            message: `此样本 ${infoId} 已完成检测，不可以再次录入了.`,
          }).then(() => {
            // on close
          });
          console.log('此样本已完成检测，不可以再次录入了')
        } else if (resLife && resLife.sampleregistertemp.infoId === infoId) {
          this.$store.state.HpvSample = res.data[0]
          this.sampleTag.infoId = res.data[0].infoId
          this.$store.state.hpvInfoId = this.sampleTag.infoId   // state.hpvInfoId 赋值 证明录入过样本
        } else {
          Dialog.alert({
            title: '温馨提醒',
            message: `此样本 ${infoId} 已经被别人绑定，请检查二维码或联系客服！`,
          }).then(() => {
            // on close
          });
          // console.log('不是我的样本，我看不了，也不能绑定路由中的样本编号 ')
        }
      }
      if (this.$store.state.HpvSample.adminRemarks === '1') {    // 如果adminRemarks === 1 则证明采样有了
        this.sampleTag.collection = '1'
      }
      if (this.$store.state.HpvSample.department === '1') {    // 如果department === 1 则证明邮寄也完成了
        this.sampleTag.mail = '1'
      }
      // const  have = arr.filter(item => (item.sampleregistertemp.state1 !== 217))
      // if (have.length === 0){
      //   console.log('此人没有已经录的样本  请注意')
      // } else {
      //   console.log('此人有多个已经录的样本  请注意')
      //   this.sampleTag.infoId = have[0].sampleregistertemp.infoId
      //   const infoId = have[0].sampleregistertemp.infoId
      //   const userName = have[0].sampleregistertemp.userName
      //   const res =  await sampleRegister.getByInfoId({infoId,userName}) // 通过样本编号和姓名 获取 受检者的所有样本信息
      //   this.$store.state.HpvSample = res.data[0]
      //   this.$store.state.hpvInfoId = this.sampleTag.infoId   // state.hpvInfoId 赋值 证明录入过样本
      //   if (this.$store.state.HpvSample.adminRemarks === '1') {    // 如果adminRemarks === 1 则证明采样有了
      //     this.sampleTag.collection = '1'
      //   }
      //   if (this.$store.state.HpvSample.department === '1') {    // 如果department === 1 则证明邮寄也完成了
      //     this.sampleTag.mail = '1'
      //   }
      //   console.log(this.$store.state.HpvSample)
      // }
    },
    async getData() {
      this.$store.commit('getOpenId')
      let openId = this.$store.state.openId
      const request = {
        pageNo: 1 ,
        pageSize: 100000,
        openId: openId,
        productType:268
      }
      const listRes = await orderController.getOrderAndSamByPage(request)
      const list = listRes.data.records
      const payed = list.filter(item => (item.sampleregistertemp && item.sampleregistertemp.productType === 268))
      const  arr = payed.filter(item => (item.status === 3))
      return arr
    },
    tips() {
      Toast('完成样本绑定以及采样之后才可邮寄呦！')
    },
    toSampleInput() {
      this.$router.push('/sampleInput')
    },
    toSampleDetails() {
      this.$router.push('/sampleDetails')
    },
    toSampleCollection() {
      this.$router.push('/sampleCollection')
    },
    toMail() {
      this.$router.push('/mailIndex')
      // window.location.href = 'http://test.nhwa-hexin.com/mobile/express/'
    }
  }


}
</script>

<style scoped>
.box{
  width: 100%;
  background: #ffffff;
  height: 500px;
  font-family: "PingFang SC";
  color: #000000;
  padding: 20px;
  box-sizing: border-box;
  height: 100vh;
}
.tips {
  margin: 20px auto;
}
.tips > i{
  color: #f6aed0;
  margin-right: 5px;
  margin-left: 5px;
  font-size: 1.15em;
}

.item-box{
  display: flex;
  height: 110px;
  padding-left: 50px;

}
.text-box{
  padding: 20px 0px 0px 0px;
  width: 100%;
}
.line-1{
  display: flex;
  justify-content: space-between;
}
.line-1>div:first-child{
  font-size: 1.2em;
  font-weight: 600;
  line-height: 29px;
}
.pass-button{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background: #f6aed0;
  height: 2em;
  line-height: 2em;
  padding: 0 10px 0 10px;
  color: #f6f6f6;
  border-radius: 2px;
  font-size: 1.1em;
  box-sizing: border-box;
  transform: translate(0,-10%);
}
.reject-button{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border: 1px solid #666666;
  height: 2em;
  line-height: 2em;
  padding: 0 10px 0 10px;
  color: #666666;
  border-radius: 2px;
  font-size: 1.1em;
  box-sizing: border-box;
  transform: translate(0,-10%);
}
.line-2{
  padding-top: 20px;
  font-size: 0.85rem;
  color: #888888;
}
.icon{
  font-size: 1.8em;
  margin-top: 50%;
  color: #f6f6f6;
}

/deep/.el-timeline-item__wrapper {
  position: relative;
  padding-left: 15px;
  top: -3px;
}

/deep/.el-timeline-item__node {
  position: absolute;
  background-color: #E4E7ED;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 7px;
  top: 8%;
  width: 40px;
  height: 40px;
}
/deep/.el-timeline-item__tail {
   position: absolute;
   left: 27px;
   height: 100%;
   border-left: 2px solid #E4E7ED;
   top: 20%;
 }
/deep/.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 24px 0 0;
  opacity: 0.5;
}
.logo{
  margin-top: 12px;
  border-radius: 50%;
  margin-left: 7px;
  width: 40px;
  height: 40px;
}

</style>