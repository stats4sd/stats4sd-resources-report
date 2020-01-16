<template>
  <div>
    <Toolbar />
    <Sidebar />
  </div>
</template>

<script>
import Sidebar from "../Navigation/Sidebar/Sidebar";
import Toolbar from "../Navigation/Toolbar/Toolbar";
export default {
  name: "Layout",
  components: {
    Sidebar,
    Toolbar
  }
};
</script>

<style>
</style>