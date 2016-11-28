import courseApi from '@api/mockCourseApi'

export default {
  state: {
    courses: [],
  },

  actions: {

    FETCH_COURSES: ({ commit, state }) => {
      if (state.courses.length) {
        return false
      }

      commit('BEGIN_AJAX_CALL')

      return courseApi.getAllCourses().then(courses => {
        commit('SET_COURSES', { courses })
        commit('AJAX_CALL_FINISHED')
      }).catch(error => {
        throw error
      })
    },

    SAVE_COURSE: ({ commit, state }, { course }) => {
      return commit('SET_COURSE', { course })
    },

  },

  mutations: {
    SET_COURSES: (state, { courses }) => {
      state.courses = courses
    },

    SET_COURSE: (state, { course }) => {
      const courses2 = state.courses.map(c => {
        let tmp = c
        if (c.id === course.id) {
          tmp = course
        }
        return tmp
      })
    },
  },

  getters: {
    getCourses: state => state.courses,
  },
}
