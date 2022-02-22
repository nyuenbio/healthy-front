declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*' // 解决ts中引入模块，地址爆红的问题