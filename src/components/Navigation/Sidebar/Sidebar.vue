<template>
  <div class="col-md-2 d-none d-md-block bg-light sidebar">
    <nav>
      <div class="sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/resources" class="nav-link"
              >Resources</router-link
            >
          </li>
           <li class="nav-item">
            <router-link to="/collections" class="nav-link"
              >Collections</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
};
</script>

<style></style>
