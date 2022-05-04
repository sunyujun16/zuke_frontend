<template>
  <div class="community-container">
    <transition name="community-show" appear>
      <div class="community-list" v-show="showList">
        <CommunityInfoCard v-for="community in community_list" :community="community" :key="community.id"/>
        <div style="margin: 0 0 20px 0; color: var(--grey7)">正在加载...</div>
      </div>
    </transition>

    <input id="toggle-list-button" type="button" :class="buttonClass" value="&lt;" @click="toggleList">
  </div>


</template>

<script>
import CommunityInfoCard from "@/views/map/CommunityInfoCard";
import {mapMutations} from "vuex";

export default {
  name: "CommunityList",
  components: {CommunityInfoCard,},
  data() {
    return {
      showList: true,
      buttonClass: 'zuke-community-side-button-r',
      community_list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 占位用，待连接数据库
    }
  },
  beforeMount() {

  },
  mounted() {

  },
  methods: {
    ...mapMutations('mapStore', ['ON_COM_SHOW', 'ON_COM_HIDE']),
    toggleList() {
      this.showList = !this.showList
      // 改变button的文字
      let element = document.getElementById('toggle-list-button');
      switch (this.showList) {
        case false:
          this.buttonClass = 'zuke-community-side-button-l';
          this.ON_COM_HIDE()
          setTimeout(() => {
            element.value = '>';
          }, 300)
          break;
        case true:
          this.buttonClass = 'zuke-community-side-button-r';
          this.ON_COM_SHOW()
          setTimeout(() => {
            element.value = '<';
          }, 300)
      }


    }

  }
}
</script>

<style scoped>
.community-container {

}

.community-list {
  position: absolute;
  width: 520px;
  min-width: 300px;
  height: calc(100% - 60px);
  background-color: rgba(245, 245, 245, 0.8);
  z-index: -100;
  /*padding-top: 6px;*/
  /*padding-bottom: 100px;*/
  overflow: auto;
  box-shadow: 1px 0 3px rgba(100, 100, 100, 0.4);
}

.community-list::-webkit-scrollbar {
  background-color: rgba(255, 255, 255, 0.6);
  width: 12px;
  border: solid 1px rgba(187, 171, 149, 0.5);
  border-right-color: rgba(187, 171, 149, 1);
}

.community-list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 2px rgba(50, 50, 50, 0.1);
}

.community-list::-webkit-scrollbar-thumb {
  background-color: rgba(187, 171, 149, 0.5);
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 2px rgba(204, 196, 153, 0.3);
}

.community-list::-webkit-scrollbar-thumb:active {
  background-color: rgba(187, 171, 149, 0.8);
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 2px rgba(204, 196, 153, 0.3);
}


/* button相关样式 注意transition属性的时间和list整体(下面的transform样式)要配合好*/
.zuke-community-side-button-r {
  position: absolute;
  left: 520px;
  top: 46%;
  height: 100px;
  opacity: 0.8;
  color: #9f8f7c;
  font-weight: bold;
  /*background-color: var(--tea-op3);*/
  border: solid 1px rgba(2, 2, 2, 0.1);
  transition: 0.5s ease
}

.zuke-community-side-button-r:hover {
  opacity: 1;
  /*transition: 0.2s ease;*/
}

.zuke-community-side-button-l {
  position: fixed;
  left: 0;
  top: 46%;
  height: 100px;
  opacity: 0.8;
  font-weight: bold;
  color: var(--white);
  background-color: var(--tea-op9);
  border: solid 1px rgba(2, 2, 2, 0.1);
  transition: 0.5s ease;
}

.zuke-community-side-button-l:hover {
  opacity: 1;
  /*transition: 0.2s ease;*/
}

/* 进入的起点、离开的终点 */
.community-show-enter, .community-show-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.community-show-enter-active, .community-show-leave-active {
  transition: 0.5s ease;
  /*transition: 0.9s ease-in-out;*/
}

/* 进入的终点、离开的起点 */
.community-show-enter-to, .community-show-leave {
  transform: translateX(0);
}


</style>