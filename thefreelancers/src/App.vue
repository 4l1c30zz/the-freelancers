<template>

  <div id="app">
  <headerComponent />
  <transition
  >
    <router-view :key="$route.fullPath"></router-view>
  </transition>
  </div>

</template>

<script>

import headerComponent from "./components/nav.vue";

export default {
  name: "App",

  metaInfo: {
    title: 'The 3 Freelancers',
    titleTemplate: '%s |  Langing'
  },
  components: {
    headerComponent,
  },
};
</script>

<style lang="scss">

</style>
