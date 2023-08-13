<template>
  <div class="home">
    <div class="container">
      <h2 class="title">Выберите услугу</h2>
      <Cards />
    </div>
  </div>
</template>

<script>
import Cards from "../components/home/Cards.vue"

export default {
  name: 'HomeView',
  components: {
    Cards
  }
}
</script>

<style lang="scss" scoped>
.title{
  font-style: 22px;
  text-align: center;
  margin-bottom: 2rem;
}
</style>
