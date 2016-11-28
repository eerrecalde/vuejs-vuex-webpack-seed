<template lang="html">
  <tr class="row">
    <td><a class="row__link" :href="course.watchHref" target="_blank">Watch</a></td>
    <td><router-link :to="`/course/${course.id}`" class="c-link">{{course.title}}</router-link></td>
    <td>{{course.authorId}}</td>
    <td>{{course.category}}</td>
    <td>{{course.length}}</td>
  </tr>
</template>

<script>
  export default {
    props: ['course'],
  }
</script>

<style lang="css">
</style>
