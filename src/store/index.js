import Vue from 'vue'
import Vuex from 'vuex'
import VueResourse from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResourse)

const store = new Vuex.Store({
  state: {
    origins: `${window.origin}/api`
  },
  mutations: {
    postRequest (state, payload) {
      this._vm.$http.post(`${state.origins}${payload.uri}`, payload.data, { emulateJSON: true })
        .then(res => payload.callBack && payload.callBack(res), err => console.error(err))
    }
  },
  getters: {

  }
})

export default store
