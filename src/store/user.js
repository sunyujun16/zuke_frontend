export default {
    namespaced:true,
    strict: true,
    actions:{

    },
    mutations:{
        SET_USER(state, user){
            state.currentUser = user
        },
        SET_ONLINE(state, ifOnLine){
            console.log("修改online: ", ifOnLine)
            state.onLine = ifOnLine
        },
        SET_AVATAR_SRC(state, src){
            state.avatarSrc = src
        }

    },
    state:{
        onLine: false,
        defaultUser: {
            id: '007',
            username: '齐天大剩',
            password: '哈哈哈',
            gender: '男',
            userType: 0,
            registerTime: '明天',
            lastLoginTime: '后天',
            userStatus: '0',
            phoneNum: '110',
            email: '10086@163.com',
            blank: '',
        },
        currentUser: {
            id: '007',
            username: '齐天大剩',
            password: '哈哈哈',
            gender: '男',
            userType: 0,
            registerTime: '明天',
            lastLoginTime: '后天',
            userStatus: '0',
            phoneNum: '110',
            email: '10086@163.com',
            blank: '',
        },
        // avatarSrc: 'https://alifile.sunyujun.com/zuke/avatars/0363d297617871b822e497b08a813c61.jpg'
        avatarSrc: '',

    },
    getters:{

    }
}