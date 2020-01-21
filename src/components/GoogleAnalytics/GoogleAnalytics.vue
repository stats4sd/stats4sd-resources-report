<template>
  <div>
    Google Analytics
    <div id="embed-api-auth-container"></div>
    <div id="chart-container"></div>
    <div id="view-selector-container"></div>
  </div>
</template>
<script>
export default {
  name: 'GoogleAnalytics',
  mounted: function() {
    window.gapi.analytics.ready(() => {
      window.gapi.analytics.auth.authorize({
        container: 'embed-api-auth-container',
        clientid:
          '936455127872-vak7t470ulpqab9a355vbbcqjco9tmb9.apps.googleusercontent.com'
      });
    });
  }
};
</script>
<style scoped></style>
