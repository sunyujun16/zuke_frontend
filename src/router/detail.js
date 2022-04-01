import Details from "@/views/details/Details";
import WelcomePage from "@/views/WelcomePage";
import details from "@/store/details";
import Rates from "@/views/details/Rates";
import Comments from "@/views/details/Comments";

export default {
    path: '/detail',
    name: 'detail',
    meta: {
        title: "小区详情-" + details.state.communityObj.name,
        // content: 'disable'
    },
    components: {
        // WelcomePage,
        detail: Details,
    },
    redirect: '/detail/rate',
    children: [
        {
            path: 'rate',
            name: 'rate',
            // meta: {title: "小区详情-" + details.state.communityObj.name},
            components: {
                communityDetail: Rates,
            }
        },
        {
            path: 'comment',
            name: 'comment',
            // meta: {title: "小区详情-" + details.state.communityObj.name},
            components: {
                communityDetail: Comments,
            }
        }
    ]
}