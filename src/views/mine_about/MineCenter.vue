<template>
  <div class="mine-page">
    <div class="mine-left-bar">
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
      console.log('- ' + tagName.toUpperCase() + ' - tag clicked.')
      if (this.activeTagName !== tagName){
        this.SET_ACTIVE_TAG_NAME(tagName)
        // switch (tagName) {
        //   case 'message': {
        //     break
        //   }
        //   case 'favors': {
        //     break
        //   }
        //   case 'comments': {
        //     break
        //   }
        //   case 'settings': {
        //     break
        //   }
        //   case 'service': {
        //
        //     break
        //   }
        //   default: {
        //     console.log('toggleTag()错误参数，组件：' + this.name)
        //   }
        // }
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
  width: 100%;
}

.mine-left-bar {
  float: right;
  position: fixed;
  width: 10%;
  min-width: 150px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: -300;
  user-select: none;
  border: solid 1px #BBAB95;
  right: 70%;
  /*margin: 0 0 0 20%;*/
  padding-top: 50px;
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
  font-size: 20px;
  line-height: 36px;
}

.mine-right-container {
  float: left;
  position: fixed;
  /*right: 0;*/
  width: 48%;
  height: 100%;
  left: 32%;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: -100;

}

</style>