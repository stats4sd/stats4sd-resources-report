<template>
  <Fragment>
    <Toolbar />

    <div class="wrapper d-flex align-items-stretch">
      <NewSidebar />
      <Main />
    </div>
  </Fragment>
</template>

<script>
import NewSidebar from '../Navigation/Sidebar/NewSidebar';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Main from '../Main/Main';
import { Fragment } from 'vue-fragment';
export default {
  name: 'Layout',
  components: {
    NewSidebar,
    Toolbar,
    Main,
    Fragment
  }
};
</script>

<style></style>
