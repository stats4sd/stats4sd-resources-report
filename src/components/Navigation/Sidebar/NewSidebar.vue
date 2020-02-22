<template>
  <Fragment>
    <nav id="sidebar">
      <div class="p-4">
        <h1>
          <a href="/" class="logo">
            Stats4SD
            <span>Resources Report</span>
          </a>
        </h1>
        <ul class="list-unstyled components mb-5">
          <li class="active">
            <a href="#"> <span class="fa fa-home mr-3"></span> Home </a>
          </li>
          <li>
            <a href="#"> <span class="fa fa-user mr-3"></span> Resources </a>
          </li>
        </ul>
      </div>
    </nav>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';
export default {
  name: 'NewSidebar',
  components: { Fragment }
};
</script>

<style></style>
