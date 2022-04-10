import styleFunc from '@/utils/raw_style_func.js'
import timeUtil from "@/utils/timeUtils";
import stringUtils from "@/utils/stringUtils";

const util = {
    timeUtil,
    stringUtils
}

export default {
    install: function (Vue, options) {
        Vue.prototype.$setScrollStyle = styleFunc
        Vue.prototype.$util = util

    }

}

