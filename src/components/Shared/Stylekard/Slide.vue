<template>
  <div class="slide">
    <img v-bind:src="slide.src" alt="">
  </div>
</template>

<script>
export default {
  props: {
    slide: [Object]
  }
}
</script>

<style scoped>
.slide {
  display: inline-block;
  background-color: blue;
  /* width: 100%; */
}

img {
  /* max-width: 100%; */
  width: 100%;
}

</style>
