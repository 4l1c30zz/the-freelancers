<template>
  <div id="app">
    <router-view />
    <footerComponent />
  </div>
</template>
<script>
import footerComponent from "@/components/footer.vue";
export default {
  name: "App",

  components: {
    footerComponent
  }
};
</script>
<style lang="scss">
@import "@/scss/_variables.scss";
@import "@/scss/_functions.scss";
</style>
