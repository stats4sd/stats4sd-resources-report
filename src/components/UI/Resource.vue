<template>
  <div>
    <div class="card mb-3" style="max-width: 740px;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img
            src="https://source.unsplash.com/random/280x180"
            class="card-img"
            alt=""
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ resource.title }}</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p class="card-text">
              <small class="text-muted"
                >Added {{ resource.created_at }} ago</small
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Resource',
  props: ['resource']
};
</script>
<style scoped></style>
