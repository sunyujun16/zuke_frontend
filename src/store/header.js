export default {
    namespaced:true,
    actions: {

    },
    mutations: {
        SET_MAIN(state, bool){
            state.isActiveMain = bool
        },
        SET_MAP(state, bool){
            state.isActiveMap = bool
        },
        SET_MINE(state, bool){
            state.isActiveMine = bool
        },
        SET_OTHERS(state){
            // let index = 0;
            // for (let stateKey in state) {
            //     if (state.hasOwnProperty(stateKey)) stateKey = false;
            // }
            state.isActiveMain = false
            state.isActiveMap = false
            state.isActiveMine = false
        }

    },
    state: {
        activeTabName: '',
        isActiveMain: true,
        isActiveMap: false,
        isActiveMine: false,
    },
    getters: {

    }
}
