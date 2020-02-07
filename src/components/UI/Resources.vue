<template>
  <div>
    <h3>Resources Added</h3>
    <Resource
      v-for="resource in troves"
      :key="resource.id"
      :resource="resource"
    />
  </div>
</template>
<script>
import Resource from './Resource';
import axios from 'axios';
export default {
  name: 'Resources',
  components: { Resource },
  data() {
    return {
      troves: []
    };
  },
  mounted: function() {
    axios
      .get('http://localhost:3000/troves')
      .then(response => {
        this.troves = response.data;
        console.log('Troves data', this.troves);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style scoped></style>
