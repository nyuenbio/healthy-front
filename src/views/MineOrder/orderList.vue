<template>
  <div class="box" v-loading="show" element-loading-spinner="el-icon-loading">
    <div v-if="list.length === 0">
      <van-empty description="暂时没有订单" />
    </div>
    <div v-else>
      <div class="item_box" v-for="(item,index) in list" :key="index">
        <div>检测项目：{{item.sampleregistertemp.disease}}</div>
        <div>样本编号：{{item.sampleregistertemp.infoId}}</div>
        <div>受检者：{{item.sampleregistertemp.userName}}</div>
        <div class="bt">
          <el-button size="mini" type="primary" plain @click="to(item.orderId)">查看详情</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {orderController} from "../../api/order";

export default {
  name: "orderList",
  data() {
    return{
      list:[],
      show:true,
    }
  },
  created() {
    this.getList()
  },
  methods:{
    to(orderId) {
      this.$router.push({ name: 'orderDetails', query: {orderId:orderId}})

    },
    async getList() {
      this.$store.commit('getOpenId')
      let openId = this.$store.state.openId
      const request = {
        pageNo: 1 ,
        pageSize: 100000,
        openId: openId,
        productType:268,
        status: 2,
      }
      const listRes = await orderController.getOrderAndSamByPage(request)
      const list = listRes.data.records
      const payed = list.filter(item => (item.sampleregistertemp && item.sampleregistertemp.productType === 268))
      const  arr = payed.filter(item => (item.status === 3))
      this.list = arr
      this.show = false
      // console.log(list)
    }
  }
}
</script>

<style scoped>
.box{
  padding: 2rem 1rem;
  width: 100%;
  box-sizing: border-box;
}
.item_box{
  margin-bottom: 1rem;
  width: 100%;
  height: 120px;
  border-radius: 0.2rem;
  padding: 0.5rem;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.item_box > div{
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  color: #303133;
}
.bt{
  text-align: right;
}

</style>