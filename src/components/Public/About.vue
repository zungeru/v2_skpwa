<template>
  <div>
    <h3>About View</h3>
    <h3>Spheell About Style Kast...Blah,Blah</h3>
    <h3>Sign Up</h3>
    <h3>Log In</h3>
    <div v-for="x in 15">
      <h3>Content {{x}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = 0
  }
}
</script>

<style>

</style>
