<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/zuke_logo.png">-->
    <Header/>

    <MainPart/>

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
}
</style>
