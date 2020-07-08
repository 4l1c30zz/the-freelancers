<template>
  <div class="home">
    <div class="hero">
      <logo />
      <a href="#about">
        <svg
          class="hero__scroll"
          width="243"
          height="98"
          viewBox="0 0 243 98"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M206.547 7.30929L202.76 8.25612V12.16V31.0001C200.442 30.7596 197.986 30.644 195.4 30.644C190.74 30.644 186.585 30.99 183.013 31.7547C179.329 30.9977 175.203 30.644 170.68 30.644C166.02 30.644 161.865 30.99 158.293 31.7547C154.609 30.9977 150.483 30.644 145.96 30.644C140.775 30.644 136.215 31.0724 132.387 32.0293L128.6 32.9761V36.88V43.3601C126.282 43.1196 123.826 43.004 121.24 43.004C118.623 43.004 116.165 43.1132 113.88 43.3443V36.88V32.9199L110.025 32.0129C106.051 31.0779 101.53 30.644 96.52 30.644C91.8598 30.644 87.7048 30.99 84.1326 31.7547C80.4489 30.9977 76.3235 30.644 71.8 30.644C67.1398 30.644 62.9848 30.99 59.4126 31.7547C55.7289 30.9977 51.6035 30.644 47.08 30.644C44.4627 30.644 42.0048 30.7532 39.72 30.9843L39.72 12.16V8.19993L35.8652 7.29292C31.8912 6.35788 27.3697 5.92402 22.36 5.92402C17.1747 5.92402 12.6149 6.35242 8.78733 7.3093L5 8.25613V12.16L5 49.24L5 53.1439L8.78733 54.0907C12.6148 55.0476 17.1747 55.476 22.36 55.476C24.9462 55.476 27.4022 55.3604 29.72 55.1199V61.6V65.5039L33.5073 66.4507C37.3348 67.4076 41.8947 67.836 47.08 67.836C51.6035 67.836 55.7289 67.4823 59.4126 66.7253C62.9848 67.49 67.1398 67.836 71.8 67.836C76.3235 67.836 80.4489 67.4823 84.1326 66.7253C87.7048 67.49 91.8598 67.836 96.52 67.836C99.1062 67.836 101.562 67.7204 103.88 67.4799V86.32V90.2239L107.667 91.1707C111.495 92.1276 116.055 92.556 121.24 92.556C126.25 92.556 130.771 92.1221 134.745 91.1871L138.6 90.2801V86.32V67.4957C140.885 67.7269 143.343 67.836 145.96 67.836C150.483 67.836 154.609 67.4823 158.293 66.7253C161.865 67.49 166.02 67.836 170.68 67.836C175.203 67.836 179.329 67.4823 183.013 66.7253C186.585 67.49 190.74 67.836 195.4 67.836C200.41 67.836 204.931 67.4021 208.905 66.4671L212.76 65.5601V61.6V55.1357C215.045 55.3669 217.503 55.476 220.12 55.476C225.13 55.476 229.651 55.0421 233.625 54.1071L237.48 53.2001V49.24V12.16V8.19993L233.625 7.29292C229.651 6.35787 225.13 5.92401 220.12 5.92401C214.935 5.92401 210.375 6.35241 206.547 7.30929Z"
            fill="#AFFC41"
            stroke="#273B3B"
            stroke-width="10"
          />
        </svg>
      </a>
    </div>
    <div id="about" class="about pixel block">
      <vue-markdown-it
        v-if="page.heroText"
        :source="page.heroText"
        class="inner"
      />
    </div>
    <div class="col-1 block members">
      <div
        v-for="member in page.members"
        :key="member.id"
        :class="'member' + member.id + ' member block'"
      >
        <socialMemberBar :socialMedia="member.socialMedia" />
        <div class="inner">
          <div class="col">
            <div class="member__number green">{{ member.id }}</div>
            <div class="details_wrap">
              <h2 class="pixel green outline">
                {{ member.Name }}
              </h2>
              <span
                class="member__position"
                v-if="member.positionZone"
                :inner-html.prop="member.positionZone | positionFetch"
              >
              </span>
            </div>
          </div>
          <div class="col">
            <vue-markdown-it
              v-if="member.About"
              :source="member.About | excerpt"
              class="member__about"
            />
            <router-link
              :to="{ path: '/member/' + member.id }"
              class="member__link  pixel mark_block_wrap"
            >
              <span class="word">
                more
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import VueMarkdownIt from "vue-markdown-it";
import logo from "@/components/logo";
import socialMemberBar from "@/components/socialMemberBar";

