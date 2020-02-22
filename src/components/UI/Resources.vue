<template>
  <div>
    <h3>Recently Added Resources</h3>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <Resource v-for="resource in troves" :key="resource.id" :resource="resource" />
    <h3>Recently Added Collections</h3>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <Collection v-for="collection in collections" :key="collection.id" :collection="collection" />
  </div>
</template>
<script>
import Resource from './Resource';
import Collection from './Collection';
import MOCK_DATA from '../../mocks/db.json';
import axios from 'axios';

export default {
  name: 'Resources',
  components: { Resource, Collection },
  data() {
    return {
      loading: true,
      troves: [],
      collections: []
    };
  },

  mounted: function() {
    const Url = 'https://stats4sd.org/api/troves';
    axios
      .get('https://cors-anywhere.herokuapp.com/' + Url)

      .then(res => {
        this.troves = res.data.slice(1, 4);
      })
      .catch(err => console.log('Error: ', err));
    // generate mock data (commented code to use with live api)
    setTimeout(() => {
      this.collections = MOCK_DATA.collections.slice(1, 4);
      this.loading = false;
    }, 2000);
  }
};
</script>
<style scoped></style>
