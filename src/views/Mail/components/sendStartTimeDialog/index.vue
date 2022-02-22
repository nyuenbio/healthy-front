<template>
  <div>
    <van-action-sheet v-model="show" title="期望上门时间">
      <div class="content">
        <van-tree-select
            @click-item="onSelect"
            :items="items"
            :active-id.sync="activeId"
            :main-active-index.sync="activeIndex"
        />
        <van-button @click="submit()" class="button-next" block
                    color="linear-gradient(to right,  rgba(23, 111, 243, 0.66), #2773fc)">
          确认
        </van-button>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import items from './time'
import {formatDate} from "../../../../utils/dateTime";
import {Toast} from "vant";
export default {
  name: "index",
  data() {
    return{
      items,
      activeId: 1,
      activeIndex: 0,
      time: '',
      form:{},
      show: false,
      actions: [{ name: '快递寄付',value:'1' }, { name: '快递到付',value:'2' }],
    }
  },
  created() {
    const time = new Date().getHours()
    const today = []
    let todayItems = items[0].children
    for (let todayItemsKey in todayItems) {
      if (todayItems[todayItemsKey].text === '一小时内'){
        today.push(todayItems[todayItemsKey])
      }
      if (todayItems[todayItemsKey].text.slice(0,2) > time){
        today.push(todayItems[todayItemsKey])
      }
    }
    items[0].children = today
    this.form = this.$store.state.MailForm
    this.form.sendStartTimeText = '一小时内'
  },
  methods:{
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      let time = ''
      if (this.activeIndex === 0 && this.activeId === 1) {
        // time = formatDate(new Date(),'yyyy-MM-dd hh:mm:ss')
        time = '一小时内'
      } else if (this.activeIndex === 0) {
        const hours = item.text.slice(0,2)
        time = `${formatDate(new Date(),'yyyy-M-d')} ${hours}:00:00`
      }else if (this.activeIndex === 1) {
        const hours = item.text.slice(0,2)
        const tomorrow = new Date().getTime() + 60 * 60 * 24 *1000
        time = `${formatDate(new Date(tomorrow),'yyyy-M-d')} ${hours}:00:00`
      }else if (this.activeIndex === 2) {
        const hours = item.text.slice(0,2)
        const tomorrow = new Date().getTime() + 60 * 60 * 24 * 2 *1000
        time = `${formatDate(new Date(tomorrow),'yyyy-M-d')} ${hours}:00:00`
      }
      console.log(time)
      this.time = time
    },
    submit() {
      if (this.time === '') {

      } else {
        this.form.sendStartTimeText = this.time
      }
      this.show = false
    }
  }
}
</script>

<style scoped>
.content{
  height: 400px;
}
.button-next {
  margin-top: 50px;
  border-radius: 50px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>