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

      const viewSelector = new window.gapi.analytics.ViewSelector({
        container: 'view-selector-container'
      });

      viewSelector.execute();

      const dataChart = new window.gapi.analytics.googleCharts.DataChart({
        query: {
          metrics: 'ga:sessions',
          dimensions: 'ga:date',
          'start-date': '30daysAgo',
          'end-date': 'yesterday'
        },
        chart: {
          container: 'chart-container',
          type: 'LINE',
          options: {
            width: '100%'
          }
        }
      });

      viewSelector.on('change', ids => {
        dataChart.set({ query: { ids: ids } }).execute();
      });
    });
  }
};
</script>
<style scoped></style>
