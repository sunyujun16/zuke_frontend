<template>
  <div>
    <!--    <img src="../assets/img/background/samantha-gades-BlIhVfXbi9s-unsplash-s.jpg" alt="nah" class="background-img" id="fuck">-->
    <img src="../assets/img/background/wallhaven-5wqgq1.jpg" alt="nah" class="background-img" id="fuck">
    <!--    <img src="../assets/img/background/samantha-gades-BlIhVfXbi9s-unsplash-s.jpg" alt="nah" class="background-img" id="fuck">-->
    <div style="">
      <keep-alive>
        <router-view name="WelcomePage"></router-view>
      </keep-alive>

    </div>

    <div>
      <keep-alive>
        <router-view name="community_list"></router-view>
      </keep-alive>
      <keep-alive>
        <router-view name="map_page"></router-view>
      </keep-alive>
    </div>

    <div>
      <keep-alive>
        <router-view name="mine_page"></router-view>
      </keep-alive>
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
  z-index: -10000; /*img背景关键属性*/
  position: fixed; /*img背景关键属性*/
  width: 1920px;
  height: 1080px;
  object-fit: cover; /*img背景关键属性*/
}
*::-webkit-scrollbar {
  display: none;
  /*background-color: #45b2d9;*/
}

</style>