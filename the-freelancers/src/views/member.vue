<template>
  <div class="single">
    <socialMemberBar :socialMedia="member.socialMedia" />
    <div class="backHome pixel green">
      <router-link to="/" class="link pixel mark_block_wrap">
        <span class="backHome__word">
          back
        </span>
        <span class="arrow-right icon pixel green">
          >
        </span>
      </router-link>
    </div>
    <div class="member__heading">
      <div class="member__number green">{{ member.id }}</div>
      <h1 class="pixel green outline">{{ member.Name }}</h1>
      <div
        class="member__position"
        v-if="member.positionZone"
        :inner-html.prop="member.positionZone | positionFetch"
      ></div>
    </div>
    <div class="member__about">
      <vue-markdown-it
        v-if="member.About"
        :source="member.About"
        class="inner"
      />
    </div>
    <div
      v-if="member.portfolio"
      :inner-html.prop="member.portfolio | portfolioFetch"
      class="portfolio block"
    ></div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import VueMarkdownIt from "vue-markdown-it";
import socialMemberBar from "../components/socialMemberBar";

export default {
  name: "Post",
  metaInfo: {
    title: "Post",
    titleTemplate: "%s | 4l1c30zz Portfolio App"
  },
  data() {
    return {
      member: {
        id: null,
        socialMedia: {
          email: null
        }
      },

      api_url: process.env.VUE_APP_STRAPI_API_URL,
      routeParam: this.$route.params.id
    };
  },
  components: {
    VueMarkdownIt,
    socialMemberBar
  },
  apollo: {
    member: {
      query: gql`
        query Members($id: ID!) {
          member(id: $id) {
            id
            Name
            About
            positionZone {
              __typename
              ... on ComponentMemberPosition {
                position_row
              }
            }
            portfolio {
              __typename
              ... on ComponentMemberPortfolioItem {
                workName
                externalLink
                youTubeLink
                media {
                  id
                  url
                  caption
                  alternativeText
                }
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
              return "<span>" + posContfilter + "</span>";
            })
            .join("") +
          "</div>";
      }
      return positionsHtml;
    },

    portfolioFetch: function(value) {
      let api_url = process.env.VUE_APP_STRAPI_API_URL;
      let portfolioArr = value;
      let portfolioArrValues = portfolioArr.values();

      let full_html = "";

      for (var i of portfolioArrValues) {
        let portofiloObjectsVals = Object.values(i);
        let workTitle = portofiloObjectsVals[1];
        full_html += "<div>";
        full_html += "<h3>" + workTitle + "</h3>";

        let externalLink = portofiloObjectsVals[2];
        let youTubeLink = portofiloObjectsVals[3];
        if (youTubeLink != null) {
          full_html += "<div class ='youtube'>" + youTubeLink + "</div>";
        }
        let imgArr = portofiloObjectsVals[4];
        let imgArrValues = imgArr.values();

        for (var x of imgArrValues) {
          let imgArrObjVal = Object.values(x);
          let imageUrl = imgArrObjVal[1];
          let imageAlt = imgArrObjVal[3];
          if (imageUrl != null) {
            full_html +=
              "<img src='" + api_url + imageUrl + "' alt='" + imageAlt + "'/>";
          }
          let imageDesc = imgArrObjVal[2];
          full_html += "<p>" + imageDesc + "</p>";
        }
        if (externalLink != null) {
          full_html += "<a href='" + externalLink + "'/>external</a>";
        }
        full_html += "</div>";
        //  wrappedFullHtml += "<div class ='contWrap'>" + full_html + "</div>";
      }

      return full_html;
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/_variables.scss";
@import "@/scss/_functions.scss";
@import "@/scss/_globals.scss";
.single {
  .backHome {
    background: color(_black);
    padding: 5%;
    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 89%);

    a {
      display: block;
      text-align: right;
      font-size: 40px;

      .icon {
        margin-bottom: -25px;
        display: inline-block;
      }
    }
  }

  .inner {
    max-width: 80%;
    margin: 0 auto;
  }
}

.member__heading {
  padding: 3vh 0 5vh;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;

  h1 {
    flex-basis: 100%;
    text-align: center;
  }

  .member__number {
    flex-basis: 100%;
    text-align: center;
    line-height: 1em;
  }

  .member__position span {
    display: block;
    text-align: center;
  }
}

.portfolio {
  display: flex;
  justify-content: center;
  align-content: center;

  >div {
    flex-basis: 33.33%;
    padding: 20px;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
  }

  iframe,
  img {
    transition: all 0.3s ease;
    filter: grayscale(1) sepia(0.5);

    &:hover {
      filter: grayscale(0);
    }
  }
}
</style>
