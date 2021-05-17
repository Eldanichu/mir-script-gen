import Vue from 'vue'
import Vuex from 'vuex'
import states from './index/state'
import mutations from './index/mutations'
import actions from './index/actions'
import getters from './index/getters'
import modules from './index/modules'
Vue.use(Vuex)

export default new Vuex.Store({
  state: states,
  mutations: mutations,
  modules: modules,
  actions: actions,
  getters: getters
})
