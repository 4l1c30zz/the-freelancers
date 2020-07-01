<template>
  <div class="single-member">
    <div class="member_heading">
    <div class="team_number">{{member.id}}</div>
    <h1>{{member.Name}}</h1>
    </div>
  </div>
</template>


<script>
import gql from "graphql-tag";

export default {
  name: 'Post',
  metaInfo: {
    title: 'Post',
    titleTemplate: '%s | 4l1c30zz Portfolio App'
  },
  data() {
    return {
      member: {},
      api_url: process.env.VUE_APP_STRAPI_API_URL,
      routeParam: this.$route.params.id
    };
  },

  apollo: {
    member: {
      query: gql `
      query Members($id: ID!) {
        member(id: $id) {
          id
          Name
           positionZone {
            __typename
            ... on ComponentMemberPosition {
              position_row
            }
          }
        }
      }
      `,
      variables() {
        return {
          id: this.routeParam,
        };
      }
    }
  }
};
</script>