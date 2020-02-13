<template>
  <div>
    <h3>Recently Added Collections</h3>
    <Collection
      v-for="collection in collections"
      :key="collection.id"
      :collection="collection"
    />
  </div>
</template>
<script>
import Collection from './Collection';
import MOCK_DATA from '../../mocks/db.json';

export default {
  name: 'Collections',
  components: { Collection },
  data() {
    return {
      collections: []
    };
  },
  mounted: function() {
    setTimeout(() => {
      this.collections = MOCK_DATA.collections.slice(1, 4);
    }, 2000);
  }
};
</script>
<style scoped></style>
