import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import WelcomePage from "@/views/WelcomePage";
import map_list from "@/router/map_list";
import mine_about from "@/router/mine_about";
import detail from "@/router/detail";

export default new VueRouter({
    routes:[
        {
            path:'/',
            name:'main',
            components:{
                WelcomePage, // 注意这里的简写方式，前提：<router-view name='WelcomePage'>
            }
        },
        map_list,
        mine_about,
        detail,


    ]

})


