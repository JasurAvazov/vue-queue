<template>
  <div class="home">
    <div class="container">
      <h1 class="title">Выберите услугу</h1>
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
  font-style: 32px;
  text-align: center;
  margin-bottom: 3rem;
}
</style>
