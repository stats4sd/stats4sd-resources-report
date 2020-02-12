<template>
  <div>
    <div class="card mb-2">
      <div class="row no-gutters">
        <div class="col-md-4">
          ,
          <img
            :src="'https://stats4sd.org/storage/' + collection.cover_image"
            class="card-img"
            alt
            width="70"
            height="130"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ collection.title.slice(0, -3) }}</h5>
            <p class="card-text">
              {{ collection.description.substring(0, 100) }}...
              <a
                target="_blank"
                :href="'https://stats4sd.org/collection/' + collection.id"
              >Read more</a>
            </p>
            <p>
              <small class="text-muted">Added {{ collection.created_at | moment }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'Collection',
  filters: {
    moment: function(date) {
      return moment(date).fromNow();
    }
  },
  props: {
    collection: {
      type: Object,
      default: null
    }
  }
};
</script>
<style scoped>
.card {
  max-width: 740px;
  max-height: 200px;
}
</style>
