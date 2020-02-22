<template>
  <Fragment>
    <Layout />
  </Fragment>
</template>

<script>
import Layout from './components/Layout/Layout';
import { Fragment } from 'vue-fragment';
export default {
  name: 'App',
  components: {
    Layout,
    Fragment
  }
};
</script>

<style>
@import './assets/css/sidebarStyle.css';
</style>
