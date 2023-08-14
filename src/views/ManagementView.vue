<template>
  <div class="management">
    <Queue />
  </div>
</template>

<script>
import Queue from "../components/management/Queue.vue";

export default {
  name: 'ManagementView',
  components: {
    Queue
  }
}
</script>