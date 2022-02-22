<template>
  <div>
    <van-action-sheet cancel-text="取消"  description="请选择快递付款方式" v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return{
      form:{},
      show: false,
      actions: [{ name: '快递寄付',value:'1' }, { name: '快递到付',value:'2' }],
    }
  },
  created() {
    this.form = this.$store.state.MailForm
  },
  methods:{
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      console.log(item)
      this.form.payMethod = item.value
      this.form.payMethodText = item.name
      this.show = false
    },
  }
}
</script>

<style scoped>

</style>