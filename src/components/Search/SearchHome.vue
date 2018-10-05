<template>
  <div class="search-main">
    <div class="search-fixed-header">
      <div class="search-header-items">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <!-- NOTE: I'm overriding the mdl active link class here -->
        <router-link tag="div" active-class="active" exact :to="{name: 'peole'}">
          <div class="search-item">
            PEOPLE
          </div>
        </router-link>
        <router-link tag="div" active-class="active" exact :to="{name: 'tags'}">
            <div class="search-item">
              TAGS
            </div>
        </router-link>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

</script>

<style>
.search-main {
  position: relative;
}
.search-fixed-header {
  position: fixed;
  top: 0px;
  background-color: #ededed;
  margin-top: 56px;
  height: 45px;
  width: 100%;
}
.search-header-items{
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  max-width: 500px;
  justify-content: space-between;
  display: flex;
}
.search-header-items div {
  cursor: pointer;
}
.active {
  font-weight: 550;
  color: #f50057;
}
</style>
