import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import headerOptions from "@/store/header";


export default new Vuex.Store(
    {
        modules: {
            headerOptions,
        }
    }
)

