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
        }

    },
    state:{
        onLine: false,
        defaultUser: {
            id: '007',
            username: '齐天大剩',
            password: '哈哈哈',
            gender: '男',
            userType: '0',
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
            userType: '0',
            registerTime: '明天',
            lastLoginTime: '后天',
            userStatus: '0',
            phoneNum: '110',
            email: '10086@163.com',
            blank: '',
        },
        avatarDTO: {
            userId: '',
            avatarData: '',
            fileName: ''
        }

    },
    getters:{

    }
}