<template>
  <div>
    <button class="btn-primary" @click="printReport">Download Report</button>
    <div id="report">
      <div>
        <header class="Titles">
          <div class="float-right">
            <select :key="chart1" v-model="chart1" @change="getData">
              <option disabled value>Please Select One</option>
              <option>30</option>
              <option>60</option>
              <option>90</option>
              <option>120</option>
            </select>
          </div>
          <h3 class="Titles-main">Sessions Vs Users</h3>
          <div class="Titles-sub">Last {{ chart1 }} days</div>
        </header>
        <div id="chart-1-container"></div>
      </div>
      <div>
        <header class="Titles">
          <div class="float-right">
            <select :key="chart3" v-model="chart3" @change="getData">
              <option disabled value>Please Select One</option>
              <option>30</option>
              <option>60</option>
              <option>90</option>
              <option>120</option>
            </select>
          </div>
          <h3 class="Titles-main">Top Countries by Sessions</h3>
          <div class="Titles-sub">Last {{ chart3 }} days</div>
        </header>
        <div id="chart-3-container"></div>
      </div>
      <div>
        <header class="Titles">
          <div class="float-right">
            <select :key="chart2" v-model="chart2" @change="getData">
              <option disabled value>Please Select One</option>
              <option>30</option>
              <option>60</option>
              <option>90</option>
              <option>120</option>
            </select>
          </div>
          <h3 class="Titles-main">Top Visted Pages</h3>
          <div class="Titles-sub">Last {{ chart2 }} days</div>
        </header>
        <div id="chart-2-container"></div>
      </div>
      <div>
        <header class="Titles">
          <h3 class="Titles-main">Pages Visited</h3>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Page</th>
                <th scope="col">Number of Views</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in resources" :key="row">
                <td>{{ row[0] }}</td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </header>
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
      chart1: 30,
      chart2: 30,
      chart3: 30,
      rows: []
    };
  },
  computed: {
    resources: function() {
      function filterGAPageData(GAData) {
        return GAData.filter(
          innerArray => innerArray[0].toString().includes('/resources') //check if string contains /resources to omit other urls
        );
      }

      return filterGAPageData(this.rows);
    }
  },
  mounted: function mounted() {
    this.getData();
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
    },
    getData: function() {
      window.gapi.analytics.ready(async () => {
        const { VUE_APP_client_email, VUE_APP_private_key } = process.env;
        if (!VUE_APP_client_email && !VUE_APP_private_key) {
          alert(
            'Client email and private key must be defined in .env file. View Instructions.md for more info'
          );
          throw new Error(
            'Client email and private key must be defined in .env file'
          );
        }
        const client = new JWT(
          VUE_APP_client_email,
          null,
          VUE_APP_private_key,
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
        window.gapi.client
          .request({
            path:
              'https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A209389023&start-date=30daysAgo&end-date=today&metrics=ga%3Apageviews&dimensions=ga%3ApagePath&sort=-ga%3Apageviews&filters=ga%3ApagePathLevel1!%3D%2F&max-results=50'
          })
          .then(response => {
            this.rows = response.result.rows;

            console.log('new response', response.result.rows);
            console.log('New row data', this.rows);
          });
        /**
         * Creates a new DataChart instance showing sessions over the past 60 days.
         * It will be rendered inside an element with the id "chart-1-container".
         */
        const dataChart1 = new window.gapi.analytics.googleCharts.DataChart({
          query: {
            ids: 'ga:209389023', // <-- Replace with the ids value for your view.
            'start-date': `${this.chart1}daysAgo`,
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
         * Creates a new DataChart instance showing top most popular viewed pages.
         * It will be rendered inside an element with the id "chart-2-container".
         */
        const dataChart2 = new window.gapi.analytics.googleCharts.DataChart({
          query: {
            ids: 'ga:209389023', // <-- Replace with the ids value for your view.
            'start-date': `${this.chart2}daysAgo`,
            'end-date': 'yesterday',
            metrics: 'ga:pageviews',
            dimensions: 'ga:pagePath',
            sort: '-ga:pageviews',
            filters: 'ga:pagePathLevel1!=/',
            'max-results': 40
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

        /**
         * Creates a new DataChart instance showing users vs countries.
         * It will be rendered inside an element with the id "chart-3-container".
         */

        const dataChart3 = new window.gapi.analytics.googleCharts.DataChart({
          query: {
            ids: 'ga:209389023', // <-- Replace with the ids value for your view.
            'start-date': `${this.chart3}daysAgo`,
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
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: #f5f5f5;
  width: 210mm;
  min-height: 297mm;
}
/*@media screen and (max-width: 768px) {
  #chart-1-container {
    max-width: 300px;
  }
}*/
</style>
