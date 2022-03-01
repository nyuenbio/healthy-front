<template>
  <div class="box">
    <div>
      <span class="title">采样教程</span>
      <img style="width: 100%" src="~@/assets/hpv/collection.jpg" alt="">
    </div>
    <div>
      <span class="title">视频教程</span>
      <video style="width: 100%;object-fit: fill;" src="http://order.nyuen-group.com:8088/video/collectionHpv.mp4" controls="controls"></video>
    </div>
    <div class="bottom-next">
      <van-button @click="finish" class="button-next" block color="#f6aed0">
        已完成采样，前往邮寄
      </van-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import {sampleRegister} from "../../api/sample";
import {orderController} from "../../api/order";

export default {
  name: "sampleCollection",
  data(){
    return{
      sampleTag:{
        infoId: '',
        collection: '0',
        date : new Date().getTime()
      },
      order:{

      }
    }
  },
  created() {
    this.getProcess()
  },
  methods:{
    getProcess() {
      this.sampleTag.infoId = this.$store.state.hpvInfoId
    },
    async getOrder() {
      const infoId = this.$store.state.HpvSample.infoId
      const  res = await orderController.getOrderByInfoId({infoId})
      this.order = res.data[0]
    },
    async finish() {
      if (!this.sampleTag.infoId) {
        Dialog.confirm({
          title: '温馨提醒',
          message: '样本还未绑定，请先绑定样本编号',
        }).then(() => {
          this.$router.go(-1)
        }).catch(() => {
          this.$router.go(-1)
        });
      } else {
        if ( this.$store.state.HpvSample.adminRemarks === '1'){
          console.log('已经完成过采样了')
        } else {
          await this.getOrder()
          const openid = this.$store.state.openId
          this.$store.state.HpvSample.adminRemarks = '1'
          const change = {
            adminRemarks: '1',
            infoId:this.$store.state.HpvSample.infoId
          }
          const updateData = {
            'sampleregistertemp':change,
            'order': this.order
          }
          const res = await sampleRegister.updateSample(updateData,{openid})
        }
        await this.$router.push({ name: 'useProcess', query: {infoId: this.$store.state.HpvSample.infoId}})
      }
    }

  }
}
</script>

<style scoped>
.box{
  padding: 20px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}
.button-next {
  margin-top: 40px;
  margin-bottom: 100px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.title{
  display: inline-block;
  font-weight: bolder;
  margin-top: 20px;
  margin-bottom: 20px;
}

</style>