<template>
  <ul v-if="socialMedia" class="socialSideBar">
    <li v-if="socialMedia.email">
      <a :href="socialMedia.email">
        <font-awesome-icon icon="at" size="lg" />
      </a>
    </li>
    <li v-if="socialMedia.website">
      {{ socialMedia.website }}
    </li>
    <li v-if="socialMedia.facebook">
      {{ socialMedia.facebook }}
    </li>
    <li v-if="socialMedia.linkedIn">
      {{ socialMedia.linkedIn }}
    </li>
    <li v-if="socialMedia.instagram">
      {{ socialMedia.instagram }}
    </li>
    <li v-if="socialMedia.telegram">
      <a :href="socialMedia.telegram">
         <font-awesome-icon :icon="['fab','telegram']" size="lg" />
         </a>
    </li>
    <li v-if="socialMedia.github">
      <a :href="socialMedia.github">
        <font-awesome-icon :icon="['fab','github']" size="lg" />
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "socialMemberBar",

  data() {
    return {
      api_url: process.env.VUE_APP_STRAPI_API_URL
    };
  },
  props: {
    socialMedia: Object
  },
  computed: {
    socialMediaCount() {
      return Math.ceil(this.socialMedia.length);
    },
    Items() {
      return this.socialMedia.slice(0);
    }
  }
};
</script>
<style lang="scss">
@import "@/scss/_variables.scss";
@import "@/scss/_functions.scss";

.socialSideBar {
  position: absolute;
  right: 0;
  top: 50%;
  background: color(_black);
  color: color(_pink);
  padding: 20px 10px;
  a {
    text-align: center;
    display: block;
  }
}
</style>
