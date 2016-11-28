<template lang="html">
  <span :is-active="loading" class="dots-element">{{dataDots}}</span>
</template>

<script>
let timer
export default {
  computed: {
    loading() {
      const load = this.$store.state.ajaxCallInProgress
      if (load > 0 && !timer) {
        this.setTimer()
      } else {
        this.stopTimer()
      }
      return load
    },
  },
  data() {
    return {
      dataDots: '',
    }
  },
  methods: {
    setTimer() {
      timer = global.setInterval(() => {
        this.dataDots += '.'
      }, 100)
    },
    stopTimer() {
      this.dataDots = ''
      global.clearInterval(timer)
      timer = null
    },
  },
}
</script>

<style lang="scss">

</style>
