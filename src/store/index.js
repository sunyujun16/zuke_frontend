import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import headerStore from "@/store/header";
import constsStore from '@/store/consts';
import detailsStore from "@/store/details";
import mapStore from "@/store/map";
import userStore from "@/store/user"


export default new Vuex.Store(
    {
        modules: {
            headerStore,
            constsStore,
            detailsStore,
            mapStore,
            userStore
        }
    }
)

