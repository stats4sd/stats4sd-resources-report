<template>
  <div>
    
    <h3>Recently Added Resources</h3>
    <div class="text-center" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <Resource
      v-for="resource in troves"
      :key="resource.id"
      :resource="resource"
    />
    <h3>Recently Added Collections</h3>
    <div class="text-center" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <Collection
      v-for="collection in collections"
      :key="collection.id"
      :collection="collection"
    />
  </div>
</template>
<script>
import Resource from './Resource';
import Collection from './Collection';
import MOCK_DATA from '../../mocks/db.json';

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
    // generate mock data (commented code to use with live api)
    setTimeout(() => {
      this.troves = MOCK_DATA.troves.slice(1, 4);
      this.collections = MOCK_DATA.collections.slice(1, 4);
      this.loading = false;
    }, 2000);
  }
};
</script>
<style scoped></style>
