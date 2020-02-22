<template>
  <Fragment>
    <Toolbar />

    <div class="wrapper d-flex align-items-stretch">
      <Sidebar />
      <Main />
    </div>
  </Fragment>
</template>

<script>
import Sidebar from '../Navigation/Sidebar/Sidebar';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Main from '../Main/Main';
import { Fragment } from 'vue-fragment';
export default {
  name: 'Layout',
  components: {
    Sidebar,
    Toolbar,
    Main,
    Fragment
  }
};
</script>

<style></style>
