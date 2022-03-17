import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);


import WelcomePage from "@/views/WelcomePage";

export default new VueRouter({
    routes:[
        {
            path:'/',
            name:'main',
            components:{
                WelcomePage // 注意这里是缩写方式，<router-view> 的name和组件名必须一致。
            }
        },
        {
            path: '/welcome',
            name: 'welcome',
            components:{
                WelcomePage
            }
        }
    ]

})


