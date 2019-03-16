<template>
  <div class="sk-position">
    <div class="sk-fixed-header" v-if="!isLoading">
      <div class="sk-fixed-header-item-flex-2">
        <!-- NOTE: I'm overriding the mdl active link class here -->
        <router-link tag="div" active-class="sk-search-active" exact :to="{name: 'people'}">
          <div> people </div>
        </router-link>
        <router-link tag="div" active-class="sk-search-active" exact :to="{name: 'tags'}">
          <div> tags &nbsp;&nbsp;&nbsp;</div>
        </router-link>
      </div>
    </div>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  computed: {
    isLoading () {
      return this.$store.getters.loading
    }
  }
}
</script>
