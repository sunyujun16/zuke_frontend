<template>
  <div class="community-container">
    <transition name="community-show" appear>
      <div class="community-list" v-show="showList">
        <div class="zuke-community-item">
          <img class="community-small-img" src="@/assets/img/demos/ted-small.jpg" alt="demo_img">

          <div style="clear: left"></div>
        </div>
        <div class="zuke-community-item">0</div>
        <div class="zuke-community-item"></div>
        <div class="zuke-community-item">1</div>
        <div class="zuke-community-item"></div>
        <div class="zuke-community-item">2</div>
        <div class="zuke-community-item"></div>
        <div class="zuke-community-item">3</div>
        <div class="zuke-community-item"></div>
        <div class="zuke-community-item">4</div>
      </div>

    </transition>

    <input id="toggle-list-button" type="button" :class="buttonClass" value="&lt;" @click="toggleList">
  </div>


</template>

<script>
export default {
  name: "CommunityList",
  data() {
    return {
      showList: true,
      buttonClass: 'zuke-community-side-button-r'
    }
  },
  beforeMount() {

  },
  mounted() {

  },
  methods: {
    toggleList() {
      this.showList = !this.showList
      // 改变button的文字
      let element = document.getElementById('toggle-list-button');
      switch (this.showList) {
        case false:
          this.buttonClass = 'zuke-community-side-button-l';
          setTimeout(() => {
            element.value = '>';
          }, 300)

          break;
        case true:
          this.buttonClass = 'zuke-community-side-button-r';
          setTimeout(() => {
            element.value = '<';
          }, 300)
      }


    }

  }
}
</script>

<style scoped>
.community-list {
  /*float: left;*/
  position: fixed;
  width: 20%;
  min-width: 300px;
  height: 84%;
  background-color: rgba(245, 245, 245, 0.8);
  z-index: -100;
  padding-top: 6px;
  padding-bottom: 100px;
  overflow: scroll;
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

.zuke-community-item {
  margin-top: 20px;
  height: 150px;
  width: 90%;
  margin-left: 5%;
  background-color: lightblue;
  border: solid 1px red;
}

/* button相关样式 注意transition属性的时间和list整体(下面的transform样式)要配合好*/
.zuke-community-side-button-r {
  position: fixed;
  left: 20%;
  top: 46%;
  height: 100px;
  opacity: 0.8;
  color: #9f8f7c;
  font-weight: bold;
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
  color: #9f8f7c;
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

/* 左侧边栏里面的小区缩略图相关设置 */
.community-small-img {
  float: left;
  height: 100%;
  border-right: solid 1px crimson;
}


</style>