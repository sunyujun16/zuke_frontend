<template>
  <div>
    <div class="zuke-header">
      <!--  logo-->
      <img id="zuke_logo" alt="Vue logo" src="../assets/img/zuke_logo.png">
      <!--  icon + position-->
      <img id="position_icon" alt="position-icon" src="../assets/img/header/position.png">
      <div class="tag_position">
        <span class="text-position" style="float: left">{{ currentCity }}</span>
      </div>

      <!--  icon + search-->
      <img id="search_ico" alt="search-icon" src="../assets/img/header/search.png" @click="doSearch()">
      <!--      <img id="search_ico" alt="search-icon" src="../assets/img/header/search.png" @click="tempTest">-->
      <a ref="fucka" :href="fuck" style="float: left" target="_blank" v-show="false"></a>
      <label for="search_input">
        <input id="search_input" type="text" :placeholder="placeholder" v-model="searchValue" @keyup.enter="doSearch()">
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

      <!--  avatar button + downside_bar-->
      <Avatar :toggle-log-reg-box="toggleLogRegBox"></Avatar>
      <!--      <i id="avatar_ico_i" class="zuke-icon-user"></i>-->

      <div style="clear: both"></div>
    </div>
    <!-- 占位用, 把Header本该占用的60px文档流高度给占用掉, 否则其它主界面会从top:0开始 -->
    <div class="zuke-header-position"></div>

    <!-- 注册登录组件 -->
    <LoginRegister :toggleCallBack="toggleLogRegBox"></LoginRegister>

  </div>

</template>

<script>
import {mapMutations, mapState} from "vuex";
import AMapLoader from "@amap/amap-jsapi-loader";
import LoginRegister from "@/components/LoginRegister";
import Avatar from "@/components/Avatar";

// 这里加载地图服务是为了, 使用定位和输入提示, 而不绑定任何元素, 此处先设置明文密钥, 生产环境再变更.
window._AMapSecurityConfig = {
  securityJsCode: 'c801d1e37aa760f6eeaefd6fad0c43ed',
}

export default {
  name: "Header",
  components: {Avatar, LoginRegister},
  data() {
    return {
      searchValue: '',
      fuck: 'http://localhost:8080/#/map_list',
      currentCity: '河兰NewYork',
      placeholder: '请输入要搜索的关键词',
    }
  },
  computed: {
    ...mapState('headerStore', ['isActiveMain', 'isActiveMap', 'isActiveMine', 'loginRegOpen']),
  },
  methods: {
    ...mapMutations('headerStore', ['SET_MAIN', 'SET_MAP', 'SET_MINE', 'OPEN_LOG_REG', 'CLOSE_LOG_REG']),
    ...mapMutations('mapStore', ['CHANGE_SEARCH_VALUE']),
    pushToMainList() {
      if (!this.isActiveMain) {
        this.$router.push('/');
      }
    },
    pushToMapList() {
      if (!this.isActiveMap) {
        this.$router.push('/map_list');
      }
    },
    pushToMineList() {
      if (!this.isActiveMine) {
        this.$router.push('/mine');
      }
    },
    doSearch() {
      if (!this.searchValue) {
        this.$message({
          message: '输入不能为空',
          type: "warning",
          duration: 1000
        })
        return
      }
      // 其实没必要传参, 直接通过this获取即可, 此处纯属娱乐。
      // 先判断此时是否在地图组件页面, 如果不是, push过去,
      if (!this.isActiveMap)
        this.$router.push('/map_list')

      // 修改searchValue, 触发watch即可, next是避免Map未加载完毕, watch不触发.
      this.$nextTick(() => {
        // console.log(this) // 是VM, 有空得研究研究这个this.
        console.log("即将修改searchValue...")
        this.CHANGE_SEARCH_VALUE(this.searchValue)
      })

    },
    tempTest() {
      let target = this.$refs.fucka
      this.fuck = this.$store.state.constsStore.frontEndHost + '/map_list'
      // target.setAttribute('href', window.location.origin + '/map_list')
      target.click()
    },
    initMap() {
      let _this = this;
      AMapLoader.load({
            key: "1651ad391fda68d74c988ea812bf3a04",     // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
          }
      ).then((AMap) => {
            // _this.aMap = AMap
            AMap.plugin([
              'AMap.AutoComplete',
              'AMap.CitySearch',
            ], function () {
              /* AutoComplete部分 */
              // input 为绑定输入提示功能的input的DOM ID
              let autoOptions = {
                input: 'search_input'
              }
              // 无需再手动执行search方法，autoComplete会根据传入input对应的DOM动态触发search
              let autoComplete = new AMap.AutoComplete(autoOptions);

              /* CitySearch部分 */
              let citySearch = new AMap.CitySearch();
              citySearch.getLocalCity(function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  // 查询成功，result即为当前所在城市信息
                  _this.currentCity = result.city
                }
              })


            });
          }
      ).catch(e => {
            console.log(e);
          }
      )
    },
    toggleLogRegBox() {
      // console.log("切换登录容器 ", this.loginRegOpen)
      if (this.loginRegOpen)
        this.CLOSE_LOG_REG()
      else
        this.OPEN_LOG_REG()
    }
  },
  mounted() {
    this.initMap()
  }
}
</script>

<style scoped>
@import "../assets/css/components/header.css";
</style>