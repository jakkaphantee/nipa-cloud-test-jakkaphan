import Vue from 'vue'
import Vuex from 'vuex'

import objectDetection from './objectDetection'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    objectDetection
  }
})
