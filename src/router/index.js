import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import WelcomePage from "@/views/WelcomePage";
import map_list from "@/router/map_list";
import mine_about from "@/router/mine_about";
import detail from "@/router/detail";

let router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'main',
            components: {
                WelcomePage, // 注意这里的简写方式，前提：<router-view name='WelcomePage'>
            }
        },
        map_list,
        mine_about,
        detail,

    ]
})

router.beforeEach((to, from, next) => {
    // 先设定title默认值 —— 看看最终路径有木有，没有就先把它设置为默认，
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = '租客点评'
    }

    // 在2.0版本之后，route需要这样获取，而不是直接用to，才能继承到父类的属性。
    // 两种方式的区别是：to只代表最终地路径，而route会逐个遍历父路径。

    // 再看看父类有没有title，有就设置父类值，没有就啥也不用干，因为上面已经设为默认了。
    to.matched.some(route => {
        // alert("路由切换中。。。" + route.name)
            if (route.meta.title) {
                // alert('有title')
                document.title = route.meta.title
            }
        }
    )

    // 解决二级路由无法滚动，无效
    // let elBody = document.getElementsByTagName('body')[0];
    // elBody.style.overflow = 'scroll'


    next();
})

export default router


