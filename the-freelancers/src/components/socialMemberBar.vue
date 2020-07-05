<template>
  <ul v-if="socialMedia" class="socialSideBar">
    <li v-if="socialMedia.email">
      <a :href="socialMedia.email" target="_blank">
        <font-awesome-icon icon="at" size="lg" />
      </a>
    </li>
    <li v-if="socialMedia.website">
      <a :href="socialMedia.website" target="_blank">
        <font-awesome-icon icon="globe" size="lg" />
      </a>
    </li>
    <li v-if="socialMedia.facebook">
      <a :href="socialMedia.facebook" target="_blank">
        <font-awesome-icon :icon="['fab', 'facebook-f']" size="lg" />
      </a>
    </li>
    <li v-if="socialMedia.linkedIn">
      <a :href="socialMedia.linkedIn" target="_blank">
        <font-awesome-icon :icon="['fab', 'linkedin-in']" size="lg" />
      </a>
    </li>
    <li v-if="socialMedia.instagram">
      <a :href="socialMedia.instagram" target="_blank">
        <font-awesome-icon :icon="['fab', 'instagram']" size="lg" />
      </a>
    </li>
    <li v-if="socialMedia.github">
      <a :href="socialMedia.github" target="_blank">
        <font-awesome-icon :icon="['fab', 'github']" size="lg" />
      </a>
    </li>
    <li v-if="socialMedia.telegram">
      <a :href="socialMedia.telegram" target="_blank">
        <font-awesome-icon :icon="['fab', 'telegram-plane']" size="lg" />
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
.member1 {
  .socialSideBar li {
    color: color(_pink);

    &:hover {
      color: color(_blue);
    }
  }
}
.member2 {
  .socialSideBar li {
    color: color(_cyan);

    &:hover {
      color: color(_pink);
    }
  }
}
.member3 {
  .socialSideBar li {
    color: color(_violet);

    &:hover {
      color: color(_cyan);
    }
  }
}

.socialSideBar {
  position: absolute;
  right: 0;
  top: 20%;
  background: color(_black);
  padding: 20px 10px;
  height: auto;

  > li {
    transition: all 0.3s ease;
    color: color(_pink);
    &:hover {
      transform: scale(1.2);
    }
    &:not(:last-child) {
      a {
        margin-bottom: 15px;
      }
    }

    > a {
      text-align: center;
      display: block;
    }
  }
}
</style>
