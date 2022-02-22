<template>
  <div class="box">
    <div style="display: none;">
      <select name="PCAS_province"></select>
      <select name="PCAS_city"></select>
      <select name="PCAS_area"></select>
    </div>
    <div class="header">

    </div>
    <div class="content">
      <div class="title">
        <span>收</span>
        <span>收件人</span>
      </div>
      <div>
        <van-cell-group>
          <van-field v-model="AddressInfo.name" label="收件人" placeholder="收货人名称" readonly/>
          <van-field v-model="AddressInfo.tel" label="电话" placeholder="收货人电话" readonly/>
          <van-field v-model="AddressInfo.areaCode" label="地区" placeholder="收货人地区" readonly/>
          <van-field v-model="AddressInfo.addressDetail" label="详细地址" placeholder="收货人详细地址" readonly/>
          <van-field v-model="AddressInfo.dCompany" label="公司名称" placeholder="收货公司名称" readonly/>
        </van-cell-group>
      </div>
      <div>
        <div class="select_title">
          可选择地址
        </div>
        <div class="select_box">
          <div class="select_address">
            <div>
              <span style="margin-right: 10px;font-size: 1em;font-weight: 600;">HPV收样组</span>
              <span>021-33752320</span>
            </div>
            <div>
              <span>上海恩元医学检验实验室</span>
            </div>
            <div>
              <span>上海市闵行区,陈行公路2168号10B幢106室</span>
            </div>
          </div>
          <div class="confirm">
            <span @click="use">使用</span>
          </div>
        </div>

      </div>
      <van-button @click="submit(AddressInfo)" class="button-next" block
                  color="linear-gradient(to right,  rgba(23, 111, 243, 0.66), #2773fc)">
        确认
      </van-button>
      <!--      <van-address-edit :address-info="AddressInfo" @save="submit" :area-list="areaAction.data"/>-->
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant';

export default {
  name: "daoAddress",
  data() {
    return {
      show: false,
      AddressInfo: {
        name: '',
        tel: '',
        province: '',
        city: '',
        county: '',
        addressDetail: '',
        areaCode: "",
        dCompany: ''
      },
      form: {},
      areaAction: {
        data: {
          province_list: {},
          city_list: {},
          county_list: {},
        }
      }
    }
  },
  async mounted() {
    this.form = this.$store.state.MailForm
    if (this.form.dContact){
      const address = this.form.dAddress.split(',')
      this.AddressInfo = {
        name: this.form.dContact,
        tel: this.form.dTel,
        areaCode:address[0],
        addressDetail: address[1],
        dCompany: this.form.dCompany
      }
    }
    this.use()
  },
  methods: {
    use() {
      this.AddressInfo = {
        name: 'HPV收样组',
        tel: '021-33752320',
        province: '',
        city: '',
        county: '',
        areaCode:'上海市闵行区',
        addressDetail: '陈行公路2168号10B幢106室',
        dCompany: '上海恩元医学检验实验室'
      }
    },
    submit(content) {
      // console.log('content',content)
      if (content.name === '' || content.dContact ==='' || content.dTel ==='' || content.dAddress === '') {
        return Toast.fail('请先选择地址')
      }
      this.form.dCompany = content.dCompany
      this.form.dContact = content.name
      this.form.dTel = content.tel
      this.form.dAddress = `${content.areaCode},${content.addressDetail}`
      this.$router.push('/mailIndex')
    }
  }
}
</script>

<style scoped>
.box {
  padding: 10px;
}

/deep/ .van-button--danger {
  color: #fff;
  background-color: #409eff;
  border: 1px solid #409eff;
}

.title {
  display: flex;
}

.title > :first-child {
  display: block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  color: #f6f6f6;
  text-align: center;
  background: #ca3b47;
  border-radius: 0 5px 5px 0;
  margin-right: 5px;
}

.title > :last-child {
  display: block;
  height: 30px;
  line-height: 30px;
}

.content {
  background: #ffffff;
  padding: 20px 0;
}

.select_title {
  padding-left: 10px;
  margin-top: 50px;
  margin-bottom: 10px;
}

.select_box {
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  padding: 10px;
  font-size: 0.9em;
  color: #666666;
  border-radius: 10px;
  box-sizing: border-box;
}

.select_address {
  font-size: 0.8em;
  margin-bottom: 5px;
}

.select_address > div:first-child {
  margin-bottom: 10px;
}

.confirm {
  width: 50px;
  text-align: center;
  padding-top: 1em;
  box-sizing: border-box;
}

.confirm > span {
  display: inline-block;
  border: 1px solid #409eff;
  padding: 2px 5px;
  border-radius: 7px;
  color: #409eff;
}

.button-next {
  margin-top: 50px;
  border-radius: 50px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>