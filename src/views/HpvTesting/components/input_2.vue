<template>
  <div class="little-box">
    <div class="agreement">
      <Consent ref="Consent"></Consent>
      <div class="yes">
        <p>受检者知情与同意</p>
        <p>
          <span class="round" @click="change" :class="{round_success : success === true}"><van-icon v-if="success" class="round_success_icon" color="#f6aed0" name="success" /></span>
          我已阅读并充分理解本知情同意书内容，包括检测性质、必要性、检测范围、预期目的、局限性、潜在风险等 ，所有疑问已得到解答，经本人及家属慎重考虑，自愿进行检测并配合提交必要真实信息。
          我理解检测结果需由医师结合临床信息综合判断，我接受回访。我理解检测机构将按有关规定保留样本和数据用于复核。我同意使用电子同意的方式代替书面签名同意。</p>
      </div>
    </div>
    <div class="bottom-next">
      <van-button @click="back" class="button-back" block plain type="primary" color="#f6aed0">
        上一步
      </van-button>
      <van-button @click="check" class="button-next" block color="#f6aed0">
        下一步
      </van-button>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant';
import Consent from './consent'

export default {
  data() {
    return {
      name: "input_2",
      show: false,
      success:false
    }
  },
  components: {
    Consent
  },
  methods: {
    change() {
      if (this.success === false) {
        this.success = true
      } else {
        this.success = false
      }
    },

    back() {
      this.$emit('backone')
    },
    check() {
      console.log(this.success)
      if (this.success) {
        this.$emit('nexttwo', this.success)
        return true
      } else {
        Toast('请阅读，并勾选已阅读知情同意书')
        return false
      }
    },
  }
}
</script>

<style scoped>
.button-back {
  border-radius: 10px;
  /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
  margin: 80px 0 20px;
}

.button-next {
  border-radius: 10px;
  /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)*/
}

/*.book > p {*/
/*  font-size: 0.9rem;*/
/*  letter-spacing: 0.5px;*/
/*}*/
/*.book > h4 {*/
/*  font-size: 0.9rem;*/
/*  text-align: center;*/
/*}*/
/*.book > p >span {*/
/*  font-weight: 600;*/
/*}*/
.yes {
  padding: 0.5rem;
  margin-top: 20px;
  font-size: 0.9rem;
  line-height: 1.5rem;
}

.yes > p:last-child {
  margin-top: 1rem;
}

.round {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  margin-left: 1rem;
  border-radius: 50%;
  border: 1px solid #999999;
  transform: translateY(20%);
}
.round_success {
  border: 1px solid #f6aed0;
}
.round_success_icon {
  transform: translate(10%,-20%);
}
</style>