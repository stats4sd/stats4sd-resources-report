import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import GoogleAnalytics from './components/GoogleAnalytics/GoogleAnalyticsService';
import Resources from './components/UI/Resources';
import Collections from './components/UI/Collections'

Vue.use(VueRouter);
const routes = [
  {
    path: '/resources',
    component: Resources
  },
  {
    path: '/',
    component: GoogleAnalytics
  },
  {
    path: '/collections',
    component: Collections
  }
];

const router = new VueRouter({
  routes
});
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
