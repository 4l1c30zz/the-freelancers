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
        class="chev left a"
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
        style="right: -10vw"
      ></div>
      <svg
        @click="move_right"
        class="chev right"
        viewBox="0 0 65 151"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.87432 25.7651L6.81935 29.5556L10.7258 29.5556L19.5679 29.5556C19.533 30.2992 19.5161 31.0587 19.5161 31.8333C19.5161 34.4928 19.7 36.9479 20.1276 39.1346C19.7063 41.3595 19.5161 43.7897 19.5161 46.3889C19.5161 49.0484 19.7 51.5035 20.1276 53.6901C19.7063 55.915 19.5161 58.3452 19.5161 60.9444C19.5161 64.0962 19.7744 66.9608 20.3904 69.4318L21.3355 73.2222L25.2419 73.2222L26.8259 73.2222C26.7911 73.9658 26.7742 74.7254 26.7742 75.5C26.7742 76.2773 26.7899 77.037 26.8228 77.7778L25.2419 77.7778L21.2794 77.7778L20.3742 81.6355C19.7798 84.1684 19.5161 86.9948 19.5161 90.0556C19.5161 92.7151 19.7 95.1701 20.1276 97.3568C19.7063 99.5817 19.5161 102.012 19.5161 104.611C19.5161 107.271 19.7 109.726 20.1276 111.912C19.7063 114.137 19.5161 116.567 19.5161 119.167C19.5161 119.944 19.5318 120.704 19.5647 121.444L10.7258 121.444L6.76327 121.444L5.85803 125.302C5.26369 127.835 5.00001 130.661 5.00001 133.722C5.00001 136.874 5.25826 139.739 5.87433 142.21L6.81936 146L10.7258 146L32.5 146L36.4065 146L37.3515 142.21C37.9676 139.739 38.2258 136.874 38.2258 133.722C38.2258 132.948 38.2089 132.188 38.1741 131.444L39.7581 131.444L43.6645 131.444L44.6095 127.654C45.2256 125.183 45.4839 122.318 45.4839 119.167C45.4839 116.567 45.2937 114.137 44.8724 111.912C45.3 109.726 45.4839 107.271 45.4839 104.611C45.4839 102.012 45.2937 99.5817 44.8724 97.3568C45.3 95.1701 45.4839 92.7151 45.4839 90.0556C45.4839 89.281 45.467 88.5214 45.4321 87.7778L54.2742 87.7778L58.1806 87.7778L59.1257 83.9874C59.7417 81.5164 60 78.6517 60 75.5C60 72.4392 59.7363 69.6128 59.142 67.08L58.2367 63.2222L54.2742 63.2222L45.4353 63.2222C45.4682 62.4815 45.4839 61.7217 45.4839 60.9444C45.4839 58.3452 45.2937 55.915 44.8724 53.6901C45.3 51.5035 45.4839 49.0484 45.4839 46.3889C45.4839 43.7897 45.2937 41.3595 44.8724 39.1346C45.3 36.9479 45.4839 34.4928 45.4839 31.8333C45.4839 28.7725 45.2202 25.9462 44.6258 23.4133L43.7206 19.5556L39.7581 19.5556L38.1772 19.5556C38.2101 18.8148 38.2258 18.055 38.2258 17.2778C38.2258 14.217 37.9621 11.3906 37.3678 8.85774L36.4625 5L32.5 5L10.7258 5L6.76326 5L5.85802 8.85776C5.26368 11.3906 5 14.217 5 17.2778C5 20.4295 5.25825 23.2941 5.87432 25.7651Z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import VueMarkdownIt from "vue-markdown-it";
