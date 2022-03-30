<template>
  <div>
    详情页
    <div></div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "Details",
  // props: ['communityObj'] // 不需要，因为在store里面存储了，小区信息需要在多个组件公用，store最方便。
  methods: {
    ...mapMutations('headerStore', ['SET_OTHERS'])
  },
  beforeMount() {
    console.log("进入Detail页面")
    this.SET_OTHERS();
  },
  // activated配合keep-alive使用，基础啊...真是...
  activated() {
    console.log("进入Detail页面")
    this.SET_OTHERS();
  },
}
</script>

<style scoped>

</style>