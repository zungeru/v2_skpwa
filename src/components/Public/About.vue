<template>
  <div class="about-main">
    <!-- Note using home-subtitle and home-tile class form the home component -->
    <h5 class="home-subtitle">about</h5>
    <h3 class="home-title">styleKast</h3>
    <br>

    <p class="about-info"><span class="first-word">styleKast</span> is a crowd powered platform that allows users to track recent
    purchases of those they follow and base purchasing decisions on personally curated style feeds. </p>
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
.about-main {
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  max-width: 500px;
}
.about-info {
  margin: 10px;
  padding: 10px;
  font-size: 15px;
  text-align: justify;
}
.first-word {
  color: #137E8D;
  font-size: 20px;
}
</style>
