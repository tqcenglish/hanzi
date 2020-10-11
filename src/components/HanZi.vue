<template>
  <div class="hanzi">
    <div class="container-fluid">
      <div class="row">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">输入文本</span>
          </div>
          <textarea class="form-control" v-model="lanting"></textarea>
        </div>
      </div>
      <div class="row justify-content-center">
        <button type="button" class="btn btn-primary" v-on:click="createDiv">
          更新
        </button>
      </div>
      <div class="row">
        <div v-for="(item, index) in words" v-bind:key="index">
          <div
            :id="'character-target-div-' + index"
            v-on:click="animate(index)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const HanziWriter = require("hanzi-writer");
const reg = new RegExp("[\\u4E00-\\u9FFF]+$", "g");

export default {
  name: "HanZi",
  props: {
    msg: String,
  },
  data: function () {
    return {
      lanting:
        "永和九年，岁在癸丑，暮春之初，会于会稽山阴之兰亭，修禊事也。群贤毕至，少长咸集。此地有崇山峻岭，茂林修竹，又有清流激湍，映带左右，引以为流觞曲水，列坐其次。虽无丝竹管弦之盛，一觞一咏，亦足以畅叙幽情。是日也，天朗气清，惠风和畅。仰观宇宙之大，俯察品类之盛，所以游目骋怀，足以极视听之娱，信可乐也。",
      writers: [],
      words: [],
    };
  },
  beforeMount: function () {
    this.createDiv();
  },
  mounted: function () {
    this.createHanzi();
  },
  methods: {
    animate: function (index) {
      this.writers[index].animateCharacter();

      // 所有
      // this.writers.forEach((writer) => {
      //   writer.animateCharacter();
      // });
    },

    createDiv: function () {
      this.$nextTick(() => {
        this.words = [];
      });

      setTimeout(() => {
        this.words = this.lanting.split("").filter((zi) => {
          return reg.test(zi);
        });
        this.$nextTick(this.createHanzi);
      }, 1000);
    },

    createHanzi: function () {
      this.writers = [];
      this.words.forEach((zi, index) => {
        // HanziWriter.create('character-target-div', zi, {
        //   width: 50,
        //   height: 50,
        //   padding: 5
        // })

        const writer = HanziWriter.create(`character-target-div-${index}`, zi, {
          width: 100,
          height: 100,
          padding: 5,
          charDataLoader: function () {
            return require(`hanzi-writer-data/${zi}`);
          },
        });
        this.writers.push(writer);
      });
    },
  },
};
</script>

<style scoped>
.row {
  padding: 10px;
}
</style>
