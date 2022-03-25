import styleFunc from '@/utils/raw_style_func.js'

export default {
    install: function (Vue, options) {
        Vue.prototype.$setScrollStyle = styleFunc
    }

}

