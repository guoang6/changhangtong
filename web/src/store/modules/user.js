const state = {
    islog: true,
    userinfo: {
        uid: '',
        uname: 'guoang',
        nickname: '',
        icon: ''
    },
}
const getters = {

}
const mutations = {
    SET_USERINFO(state, data) {
        state.userinfo.uid = data.uid
        state.userinfo.uname = data.uname
    },
    CHANGE_ISLOG(state) {
        state.islog = !state.islog
    },
    SET_TOKEN(state, data) {
        state.token = data
        window.sessionStorage.setItem('luffy_jwt_token', state.token);
    },
}
const actions = {
    setUserInfo({ commit }, data) {
        commit('SET_USERINFO', data)
    },
    changeislog({ commit }) {
        commit('CHANGE_ISLOG')
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