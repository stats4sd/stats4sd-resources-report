<template>
  <nav id="sidebar">
    <div class="p-4">
      <h1>
        <router-link to="/" class="logo">
          Stats4SD
          <span>Resources Report</span>
        </router-link>
      </h1>
      <ul class="list-unstyled components mb-5">
        <li class="active">
          <router-link to="/">
            <span class="fa fa-home mr-3"></span> Website
          </router-link>
        </li>
        <li>
          <router-link to="/resources" >
            <span class="fa fa-sticky-note mr-3"></span> Resources
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Sidebar'
};
</script>

<style></style>
