import Vue from 'vue'
import App from './App.vue'


import ElementUI from './elements/index'
Vue.use(ElementUI)

// 引入路由器
import router from '@/router/index'
// vuex
import store from '@/store/index'
// axios
import axios from "@/axios/index";
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
})
    // .$mount('#app')
