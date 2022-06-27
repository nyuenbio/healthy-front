<template>
  <div>
    <van-action-sheet   cancel-text="取消"  description="请选择快件产品类别" v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return{
      form:{},
      show: false,
      actions: [{ name: '京东特惠送',value:'1' }],
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
      this.form.expressType = item.value
      this.form.expressTypeText = item.name
      this.show = false
    },
  }
}
</script>

<style scoped>

</style>