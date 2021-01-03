import Vue from 'vue'
import Vuex from 'vuex'
import Users from './modules/Users'
import Documents from './modules/Documents'
import Events from './modules/Events'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toast: null,
  },
  getters: {
    getToast: state => state.toast
  },
  mutations: {
    setToast: (state, payload) => {
      state.toast = null
      state.toast = payload
    }
  },
  actions: {
  },
  modules: {
    Users,
    Documents,
    Events
  }
})
