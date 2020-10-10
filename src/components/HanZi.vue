<template>
  <div class="hello">
    <div id="character-target-div"></div>
    <button @click="animate()">动起来</button>
  </div>
</template>

<script>
const HanziWriter = require('hanzi-writer');
export default {
  name: 'HanZi',
  props: {
    msg: String
  },
  data: function () {
    return {
      writer: null,
    }
  },
  mounted: function name() {
    this.writer = HanziWriter.create('character-target-div', '唐', {
      width: 100,
      height: 100,
      padding: 5
    });
  },
  methods: {
    animate: function () {
      this.writer.animateCharacter();
    }
  }
}
</script>

<style scoped>
</style>
