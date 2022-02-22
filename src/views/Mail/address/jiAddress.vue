<template>
  <div class="box">
    <div style="display: none;">
      <select name="PCAS_province"></select>
      <select name="PCAS_city"></select>
      <select name="PCAS_area"></select>
    </div>
    <div class="header">

    </div>
    <div class="content" v-if="show">
      <div class="title">
        <span>寄</span>
        <span>寄件人</span>
      </div>
      <van-address-edit save-button-text="确认"  :address-info="AddressInfo" @save="submit" :area-list="areaAction.data"/>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
let provinceIndex = 0
let cityIndex = 0
export default {
  name: "jiAddress",
  data() {
    return{
      show:false,
      AddressInfo:{
        name: '',
        tel: '',
        province: '',
        city: '',
        county: '',
        addressDetail:'',
        areaCode: "",
      },
      form:{
      },
      areaAction:{
        data:{
          province_list:{},
          city_list:{},
          county_list:{},
        }
      }
    }
  },
  async mounted() {
    // const PCASDATA = new PCAS ('PCAS_province', 'PCAS_city', 'PCAS_area')
    new PCAS ('PCAS_province', 'PCAS_city', 'PCAS_area')
    await PCAS.c.forEach((province, provinceIndex) => {
      const provinceIndexKey = (provinceIndex + 11) + '0000' // 先加10，再加4个0
      this.areaAction.data.province_list[provinceIndexKey] = province
    })
    await PCAS.P.forEach((citys, provinceIndex) => {
      const provinceIndexKey = (provinceIndex + 11) + '' // 前两位省份
      citys.forEach((city, cityIndex) => {
        const cityIndexKey = provinceIndexKey + ('0' + ++cityIndex).slice(-2) + '00' // 中间两位城市 + ‘00’
        this.areaAction.data.city_list[cityIndexKey] = city
      })
    })
    await PCAS.I.forEach((citys, provinceIndex) => {
      const provinceIndexKey = (provinceIndex + 11) + '' // 前两位省份
      citys.forEach((countys, cityIndex) => {
        const cityIndexKey = ('0' + ++cityIndex).slice(-2)// 中间两位城市
        countys.forEach((county, countyIndex) => {
          const countyIndexKey = provinceIndexKey + cityIndexKey + ('0' + ++countyIndex).slice(-2) // 后面两位区/县
          this.areaAction.data.county_list[countyIndexKey] = county
        })
        const otherIndex = ('0' + ++countys.length).slice(-2)  // 业务需求，可能找不到对应的区县，就增加一个‘其他’选项
        const otherIndexKey = provinceIndexKey + cityIndexKey + otherIndex
        this.areaAction.data.county_list[otherIndexKey] = '其他'
      })
    })
    this.show = true
    this.$nextTick(()=>{
      document.getElementsByClassName("van-field__control")[0].setAttribute("placeholder","寄货人姓名");
      document.getElementsByClassName("van-field__control")[1].setAttribute("placeholder","寄货人手机号");
    })
    this.form = this.$store.state.MailForm
    if (this.form.jAreaCode){
      const address = this.form.jAddress.split(',')
      this.AddressInfo.name = this.form.jContact
      this.AddressInfo.tel = this.form.jTel
      this.AddressInfo.areaCode = this.form.jAreaCode
      this.AddressInfo.province = address[0]
      this.AddressInfo.city = address[1]
      this.AddressInfo.county = address[2]
      this.AddressInfo.addressDetail = address[3]
    }
  },
  methods: {
    submit(content) {
      console.log(content)
      this.form.jCompany = ''
      this.form.jContact = content.name
      this.form.jTel = content.tel
      this.form.jAddress = `${content.province},${content.city},${content.county},${content.addressDetail}`
      this.form.jAreaCode = content.areaCode
      this.$router.push('/mailIndex')
    }
  }
}
</script>

<style scoped>
.box{
  padding: 10px;
}
/deep/.van-button--danger {
  color: #fff;
  background-color: #409eff;
  border: 1px solid #409eff;
}
.title{
  display: flex;
}
.title > :first-child{
  display: block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  color: #f6f6f6;
  text-align: center;
  background: black;
  border-radius: 0 5px 5px 0;
  margin-right: 5px;
}
.title > :last-child{
  display: block;
  height: 30px;
  line-height: 30px;
}
.content{
  background: #ffffff;
  padding: 20px 0;
}

</style>