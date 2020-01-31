<template>
  <div>
    Service Accounts
    {{ accessToken }}
    <div id="chart-1-container"></div>
    <div id="chart-2-container"></div>
  </div>
</template>
<script>
const { JWT } = require('google-auth-library');
import keys from '../../../stats4s';
export default {
  name: 'Service',
  data: function() {
    return {
      accessToken: null
    };
  },

  mounted: function() {
    window.gapi.analytics.ready(async function() {
      const getToken = async () => {
        const client = new JWT(keys.client_email, null, keys.private_key, [
          'https://www.googleapis.com/auth/analytics.readonly'
        ]);

        const response = await client.getAccessToken();
        console.log(response.token);
        this.accessToken = response.token;
      };
      await getToken();

      console.log('Access token: ', this.accessToken);
      /**
       * Authorize the user with an access token obtained server side.
       */
      window.gapi.analytics.auth.authorize({
        serverAuth: {
          access_token: this.accessToken
        }
      });

      /**
       * Creates a new DataChart instance showing sessions over the past 30 days.
       * It will be rendered inside an element with the id "chart-1-container".
       */
      const dataChart1 = new window.gapi.analytics.googleCharts.DataChart({
        query: {
          ids: 'ga:201510174', // <-- Replace with the ids value for your view.
          'start-date': '120daysAgo',
          'end-date': 'yesterday',
          metrics: 'ga:sessions,ga:users',
          dimensions: 'ga:date'
        },
        chart: {
          container: 'chart-1-container',
          type: 'LINE',
          options: {
            width: '100%'
          }
        }
      });
      dataChart1.execute();

      /**
       * Creates a new DataChart instance showing top 5 most popular demos/tools
       * amongst returning users only.
       * It will be rendered inside an element with the id "chart-3-container".
       */
      const dataChart2 = new window.gapi.analytics.googleCharts.DataChart({
        query: {
          ids: 'ga:201510174', // <-- Replace with the ids value for your view.
          'start-date': '120daysAgo',
          'end-date': 'yesterday',
          metrics: 'ga:pageviews',
          dimensions: 'ga:pagePathLevel1',
          sort: '-ga:pageviews',
          filters: 'ga:pagePathLevel1!=/',
          'max-results': 7
        },
        chart: {
          container: 'chart-2-container',
          type: 'PIE',
          options: {
            width: '100%',
            pieHole: 4 / 9
          }
        }
      });
      dataChart2.execute();
    });
  }
};
</script>
<style scoped></style>
