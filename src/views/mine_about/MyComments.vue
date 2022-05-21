<template>
<div>老子的评论</div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "MyComments",
  methods: {
    ...mapMutations('detailsStore', ['SET_ACTIVE_TAG_NAME']),
  },
  beforeMount() {
    this.SET_ACTIVE_TAG_NAME('comments')
  }
}
</script>

<style scoped>

</style>