<template>
  <div>
    <el-form ref="user_form" :model="sample" :rules="rules" size="small" label-width="100px" label-position="left">
      <el-form-item label="姓名" prop="userName">
        <el-input placeholder="请输入姓名" v-model="sample.userName"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="sample.sex">
          <el-radio
              @click.native="sample.sex='男'"
              label="男"
          >男</el-radio>
          <el-radio
              @click.native="sample.sex='女'"
              label="女"
          >女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份证号码" prop="defined3">
        <el-input placeholder="请输入身份证号码" @blur="getAge(sample.defined3)" v-model="sample.defined3"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age" >
        <el-input placeholder="请输入年龄" v-model="sample.age"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="patientPhone">
        <div class="phone">
          <el-input placeholder="请输入电话号码" v-model="sample.patientPhone"></el-input>
          <el-button v-if="!timeShow" type="primary" @click="getPhoneCode">
            <span>获取验证码</span>
          </el-button>
          <el-button v-else type="primary">
            <span class="timeShow">
              <van-count-down class="timeShow-time" @finish="finish" format="ss" :time="time" />
              <div class="timeShow-text">秒后重试</div>
            </span>
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input placeholder="请输入短信验证码" v-model="sample.code"></el-input>
      </el-form-item>
    </el-form>
    <div class="bottom-next">
      <van-button @click="back" class="button-back" block  plain type="primary" color="#f6aed0">
        上一步
      </van-button>
      <van-button @click="submitForm('user_form')" class="button-next" block color="#f6aed0">
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
import {userApi} from "../../../api/user";
import {Toast} from "vant";
import {sampleRegister} from "../../../api/sample";

export default {
  data() {
    var validateIdCard = (rule, value, callback) => {
      const idCardReg = /^[A-Za-z0-9]+$/
      if (value.length !== 18) {
        return callback(new Error('身份证位号码数不正确'));
      }
      if (!idCardReg.test(value)) {
        return callback(new Error('身份证号码格式错误'));
      }
      callback()
    };
    return {
      name: "input_3",
      time: 60 *1000 ,
      timeShow: false,
      sample: {
        userName: '',
        age: '',
        defined3: '',
        patientPhone: '',
        code:'',
        sex:''
      },
      rules:{
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        defined3: [
          { required: true, message: '身份证号码不能为空', trigger: 'blur' },
          { validator: validateIdCard, trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' },
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
        ],
        patientPhone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
      }
    }
  },
  mounted() {
    this.sample = this.$store.state.HpvSample
  },
  methods:{
    getAge(value) {
      if (this.validateIdCard(value)) {
        console.log(value)
        const age = value.slice(6,10)
        const now = new Date().getFullYear()
        const ages = now - age - 1
        this.sample.age = ages
      }
    },
    validateIdCard(value) {
      const idCardReg = /^[A-Za-z0-9]+$/
      if (value.length !== 18) {
        return false
      } else if (!idCardReg.test(value)) {
        return false
      } else {
        return true
      }
    },
    back() {
      this.$emit('backtwo')
    },
    async checkCode(infoId) { // 这个是发起请求，和数据库中的进行比对
      const res = await sampleRegister.getInfo(infoId)
      if (res.data.code === 200 ){
        return true
      } else {
        return false
      }
    },
    async getPhoneCode() {
      this.$store.commit('getOpenId')
      if (this.sample.patientPhone === '') return Toast.fail('请输入手机号')
      const mobile = this.sample.patientPhone
      const res = await userApi.sendSms({mobile})
      if (res.code === 200 && res.data.code === 200){
        this.timeShow = true
        Toast.success('短信发送成功')
      } else {
        this.timeShow = false
        Toast.fail('短信发送失败')
      }
    },
    finish() {
      this.timeShow = false
    },
    async checkPhoneCode() {
      const mobile = this.sample.patientPhone
      const type = 5
      const verifiry = this.sample.code
      const res = await userApi.checkVerifiry({ mobile, type, verifiry })
      if (res.code !== 200 ) return false
      if (res.code === 200) return true
    },
    submitForm(formName) {
      console.log(this.$refs[formName])
      this.$refs['user_form'].validate(  async (valid) => {
        if (valid) {
          const codeRes = await this.checkPhoneCode()
          if (!codeRes) return Toast.fail('验证码不正确')
          this.$emit('nextthree')
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
.title-tips {
  width: 100%;
}
.phone{
  display: flex;
}
.title-tips > img {
  width: 100%;
}
.timeShow{
  display: flex;
  width: 5em;
  position: relative;
  height: 11px;
}
.timeShow-time{
  position: absolute;
  left: 0px;
  font-size: 0.8em;
  top:-0.3em;
}
.timeShow-text{
  margin-left:1.5em;
}
/deep/ [data-v-2b9befa8] .van-count-down {
  color: #ffffff;
  font-size: 1em;
}
/deep/ .el-form-item__label {
  font-size: 0.9em;
  font-weight: 600;
}
/deep/ .el-button--primary {
  margin-left: 10px;
  color: #FFF;
  background-color: #f6aed0;
  border-color: #f6aed0;
}

/deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100%;
}

.bottom-next {
  margin-top: 70px;
}
.button-back{
  border-radius: 10px;
  margin: 80px 0 20px;
}
/deep/ .el-input-group__append button.el-button, .el-input-group__append div.el-select .el-input__inner, .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner {
  opacity: 0.8;
  color: #ffffff;
  border-top: 0;
  border-bottom: 0;
  border-radius: 0 4px 4px 0 ;
}
/deep/ .van-count-down {
  color: #ffffff;
  font-size: 14px;
  line-height: 20px;
}

.button-next {
  border-radius: 10px;
}
</style>