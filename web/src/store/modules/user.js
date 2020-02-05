
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
    SET_USERINFO (state, data){
        console.log(data.uid)
         state.userinfo.uid = data.uid
         state.userinfo.uname = data.uname
    },
    CHANGE_ISLOG(state){
        state.islog = !state.islog
    }
}
const actions = {
    setUserInfo({ commit }, data){
        commit('SET_USERINFO', data)
    },
    changeislog ({ commit }){
        commit('CHANGE_ISLOG')
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}