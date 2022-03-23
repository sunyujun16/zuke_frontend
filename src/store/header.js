const headerOptions = {
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
        }

    },
    state: {
        isActiveMain: true,
        isActiveMap: false,
        isActiveMine: false,
    },
    getters: {

    }
}

export default headerOptions;