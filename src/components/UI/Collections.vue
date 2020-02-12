<template>
  <div>
    <h3>Recently Added Collections</h3>
    <Resource
      v-for="resource in troves"
      :key="resource.id"
      :resource="resource"
    />
  </div>
</template>
<script>
import Resource from './Collection';
import axios from 'axios';
import MOCK_DATA from '../../mocks/db.json';

export default {
  name: 'Collections',
  components: { Resource },
  data() {
    return {
      troves: []
    };
  },
  mounted: function() {
    // generate mock data (commented code to use with live api)
    setTimeout(() => {
      this.troves = MOCK_DATA.troves.slice(1, 4);
      console.log('troves', this.troves);
    }, 2000);
    // axios
    //   .get('http://localhost:3000/troves')
    //   .then(response => {
    //     this.troves = response.data;
    //     console.log('Troves data', this.troves);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }
};
</script>
<style scoped></style>
