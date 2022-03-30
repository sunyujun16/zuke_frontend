export default {
    namespaced: true,
    actions: {

    },
    mutations: {
        SET_ACTIVE_TAG_NAME(state, tagName){
            state.activeTagName = tagName
        }
    },
    state: {
        hrefValue: 'localhost://8080',
        activeTagName: 'message',
        communityObj: {
            id: '',
            name: '',
            // ...
        }
    },
    getters: {

    }


}