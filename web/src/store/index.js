import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)



const state = {
  commentnum: '',
  contentid: '',
  contentname:'',
}
const getters = {}
const mutations = {
  SET_CONTENTID(state, id) {
    state.contentid = id
  },
  SET_COMMENTNUM(state, num) {
    state.commentnum = num
  },
  SET_CONTENTNAME(state, contentname) {
    state.contentname = contentname
  },

}
const actions = {
  setcontentid({ commit }, data) {
    commit('SET_CONTENTID', data)
  },
  setcommentnum({ commit }, data) {
    commit('SET_COMMENTNUM', data)
  },
  setcontentname({ commit }, data) {
    commit('SET_CONTENTNAME', data)
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


