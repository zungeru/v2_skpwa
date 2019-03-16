<template>
  <div class="sk-auto-side-margin" style="margin-top: 50px;">
    <h5 class="sk-intro-subtitle">about</h5>
    <h3 class="sk-intro-title">styleKast</h3>
    <br>

    <p class="sk-intro-info"><span class="sk-intro-first-word">styleKast</span> is a crowd powered platform that allows users to track recent
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
