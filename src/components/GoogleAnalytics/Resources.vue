<template>
  <div>Resources</div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'Resources',
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
