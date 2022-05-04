import fa from "element-ui/src/locale/lang/fa";

export default {
    namespaced: true,
    actions: {},
    mutations: {
        SET_MAIN(state, bool) {
            state.isActiveMain = bool
        },
        SET_MAP(state, bool) {
            state.isActiveMap = bool
        },
        SET_MINE(state, bool) {
            state.isActiveMine = bool
        },
        SET_OTHERS(state) {
            // let index = 0;
            // for (let stateKey in state) {
            //     if (state.hasOwnProperty(stateKey)) stateKey = false;
            // }
            state.isActiveMain = false
            state.isActiveMap = false
            state.isActiveMine = false
        },
        OPEN_LOG_REG(state) {
            state.loginRegOpen = true
        },
        CLOSE_LOG_REG(state) {
            state.loginRegOpen = false
        }

    },
    state: {
        activeTabName: '',
        isActiveMain: true,
        isActiveMap: false,
        isActiveMine: false,
        loginRegOpen: false
    },
    getters: {}
}
