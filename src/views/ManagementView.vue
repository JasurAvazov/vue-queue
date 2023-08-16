<template>
  <div class="management">
    <Passport />
    <President />
    <Check />
  </div>
</template>

<script>
import Passport from "../components/management/Passport.vue";
import President from "../components/management/President.vue";
import Check from "../components/management/Check.vue";

export default {
  name: 'ManagementView',
  components: {
    Passport,
    President,
    Check,
  }
}
</script>