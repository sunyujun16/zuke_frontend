import Vue from 'vue'
import App from './App.vue'


import elements from './elements/index'
Vue.use(elements)

// 引入路由器
import router from '@/router/index'
// vuex
import store from '@/store/index'
// axios
import axios from "@/axios/index";
Vue.prototype.$axios = axios

import utils from '@/utils/index'
Vue.use(utils)

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
