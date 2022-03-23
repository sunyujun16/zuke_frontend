import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import headerOptions from "@/store/header";
import consts from '@/store/consts'


export default new Vuex.Store(
    {
        modules: {
            headerOptions,
            consts,
        }
    }
)

