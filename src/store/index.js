import Vue from 'vue'
import Vuex from 'vuex'
import courseStore from '@store/modules/course'
import authorStore from '@store/modules/author'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ajaxCallInProgress: 0,
  },
  modules: {
    courseStore,
    authorStore,
  },
  mutations: {
    BEGIN_AJAX_CALL: state => {
      state.ajaxCallInProgress += 1
      console.log('state.ajaxCallInProgress', state.ajaxCallInProgress)
    },

    AJAX_CALL_FINISHED: state => {
      state.ajaxCallInProgress -= 1
      console.log('state.ajaxCallInProgress', state.ajaxCallInProgress)
    },
  },
})

export default store
