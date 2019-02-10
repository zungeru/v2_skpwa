<template>
<div class="deleted-main">
  <h4>sorry to see you go</h4>
  <h4>:-(</h4>
  <br/>
  <router-link
    tag="span"
    :to="{ name: 'home'}"> Home Page
  </router-link>
</div>
</template>

<script>
export default {
}
</script>

<style>
.deleted-main {
  margin-top: 120px;
  text-align: center;
}
.deleted-main h4 {
  color: #137E8D
}

.deleted-main span {
  color: #ff0800;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
}
</style>
