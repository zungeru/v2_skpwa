<template>
<div class="error-main">
  <img src="../../assets/svg/error.svg">
  <h5>error</h5>

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

<style>
.error-main {
  margin-top: 120px;
  text-align: center;
}
.error-main h5 {
  color: #A9A9A9;
  font-size: 24px;

}
.error-main span {
  color: #ff0800;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
}
</style>
