<template>
  <div>
    <van-action-sheet v-model="show" title="顺丰物流-电子运单契约条款">
      <div class="content">电子运单协议</div>
    </van-action-sheet>
  </div>

</template>

<script>
export default {
  name: "index",
  data() {
    return{
      show:false
    }
  }
}
</script>

<style scoped>
.content{
  height: 300px;
}

</style>