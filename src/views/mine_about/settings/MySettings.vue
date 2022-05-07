<template>
  <div style="text-align: left">
    <div class="settings-title">修改头像</div>
    <div class="settings-content">
      <AvatarSettings></AvatarSettings>
    </div>

    <div class="settings-title">个人信息修改</div>
    <div class="settings-content">
      <AvatarSettings></AvatarSettings>
    </div>

  </div>
</template>

<script>


import AvatarSettings from "@/views/mine_about/settings/AvatarSettings";

export default {
  name: "MySettings",
  components: {AvatarSettings},
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