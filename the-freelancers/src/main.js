import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueApollo from "vue-apollo";
import apolloClient from "./vue-apollo";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAt, faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faTelegramPlane,
  faInstagram,
  faLinkedinIn,
  faFacebookF
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faAt,
  faGithub,
  faTelegramPlane,
  faInstagram,
  faLinkedinIn,
  faFacebookF,
  faGlobe
);

Vue.component("font-awesome-icon", FontAwesomeIcon);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

Vue.config.productionTip = false;

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  apolloProvider,
  router,
  render: h => h(App)
}).$mount("#app");
