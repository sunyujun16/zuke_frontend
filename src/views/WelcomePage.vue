<template>
  <div>
    <div id="welcome-shit-bg">
      <span id="zuke-welcome">欢迎来到租客点评</span>
      <br/>
      <div style="height: 3px; width: 3.6%; background-color: white; margin-left: 21%; margin-top: 15px"></div>
      <br/>
      <span id="zuke-welcome-content">租客点评网是为广大租房群体提供小区讯息的交流平台，在这里，您可以针对感兴趣的住房进行评价，或查看他人的评价。</span>
    </div>


    <div id="zuke-special-bg">
      <span id="zuke-special-head">本站特色（对比主流租房网站）：</span>
      <br/>
      <el-divider direction="horizontal" id="el-dvd1"></el-divider>
      <br/>
      <!--      <img id="zuke-welcome-type" alt="group" src="../assets/img/welcome/type.png">-->
      <!--      <img id="zuke-welcome-group" alt="group" src="../assets/img/welcome/group.png">-->
      <!--      <img id="zuke-welcome-msg" alt="group" src="../assets/img/welcome/msg.png">-->
      <div class="icon-special-content" v-for="(title, index) in specialHeads" :key="index">
        <div v-if="index > 0" style="float: left; height: 1px; width: 100%; background-color: #BBAB95;
         margin-bottom: 30px"></div>

        <img class="zuke-welcome-ico" alt="group" :src="iconSources[index]">
        <div id="special-container">

        <span id="zuke-special-title">
            {{ title }}
        </span>
          <span id="zuke-special-content">
          {{ specialContents[index] }}
        </span>
          <br/>
        </div>
      </div>

    </div>

    <!--    页面底部-->
    <div class="zuke-footer" style="width:100%; color:#939393; text-align:center; font-size: 8px">
      <a href="https://beian.miit.gov.cn/" target="_blank" style="color:#939393">网站备案号:&nbsp;黑ICP备2021011946号</a>
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011002016165"
         style="display:inline-block;text-decoration:none;height:10px;line-height:10px;">
        <!--        <img src="http://alifile.sunyujun.com/stool_base/basic/beian.png"-->
        <!--             style="margin: 0 0 0 5px; height: 10px; width:10px" alt="nan"/>-->
        <img src="favicon.ico"
             style="margin: 0 0 0 5px; height: 10px; width:10px" alt="nan"/>
        <span style="margin: 0 0 0 0; color:#939393;">浙公网安备 33011002016165号</span>
      </a>
    </div>

  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "WelcomePage",
  data() {
    return {
      specialHeads: [
        '1、采集信息类型不同。', '2、面向群体单一（只针对租客）。', '3、提供用户间的信息共享，帮助租客排雷。'
      ],
      // 要不要放到数据库？没必要，因为几乎永远不会被修改。todo 倒是可以放到txt里面。。。
      specialContents: [
        '本站收集主流租房网站不关注的讯息。比如：房屋施工质量（如隔音、保温、防水）、噪声源、物业服务质量等信息，' +
        '并且可以对周边的配套设施进行专门的快捷查询（如健身房、图书馆、商场、医院学校等）。',
        '本站信息不针对任何具体的房屋或中介，也不设置相关的用户类别，因此刷评风险相对较低，削弱了房东和中介的信息误导。',
        '现有的主流网站仅提供了类似B2C（即由房东、二房东和中介直接对接租客）的模式，但租客之间信息不透明，缺少沟通共享的渠道。' +
        '使得不同租客前赴后继地踩入同一个坑。本站的评价系统弥补了这一缺口。'
      ],
      iconSources: [
        require("/src/assets/img/welcome/type.png"),
        require("../assets/img/welcome/group.png"),
        require("../assets/img/welcome/msg.png"),
      ]
    }
  },
  beforeMount() {
  },
  computed: {},
  methods: {
    ...mapMutations('headerStore', ['SET_MAIN', 'SET_MAP', 'SET_MINE']),
  },
  activated() {
    this.SET_MAIN(true);
    this.SET_MAP(false);
    this.SET_MINE(false);
  },
  // beforeRouteEnter(from, to, next) {
  //   next()
  // }

}
</script>

<style scoped>

#welcome-shit-bg {
  opacity: 0.88;
  position: relative;
  background-color: #BBAB95;
  color: white;
  z-index: -10;
  padding-top: 4%;
  padding-bottom: 4%;
  text-align: left;
  box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.3);
}

#zuke-welcome {
  font-size: 36px;
  font-weight: bold;
  text-shadow: 3px 3px 2px rgba(0, 0, 0, 0.3);
  text-align: left;
  /*line-height: 100%;*/
  /*margin-top: 150%;*/
  margin-left: 21%;
}

#zuke-welcome-content {
  display: inline-block;
  font-size: 18px;
  margin-left: 21%;
  text-shadow: 1px 2px 1px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.2px;
}

.el-divider {
  background-color: #BBAB95;
  height: 2px;
  width: 110%;
  margin-left: -5%;
  /*margin-top: 2.5%;*/
  margin-bottom: 1.5%;
}

#zuke-special-bg {
  width: 70%;
  padding-top: 5%;
  margin-left: 15%;
  text-align: left;
}

#zuke-special-head {
  font-size: 24px;
  font-weight: bold;
  margin-left: -3%;
}

#special-container {
  margin-left: 90px;
}

#zuke-special-title {
  font-size: 18px;
  font-weight: bold;
  line-height: 30px;
}

#zuke-special-content {
  font-size: 18px;
  line-height: 36px;
  /*display: inline-block;*/
}

.icon-special-content {
  /*padding: 14px 20px 14px 30px;*/
  /*border: solid 1px rgba(187,171,149,0.3);*/
  /*border-radius: 4px;*/
  /*background-color: rgba(255,255,255,0.3);*/
  /*box-shadow: 2px 2px 3px #adabab, 3px 3px 3px #BBAB95;*/
  margin-bottom: 2.5%;
}

.zuke-welcome-ico {
  float: left;
  height: 60px;
  margin-top: 5px;
}

.zuke-footer {
  height: 50px;
  line-height: 50px;
  /*text-align: center;*/
  position: fixed;
  bottom: 0;
  float: bottom;
  width: 100%;
  border: 0 solid;
  /*border-top:1px solid rgba(68, 153, 153, 0.2);*/
  border-top: 1px solid rgba(204, 196, 153, 0.5);
}

</style>