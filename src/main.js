import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import GoogleAnalyticsService from './components/GoogleAnalytics/GoogleAnalyticsService';
import Resources from './components/UI/Resources';

Vue.use(VueRouter);
const routes = [
  {
    path: '/resources',
    component: Resources
  },
  {
    path: '/',
    component: GoogleAnalyticsService
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
