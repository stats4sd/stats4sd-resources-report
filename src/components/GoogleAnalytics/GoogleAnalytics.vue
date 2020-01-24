<template>
  <div>
    <button class="btn-primary" @click="printReport">Export Report</button>
    <div id="report">
      <div id="view-selector-container"></div>

      <div id="embed-api-auth-container"></div>
      <div>
        <header class="Titles">
          <h3 class="Titles-main">Sessions</h3>
          <div class="Titles-sub">Last 120 days</div>
        </header>
        <div id="chart-container"></div>
      </div>

      <div>
        <header class="Titles">
          <h3 class="Titles-main">Top Countries by Sessions</h3>
          <div class="Titles-sub">Last 120 days</div>
        </header>
        <div id="chart-container-2"></div>
      </div>
      <div>
        <header class="Titles">
          <h3 class="Titles-main">Top Viewed Pages</h3>
          <div class="Titles-sub">Last 120 days</div>
        </header>
        <div id="chart-container-3"></div>
      </div>
    </div>
  </div>
</template>
<script>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
export default {
  name: 'GoogleAnalytics',

  mounted: function() {
    this.loadData();

    //Periodcally make a request
    /*setInterval(
      function() {
        this.loadData();
      }.bind(this),
      10000
    );*/
  },
  methods: {
    loadData() {
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
            'start-date': '150daysAgo',
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

        //Chart 2 for countries
        const dataChart2 = new window.gapi.analytics.googleCharts.DataChart({
          query: {
            metrics: 'ga:sessions',
            dimensions: 'ga:country',
            'start-date': '150daysAgo',
            'end-date': 'yesterday',
            'max-results': 6,
            sort: '-ga:sessions'
          },

          chart: {
            container: 'chart-container-2',
            type: 'PIE',
            options: {
              width: '100%',
              pieHole: 4 / 9
            }
          }
        });

        viewSelector.on('change', ids => {
          dataChart2.set({ query: { ids: ids } }).execute();
        });

        //chart 3 for most viewed pages/resources
        const dataChart3 = new window.gapi.analytics.googleCharts.DataChart({
          query: {
            ids: 'ga:201510174',
            'start-date': '120daysAgo',
            'end-date': 'yesterday',
            metrics: 'ga:pageviews',
            dimensions: 'ga:pagePathLevel1',
            sort: '-ga:pageviews',
            filters: 'ga:pagePathLevel1!=/',
            'max-results': 7
          },
          chart: {
            container: 'chart-container-3',
            type: 'PIE',
            options: {
              width: '100%',
              pieHole: 4 / 9
            }
          }
        });
        //dataChart3.execute();
        viewSelector.on('change', ids => {
          dataChart3.set({ query: { ids: ids } }).execute();
        });
      });
    },
    printReport() {
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
#view-selector-container {
  display: none;
}
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
