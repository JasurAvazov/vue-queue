<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

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
</style>
