<template>
  <div>
    <div v-for="reply in replyList" :key="reply.id">
      <div class="zk-msg-reply-left">
        <span style="font-weight: bold">{{ reply.sender }}</span> 回复了我的评论 <br/>
        {{ reply.content }} <br/>
        <span style="color: var(--grey5); font-size: 14px">
          {{ $util.timeUtil.parseToDate(reply.time) }}
        </span>
      </div>
      <div class="zk-msg-reply-right">
        {{ trimByLength(reply.targetContent, 32) }}
      </div>
      <div style="clear: both"></div>
      <div class="zk-msg-reply-divider"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ReplyMe",
  data() {
    return {
      replyList: [
        {
          id: '110',
          content: '报警了，不用谢',
          sender: '史蒂芬周',
          receiver: '9527',
          time: Date.now(),
          commentId: '10086',
          targetContent: '我要杀人啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
        },
        {
          id: '119',
          content: '失火啦！！！',
          sender: '齐天大圣',
          receiver: '弼马温',
          time: Date.now(),
          commentId: '68001',
          targetContent: 'fire ~ in the hole ~'
        }
      ]
    }
  },
  computed: {},
  methods: {
    trimByLength(content, length) {
      return this.$util.stringUtils.trimByLength(content, length);
    }
  }
}
</script>

<style scoped>
.zk-msg-reply-divider {

  height: 1px;
  width: 90%;
  background-color: rgba(187, 171, 149, 0.3);
  margin: 20px 0 20px 5%;
}

.zk-msg-reply-left {
  float: left;
  width: 72%;
  text-align: left;
  margin-left: 5%;
  line-height: 28px;
  /*border: solid 1px orange;*/
}

.zk-msg-reply-right {
  float: right;
  width: 15%;
  color: var(--grey5);
  overflow: hidden;
  /*border: solid 1px red;*/
  margin-right: 5%;
}

</style>