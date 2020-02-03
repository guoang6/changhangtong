import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getter'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {
            user: '',
            sex: '',
            nickname: '',
            icon: '',
            createdTime: ''
        },
    },
    actions,
    mutations,
    getters,
    modules: {
    
    }
    
})


