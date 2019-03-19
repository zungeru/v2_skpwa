<template>
<div class="no-result-main">
  <img src="../../assets/svg/error.svg">
  <h5>error page :-/</h5>

  <router-link
    tag="span"
    :to="{ name: 'home'}">home page
  </router-link>
</div>
</template>

<script>
export default {
}
</script>
