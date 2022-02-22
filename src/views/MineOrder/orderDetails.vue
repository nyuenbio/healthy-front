<template>
  <div class="box">
    <div class="table" v-if="order.orderId">
      <div class="table_title"><h4>样本信息</h4></div>
      <div class="table_item"><span>样本编号：</span><span></span>{{ order.sampleregister.infoId || emptyFilter }}</div>
      <div class="table_item"><span>检测项目：</span><span></span>{{ order.sampleregister.disease || emptyFilter }}</div>
      <div class="table_item"><span>样本种类：</span><span></span>{{ order.sampleregister.sampleType || emptyFilter }}</div>
      <div class="table_title"><h4>受检者信息</h4></div>
      <div class="table_item"><span>受检者姓名：</span><span></span>{{ order.sampleregister.userName || emptyFilter }}</div>
      <div class="table_item"><span>性别：</span><span></span>{{ order.sampleregister.sex  || emptyFilter}}</div>
      <div class="table_item"><span>年龄：</span><span></span>{{ order.sampleregister.age || emptyFilter }}</div>
      <div class="table_item"><span>证件号码：</span><span></span>{{ order.sampleregister.defined3 || emptyFilter }}</div>
      <div class="table_title"><h4>订单信息</h4></div>
      <div class="table_item"><span>订单号：</span><span></span>{{ order.orderId || emptyFilter }}</div>
      <div class="table_title"><h4>检测信息</h4></div>
      <div class="table_item"><span>检测进度：</span><span></span>{{ order.sampleregister.state1 || emptyFilter }}</div>
      <div class="table_item"><span>签收日期：</span><span></span>{{ order.sampleregister.sendLabTime && order.sampleregister.sendLabTime.sendLabTime.split(' ')[0] || emptyFilter }}</div>
    </div>
  </div>
</template>

<script>
import {sampleRegister} from "../../api/sample";

export default {
  name: "orderDetails",
  data() {
    return{
      order:{},
      emptyFilter:'无'
    }
  },
  created() {
    this.getOrder()
  },
  methods:{
    async getOrder() {
      const orderId = this.$route.query.orderId
      const res = await sampleRegister.getOrder(orderId)
      this.order = res.data[0]
    }
  }

}
</script>

<style scoped>
.box{
  padding: 1rem 0.5rem;
  width: 100%;
  box-sizing: border-box;
}
.table{
  background: #e7f1ff;
  border-radius: 0.2rem;
  overflow: hidden;
}
.table_title{
  background:linear-gradient(to right, #043e7f, #e7f1ff);
  padding: 0.5rem;
  color: #FFFFFF;
}
.table_item{
  font-size: 0.95rem;
  padding: 0.6rem 0.6rem;
  display: flex;
  justify-content: space-between;
}

</style>