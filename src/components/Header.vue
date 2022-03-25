<template>
  <div class="zuke-header">
    <!--  logo-->
    <img id="zuke_logo" alt="Vue logo" src="../assets/img/zuke_logo.png">
    <!--  icon + position-->
    <img id="position_icon" alt="position-icon" src="../assets/img/header/position.png">
    <div class="tag_position">
      <span class="text-position" style="float: left">beijing</span>
    </div>


    <!--  icon + search-->
<!--    <img id="search_ico" alt="search-icon" src="../assets/img/header/search.png" @click="doSearch(searchValue)">-->
    <img id="search_ico" alt="search-icon" src="../assets/img/header/search.png" @click="tempTest">
    <a ref="fucka" :href="fuck" style="float: left" target="_blank" v-show="false"></a>
    <label for="search_input">
      <input id="search_input" type="text" placeholder="请输入要搜索的关键词" v-model="searchValue">
    </label>

    <!--  main button
    两个class属性：tag_active取决于isActiveMain的真假，tag_default默认为true, 所以‘.tag_default{}'的CSS属性持续有效-->
    <div :class='{tag_active: isActiveMain, tag_default:true}' @click="pushToMainList">
      <span class="header-text">首页</span>
    </div>
    <div :class='{tag_active: isActiveMap, tag_default:true}' @click="pushToMapList">
      <span class="header-text">地图找房</span>
    </div>
    <div :class='{tag_active: isActiveMine, tag_default:true}' @click="pushToMineList">
      <span class="header-text">个人中心</span>
    </div>

    <!--  map search button-->

    <!--  personal center button-->

    <!--  avatar button + downside_bar-->
    <img id="avatar_ico" alt="avatar-icon" src="../assets/img/header/avatar.png">


    <div style="clear: both"></div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "Header",
  data() {
    return {
      searchValue: '',
      fuck: 'http://localhost:8080/#/map_list',
    }
  },
  computed: {
    ...mapState('headerStore',['isActiveMain','isActiveMap','isActiveMine']),

  },
  methods: {
    ...mapMutations('headerStore',['SET_MAIN','SET_MAP','SET_MINE']),
    pushToMainList(){
      if (!this.isActiveMain){
        this.$router.push('/');
      }
    },
    pushToMapList(){
      if (!this.isActiveMap){
        this.$router.push('map_list');
      }
    },
    pushToMineList(){
      if (!this.isActiveMine){
        this.$router.push('mine');
      }
    },
    doSearch(e, searchValue){
      // 其实没必要传参, 直接通过this获取即可, 此处纯属娱乐。
      // 新建页面，导航到detail页面，带1个参数--小区id，detail页面beforeMount之时，axios或jQuery向后端请求小区信息，不要keep-alive(暂定)


    },
    tempTest(){
      let target = this.$refs.fucka
      this.fuck = this.$store.state.constsStore.serverHostName + '/map_list'
      // target.setAttribute('href', window.location.origin + '/map_list')
      target.click()
    }
  }
}
</script>

<style scoped>
.zuke-header {
  /*min-width: 998px;*/
  width: 100%;
  background-color: #BBAB95;
  height: 60px;
  margin-top: 0;
  margin-bottom: 0;
  box-shadow: 0 3px 3px rgba(100, 100, 100, 0.7);
  z-index: 400;
}

#zuke_logo {
  float: left;
  height: 120%;
  margin-left: 5%;
  margin-top: 0;
}

#position_icon {
  float: left;
  height: 30%;
  margin-left: 5%;
  margin-top: 1.1%;
  margin-right: -1.4%;
  z-index: 500;
}

.tag_position {
  margin-left: 0.3%;
  width: 5%;
  float: left;
  height: 100%;
  font-size: 14px;
  text-align: left;
}

.text-position {
  float: left;
  width: 100px;
  margin-top: 22%;
  margin-left: 30%;
  color: white;
  font-size: 15px;
}

#search_ico {
  padding: 8px;
  float: left;
  height: 30%;
  margin-left: 12%;
  margin-top: 0.85%;
  margin-right: -0.2%;
  border-radius: 5px;
}
#search_ico:hover {
  margin-right: -0.3%;
  height: 33%;
  /*box-shadow: 2px 2px 2px black;*/
}
#search_ico:active {

  box-shadow: inset 1px 1px 1px rgba(0,0,0,0.3), inset -1px -1px 1px rgba(159,143,124,0.8);
}

#search_input {
  width: 15%;
  float: left;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  line-height: 18px;
  margin: 0.9% 8% 0 0.6%;
  padding: 4px 7px;
  border-color: rgba(187, 171, 149, 0.6);
}

#search_input:focus {
  outline: none;
  border-color: rgba(159, 143, 124, 0.8);
}

.tag_default {
  margin-left: 1%;
  width: 5%;
  float: left;
  height: 100%;
  /*background-color: red;*/
}

.tag_active {
  background-color: #9f8f7c;
}

.header-text {
  float: left;
  width: 100%;
  height: 100%;
  line-height: 400%;
  color: white;
  font-size: 15px;
  text-align: center;
  /*margin-top: 20%;*/
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  user-select: none;
  transition: all 0.1s;
  /*#9f8f7c*/
  white-space: nowrap;
}

.header-text:hover {
  font-weight: bold;
  cursor: default;
  transition: all 0.1s;
}

.header-text:active {
  font-weight: bold;
  cursor: default;
  background-color: #9f8f7c;
  transition: all 0.1s;
}

#avatar_ico {
  float: right;
  height: 60%;
  margin-right: 5%;
  margin-top: 0.6%;
}

</style>