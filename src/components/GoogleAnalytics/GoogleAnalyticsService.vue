<template>
  <div>
    <button class="btn btn-secondary" @click="printReport">
      Download Report
    </button>
    <div id="report">
      <div>
        <header class="Titles">
          <div class="float-right">
            <select
              :key="chart1"
              v-model="chart1"
              class="custom-select"
              @change="getData"
            >
              <option disabled value>Please Select One</option>
              <option value="30">Last 30 days</option>
              <option value="60">Last 60 days</option>
              <option value="90">Last 90 days</option>
              <option value="120">Last 120 days</option>
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
            <select
              :key="chart3"
              v-model="chart3"
              class="custom-select"
              @change="getData"
            >
              <option disabled value>Please Select One</option>
              <option value="30">Last 30 days</option>
              <option value="60">Last 60 days</option>
              <option value="90">Last 90 days</option>
              <option value="120">Last 120 days</option>
            </select>
          </div>
          <h3 class="Titles-main">Top Countries by User Sessions</h3>
          <div class="Titles-sub">Last {{ chart3 }} days</div>
        </header>
        <div id="chart-3-container"></div>
      </div>
      <div>
        <header class="Titles">
          <div class="float-right">
            <select
              :key="chart2"
              v-model="chart2"
              class="custom-select"
              @change="getData"
            >
              <option disabled value>Please Select One</option>
              <option value="30">Last 30 days</option>
              <option value="60">Last 60 days</option>
              <option value="90">Last 90 days</option>
              <option value="120">Last 120 days</option>
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
              <tr v-for="row in resources" :key="row[0]">
                <td>
                  <a target="_blank" :href="'https://stats4sd.org' + row[0]">{{
                    row[0]
                  }}</a>
                </td>
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
import { filterGAPageData } from '../../utils';
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
      return filterGAPageData(this.rows, '/resources/');
    }
  },
  mounted: function mounted() {
    // note, requires google.com/jsapi script in index.html
    // TODO - check if script already loaded
    const script = document.createElement('script');

    //check if the google_maps_key is added in env variables
    if (!process.env.VUE_APP_google_maps_key) {
      alert(
        'Maps API key must be defined in .env file. View Instructions.md for more info'
      );
      throw new Error('Maps API key be defined in .env file');
    }
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_google_maps_key}`;
    //Before appending script, check if script is not added when compenent re-mounts
    //to prevent it from being added multiple tines
    const children = document.getElementsByTagName('head')[0].childNodes;
    let found = false;
    for (let i = 0; i < children.length; i++) {
      if (children[i].src === script.src) {
        found = true;
        break;
      }
    }
    if (found == false) {
      document.getElementsByTagName('head')[0].append(script);
    }
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
        const private_key = VUE_APP_private_key.replace(/\\n/g, '\n');
        const client = new JWT(VUE_APP_client_email, null, private_key, [
          'https://www.googleapis.com/auth/analytics.readonly'
        ]);

        const response = await client.getAccessToken();
        const access_token = response.token;

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
            type: 'GEO',
            options: {
              width: '100%'
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
  width: 100%;
}

@media screen and (max-width: 500px) {
  #report {
    width: 100%;
  }
}
</style>
