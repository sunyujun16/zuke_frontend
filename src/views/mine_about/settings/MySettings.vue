<template>
  <div style="text-align: left">
    <div class="settings-title">头像</div>
    <div class="settings-content">
      <AvatarSettings></AvatarSettings>
    </div>

    <div style="background-color: var(--tea-op3); height: 1px; width: 100%; margin-top: 32px"></div>

    <div class="settings-title">
      个人信息
<!--      <span style="margin-left: 10px"></span>-->
      <el-button v-show="false"></el-button>
      <el-button type="warning" size="mini" v-show="!modifying" @click="modifying = !modifying">修改</el-button>
      <el-button type="primary" size="mini" v-show="modifying" @click="saveUserInfo()">保存</el-button>
    </div>
    <div class="settings-content">
<!--      <AvatarSettings></AvatarSettings>-->
      <div>邮箱: <span>{{currentUser.email}}</span>  </div>
      <div>手机号: <span>123</span><input placeholder="placeholder"></div>

    </div>

  </div>
</template>

<script>


import AvatarSettings from "@/views/mine_about/settings/AvatarSettings";
import {mapMutations, mapState} from "vuex";

export default {
  name: "MySettings",
  props: ['toggleTag'],
  components: {AvatarSettings},
  data(){
    return {
      modifying: false
    }
  },
  computed: {
    ...mapState('userStore',['currentUser', 'onLine', 'defaultUser'])
  },
  methods: {
    ...mapMutations('detailsStore', ['SET_ACTIVE_TAG_NAME']),
    saveUserInfo(){
      this.modifying = false;
      this.$message.success("保存用户信息")
    }
  },
  beforeMount() {
    this.SET_ACTIVE_TAG_NAME('settings')
  }
}
</script>

<style scoped>
.settings-title{
  margin: 20px 0 10px 20px;
  font-weight: bold;
  color: var(--grey7);
  /*border-bottom: solid 1px var(--tea-op3);*/
}

.settings-content{
  margin-left: 20px;
}

.settings-content > div {
  line-height: 36px;
}

</style>