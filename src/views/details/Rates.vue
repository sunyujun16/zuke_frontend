<template>
  <div class="rate-container">
    <div>
      <span class="card-title">房屋质量</span>
      <DetailCard :rate-type-item="communityObj.rate.quality" :prefix="'quality'"/>
      <div class="zuke-rate-divide-line"></div>
      <!--      <div style="clear: both"></div>-->
    </div>
    <div>
      <span class="card-title">内部设施</span>
      <DetailCard :rate-type-item="communityObj.rate.inside" :prefix="'inside'"/>
      <div class="zuke-rate-divide-line"></div>
    </div>


  </div>
</template>

<script>
import DetailCard from "@/views/details/DetailCard";
import {mapMutations} from "vuex";

export default {
  name: "Rates",
  components: {DetailCard},
  data() {
    return {
      communityObj: this.$store.state.detailsStore.communityObj
    }
  },
  mounted() {
    // console.log('打印quality属性值: ', this.communityObj.rate.quality)
  },
  computed: {},
  methods: {
    ...mapMutations('detailsStore',['SET_ACTIVE_COMMENT_TAG_NAME']),
  },
  activated() {
    console.log("修改活动标签为：rate")
    this.SET_ACTIVE_COMMENT_TAG_NAME('rate')
  }

}
</script>

<style scoped>
.rate-container {
  width: 100%;
  height: 100%;
  text-align: left;
  /*border: solid 1px saddlebrown;*/
}

.card-title {
  display: block;
  text-align: left;
  /*font-weight: bold;*/
  font-size: 18px;
  line-height: 18px;
  margin: 12px 0;
}

.zuke-rate-divide-line {
  height: 1px;
  background-color: #BBAB95;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
}


</style>