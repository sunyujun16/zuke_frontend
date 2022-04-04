<template>
  <div class="mine-page">
    <div class="mine-left-bar">
      <div style="height: 20px"></div>
      <div :class="{
        'mine-center-left-tag':true,
         'tag-active':activeTagName === 'message'
      }"
           @click="toggleTag('message')">
        <span class="zk-tag-text">我的消息</span>
      </div>
      <div :class="{
        'mine-center-left-tag':true,
         'tag-active':activeTagName === 'favors'
      }"
           @click="toggleTag('favors')">
        <span class="zk-tag-text">我的收藏</span>
      </div>
      <div :class="{
        'mine-center-left-tag':true,
         'tag-active':activeTagName === 'comments'
         }"
           @click="toggleTag('comments')">
        <span class="zk-tag-text">我的评价</span>
      </div>
      <div :class="{
        'mine-center-left-tag':true,
         'tag-active':activeTagName === 'settings'
      }"
           @click="toggleTag('settings')">
        <span class="zk-tag-text">我的设置</span>
      </div>
      <div :class="{
        'mine-center-left-tag':true,
         'tag-active':activeTagName === 'service'
         }"
           @click="toggleTag('service')">
        <span class="zk-tag-text">客户服务</span>
      </div>
    </div>
    <!-- 涵盖页面： LikesMe / ReplyMe / PrivateMessage 后台更新频繁，每次访问需更新数据-->
    <div class="mine-right-container">
      <router-view name="center_right"></router-view>
    </div>


  </div>

</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "MineCenter",
  components: {},
  data() {
    return {
      tagNames: ['']
    }
  },
  computed: {
    ...mapState('detailsStore', ['hrefValue', "activeTagName"])
  },
  methods: {
    ...mapMutations('headerStore', ['SET_MAP', 'SET_MAIN', 'SET_MINE']),
    ...mapMutations('detailsStore', ['SET_ACTIVE_TAG_NAME']),
    toggleTag(tagName) {
      // 其实没必要放store里面，因为只有本组件在用这些tagName。唔...是个经验。
      console.log('- ' + tagName.toUpperCase() + ' - tag clicked.')
      if (this.activeTagName !== tagName) {
        this.SET_ACTIVE_TAG_NAME(tagName)
        this.$router.push('/mine/' + tagName)
        return
      }
      console.log('redundant click, do fucking nothing.')
    },
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
.mine-page {
  position: absolute;
  width: 100%;
  height: calc(100% - 60px);
  /*border-bottom: solid 122px red;*/
}

.mine-left-bar {
  float: left;
  /*position: absolute;*/
  width: 10%;
  min-width: 150px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: -300;
  user-select: none;
  border-right: solid 1px #BBAB95;
  border-left: solid 1px #BBAB95;
  margin-left: 20%;
}

.mine-center-left-tag {
  height: 36px;
  width: 100%;
  margin: 40px 0 0 0;
  background-color: transparent;
  border-top: solid 1px #BBAB95;
  border-bottom: solid 1px #BBAB95;
  border-radius: 0;
  color: #9f8f7c;
  transition: 0.1s ease;
}

.tag-active {
  border-top: solid 1px #BBAB95;
  border-bottom: solid 1px #BBAB95;
  background-color: rgba(187, 171, 149, 0.8);
  box-shadow: 0 1px 3px #9f8f7c;
  color: white;
  text-shadow: 1px 1px 1px rgba(159, 143, 124, 0.5);
  cursor: default;
  transition: 0.1s ease;
}


.mine-center-left-tag:hover {
  border-top: solid 1px #BBAB95;
  border-bottom: solid 1px #BBAB95;
  background-color: rgba(187, 171, 149, 0.7);
  color: white;
  cursor: default;
  transition: 0.1s ease;
}

.zk-tag-text {
  font-size: 18px;
  line-height: 36px;
}

.mine-right-container {
  float: left;
  border-right: solid 1px #BBAB95;
  border-left: solid 1px #BBAB95;
  width: 48%;
  height: 100%;
  margin-left: 2%;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: -100;

}

</style>