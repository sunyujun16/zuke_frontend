import ta from "element-ui/src/locale/lang/ta";

export default {
    namespaced: true,
    actions: {

    },
    mutations: {
        SET_ACTIVE_TAG_NAME(state, tagName){
            state.activeTagName = tagName
        },
        SET_ACTIVE_COMMENT_TAG_NAME(state, tagName){
            state.activeCommentTagName = tagName
        },
        SET_LAST_REPLY_VM(state, vm){
            state.lastReplyVm = vm
        }
    },
    state: {
        hrefValue: 'localhost://8080',
        activeTagName: 'message',
        activeCommentTagName: 'rate',
        communityObj: {
            id: '',
            name: '五常大道127号小区',
            rate: {
                quality: {
                    smellProof: 4.0,
                    soundProof: 3.0,
                    warmKeeping: 2.0,
                    waterProof: 5.0,
                    wetProof: 1.0
                },
                inside: {
                    elevator: false,
                    fiber: '',
                    gas: true,
                    groundHeat: false,
                    kindergarten: undefined,
                    parkingLot: true,
                    regularHeat: 'true',
                    workoutFacility: false,
                }
            },

            // comments: {} 这个应该做单独的查询，而不是放在pojo里面，独立的一张小区和评论的id映射表
            // ...
        },
        lastReplyVm: null,
    },
    getters: {

    }


}