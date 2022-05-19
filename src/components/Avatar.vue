<template>
  <div id="avatar_menu_container" @mouseenter="showMenuController()" @mouseleave="showMenu = false">
    <img id="avatar_ico"
         alt="avatar-icon"
         :title="avatarTitle"
         :src="avatarSrc"
         @click="toggleLR"
    >
<!--    <span v-show="!onLine" style="margin-left: 10px; font-size: 12px; color: white; display: inline-block;-->
<!--     height: 60px">登录/注册</span>-->

    <transition name="avt-dropdown">
      <div class="zk-avatar-dropdown" v-show="showMenu">
        <div class="dropdown-head">
          <!--          <div style="height: 1px; background-color: transparent"></div>-->
          <span style="font-weight: bold; color: var(--grey9); font-size: 14px">{{ this.currentUser.username }}</span>
          <span>{{ this.userType }}</span>
          <span>ID: 001</span>
        </div>
        <!--        {{this.currentUser.username}}-->
        <div class="dropdown-body">
          <span>消息中心</span>
          <span>我的设置</span>
          <span>客户服务</span>
          <span @click="logOut">退出登录</span>


        </div>


      </div>
    </transition>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import md5 from 'js-md5';

export default {
  name: "Avatar",
  props: ['toggleLogRegBox'],
  data() {
    return {
      showMenu: false,
      avatarSrc: require('../assets/img/header/avatar.png'),
      avatarTitle: '登录/注册',
    }
  },
  computed: {
    ...mapState("userStore", ['onLine','defaultUser', 'currentUser']),
    userType(){
      switch (this.currentUser.userType){
        case 0:
          return "上帝(管理员)"
        case 1:
          return "贵族(VIP)"
        case 2:
          return "草民"
        case 3:
          return "匪徒"
        default:
          return "啥也不是"
      }
    }

  },
  watch: {
    onLine(){
      if (this.onLine){
        console.log("Avatar: 监听到Online为true ... ")
        this.avatarSrc =
            "https://alifile.sunyujun.com/zuke/avatars/"
            + md5(this.currentUser.id + this.currentUser.username) + '.jpg';
        this.SET_AVATAR_SRC(this.avatarSrc)
      } else {
        this.avatarSrc = require('../assets/img/header/avatar.png')
        this.SET_AVATAR_SRC('')
      }

    }
  },
  methods: {
    ...mapMutations("userStore", ['SET_ONLINE', 'SET_USER', 'SET_AVATAR_SRC']),
    toggleLR() {
      if (!this.onLine)
        this.toggleLogRegBox()
    },
    showMenuController() {
      // if (this.onLine){
      //   this.showMenu = true
      //   this.avatarTitle = null
      // }

      this.showMenu = true
      // this.avatarTitle = null
    },
    logOut() {
      if (!this.onLine) return
      let _this = this
      // 发请求
      let url = _this.$store.state.constsStore.backEndHost + '/logout'
      this.$axios.get(url).then(
          response => {
            let data = response.data;
            if (data === 'success')
              _this.$message.success("服务端已清理")
            else if (data === 'fail')
              _this.$message.error("服务端清理失败")
            else
              _this.$message.error("服务端未知错误")
          },
          error => {
            _this.$message.error("服务器端退出异常" + error.response.data)
          })

      // 规定动作: 清理sessionStorage, 修改state登录状态, currentUser信息等修改
      localStorage.removeItem("userInfo")
      this.SET_ONLINE(false)
      this.SET_USER(this.defaultUser)

    }

  }
}
</script>

<style scoped>
#avatar_menu_container {
  float: right;
  height: 60%;
  margin-right: 5%;
  margin-top: 0.618%;
  opacity: 0.94;
  user-select: none;
}

.zk-avatar-dropdown {
  text-align: left;
  position: absolute;
  height: 240px;
  width: 200px;
  right: 110px;
  color: var(--light-tea);
  background-color: var(--grey7);
  border: solid 1px var(--light-tea2);
  box-shadow: 2px 2px 10px var(--grey3);
  border-radius: 12px;
}

/* 进入的起点、离开的终点 */
.avt-dropdown-enter, .avt-dropdown-leave-to {
  transform: translateY(-3%) translateX(3%);
  opacity: 0;
}

.avt-dropdown-enter-active, .avt-dropdown-leave-active {
  transition: 0.482s ease;
  /*transition: 0.9s ease-in-out;*/
}

/* 进入的终点、离开的起点 */
.avt-dropdown-enter-to, .avt-dropdown-leave {
}

.dropdown-head {
  margin-top: 0;
  color: var(--grey7);
  padding: 10px 0;
  background-color: var(--light-tea);
  border-top-left-radius: 12px;
  /*border-top-right-radius: 6px;*/
}

.dropdown-body {
  padding-top: 10px;
}

.dropdown-head span {
  padding-left: 10px;
  display: block;
  margin: 6px 0;
  font-size: 14px;
}

.dropdown-body span {
  padding-left: 10px;
  display: block;
  margin: 6px 0;
  font-size: 14px;
}

.dropdown-body span:hover {
  background-color: var(--grey5);
}
.dropdown-body span:active {
  background-color: var(--grey9);
}


#avatar_ico {
  height: 100%;
  border-radius: 20px;
}

#avatar_ico:hover {
  height: 110%;
  opacity: 1;
  cursor: pointer;
  transition: 0.4s;
}

</style>