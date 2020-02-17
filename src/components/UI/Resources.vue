<template>
  <div>
    <h3>Recently Added Resources</h3>
    <Resource v-for="resource in troves" :key="resource.id" :resource="resource" />
    <h3>Recently Added Collections</h3>
    <Collection v-for="collection in collections" :key="collection.id" :collection="collection" />
  </div>
</template>
<script>
import Resource from './Resource';
import Collection from './Collection';
import axios from 'axios';
import MOCK_DATA from '../../mocks/db.json';

export default {
  name: 'Resources',
  components: { Resource, Collection },
  data() {
    return {
      troves: [],
      collections: []
    };
  },

  mounted: function() {
    // generate mock data (commented code to use with live api)
    setTimeout(() => {
      this.troves = MOCK_DATA.troves.slice(1, 4);
      this.collections = MOCK_DATA.collections.slice(1, 4);

      console.log('collections', this.collections);
    }, 2000);
  }
};
</script>
<style scoped></style>
