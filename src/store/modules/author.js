import authorApi from '@api/mockAuthorApi'

export default {
  state: {
    authors: [],
  },

  actions: {

    FETCH_AUTHORS: ({ commit }) => {
      commit('BEGIN_AJAX_CALL')

      return authorApi.getAllAuthors().then(authors => {
        commit('SET_AUTHORS', { authors })
        commit('AJAX_CALL_FINISHED')
      }).catch(error => {
        throw error
      })
    },
  },

  mutations: {
    SET_AUTHORS: (state, { authors }) => {
      state.authors = authors
    },
  },

  getters: {
    getAuthors: state => state.authors,
  },
}
