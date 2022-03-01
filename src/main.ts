import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/style.css'
import Vant from 'vant';
import 'vant/lib/index.css';



Vue.use(Vant);
Vue.use(ElementUI);
Vue.config.productionTip = false

router.beforeEach((to,from,next) => {
  const meta = to.meta
  if (meta && meta.title) {
    document.title = meta.title
  }
  next()
})


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 移动端的console调试工具
// const VConsole = window.VConsole
// new VConsole()
