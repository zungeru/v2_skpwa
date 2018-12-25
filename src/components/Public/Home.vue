<template>
  <div>
    <h2>Home View</h2>
    <h5 v-if="username">Current User: {{ username }}</h5>
    <div v-for="x in 15">
      <h3>Content {{x}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      homeScrollPos: 0
    }
  },
  computed: {
    username () {
      return !this.$store.getters.userData ? false : this.$store.getters.userData.username
    }
  },
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = this.homeScrollPos
  },
  beforeRouteLeave (to, from, next) {
    this.homeScrollPos = document.querySelector('.mdl-layout__content').scrollTop
    next()
  }
}
</script>

<style>

</style>
