<template>
<div class="no-result-main">
  <h4>update sucessful</h4>

  <router-link
    tag="span"
    :to="{ name: 'userprofile', params: { username: $store.getters.userData.username }}"> view profile
  </router-link>
</div>
</template>

<script>
export default {
}
</script>
