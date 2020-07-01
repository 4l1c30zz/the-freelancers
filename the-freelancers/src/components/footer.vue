<template>
  <footer id="site-footer">

    <router-link to="/">
      <logo />
    </router-link>

  </footer>
</template>


<script>
import logo from "@/components/logo";

export default {
  name: "footerComponent",
  components: {
    logo
  }
};
</script>

<style lang="scss">
@import "@/scss/_variables.scss";
@import "@/scss/_functions.scss";
@import "@/scss/_globals.scss";

#site-footer {
  background: color(_black);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  max-width: 100%;
  padding: 40px;
clip-path: polygon(0 16%, 100% 0%, 100% 100%, 0 100%);
  .logo {
    max-width: 20vh;
  }
}

</style>