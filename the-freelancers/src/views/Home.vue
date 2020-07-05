<template>
  <div class="home">
    <div class="hero">
      <logo />
    </div>
    <div class="about pixel block">
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
        class=" member block"
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
            />
            <router-link
              :to="{ path: '/member/' + member.id }"
              class="member__link  pixel mark_block_wrap"
            >
              <span class="arrow-right icon pixel green">
                >
              </span>
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
          "<div class='position'>" +
          posContfiltered
            .map(function(posContfilter) {
              return "<span>" + posContfilter + "</span>";
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
  align-items: center;
  align-content: center;
  width: 100%;
  padding: 10vh 0;

  .logo {
    width: 50%;
    max-width: 35vw;
  }
}

.about {
  background: color(_black);
  color: color(_cyan);
  padding: 5vh 20vw 7vh;
  font-size: 1.6em;
  border-top: 5px solid color(_pink);
  text-align: center;
  clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 89%);
}

.member {
  position: relative;

  h2 {
    margin: 20px 0 0;
    letter-spacing: 0.05em;
  }

  .member__number {
    margin-right: 20px;
    flex-basis: calc(30% - 40px);
    line-height: 0;
    position: relative;
    top: 0.5em;
  }

  .details_wrap {
    flex-basis: 70%;
  }

  .member__position_wrap {
    text-align: left;

    .position>span {
      display: block;
    }
  }

  .inner {
    display: flex;
    align-content: center;
    justify-content: space-between;
    max-width: 80%;
    margin: 0 auto;
    padding: 10vh 0;

    >.col {
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
        justify-content: flex-end;
        flex-wrap: wrap;
      }
    }
  }
}
  .member__link {
    text-align: right;
    padding: 1vh 0;
    display: block;
    font-size: 3em;
    line-height: 1em;

    >span {
      display: inline-block;
      vertical-align: middle;
    }

    .icon {
      -webkit-text-stroke: 2.2px color(_black);
      font-size: 55px;
      margin-right: 15px;
      margin-top: 5px;
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

    .member__position_wrap {
      display: block;
      margin-bottom: 10px;
    }

    .col {
      flex-basis: 100%;
      display: block;
    }

    .member___number {
      margin: 0 auto;
      line-height: 0.5em;
      position: static;
    }
  }
}
</style>
