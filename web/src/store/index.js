import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)



const state = {
}
const getters = {
//
}
const mutations = {
  //
}
const actions = {
//  
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


