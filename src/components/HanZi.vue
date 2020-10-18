<template>
  <div>
    <header>
      <div class="collapse bg-dark" id="navbarHeader">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4 class="text-white">关于</h4>
              <p class="text-muted">
                一个社畜的自我修养.
              </p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4">
              <h4 class="text-white">联系我</h4>
              <ul class="list-unstyled">
                <li><a href="#" class="text-white">Wechat(tqcenglish)</a></li>
                <li><a href="#" class="text-white">邮箱(tqcenglish@gmail.com)</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark shadow-sm">
        <div class="container d-flex justify-content-between">
          <a href="#" class="navbar-brand d-flex align-items-center">
            <!-- logo -->
            <strong>字帖</strong>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarHeader"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>
    <main>
      <section class="jumbotron text-center">
        <div class="container">
          <h1>字帖练习</h1>
          <p class="lead text-muted">习毛笔字，久疏学习，建立此站，共勉</p>
          <div class="row">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">输入文本</span>
              </div>
              <textarea class="form-control" v-model="lanting" rows="10"></textarea>
            </div>
          </div>
          <div class="row justify-content-around">
            <button class="btn btn-primary my-2" v-on:click="animateAll">动起来</button>
            &nbsp;&nbsp;&nbsp;
            <button class="btn btn-success my-2" v-on:click="createDiv">更新文本</button>
          </div>
        </div>
      </section>
      <section class="hanzi">
        <div class="container-fluid">
          <div class="row">
            <div v-for="(item, index) in words" v-bind:key="index">
              <div
                v-if="item.isZi"
                :id="'character-target-div-' + index"
                v-on:click="animate(index)"
              ></div>
              <div v-if="!item.isZi" class="pun">
                {{ item.zi }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
const HanziWriter = require("hanzi-writer");
const reg = new RegExp("[\\u4E00-\\u9FFF]+$");

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
    },
    animateAll: async function () {
      for (let writer of this.writers) {
        if (writer.animateCharacter) {
          await writer.animateCharacter();
        }
      }
    },

    createDiv: function () {
      this.$nextTick(() => {
        this.words = [];
      });

      setTimeout(() => {
        this.words = this.lanting.split("").map((zi) => {
          return {
            zi,
            isZi: reg.test(zi),
          };
        });
        this.$nextTick(this.createHanzi);
      }, 1000);
    },

    createHanzi: function () {
      this.writers = [];
      this.words.forEach((zi, index) => {
        if (zi.isZi) {
          const writer = HanziWriter.create(
            `character-target-div-${index}`,
            zi.zi,
            {
              width: 100,
              height: 100,
              padding: 5,
              charDataLoader: function () {
                return require(`hanzi-writer-data/${zi.zi}`);
              },
            }
          );
          this.writers.push(writer);
          return;
        }
        this.writers.push(zi.zi);
      });
    },
  },
};
</script>

<style scoped>
.row {
  padding: 10px;
}

/*biaodian*/
.pun {
  display: flex;
  align-items: center;
  font-size: 60px;
}
</style>
