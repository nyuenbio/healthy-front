import Vue from 'vue'
import Vuex from 'vuex'
import MailForm from './mail'
import HpvSample from "./hpvSample";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openId:'',
    hpvInfoId:'',
    ...MailForm,
    ...HpvSample,
  },
  mutations: {
    getOpenId(state) {
      let openIdBox = ''
      openIdBox = localStorage.getItem('openId') as string
      const openId = JSON.parse(openIdBox).content
      state.openId = openId
    }
  },
  actions: {
  },
  modules: {
  }
})
