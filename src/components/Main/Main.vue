<template>
  <Fragment>
    <div id="content" class="p-4 p-md-5 pt-5">
      <router-view> </router-view>
    </div>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';
import GoogleAnalyticsService from '../GoogleAnalytics/GoogleAnalyticsService';
export default {
  name: 'Main',
  components: { Fragment }
};
</script>

<style></style>
