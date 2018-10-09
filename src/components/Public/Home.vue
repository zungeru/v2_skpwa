<template>
  <div>
    <h2>Home View</h2>
    <p v-if="username"> {{ username }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    username () {
      return !this.$store.getters.userData ? false : this.$store.getters.userData.username
    }
  }
}
</script>

<style>

</style>
