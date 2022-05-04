export default {
    namespaced:true,
    strict: true,
    actions:{

    },
    mutations:{
        ON_COM_SHOW(state){
            state.comListShow = true
        },
        ON_COM_HIDE(state){
            state.comListShow = false
        },
        CHANGE_SEARCH_VALUE(state, searchValue){
            console.log("修改searchValue为: ", searchValue)
            state.currentSearchValue = searchValue
        }
    },
    state:{
        comListShow: true,
        currentLngLat: [116.397428, 39.90933],
        currentSearchValue: '',

    },
    getters:{

    }
}