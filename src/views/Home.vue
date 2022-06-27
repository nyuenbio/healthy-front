<template>
  <div class="home">
    <div>
<!--      <div class="head">-->
<!--        <div class="head_left">-->
<!--          <img src="https://img0.baidu.com/it/u=2847158136,3104662557&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" alt="">-->
<!--        </div>-->
<!--        <div class="head_right">-->
<!--          <div>昵称</div>-->
<!--          <div @click="toMine">我的订单</div>-->
<!--        </div>-->
<!--      </div>-->
      <div class="content">
        <div class="item-box"  @click="toSample">
          <div class="item-icon" style="background: rgb(103, 194, 58)">
            <i class="el-icon-receiving"></i>
          </div>
          <div class="bottom" >绑定样本</div>
        </div>
        <div class="item-box" @click="toReport">
          <div class="item-icon" style="background: rgb(83, 168, 255)">
            <i class="el-icon-receiving"></i>
          </div>
          <div class="bottom" >查看报告</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {sampleRegister} from "@/api/sample";
import {Dialog, Toast} from 'vant'
import {baseUrlAddress} from "@/config/env.js";

export default {
  name: "home",
  data() {
    return{
      step:0,
      infoId:'',
      baseUrlAddress
    }
  },
  mounted() {
    this.checkInfoIdSqlBox()
  },
  methods:{
    async checkInfoIdSqlBox() {
      let infoId = ''
      let reg = /[_]/im;
      const test = reg.test(this.$route.query.infoId)
      if (!test) {
        infoId = this.$route.query.infoId
      } else if (test) {
        const arr = this.$route.query.infoId.split('_')
        infoId = arr[1]
      } else {
        Toast.fail('样本编号获取有误')
      }
      if(!infoId) return 
      const checkInfoIdSql = await this.checkInfoid(infoId)
      if (!checkInfoIdSql) {
        Dialog.alert({
          title: '温馨提醒',
          message: `样本编号 ${infoId} 的样本已经被绑定，请勿重复提交.`,
        }).then(() => {
          // on close
        });
      } else {
      }
      this.infoId = infoId
    },
    async checkInfoid(infoId) { // 这个是发起请求，和数据库中的进行比对
      const res = await sampleRegister.getInfo(infoId)
      console.log(res)
      if (res.code === 200) {
        return true
      } else {
        return false
      }
    },
    toSample() {
      if (this.infoId) {
        this.$router.push({ name: 'productList', query: { infoId: this.infoId}})
      } else {
        this.$router.push({ name: 'productList', query: { infoId: this.infoId}})
      }
    },
    toReport() {
      console.log(baseUrlAddress)
      let url = baseUrlAddress + "mobile/order/reportProgress.html"
      window.location.href = url
    },
    toMine() {
      this.$router.push('/orderList')
    }
  }


}
</script>
<style scoped>
/*.home{*/
/*  height: 100vh;*/
/*  background: #ffffff;*/
/*}*/
.head{
  border-bottom: 4px dashed rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 150px;
  background: #ffffff;
}
.content{
  padding: 100px 15px;
}
.item-box{
  background: #ffffff;
  border-radius: 10px;
  margin-top: 50px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 140px;
  position: relative;
  padding-top: 10px;
  box-sizing: border-box;
  /*border: 1px solid  rgba(0, 0, 0, 0.1);*/
}
.item-icon{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 15px auto 0;
}
.item-icon > i{
  font-size: 40px;
  width: 100%;
  line-height: 60px;
  color: #ffffff;
  text-align: center;
}
.bottom{
  /*border-top: 1px solid  rgba(0, 0, 0, 0.1);*/
  margin-top: 10px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 0 0 10px 10px;
  font-size: 1.2rem;
  font-family: 华文细黑;
  background: #fdfdfd;
}
.head{
  display: flex;
}
.head_left{
  box-sizing: border-box;
  padding-top: 30px;
  padding-left: 30px;
}
.head_left > img{
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.head_right{
  box-sizing: border-box;
  padding-top: 40px;
  padding-left: 30px;
}
.head_right > div:first-child{
  font-size: 1.4rem;
  max-width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
  padding-bottom: 0.6rem;
}
.head_right > div:nth-child(2){
  border-radius: 5px;
  border: 1px solid #f0884e;
  padding: 2px 10px;
  color: #FFFFFF;
  background: #f0884e;
}
</style>
