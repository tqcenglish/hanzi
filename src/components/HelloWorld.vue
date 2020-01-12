<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
const HanziWriter = require('hanzi-writer');
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted: function name() {
    HanziWriter.create('character-target-div', '我', {
      width: 100,
      height: 100,
      padding: 5
    });
  }
}
</script>

<style scoped>
</style>
