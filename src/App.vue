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
  --grey7: #555555;
  --grey5: #999999;
  --grey3: #bbbbbb;
  --tea: #BBAB95;
  --deep-tea: #9f8f7c;
  --zk-blue: rgb(68,84,106);

}

</style>
