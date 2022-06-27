<template>
  <div class="little_box">
    <div class="title-tips">
      <img src="@/assets/hpv/third.jpg" alt="">
    </div>
    <div>
      <el-form ref="infoId_form" label-position="top" :model="sample" size="small " :rules="rules">
        <el-form-item label="采样时间" prop="oldInfoId">
          <el-input
              disabled
              placeholder="请选择日期"
              suffix-icon="el-icon-date"
              v-model="time">
          </el-input>
        </el-form-item>
        <el-form-item label="样本编号" prop="infoId">
          <el-input placeholder="请输入样本编号" :disabled="true" v-model="sample.infoId"></el-input>
        </el-form-item>
      </el-form>
      <div class="bottom-next">
        <van-button @click="submitForm('infoId_form')" class="button-next" block
                    color="#f6aed0">
          下一步
        </van-button>
      </div>
    </div>
  </div>

</template>

<script>
import {formatDate} from "../../../utils/dateTime";
import {sampleRegister} from "../../../api/sample";
import {userApi} from "../../../api/user";
import {getAccseToken, getSignature} from "../../../api/wxControl";
import MailForm from "../../../store/mail";


export default {
  data() {
    const validateInfoId = async (rule, value, callback) => {
      const checkInfoIdSql = await this.checkInfoid(value)
      console.log(checkInfoIdSql)
      const infoIdReg = /^[A-Za-z0-9]{10,16}$/
      if (!infoIdReg.test(value)) {
        callback(new Error('样本编号格式不正确'));
      } else if (!checkInfoIdSql) {
        callback(new Error('样本编号重复'));
        // this.$forceUpdate()
      } else {
        return true
      }
    }
    return {
      name: "input_1",
      time: '',
      pass: false,
      openId:'',
      ticket:'',
      sample: {
        oldInfoId: '',
        infoId: ''
      },
      rules: {
        oldInfoId: [
          {required: true, message: '请选择采集时间', trigger: 'blur'},
        ],
        infoId: [
          {required: true, message: '请输入样本编号', trigger: 'blur'},
          {validator: validateInfoId, trigger: 'blur'}
        ],
      }
    }
  },
  async created() {
    await this.getInfoId()
    await this.changeTime()
    await this.getOpenId()
    // await this.loadWXAPI()
  },
  methods: {
    getInfoId() {
      const sample = this.$store.state.HpvSample
      const infoId = sample.infoId
      if (infoId !== ''){
        this.sample.infoId = infoId
        this.sample.oldInfoId = sample.oldInfoId
      }
    },
    async getOpenId() {
      this.$store.commit('getOpenId')
      this.openId = this.$store.state.openId
      const openId = this.openId
      // const ticketRes = await getAccseToken({openId})
      // this.ticket = ticketRes.data.ticket
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    isWeiXin() {
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      } else {
        return false
      }
    },
    changeTime() {
      this.time = formatDate( new Date , 'yyyy-MM-dd')
      this.sample.oldInfoId = formatDate( new Date , 'yyyy-MM-dd hh:mm:ss')
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
    check() {
      this.$refs['infoId_form'].validate((valid) => {
        if (valid) {
          return true
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 加载微信的jsapi，并进行config，之后执行回调
    async loadWXAPI () {
      let url = document.location.href.split('#')[0]
      getSignature({
        url,
        jsapi_ticket: this.ticket
      }).then(res => {
        wx.config({
          debug: false,
          appId: res.data.appId,
          nonceStr: res.data.noncestr,
          signature: res.data.signature,
          timestamp: res.data.timestamp,
          jsApiList: ['checkJsApi', 'scanQRCode', 'chooseImage']
        })
        wx.checkJsApi({
          jsApiList: ['chooseImage', 'scanQRCode'],
          success: function (res) {
            console.log('jsApiList is checked')
          }
        })
      }).catch((res) => {
        console.log('出错了',res)
      })
    },
    handleInfoIdScan (index) {
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: res => {
          var result = res.resultStr.split(',')[1] // 当needResult 为 1 时，扫码返回的结果
          console.log(result)
          this.sample.infoId = result
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.state.HpvSample.oldInfoId = this.sample.oldInfoId
          this.$store.state.HpvSample.infoId = this.sample.infoId
          this.$emit('nextone')
        } else {
          console.log('error submit!! submit');
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

.title-tips > img {
  width: 100%;
}

.inputCode{
  height: 20px;
  line-height: 20px;
  color: #666666;
  width: 150px;
  position: absolute;
  top: -38px;
  right: 0px;
  text-align: right;
}
.inputCode > i{
  margin-right: 2px;
  font-size: 1.2em;
  transform: translate(0,5%);
}

.little_box >>> .el-form-item__label {
  font-size: 0.9em;
  font-weight: 600;
}

.little_box >>> .el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100%;
}
.little_box >>> .el-input.is-disabled .el-input__inner {
  background-color: #ffffff;
  border-color: #E4E7ED;
  color: #C0C4CC;
  cursor: not-allowed;
}

.bottom-next {
  margin-top: 70px;
}

.button-next {
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>