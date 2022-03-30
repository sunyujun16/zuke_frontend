import MineCenter from "@/views/mine_about/MineCenter";
import MyMessage from "@/views/mine_about/message/MyMessage";
import MyFavors from "@/views/mine_about/MyFavors";
import MyComments from "@/views/mine_about/MyComments";
import MySettings from "@/views/mine_about/MySettings";
import MyService from "@/views/mine_about/MyService";

export default {
    path: '/mine',
    name: 'mine',
    components: {
        mine_page: MineCenter
    },
    redirect:'/mine/message',
    children: [
        {
            path: 'message',
            name: 'mine_message',
            components: {
                center_right: MyMessage
            }
        },
        {
            path: 'favors',
            name: 'mine_favors',
            components: {
                center_right: MyFavors
            }
        },
        {
            path: 'comments',
            name: 'mine_comments',
            components: {
                center_right: MyComments
            }
        },
        {
            path: 'settings',
            name: 'mine_settings',
            components: {
                center_right: MySettings
            }
        },
        {
            path: 'service',
            name: 'mine_service',
            components: {
                center_right: MyService
            }
        },

    ]

}