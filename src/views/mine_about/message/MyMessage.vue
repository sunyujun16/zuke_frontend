<template>
  <div>
    <div class="zk-msg-links">
      <router-link class="zk-msg-default" active-class="zk-msg-active" to="/mine/message/reply_me">回复我的</router-link>
      <router-link class="zk-msg-default" active-class="zk-msg-active" to="/mine/message/likes_me">收到的赞</router-link>
      <router-link class="zk-msg-default" active-class="zk-msg-active" to="/mine/message/private_message">我的私信</router-link>
      <div class="zk-comment-divider"></div>
    </div>

    <keep-alive>
      <router-view name="my_message"></router-view>
    </keep-alive>

  </div>
</template>

<script>
export default {
  name: "MyMessage"
}
</script>

<style scoped>
.zk-msg-links{
  margin-top: 34px;
  text-align: left;
}
a {
  text-decoration: none;
  color: white;
  font-size: 14px;
}
.zk-msg-default{
  display: inline-block;
  /*background-color: red;*/
  color: #9f8f7c;
  line-height: 28px;
  padding: 0 10px;
  margin: 0 0 0 10px;
}

.zk-msg-active{
  color: white;
  background-color: #BBAB95;
  transition: 0.2s;
}

.zk-comment-divider {
  height: 1px;
  width: 100%;
  /*margin-left: 5%;*/
  background-color: #BBAB95;
  margin: 0 0 20px 0;
}

</style>