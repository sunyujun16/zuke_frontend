import MineCenter from "@/views/mine_about/MineCenter";
import MyMessage from "@/views/mine_about/message/MyMessage";
import MyFavors from "@/views/mine_about/MyFavors";
import MyComments from "@/views/mine_about/MyComments";
import MySettings from "@/views/mine_about/MySettings";
import MyService from "@/views/mine_about/MyService";
import ReplyMe from "@/views/mine_about/message/ReplyMe";
import LikesMe from "@/views/mine_about/message/LikesMe";
import PrivateMessage from "@/views/mine_about/message/PrivateMessage";

export default {
    path: '/mine',
    name: 'mine',
    components: {
        mine_page: MineCenter
    },
    redirect:'/mine/message/reply_me',
    children: [
        {
            path: 'message',
            name: 'mine_message',
            redirect: '/mine/message/reply_me',
            components: {
                center_right: MyMessage,
            },
            children: [
                {
                    path: 'reply_me',
                    name: 'reply_me',
                    components:{
                        my_message: ReplyMe
                    }
                },
                {
                    path: 'likes_me',
                    name: 'likes_me',
                    components:{
                        my_message: LikesMe
                    }
                },
                {
                    path: 'private_message',
                    name: 'private_message',
                    components:{
                        my_message: PrivateMessage
                    }
                },

            ]
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