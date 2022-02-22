<template>
  <div class="box">
    <van-cell-group>
      <van-field v-model="sample.infoId" label="样本编号" placeholder="" />
      <van-field v-model="sample.oldInfoId" label="采样时间" placeholder="" />
      <van-field v-model="sample.userName" label="姓名" placeholder="" />
      <van-field v-model="sample.age" label="年龄" placeholder="" />
      <van-field v-model="sample.patientPhone" label="手机号" placeholder="" />
      <van-field v-model="sample.defined3" label="身份证号码" placeholder="" />
    </van-cell-group>
    <div class="bottom-next">
      <van-button @click="back" class="button-next" block color="linear-gradient(to right,  rgba(23, 111, 243, 0.66), #2773fc)">
        返回
      </van-button>
    </div>
<!--    <div class="bottom-next">-->
<!--      <van-button @click="clear" type="warning" class="button-next" block>-->
<!--        重录样本-->
<!--      </van-button>-->
<!--    </div>-->
  </div>
</template>

<script>
import {sampleRegister} from "../../api/sample";
import { Dialog } from 'vant';

export default {
  name: "sampleDetails",
  data() {
    return{
      sample:{
        infoId:'',
        oldInfoId: '',
        userName: '',
        age: '',
        patientPhone: '',
        defined3: '',
      },
      sampleTag:{

      }
    }
  },
  created() {
    this.getSample()
  },
  methods:{
    async getSample() {
      // const infoId = this.$store.state.HpvSample.infoId
      // const sample = await sampleRegister.getByInfoIdAndCai({infoId})
      this.sample = this.$store.state.HpvSample
    },
    clear() {
      Dialog.confirm({
        title: '提示',
        message: '重新录入样本会使清空已经录入的信息，并且已经录入成功的样本编号不可重复录入',
      })
          .then(() => {
            localStorage.clear()
            this.$router.push('/useProcess')
          })
          .catch(() => {
            // on cancel
          });
    },
    back() {
      this.$router.go(-1)
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
  height: 100vh;
}
.button-next {
  margin-top: 50px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

</style>