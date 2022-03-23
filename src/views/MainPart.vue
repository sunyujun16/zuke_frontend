<template>
  <div style="min-width: 998px">
    <!--    <img src="../assets/img/background/samantha-gades-BlIhVfXbi9s-unsplash-s.jpg" alt="nah" class="background-img" id="fuck">-->
    <img src="../assets/img/background/wallhaven-5wqgq1.jpg" alt="nah" class="background-img" id="fuck">
    <!--    <img src="../assets/img/background/samantha-gades-BlIhVfXbi9s-unsplash-s.jpg" alt="nah" class="background-img" id="fuck">-->
    <div style="">
      <router-view name="WelcomePage"></router-view>

      <router-view name="community_list"></router-view>

      <router-view name="map_page"></router-view>
      <router-view name="mine_page"></router-view>

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
    pushToWelcome() {

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


</style>