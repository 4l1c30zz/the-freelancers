import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta';
Vue.use(VueMeta);

Vue.use(VueRouter)


const routes = [{
    path: '/',
    name: 'home',
    component: () => import('../containers/home.vue'),
  },

]





const router = new VueRouter({
  routes
})

export default router
