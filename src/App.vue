<template>
  <div id="app">
    <HanZi/>
  </div>
</template>

<script>
import HanZi from './components/HanZi.vue'

export default {
  name: 'app',
  components: {
    HanZi,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
