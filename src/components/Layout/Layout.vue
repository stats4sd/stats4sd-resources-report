<template>
  <div class="container-fluid">
    <Toolbar />
    <div class="row">
      <Sidebar />
      <Main />
    </div>
  </div>
</template>

<script>
import Sidebar from '../Navigation/Sidebar/Sidebar';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Main from '../Main/Main';
export default {
  name: 'Layout',
  components: {
    Sidebar,
    Toolbar,
    Main
  }
};
</script>

<style></style>
