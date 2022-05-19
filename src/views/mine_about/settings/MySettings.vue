<template>
  <div style="text-align: left">
    <div class="settings-title">修改头像</div>
    <div class="settings-content">
      <AvatarSettings></AvatarSettings>
    </div>

    <div class="settings-title">个人信息修改</div>
    <div class="settings-content">
<!--      <AvatarSettings></AvatarSettings>-->
      <div>邮箱: {{currentUser.email}} <el-button size="mini">修改</el-button> </div>
      <div>手机号: <span>123</span><input placeholder="placeholder"><button>修改</button></div>

    </div>

  </div>
</template>

<script>


import AvatarSettings from "@/views/mine_about/settings/AvatarSettings";
import {mapState} from "vuex";

export default {
  name: "MySettings",
  components: {AvatarSettings},
  computed: {
    ...mapState('userStore',['currentUser', 'onLine', 'defaultUser'])
  }
}
</script>

<style scoped>
.settings-title{
  margin: 20px 0 10px 20px;
  font-weight: bold;
  color: var(--grey7);
}

.settings-content{
  margin-left: 20px;

}

</style>