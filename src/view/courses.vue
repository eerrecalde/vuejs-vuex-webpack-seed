<template lang="html">
  <div>
    <h1>Courses</h1>
    <router-link to="/course" class="c-link">Create New Course</router-link>
    <table class="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Length</th>
        </tr>
      </thead>
      <tbody>
        <Course v-for="course in courses" :course="course"></Course>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Course from '@view/course'

export default {
  name: 'courses',
  computed: mapGetters({
    courses: 'getCourses',
  }),
  components: {
    Course,
  },
  beforeMount() {
    this.fetchCourses()
  },
  methods: {
    fetchCourses() {
      return this.$store.dispatch('FETCH_COURSES')
    },
  },
}
</script>
<style lang="scss">
  .row__link,
  .c-link {
    color: #42b983;
    text-decoration: none;
  }

</style>
