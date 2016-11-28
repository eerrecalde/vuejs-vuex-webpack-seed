<template>
  <form>
    <h1>Manage Course</h1>
    <div class="form-group">
      <label for="title">Title</label>
      <div class="field">
        <input type="text" name="title" class="form-control" v-model="course.title">
      </div>
    </div>
    <div class="form-group">
      <label for="authorId">Author</label>
      <div class="field">
        <select name="authorId" class="form-control" v-model="course.authorId">
          <option value="">Select Author</option>
          <option v-for="author in authors" :value="author.id">{{`${author.firstName} ${author.lastName}`}}</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label for="category">Category</label>
      <div class="field">
        <input type="text" name="category" class="form-control" v-model="course.category">
      </div>
    </div>
    <div class="form-group">
      <label for="length">length</label>
      <div class="field">
        <input type="text" name="length" class="form-control" v-model="course.length">
      </div>
    </div>
    <button class="btn btn-primary" value="Save" v-on:click.prevent="saveCourse">Save</button>
  </form>
</template>

<script>

import { mapGetters } from 'vuex'
import alertify from 'alertify-js'

function getCourse(courses, id) {
  return courses.filter(course => id === course.id)[0]
}

export default {
  name: 'course-form',
  computed: {
    ...mapGetters({
      authors: 'getAuthors',
    }),
    course() {
      const courses = this.$store.state.courseStore.courses
      return (courses.length && this.$route.params.id) ?
      getCourse(courses, this.$route.params.id) : {}
    },
  },
  data() {
    return {
      course: {},
    }
  },
  beforeMount() {
    this.fetchAuthors()
    this.fetchCourses()
    // console.log(this.$store.state.courseStore.courses)
    // if (this.$route.params.id) {
    //   this.fetchCourse(this.$route.params.id)
    // }
  },
  methods: {
    fetchAuthors() {
      return this.$store.dispatch('FETCH_AUTHORS')
    },
    fetchCourses() {
      return this.$store.dispatch('FETCH_COURSES')
    },
    saveCourse() {
      console.log('THIS', this.course)
      this.$store.dispatch('SAVE_COURSE', { course: this.course })
      alertify.success('Course Saved')
    },
  },
}
</script>
<style lang="scss">
  @import '../../node_modules/alertify-js/themes/alertify.core.css';
  @import '../../node_modules/alertify-js/themes/alertify.default.css';
</style>
