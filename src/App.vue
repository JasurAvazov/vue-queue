<template>
  <Header />
  <router-view/>
</template>

<script>
import Header from "./components/Header.vue"

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="scss">
*{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.container{
  width: 100%;
  max-width: 1400px;
  padding: 0 15px;
  margin: 0 auto;
}
#app{
  display: flex;
  flex-direction: column;
  align-content: center;
}
button{
  outline: none;
  border: none;
  cursor: pointer;
}
a{
  text-decoration: none;
}
</style>
