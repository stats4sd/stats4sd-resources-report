<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light"
    :class="{ navbarOpen: show }"
  >
    <router-link class="navbar-brand" to="/">
      <img
        src="https://stats4sd.org/img/stats4sd.png"
        width="100px"
        alt="stats4sd"
      />
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      @click.stop="toggleNavbar()"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      id="navbarSupportedContent"
      class="collapse navbar-collapse"
      :class="{ show: show }"
    >
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/"
            >Website <span class="sr-only">(current)</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/resources">Resources</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Toolbar',
  data() {
    return {
      show: true
    };
  },
  methods: {
    toggleNavbar() {
      this.show = !this.show;
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 992px) {
  .navbar {
    display: none;
  }
}
</style>
