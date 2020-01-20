<template>
  <div class="container-fluid">
    <Toolbar />
    <Sidebar />
    <Main />
  </div>
</template>

<script>
import Sidebar from "../Navigation/Sidebar/Sidebar";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Main from "../Main/Main";
export default {
  name: "Layout",
  components: {
    Sidebar,
    Toolbar,
    Main
  }
};
</script>

<style>
</style>