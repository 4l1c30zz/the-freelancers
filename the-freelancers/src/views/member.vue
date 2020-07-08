<template>
  <div :class="'member' + member.id + ' single'">
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
    <div class="portfolio">
      <svg
        @click="move_left"
        class="chev left"
        viewBox="0 0 49 113"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M44.3511 19.7367L43.6002 22.7778L40.4677 22.7778L34.3296 22.7778C34.3466 23.2334 34.3548 23.6965 34.3548 24.1667C34.3548 26.1264 34.2221 27.9451 33.9111 29.5737C34.2174 31.2276 34.3548 33.0271 34.3548 34.9444C34.3548 36.9041 34.2221 38.7228 33.9111 40.3514C34.2174 42.0054 34.3548 43.8049 34.3548 45.7222C34.3548 48.0683 34.1647 50.2123 33.7059 52.07L32.955 55.1111L29.8226 55.1111L29.007 55.1111C29.024 55.5667 29.0323 56.0298 29.0323 56.5C29.0323 56.9713 29.0246 57.4345 29.0086 57.8889L29.8226 57.8889L32.9996 57.8889L33.7188 60.9834C34.1604 62.8837 34.3548 64.9974 34.3548 67.2778C34.3548 69.2375 34.2221 71.0562 33.9111 72.6848C34.2174 74.3387 34.3548 76.1382 34.3548 78.0556C34.3548 80.0153 34.2221 81.834 33.9111 83.4626C34.2174 85.1165 34.3548 86.916 34.3548 88.8333C34.3548 89.3047 34.3472 89.7679 34.3312 90.2222L40.4677 90.2222L43.6447 90.2222L44.3639 93.3168C44.8055 95.2171 45 97.3308 45 99.6111C45 101.957 44.8098 104.101 44.3511 105.959L43.6002 109L40.4677 109L24.5 109L21.3675 109L20.6166 105.959C20.1579 104.101 19.9677 101.957 19.9677 99.6111C19.9677 99.1409 19.976 98.6778 19.993 98.2222L19.1774 98.2222L16.045 98.2222L15.2941 95.1811C14.8354 93.3235 14.6452 91.1794 14.6452 88.8333C14.6452 86.916 14.7826 85.1165 15.0889 83.4626C14.7779 81.834 14.6452 80.0153 14.6452 78.0556C14.6452 76.1382 14.7826 74.3387 15.0889 72.6848C14.7779 71.0562 14.6452 69.2375 14.6452 67.2778C14.6452 66.8076 14.6534 66.3445 14.6704 65.8889L8.53226 65.8889L5.39982 65.8889L4.6489 62.8478C4.1902 60.9901 4 58.8461 4 56.5C4 54.2196 4.19447 52.1059 4.63609 50.2056L5.35526 47.1111L8.53226 47.1111L14.6688 47.1111C14.6528 46.6568 14.6452 46.1936 14.6452 45.7222C14.6452 43.8049 14.7826 42.0054 15.0889 40.3515C14.7779 38.7229 14.6452 36.9041 14.6452 34.9444C14.6452 33.0271 14.7826 31.2276 15.0889 29.5737C14.7779 27.9451 14.6452 26.1264 14.6452 24.1667C14.6452 21.8863 14.8396 19.7726 15.2813 17.8723L16.0004 14.7778L19.1774 14.7778L19.9914 14.7778C19.9754 14.3234 19.9677 13.8602 19.9677 13.3889C19.9677 11.1085 20.1622 8.99484 20.6038 7.09454L21.323 4L24.5 4L40.4677 4L43.6448 4L44.3639 7.09455C44.8055 8.99485 45 11.1085 45 13.3889C45 15.735 44.8098 17.879 44.3511 19.7367Z"
        />
      </svg>
      <div
        v-if="member.portfolio"
        :inner-html.prop="member.portfolio | portfolioFetch"
        class="portfolio__inner block"
        style="right: 0"
      ></div>
            <svg
        @click="move_right"
        class="chev right"
        viewBox="0 0 49 113"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M44.3511 19.7367L43.6002 22.7778L40.4677 22.7778L34.3296 22.7778C34.3466 23.2334 34.3548 23.6965 34.3548 24.1667C34.3548 26.1264 34.2221 27.9451 33.9111 29.5737C34.2174 31.2276 34.3548 33.0271 34.3548 34.9444C34.3548 36.9041 34.2221 38.7228 33.9111 40.3514C34.2174 42.0054 34.3548 43.8049 34.3548 45.7222C34.3548 48.0683 34.1647 50.2123 33.7059 52.07L32.955 55.1111L29.8226 55.1111L29.007 55.1111C29.024 55.5667 29.0323 56.0298 29.0323 56.5C29.0323 56.9713 29.0246 57.4345 29.0086 57.8889L29.8226 57.8889L32.9996 57.8889L33.7188 60.9834C34.1604 62.8837 34.3548 64.9974 34.3548 67.2778C34.3548 69.2375 34.2221 71.0562 33.9111 72.6848C34.2174 74.3387 34.3548 76.1382 34.3548 78.0556C34.3548 80.0153 34.2221 81.834 33.9111 83.4626C34.2174 85.1165 34.3548 86.916 34.3548 88.8333C34.3548 89.3047 34.3472 89.7679 34.3312 90.2222L40.4677 90.2222L43.6447 90.2222L44.3639 93.3168C44.8055 95.2171 45 97.3308 45 99.6111C45 101.957 44.8098 104.101 44.3511 105.959L43.6002 109L40.4677 109L24.5 109L21.3675 109L20.6166 105.959C20.1579 104.101 19.9677 101.957 19.9677 99.6111C19.9677 99.1409 19.976 98.6778 19.993 98.2222L19.1774 98.2222L16.045 98.2222L15.2941 95.1811C14.8354 93.3235 14.6452 91.1794 14.6452 88.8333C14.6452 86.916 14.7826 85.1165 15.0889 83.4626C14.7779 81.834 14.6452 80.0153 14.6452 78.0556C14.6452 76.1382 14.7826 74.3387 15.0889 72.6848C14.7779 71.0562 14.6452 69.2375 14.6452 67.2778C14.6452 66.8076 14.6534 66.3445 14.6704 65.8889L8.53226 65.8889L5.39982 65.8889L4.6489 62.8478C4.1902 60.9901 4 58.8461 4 56.5C4 54.2196 4.19447 52.1059 4.63609 50.2056L5.35526 47.1111L8.53226 47.1111L14.6688 47.1111C14.6528 46.6568 14.6452 46.1936 14.6452 45.7222C14.6452 43.8049 14.7826 42.0054 15.0889 40.3515C14.7779 38.7229 14.6452 36.9041 14.6452 34.9444C14.6452 33.0271 14.7826 31.2276 15.0889 29.5737C14.7779 27.9451 14.6452 26.1264 14.6452 24.1667C14.6452 21.8863 14.8396 19.7726 15.2813 17.8723L16.0004 14.7778L19.1774 14.7778L19.9914 14.7778C19.9754 14.3234 19.9677 13.8602 19.9677 13.3889C19.9677 11.1085 20.1622 8.99484 20.6038 7.09454L21.323 4L24.5 4L40.4677 4L43.6448 4L44.3639 7.09455C44.8055 8.99485 45 11.1085 45 13.3889C45 15.735 44.8098 17.879 44.3511 19.7367Z"
        />
      </svg>
    </div>
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
  methods: {
    move_left: function() {
      let pholioParent = document.querySelector(".portfolio");
      let rightArr = document.querySelector(".chev.right");
      let pholioCont = document.querySelector(".portfolio__inner");
      let pholioContWidth = pholioParent.scrollWidth;
      var pholioRightStyle = parseInt(pholioCont.style.right, 0);
       if (  pholioContWidth  >  pholioRightStyle ) {
      pholioCont.style.right = pholioRightStyle + 500 + "px";
      rightArr.classList.add("a");
     }
      else{
        pholioCont.style.right = "0";
          rightArr.classList.remove("a");
       }
    },
        move_right: function() {

      let rightArr = document.querySelector(".chev.right");
      let pholioCont = document.querySelector(".portfolio__inner");
      var pholioRightStyle = parseInt(pholioCont.style.right, 0);
       if (   pholioRightStyle > 500 ) {
      pholioCont.style.right = pholioRightStyle - 500 + "px";
      rightArr.classList.add("a");
     }
      else{
        pholioCont.style.right = "0";
         rightArr.classList.remove("a");

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
              return "<span class='pixel'>" + posContfilter + "</span>";
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
  &.member1 {
    background: url("../assets/member1.png") color(_pink);
    background-repeat: no-repeat;
    background-position: center 25vh;
    background-attachment: fixed;
    background-size: 38%;
  }

  &.member2 {
    background: url("../assets/member2.png") color(_cyan);
    background-repeat: no-repeat;
    background-position: center 25vh;
    background-attachment: fixed;
  }

  &.member3 {
    background: url("../assets/member3.png") color(_violet);
    background-repeat: no-repeat;
    background-position: center 25vh;
    background-size: 30%;
    background-attachment: fixed;
  }

  .socialSideBar {
    position: fixed;
    bottom: 30vh;
    z-index: 3;
    top: auto;
  }

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

.member__about {
  max-width: 65%;
  margin: 0 auto;
}

.portfolio {
  padding: 10vh 0;
  position: relative;
  overflow: hidden;
  .chev {
    width: 49px;
    height: 113px;
    position: absolute;
    top: 40%;
    z-index: 2;
    path {
      fill: color(_green);
      stroke: color(_black);
      stroke-width: 8;
    }
    &.left{
          left: 3.5vw;
    }
    &.right{
    right: 3.5vw;
    opacity: 0;
    transition: all 0.3s ease;
    &.a{
      opacity: 1;
    }
    }

  }
  .portfolio__inner {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    width: 100%;
    position: relative;
    z-index: 1;
    right: 0;
    transition: all 0.3s ease;
    margin-right: 20vw;

    > div {
      flex-basis: calc(33.33% - 100px);
      padding: 0 50px;
      display: flex;
      width: 100%;
      align-content: center;
      justify-content: center;
      flex-direction: column;
    }
  }

  iframe,
  img {
    min-width: 20vw;
    transition: all 0.3s ease;
    filter: grayscale(1) sepia(0.5);

    &:hover {
      filter: grayscale(0);
    }
  }
}
</style>
