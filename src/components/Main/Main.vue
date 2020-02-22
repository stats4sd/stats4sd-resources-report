<template>
  <Fragment>
    <div id="content" class="p-4 p-md-5 pt-5">
      <p>Content</p>
      <router-view> </router-view>
    </div>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';
export default {
  name: 'Main',
  components: { Fragment }
};
</script>

<style></style>
