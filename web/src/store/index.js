import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)



const state = {
  commentnum: '',
  contentid: '',
  unread:0
}
const getters = {}
const mutations = {
  SET_CONTENTID(state, id) {
    state.contentid = id
  },
  SET_COMMENTNUM(state, num) {
    state.commentnum = num
  },
}
const actions = {
  setcontentid({ commit }, data) {
    commit('SET_CONTENTID', data)
  },
  setcommentnum({ commit }, data) {
    commit('SET_COMMENTNUM', data)
  },
}
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    user
  }

})


