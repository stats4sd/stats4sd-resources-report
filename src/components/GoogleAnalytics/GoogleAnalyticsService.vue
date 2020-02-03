<template>
  <div>
    <button class="btn-primary" @click="printReport">Download Report</button>
    <div id="report">
      <div>
        <header class="Titles">
          <h3 class="Titles-main">Sessions Vs Users</h3>
          <div class="Titles-sub">Last 60 days</div>
        </header>
        <div id="chart-1-container"></div>
      </div>
      <div>
        <header class="Titles">
          <h3 class="Titles-main">Top Countries by Sessions</h3>
          <div class="Titles-sub">Last 60 days</div>
        </header>
        <div id="chart-3-container"></div>
      </div>
      <div>
        <header class="Titles">
          <h3 class="Titles-main">Top Visted Pages</h3>
          <div class="Titles-sub">Last 60 days</div>
        </header>
        <div id="chart-2-container"></div>
      </div>
    </div>
  </div>
</template>
<script>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const { JWT } = require('google-auth-library');
export default {
  name: 'GoogleAnalyticsService',
  data: function() {
    return {
      accessToken: null
    };
  },
  mounted: function() {
    window.gapi.analytics.ready(async () => {
      const client = new JWT(
        process.env.VUE_APP_client_email,
        null,
        process.env.VUE_APP_private_key,
        ['https://www.googleapis.com/auth/analytics.readonly']
      );

      const response = await client.getAccessToken();
      console.log(response.token);
      const access_token = response.token;

      console.log('Access token: ', access_token);
      console.log('Env: ', process.env.VUE_APP_TITLE);
      /**
       * Authorize the user with an access token obtained server side.
       */
      window.gapi.analytics.auth.authorize({
        serverAuth: {
          access_token
        }
      });

      /**
       * Creates a new DataChart instance showing sessions over the past 30 days.
       * It will be rendered inside an element with the id "chart-1-container".
       */
      const dataChart1 = new window.gapi.analytics.googleCharts.DataChart({
        query: {
          ids: 'ga:163893888', // <-- Replace with the ids value for your view.
          'start-date': '60daysAgo',
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
          ids: 'ga:163893888', // <-- Replace with the ids value for your view.
          'start-date': '60daysAgo',
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

      //Chart 3 for User Sessions Vs Countries

      const dataChart3 = new window.gapi.analytics.googleCharts.DataChart({
        query: {
          ids: 'ga:163893888', // <-- Replace with the ids value for your view.
          'start-date': '60daysAgo',
          'end-date': 'yesterday',
          metrics: 'ga:sessions',
          dimensions: 'ga:country',
          sort: '-ga:sessions'
        },
        chart: {
          container: 'chart-3-container',
          type: 'PIE',
          options: {
            width: '100%',
            pieHole: 4 / 9
          }
        }
      });
      dataChart3.execute();
    });
  },
  methods: {
    printReport: () => {
      const input = document.getElementById('report');
      html2canvas(input).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save('report.pdf');
      });
    }
  }
};
</script>
<style scoped>
.Titles {
  font-weight: 300;
  line-height: 1.2;
  margin: 0 0 1.5em;
}
.Titles-main {
  font-size: 1.4em;
}
.Titles-sub {
  opacity: 0.6;
  margin-top: 0.2em;
}
#report {
  background-color: #f5f5f5;
  width: 210mm;
  min-height: 297mm;
}
</style>
