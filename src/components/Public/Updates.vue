<template>
<div class="updates-main">
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

<style>
.updates-main {
  margin-top: 120px;
  text-align: center;
}
.updates-main h4 {
  color: #137E8D
}

.updates-main span {
  color: #ff0800;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
}
</style>
