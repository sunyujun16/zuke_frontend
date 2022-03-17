<template>
  <div style="min-width: 998px">
    <!--    <img src="../assets/img/background/samantha-gades-BlIhVfXbi9s-unsplash-s.jpg" alt="nah" class="background-img" id="fuck">-->
    <img src="../assets/img/background/wallhaven-5wqgq1.jpg" alt="nah" class="background-img" id="fuck">
    <!--    <img src="../assets/img/background/samantha-gades-BlIhVfXbi9s-unsplash-s.jpg" alt="nah" class="background-img" id="fuck">-->
    <router-view name="WelcomePage"></router-view>

    <div class="zuke-footer" style="width:100%; color:#939393; text-align:center; font-size: 8px">
      <a href="https://beian.miit.gov.cn/" target="_blank"  style="color:#939393">网站备案号:&nbsp;黑ICP备2021011946号</a>
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011002016165"
         style="display:inline-block;text-decoration:none;height:10px;line-height:10px;">
        <img src="http://alifile.sunyujun.com/stool_base/basic/beian.png" style="margin: 0 0 0 5px; height: 10px; width:10px" alt="nan"/>
        <span style="margin: 0 0 0 0; color:#939393;">浙公网安备 33011002016165号</span>
      </a>
    </div>
  </div>

</template>

<script>
export default {
  name: "MainPart",
  data() {
    return {}
  },
  computed: {},
  methods: {
    pushToWelcome(){

    }
  }

}
</script>

<style scoped>
.background-img {
  opacity: 0.1;
  top: 0;
  left: 0;
  z-index: -100; /*img背景关键属性*/
  position: fixed; /*img背景关键属性*/
  width: 1920px;
  height: 1080px;
  object-fit: cover; /*img背景关键属性*/
}

.zuke-footer {
  height: 50px;
  line-height: 50px;
  /*text-align: center;*/
  position: fixed;
  bottom: 0;
  float: bottom;
  width: 100%;
  border: 0 solid ;
  /*border-top:1px solid rgba(68, 153, 153, 0.2);*/
  border-top:1px solid rgba(204,196,153,0.5);
}
</style>