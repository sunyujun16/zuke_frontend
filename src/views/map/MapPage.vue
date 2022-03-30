<template>
  <div id="zuke-my-page">
    <img class="temp-bg" alt="temp-bg" src="@/assets/img/map/map-demo.png"/>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "MapPage",
  data() {
    return {}
  },
  methods: {
    ...mapMutations('headerStore', ['SET_MAIN', 'SET_MAP', 'SET_MINE']),
  },
  activated() {
    this.SET_MAIN(false);
    this.SET_MAP(true);
    this.SET_MINE(false);
  },
  // beforeRouteEnter(from, to, next) {
  //   next()
  // },

}
</script>

<style scoped>
#zuke-my-page {
  position: fixed;
  /*left: 20%;*/
  width: 100%;
  height: 100%;
  /*background-color: red;*/
  z-index: -200;
}

.temp-bg {
  opacity: 1;
  object-fit: fill;
  /*height: 900px;*/
  width: 100%;
  height: 100%;
}
</style>