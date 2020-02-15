const state = {
    islog: true,
    islogin: true,
    isclose: false,
    userinfo: JSON.parse(localStorage.getItem("userinfo")) || {},//先去localStorage中获取数据
}
const getters = {

}
const mutations = {
    SET_USERINFO(state, userinfo) {
        console.log(userinfo)
        state.userinfo = userinfo,
            localStorage.setItem('userinfo', JSON.stringify(userinfo))
    },
    CHANGE_ISLOG(state) {
        state.islog = !state.islog
    },
    DELETE_USERINFO(state) {
        state.userinfo ={}
    },
    SET_TOKEN(state, data) {
        state.token = data
        window.localStorage.setItem('luffy_jwt_token', state.token);
    },
    JOIN() {
        state.islogin = !state.islogin;
    },
    CLOSE() {
        state.isclose = !state.isclose;
    },
}
const actions = {
    setUserInfo({ commit }, data) {
        commit('SET_USERINFO', data)
    },
    changeislog({ commit }) {
        commit('CHANGE_ISLOG')
    },
    join({ commit }) {
        commit('JOIN')
    },
    close({ commit }) {
        commit('CLOSE')
    },
    deleteuserinfo({ commit }) {
        commit('DELETE_USERINFO')
    },
    setToken({ commit }, data) {
        commit('SET_TOKEN', data)
    }
    
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}