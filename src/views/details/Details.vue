<template>
  <div class="zk-detail">
<!--    <br><br>0<br><br><br><br><br>1<br><br><br><br><br>2<br><br><br><br><br>3<br><br><br><br>-->
<!--    <br><br>0<br><br><br><br><br>1<br><br><br><br><br>2<br><br><br><br><br>3<br><br><br><br>-->
<!--    <br><br>0<br><br><br><br><br>1<br><br><br><br><br>2<br><br><br><br><br>3<br><br><br><br>-->
<!--    <br><br>0<br><br><br><br><br>1<br><br><br><br><br>2<br><br><br><br><br>88<br><br><br><br>-->
    <div class="zk-detail-workspace">
      <div style="height: 20px"></div>
      <div class="zk-detail-top">
        <span class="cmt-name">{{ communityObj.name }}</span>
        <span>我要评价</span>
      </div>

      <div class="zk-detail-tags">
        <span :class="{'tag-default':true, 'tag-active':activeCommentTagName === 'rate'}"
              @click="toggleTag('rate')">详细评分</span>
        <span :class="{'tag-default':true, 'tag-active':activeCommentTagName === 'comment'}"
              @click="toggleTag('comment')">查看短评</span>

        <div style="height: 1px; background-color: #BBAB95; width: 100%; margin-bottom: 20px"></div>
      </div>

<!--      组件区-->
      <div>
        <keep-alive>
          <router-view name="communityDetail"></router-view>
        </keep-alive>
      </div>
    </div>

  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "Details",
  // props: ['communityObj'] // 不需要，因为在store里面存储了，小区信息需要在多个组件公用，store最方便。
  data() {
    return {
      // 果然，不能在data中引用computed的属性，因为computed的初始化顺序更靠后，所以这里在初始化时获取不到计算属性的值。
      // activeCommentTagName: this.activeCommentTagName,
    }
  },
  computed: {
    ...mapState('detailsStore', ['communityObj','activeCommentTagName'])
  },
  methods: {
    ...mapMutations('headerStore', ['SET_OTHERS']),
    ...mapMutations('detailsStore',['SET_ACTIVE_COMMENT_TAG_NAME']),
    toggleTag(tagName) {
      console.log(this.activeCommentTagName,' - ', tagName)
      if (this.activeCommentTagName === tagName) return
      console.log('正在打开:', tagName)
      // this.activeCommentTagName = tagName
      this.$router.push('/detail/'+ tagName)

    }
  },
  beforeMount() {
    console.log("进入Detail页面")
    this.SET_OTHERS();
  },
// activated配合keep-alive使用，基础啊...真是...
  activated() {
    console.log("进入Detail页面")
    this.SET_OTHERS();
  }
  ,
}
</script>

<style scoped>
.zk-detail {
  /*position: relative;*/
  position: absolute;
  top:0;
  width: 100%;
  height: 100%;
  /*!*margin-left: 10%;*!*/
  background-color: rgba(245, 245, 245, 0.66);
  overflow: auto;
  z-index: -1;
}

.zk-detail::-webkit-scrollbar {
  display: block;
  background-color: rgba(255, 255, 255, 0.6);
  width: 12px;
  border: solid 1px rgba(187, 171, 149, 0.5);
  border-right-color: rgba(187, 171, 149, 1);
}

.zk-detail::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 2px rgba(50, 50, 50, 0.1);
}

.zk-detail::-webkit-scrollbar-thumb {
  background-color: rgba(187, 171, 149, 0.5);
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 2px rgba(204, 196, 153, 0.3);
}

.zk-detail::-webkit-scrollbar-thumb:active {
  background-color: rgba(187, 171, 149, 0.8);
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 2px rgba(204, 196, 153, 0.3);
}


.zk-detail-workspace {
  margin-top: 60px;
  padding-bottom: 60px;
  width: 80%;
  /*height: 100%;*/
  margin-left: 10%;
  /*border: solid 1px crimson;*/
}

.zk-detail-top {
  text-align: left;
  user-select: none;
}

.cmt-name {
  font-size: 24px;
  margin: 0 24px 0 0;
}

.cmt-name + span {
  font-size: 10px;
  color: rgba(0, 0, 0, 0.4);
}

.cmt-name + span:hover {
  color: rgba(0, 0, 0, 0.7);
}

.cmt-name + span:active {
  color: rgba(0, 0, 0, 1);
}

.zk-detail-tags {
  margin-top: 24px;
  text-align: left;
  cursor: default;
  user-select: none;
  /*margin-left: 24px;*/
}

.tag-default {
  display: inline-block;
  text-align: center;
  height: 28px;
  line-height: 28px;
  width: 78px;
  font-size: 14px;
  color: #9f8f7c;
  /*background-color: white;*/
  /*border: solid 1px #BBAB95;*/
  margin: 6px 0 0 0;
}

.tag-active {
  background-color: #BBAB95;
  /*border: solid 1px #BBAB95;*/
  color: white;
}

</style>