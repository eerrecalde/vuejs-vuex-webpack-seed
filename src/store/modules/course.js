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
      console.log('000', course)
      return commit('SET_COURSE', { course })
    },

  },

  mutations: {
    SET_COURSES: (state, { courses }) => {
      state.courses = courses
      // console.log(state)
    },

    SET_COURSE: (state, { course }) => {
      const courses2 = state.courses.map(c => {
        let tmp = c
        if (c.id === course.id) {
          tmp = course
          console.log('FOUND', c)
        }
        return tmp
      })
      console.log('CC', courses2, course)
      // state.courses = courses
      // console.log(state)
    },
  },

  getters: {
    getCourses: state => state.courses,
  },
}