import socialMemberBar from "../components/socialMemberBar";
import { get_siblings, isInViewport } from "../js/custom";

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
      let pholioContWidth = pholioParent.scrollWidth;
      let screenWidth = screen.width;

      let rightArr = document.querySelector(".chev.right");

      let pholioCont = document.querySelector(".portfolio__inner");

      let pholioRightStyle = parseInt(pholioCont.style.right, 0);
      let portfolioProjects = document.querySelectorAll(".portfolio__poject");

      if (screenWidth < pholioContWidth && pholioContWidth > pholioRightStyle) {
        portfolioProjects.forEach(portfolioProject => {
          var bounding = portfolioProject.getBoundingClientRect();
          let projectWidth = bounding.width;
          let isInViewportProj = isInViewport(portfolioProject);
          if (isInViewportProj) {
            pholioCont.style.right = pholioRightStyle + projectWidth + "px";
          }
        });
        rightArr.classList.add("a");
      } else {
        pholioCont.style.right = "-10vw";
        rightArr.classList.remove("a");
      }
    },
    move_right: function() {
      let rightArr = document.querySelector(".chev.right");
      let pholioCont = document.querySelector(".portfolio__inner");
      let pholioRightStyle = parseInt(pholioCont.style.right, 0);
      let portfolioProjects = document.querySelectorAll(".portfolio__poject");
      let screenWidth = screen.width;
      portfolioProjects.forEach(portfolioProject => {
        var bounding = portfolioProject.getBoundingClientRect();
        let isInViewportProj = isInViewport(portfolioProject);
        if (isInViewportProj) {
          let projectWidth = bounding.width;
          if (
            pholioRightStyle > projectWidth &&
            pholioRightStyle < screenWidth
          ) {
            pholioCont.style.right = pholioRightStyle - projectWidth + "px";
          } else {
            pholioCont.style.right = "-10vw";
            rightArr.classList.remove("a");
          }
        }
      });
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
        let externalLink = portofiloObjectsVals[2];
        let youTubeLink = portofiloObjectsVals[3];
        if (externalLink != null) {
          full_html += "<div class='portfolio__poject external'>";
        } else if (youTubeLink) {
          full_html += "<div class='portfolio__poject video'>";
        } else {
          full_html += "<div class='portfolio__poject image'>";
        }
        full_html += "<h3 class='pixel'>" + workTitle + "</h3>";

        if (youTubeLink) {
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
              "<div class='img_wrap'><img src='" +
              api_url +
              imageUrl +
              "' alt='" +
              imageAlt +
              "'/></div>";
          }
        }
        if (externalLink) {
          full_html +=
            "<a target='_blank' class='pixel portfolio__link' href='" +
            externalLink +
            "'/>external</a>";
        }
        full_html += "</div>";
      }

      return full_html;
    }
  },
  mounted: function() {
    function classToggle() {
      console.log("created");
      let portfolioProjects = document.querySelectorAll(
        ".portfolio__poject.image"
      );

      portfolioProjects.forEach(portfolioProject => {
        portfolioProject.addEventListener("click", event => {
          let targ = event.target.closest(".portfolio__poject.image");
          console.log(targ);
          let pholioParent = document.querySelector(".portfolio");
          pholioParent.classList.toggle("a");
          targ.classList.toggle("a");
          let siblings = get_siblings(targ);
          siblings.forEach(sib => {
            sib.classList.remove("a");
          });
        });
      });
    }
    setTimeout(function() {
      classToggle();
      let pholioParent = document.querySelector(".portfolio");
      let pholioContWidth = pholioParent.scrollWidth;
      let screenWidth = screen.width;
      let lefttArr = document.querySelector(".chev.left");

      if (screenWidth > pholioContWidth) {
        lefttArr.classList.remove("a");
        pholioParent.classList.add("short");
      } else {
        lefttArr.classList.add("a");
        pholioParent.classList.remove("short");
      }
    }, 1000);
  }
};
</script>

<style lang="scss">
@import "@/scss/_variables.scss";
@import "@/scss/_functions.scss";
@import "@/scss/_globals.scss";
.single {
  .member__about {
    max-width: 65%;
    margin: 0 auto;
  }
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
    transition: all 0.3s ease;
    path {
      fill: color(_green);
      stroke: color(_black);
      stroke-width: 8;
    }
    &.left {
      left: 3.5vw;
      opacity: 0;
      &.a {
        opacity: 1;
      }
    }
    &.right {
      right: 3.5vw;
      opacity: 0;
      &.a {
        opacity: 1;
      }
    }
  }
  &.a {
    .chev {
      z-index: 1;
    }
  }
  &.short {
    .portfolio__inner {
      justify-content: flex-end;
      //right: 0 !important;
    }
    .chev {
      display: none;
    }
  }
  .portfolio__inner {
    display: inline-flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    max-width: 100%;
    position: relative;
    z-index: 1;
    right: -10vw;
    transition: all 0.3s ease;

    .portfolio__poject {
      flex-basis: calc(33.33% - 100px);
      margin: 0 20px;
      display: flex;
      width: 100%;
      align-content: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      &.a {
        img,
        iframe {
          filter: grayscale(0);
        }
        .img_wrap {
          position: fixed;
          width: 100%;
          max-width: 100%;
          top: 0;
          left: 0;
          height: 100%;
          z-index: 10;
          background: white;
          text-align: center;
          cursor: pointer;
          img {
            object-fit: scale-down;
            width: 100%;
            max-width: 90%;
          }
          &:after {
            content: "x";
            font-family: font_family(pixel_font);
            font-size: 100px;
            line-height: 1em;
            position: absolute;
            top: 5%;
            right: 5%;
            color: color(_green);
            -webkit-text-stroke-width: 4px;
            -webkit-text-stroke-color: color(_black);
            font-weight: bold;
          }
        }
      }
      &:hover img,
      &:hover iframe {
        filter: grayscale(0);
      }
      &:hover .portfolio__link {
        transform: scale(2) skewY(-15deg);
      }
      h3 {
        font-size: font_size_desktop(small_pixel_size);
        line-height: 0.8em;
        margin: 0 0 10px;
      }
    }
    .portfolio__link {
      text-align: center;
      margin: 10px 0 0;
      display: block;
      font-size: font_size_desktop(small_pixel_size);
      line-height: 1em;
      font-weight: bold;
      background: transparent;
      transition: all 0.3s ease;

      &:before,
      &:after {
        -webkit-text-stroke: 1.2px color(_black);
        font: font_weight(regular) font_size_desktop(small_pixel_size)
          font_family(pixel_font);
        font-weight: bold;
        color: color(_green);
        margin-top: 0px;
        display: inline-block;
        vertical-align: middle;
      }

      &:before {
        content: ">";
        margin-right: 15px;
      }
    }
  }
  iframe {
    min-height: 25vh;
  }
  iframe,
  img {
    min-width: 20vw;
    transition: all 0.3s ease;
    filter: grayscale(1) sepia(0.5);
    height: 100%;
  }
}

@media screen and (max-width: 1024px) {
  .portfolio .portfolio__inner {
    right: -10vw;

    .portfolio__poject {
      flex-basis: calc(50% - 40px);
      margin: 0 20px;
      width: 100%;
      min-width: 100%;
      iframe {
        width: 90%;
        min-width: 50%;
      }
    }
  }
}
</style>
