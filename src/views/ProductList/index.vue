<template>
  <div class="box">
    <div class="item" @click="toHpv">
      <div class="logo">
        <img src="@/assets/images/hpv.jpg" alt="">
      </div>
      <div class="text">
        <div>HPV分型基因检测</div>
        <div>云想衣裳花想容，春风拂槛露华浓</div>
      </div>
      <div class="next">
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from "vant";

export default {
  name: "index",
  created() {
    console.log(this.$route)
    if (this.$route.query){
      console.log(this.$route.query)
    }
  },
  methods:{
    toHpv() {
      if (this.$route.query.infoId) {
        this.$router.push({ name: 'useProcess', query: {infoId: this.$route.query.infoId}})
      } else {
        this.$router.push('/useProcess')
      }
    }
  }
}
</script>

<style scoped>
.box{
  padding: 30px 15px;
  box-sizing: border-box;
}
.item{
  box-shadow: 0 5px 15px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .01);
  border-radius: 10px;
  width: 100%;
  height: 130px;
  background: #ffffff;
  display: flex;
  position: relative;
}
.logo{
  opacity: 0.9;
  padding-top: 15px;
  padding-left: 25px;
}
.logo > img{
  width: 100px;
  display: inline-block;
  border-radius: 50%;
}
.text{
  padding-top: 15px;
  padding-left: 10px;
  height: 100px;
}
.text > :first-child{
  padding-top: 1.8rem;
  padding-bottom: 0.7rem;
  height: 1.2rem;
  line-height: 1.2rem;
  font-weight: 600;
  font-size: 1.2rem;
}
.text > :last-child{
  color: #666666;
  font-size: 0.7rem;
}
.next{
  opacity: 0.5;
  position: absolute;
  right: 5px;
  font-size: 1.5rem;
  color: #999999;
  top: 50%;
  transform: translate(0,-50%);
}

</style>