export default {
  name: "Home",
  metaInfo: {
    title: "theFreelancers",
    titleTemplate: "%s | Collective Portfolio"
  },
  data() {
    return {
      page: {
        member: {
          name: null,
          socialMedia: {
            email: null
          }
        }
      },

      api_url: process.env.VUE_APP_STRAPI_API_URL,
      routeParam: this.$route.params.id
    };
  },
  components: {
    VueMarkdownIt,
    logo,
    socialMemberBar
  },
  apollo: {
    page: {
      query: gql`
        query Pages($id: ID = 1) {
          page(id: $id) {
            id
            title
            heroText
            members {
              id
              Name
              About
              positionZone {
                __typename
                ... on ComponentMemberPosition {
                  position_row
                }
              }
              socialMedia {
                email
                website
                facebook
                telegram
                facebook
                linkedIn
                instagram
                github
              }
            }
          }
        }
      `,
      variables() {
        return {
          id: this.routeParam
        };
      }
    }
  },
  filters: {
    positionFetch: function(value) {
      let positionRowsArr = value;
      //console.log(positionRowsArr);
      let positionRowsArrValues = positionRowsArr.values();
      let posCont = [];
      for (var positionRowsArrValuesExtracted of positionRowsArrValues) {
        let positionRowObj = Object.values(positionRowsArrValuesExtracted);
        const rightRows = positionRowObj[1];
        posCont.push(rightRows);
        var posContfiltered = posCont.filter(function(el) {
          return el;
        });
        var positionsHtml =
          "<div class='position__inner'>" +
          posContfiltered
            .map(function(posContfilter) {
              return "<span class='pixel'>" + posContfilter + "</span>";
            })
            .join("") +
          "</div>";
      }
      return positionsHtml;
    },
    excerpt: function(value) {
      let aboutTxt = value;
      if (aboutTxt.length > 400) {
        aboutTxt = aboutTxt.substring(0, 400);
      }
      let aboutTxtSlice = aboutTxt + "...";
      return aboutTxtSlice;
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/_variables.scss";
@import "@/scss/_functions.scss";
@import "@/scss/_globals.scss";

.hero {
  background: url("../assets/hero_bck.png"), color(_black);
  background-position: center;
  background-size: 62%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  margin: 0;
  padding: 0;
  height: 80vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  padding: 10vh 0;

  a {
    display: block;
    margin: 0 auto;
    flex-basis: 100%;
    position: absolute;
    bottom: 5vh;
  }

  .logo {
    width: 50%;
    max-width: 35vw;
    flex-basis: 100%;
  }
}

.about {
  background: color(_black);
  color: color(_cyan);
  padding: 5vh 20vw 11vh;
  font-size: font_size_desktop(small_medium_pixel_size);
  border-top: 5px solid color(_pink);
  text-align: center;
  clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 89%);
}

.members {
  > div {
    &.member1 {
      background: url("../assets/member1.png") color(_pink);
      background-repeat: no-repeat;
      background-size: 26%;
      background-position: 5vw 5vh;
      clip-path: polygon(0 0, 100% 10%, 100% 93%, 0 100%);
      margin: -8vh 0 0 0;
      background-repeat: no-repeat;

      .inner {
        padding: 15vh 0 16vh;
      }
    }

    &.member2 {
      background: url("../assets/member2.png") color(_cyan);
      background-repeat: no-repeat;
      background-size: 25%;
      background-position: 60vw center;
      clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 84%);
      margin: -12vh 0 0 0;

      .socialSideBar {
        right: auto;
        left: 0;
      }

      .member__number {
        order: 2;
        margin-right: 0;
        margin-left: 20px;
      }

      .details_wrap {
        order: 1;
        text-align: right;
      }

      .inner {
        padding: 20vh 0 20vh;

        > div {
          &:nth-child(2) {
            order: 1;
            justify-content: flex-start;

            .member__link {
              &:after {
                content: ">";
                margin-left: 15px;
              }

              &:before {
                content: "";
                margin-right: 0px;
              }
            }
          }

          &:nth-child(1) {
            order: 2;
            margin-right: 0;
            margin-left: 40px;
          }
        }
      }
    }

    &.member3 {
      background: url("../assets/member3.png") color(_violet);
      background-repeat: no-repeat;
      background-size: 22%;
      background-position: 10vw 5vh;
      clip-path: polygon(0 0, 100% 12%, 100% 90%, 0 100%);
      margin: -13vh 0 0 0;

      .inner {
        padding: 15vh 0 16vh;
      }
    }
  }
}

.member {
  position: relative;

  h2 {
    letter-spacing: 0.05em;
  }

  .member__number {
    margin-right: 20px;
    flex-basis: calc(30% - 40px);
    line-height: 0;
    position: relative;
    top: 0.5em;
  }

  .member__about {
    margin-top: 27px;
  }

  .details_wrap {
    flex-basis: 70%;
    margin-top: 27px;
    text-align: left;
  }

  .member__position {
    .position__inner > span {
      display: block;
    }
  }

  .inner {
    display: flex;
    align-content: center;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
    padding: 15vh 0;
    max-width: 1150px;

    > .col {
      flex-grow: 1;
      display: flex;
      align-content: flex-start;
      height: auto;

      &:first-child {
        flex-basis: calc(40% - 40px);
        justify-content: flex-start;
        margin-right: 40px;
      }

      &:last-child {
        flex-basis: 60%;
        justify-content: flex-start;
        flex-wrap: wrap;
      }
    }
  }
}

.member__link {
  text-align: right;
  padding: 1vh 0;
  display: block;
  font-size: font_size_desktop(medium_pixel_size);
  line-height: 1em;

  > span {
    display: inline-block;
    vertical-align: middle;
  }

  &:before,
  &:after {
    -webkit-text-stroke: 2.2px color(_black);
    font: font_weight(regular) font_size_desktop(medium_pixel_size)
      font_family(pixel_font);
    color: color(_green);
    margin-top: 5px;
    display: inline-block;
    vertical-align: middle;
  }

  &:before {
    content: ">";
    margin-right: 15px;
  }
}

@media screen and (max-width: 1024px) {
  .member .inner {
    .member__link {
      text-align: left;
    }

    display: block;
    padding: 3vh 0;

    .member__number,
    h2,
    span {
      text-align: center;
    }

    .member__position {
      display: block;
      margin-bottom: 10px;
    }

    .col {
      flex-basis: 100%;
      display: block;
    }

    .member__number {
      margin: 0 auto;
      line-height: 0.5em;
      position: static;
    }
  }
}
</style>
