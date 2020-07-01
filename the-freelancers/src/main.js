import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueApollo from "vue-apollo";
import apolloClient from "./vue-apollo";

Vue.config.productionTip = false;

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  apolloProvider,
  router,
  render: h => h(App)
}).$mount('#app')
