<template>
  <div>
    <div class="card mb-2">
      <div class="row no-gutters">
        <div class="col-md-4">
          ,
          <img
            :src="'https://stats4sd.org/storage/' + resource.cover_image"
            class="card-img"
            alt
            width="70"
            height="130"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ resource.title.slice(0, -3) }}</h5>
            <p class="card-text">
              {{ resource.description.substring(0, 100) }}...
              <a
                target="_blank"
                :href="'https://stats4sd.org/resources/' + resource.id"
              >Read more</a>
            </p>
            <p>
              <small class="text-muted">Added {{ resource.created_at | moment }}</small>
            </p>

            <div v-for="r in resources" v-if="r[0] === `/resources/${resource.id}`" :key="r">
              <p>
                Times Viewed:
                <small class="text-muted">{{ r[1] }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
const { JWT } = require('google-auth-library');

export default {
  name: 'Resource',
  filters: {
    moment: function(date) {
      return moment(date).fromNow();
    }
  },
  props: {
    resource: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      rows: []
    };
  },
  computed: {
    resources: function() {
      function filterString(array) {
        return array.filter(
          innerArray => innerArray[0].toString().includes('/resources') //check if string contains /resources to omit other urls
        );
      }

      return filterString(this.rows);
    }
  },
  mounted: function() {
    this.getData();
  },
  methods: {
    getData: function() {
      console.log('get data');
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

            console.log('New row data', this.rows[0][0]);
          });
      });
    }
  }
};
</script>
<style scoped>
.card {
  max-width: 740px;
  max-height: 200px;
}
</style>
