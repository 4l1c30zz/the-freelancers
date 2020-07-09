<template>
  <ul v-if="socialMedia" class="socialSideBar">
    <li @click="show_tooltip" class="socialMedia__email" v-if="socialMedia.email">
      <a>
        <span @click="copy_text" class="tooltip">
          {{socialMedia.email}}
        </span>
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
  methods:{
    show_tooltip: function(event){
      let targParent = event.target.closest('a');
     // let tooltip = targParent.find('span');
      var tooltip = targParent.querySelector('span');
     tooltip.classList.toggle("a");
    },
    copy_text: function(event) {
        console.log("text copy called");
         let targ = event.target;
               console.log(event.target);

        let textToCopyVal = targ.innerHTML;
          let el = document.createElement('textarea');
          el.value = textToCopyVal;
          el.setAttribute('readonly', '');
          el.style.position = 'absolute';
          el.style.left = '-300vw';
          document.body.appendChild(el);
          el.select();
          document.execCommand('copy');
          document.body.removeChild(el);
          let message = document.createElement('div');
          message.classList.add("message");
          message.innerHTML = "text coppied to clipboard!";
          document.body.appendChild(message);
              setTimeout(function() {
                message.remove();
              }, 3000);
          //messageElem = document.querySelector(".message");

    }
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
.message{
  position: fixed;
  top:50%;
  background: color(_black);
  color: color(_green);
  padding: 10px;
  right: 10%;
  font-size: 50px;
}
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
    position: relative;
    .tooltip{
      display: block;
      background: color(_black);
      position: absolute;
      right: 35px;
      padding: 0;
      top: -5px;
      transition: all ease 0.3s;
      height: 0;
      overflow: hidden;
      &.a{
        height: auto;
        padding: 5px;
      }
    }
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
