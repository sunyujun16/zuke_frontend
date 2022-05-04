<template>
  <div id="app">
    <!--    <img alt="Vue logo" src="./assets/zuke_logo.png">-->
    <img src="./assets/img/background/nasa-Q1p7bh3SHj8-unsplash-narrow.jpg" alt="nah" class="header-background-img">
    <Header/>
    <div>
      <MainPart/>
    </div>

  </div>
</template>

<script>
import Header from "./components/Header";
import MainPart from "@/views/MainPart";

export default {
  name: 'App',
  components: {
    MainPart,
    Header,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
  min-width: 998px;
}

.header-background-img {
  opacity: 1;
  top: 0;
  left: 0;
  z-index: -1; /*img背景关键属性*/
  position: absolute; /*img背景关键属性*/
  width: 100%;
  height: 60px;
  object-fit: cover; /*img背景关键属性*/
}

.el-message {
  opacity: 0.91;
}

:root {
  --blue: #1e90ff;
  --white: #ffffff;
  --grey9: #333333;
  --grey7: #555555;
  --grey5: #999999;
  --grey3: #bbbbbb;
  --tea: #BBAB95;
  --tea-op1: rgba(187, 171, 149, 0.1);
  --tea-op3: rgba(187, 171, 149, 0.3);
  --tea-op5: rgba(187, 171, 149, 0.5);
  --tea-op7: rgba(187, 171, 149, 0.7);
  --tea-op9: rgba(187, 171, 149, 0.9);
  --deep-tea: #9f8f7c;
  --deep-tea-op8: rgba(159, 143, 124, 0.8);
  --deep-tea-op9: rgba(159, 143, 124, 0.9);
  --light-tea: #ece8e2;
  --light-tea2: #d5c9b5;
  --zk-blue: rgb(68, 84, 106);

}

</style>
