<template>
  <div>
    <div id="mine-left-bar">

      MINE<br/>
      Center

    </div>
  </div>

</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "MineCenter",
  computed: {},
  methods: {
    ...mapMutations('headerStore', ['SET_MAIN', 'SET_MAP', 'SET_MINE']),
  },
  beforeMount() {

  },
  activated() {
    this.SET_MAIN(false);
    this.SET_MAP(false);
    this.SET_MINE(true);
  },
  // beforeRouteEnter(from, to, next) {
  //   next()
  // },
}
</script>

<style scoped>
#mine-left-bar {
  float: left;
  position: fixed;
  width: 15%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: -300;
  border: solid 1px #BBAB95;
}
</style>