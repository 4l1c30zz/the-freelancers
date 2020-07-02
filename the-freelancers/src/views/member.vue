<template>
  <div class="single-member">
    <div class="back pixel green">
      <router-link to="/" class="link pixel mark_block_wrap">
        <span class="word">
          back
        </span>
        <span class="arrow-right icon pixel green">
          >
        </span>
      </router-link>
    </div>
    <div class="member_heading">
      <div class="team_number green">{{ member.id }}</div>
      <h1 class="pixel green">{{ member.Name }}</h1>
      <span
        class="position_wrap"
        v-if="member.positionZone"
        :inner-html.prop="member.positionZone | positionFetch"
      >
      </span>
    </div>
    <div class="membre_about">
      <vue-markdown-it
        v-if="member.About"
        :source="member.About"
        class="inner"
      />
    </div>
    <div class="member_work"></div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import VueMarkdownIt from "vue-markdown-it";

export default {
  name: "Post",
  metaInfo: {
    title: "Post",
    titleTemplate: "%s | 4l1c30zz Portfolio App"
  },
  data() {
    return {
      member: {},
      api_url: process.env.VUE_APP_STRAPI_API_URL,
      routeParam: this.$route.params.id
    };
  },
  components: {
    VueMarkdownIt
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
          "<div class='position'>" +
          posContfiltered
            .map(function(posContfilter) {
              return "<span>" + posContfilter + "</span>";
            })
            .join("") +
          "</div>";
      }
      return positionsHtml;
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/_variables.scss";
@import "@/scss/_functions.scss";
@import "@/scss/_globals.scss";

.member_heading {
  padding: 5%;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;

  h1 {
    flex-basis: 100%;
    text-align: center;
  }

  .team_number {
    flex-basis: 100%;
    text-align: center;
    line-height: 1em;
  }
}

.single-member {
  .back {
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
}
</style>
