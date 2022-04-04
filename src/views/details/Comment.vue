<template>
  <div class="zk-comment-item">
    <img :src="avatarSrc" alt="avatar" title="avatar" class="zk-avatar-s">
    <div class="zk-comment-comment">
      <div class="zk-comment-content">
        <span class="comment-name">{{ comment.username }}</span><br>
        <span class="comment-content">{{ comment.content }}</span><br>
        <div class="comment-time">
          {{ parseToDate(comment.time) }}
          <div class="zk-comment-like">
            <i :class="{'zuke-icon-like': !liked, 'zuke-icon-like-fill': liked}" @click="toggleLike"></i>
            {{ comment.likes }}
          </div>
          <div class="zk-comment-unlike">
            <i :class="{'zuke-icon-unlike': !unliked, 'zuke-icon-unlike-fill': unliked}" @click="toggleUnLike"></i>
            {{ comment.unlikes }}
          </div>

          <span class="zk-comment-reply" @mousedown.prevent="replyOpen(1,comment.username)">回复</span>

          <!-- 评论的回复列表start -->
          <div class="zk-comment-reply-list">
            <div class="zk-comment-reply-2nd" v-for="(reply, index) in comment.replies" :key="index">
              <span class="zk-comment-reply-username">{{ reply.sender }}</span> 回复
              <span class="zk-comment-reply-username">{{ reply.receiver }}</span>
              :&nbsp;{{ reply.content }}<br>
              {{ parseToDate(reply.time) }}
              <span class="zk-comment-reply" @mousedown.prevent="replyOpen(2, reply.sender)">回复</span>
            </div>
          </div>
          <!-- 评论的回复列表end -->

          <div class="zk-comment-alert-menu">
            <i class="zuke-icon-alert"></i>
            <span>举报</span>
          </div>

        </div>
      </div>
      <!-- 回复box -->
      <div class="zk-comment-reply" v-show="replying">
        <div class="zk-comment-send">
          <div class="textarea-container">
            <label>
                  <textarea cols="80" name="msg" rows="5"
                            :placeholder="'回复' + replyReceiver + ':'"
                            class="ipt-txt"
                            @focus="onTextFocus"
                            @blur="onTextBlur"
                            ref="replyArea"
                  >
                  </textarea>
            </label>
            <button type="submit" :class="{'comment-submit':true, 'comment-submit-high':replyFocused}"
                    data-rid="107549691968" data-pid="107549691968"><span
                class="submit-text">发布</span></button>
          </div>
        </div>
      </div>
      <!-- 回复box结束 -->

      <div class="zk-comment-divider"></div>
    </div>

    <div style="clear: both"></div>


  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import $ from 'jquery'

// $(function () {
//   $('.zk-comment-reply').mousedown(function (e) {
//     e.stopPropagation();
//     console.log('jQuery参与')
//   })
// })

export default {

  name: "Comment",
  props: ['comment',],
  data() {
    return {
      replying: false,
      liked: true,
      unliked: false,
      replyFocused: true,
      // avatarSrc: require( 'https://whatever' + this.comment.name)
      avatarSrc: require('@/assets/img/avatars/th1.jpeg'),
      replyReceiver: '程序员'
    }
  },
  computed: {
    ...mapState('detailsStore', ['lastReplyVm'])
  },
  watch: {},
  methods: {
    ...mapMutations('detailsStore', ['SET_ACTIVE_COMMENT_TAG_NAME', 'SET_LAST_REPLY_VM']),
    parseToDate(timeStamp) {
      let timeDiff = Date.now() - timeStamp;
      // console.log(timeDiff, Date.now())

      if (timeDiff > 0) {
        if (timeDiff <= 60000) {
          // 一分钟
          return Math.floor(timeDiff / 1000) + '秒前'
        } else if (timeDiff <= 3600000) {
          // 1小时内
          return Math.floor(timeDiff / 60000) + '分钟前'
        } else if (timeDiff <= 36000000) {
          // 十小时以内
          return Math.floor(timeDiff / 3600000) + '小时前'
        }
      }

      // console.log(timeStamp)
      let date = this.$util.timeUtil.parseToDate(timeStamp);
      let now = this.$util.timeUtil.parseToDate(Date.now());

      let dateDay = date.split(' ')[0];
      let today = now.split(' ')[0];
      if (dateDay === today)
        date = '今天 ' + date.split(' ')[1]
      return date
    },
    toggleLike() {
      // 告诉服务器

      // 切
      this.liked = !this.liked
      // 避免同时喜欢和不喜欢
      if (this.liked && this.unliked) this.unliked = false
    },
    toggleUnLike() {
      this.unliked = !this.unliked
      if (this.liked && this.unliked) this.liked = false
    },
    replyOpen(level, receiver) {
      console.log(' ----------- ')
      let replying = this.replying;
      let lastReplyVm = this.lastReplyVm;
      this.replying = !replying;

      // if (!replying)
      this.$nextTick(() => {
        console.log(this.comment.id, '执行focus指令...')
        this.$refs.replyArea.focus();
        // setTimeout(()=>{this.$refs.replyArea.focus();})
      })

      if (lastReplyVm === this) {
        // 如果是回复同一个人，那么是单纯的窗口动作，啥也不用干。
        // 如果不是，改一下名称即可，且维持窗口。
        if (receiver !== this.replyReceiver) {
          this.replyReceiver = receiver
          this.replying = true;
        }
        return
      } else if (lastReplyVm) // 如果即非同一个, 也不是null，那么先关掉它的窗口。再继续
        lastReplyVm.replying = false

      // 如果是跨组件点击，会执行到这里,那么就正常设定一下恢复对象，设定旧VM对象为this。
      this.replyReceiver = receiver
      this.SET_LAST_REPLY_VM(this)
    },
    onTextFocus() {
      console.log(this.comment.id, '回复框: focus!');
      this.replyFocused = true
    },
    onTextBlur() {
      console.log(this.comment.id, '回复框: blur~');
      this.replyFocused = false
    }

  },
}
</script>

<style scoped>
.zk-avatar-s {
  float: left;
  height: 40px;
  width: 40px;
  object-fit: cover;
  border: dotted 2px moccasin;
  border-radius: 40px;
}

.zk-comment-comment {
  float: left;
  width: 92%;
  margin-left: 10px;
  /*border: dotted 2px red;*/
}

.comment-name {
  display: inline-block;
  font-size: 14px;
  color: rgba(159, 143, 124, 0.9);
  margin-bottom: 2px;
}

.comment-content {
  display: inline-block;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 4px;
}

.comment-time {
  user-select: none;
  font-size: 12px;
  color: grey;
}

i {
  margin-left: 10px;
}

.zk-comment-reply {
  margin-top: 10px;
  /*margin-left: 10px;*/
  user-select: none;
  cursor: pointer;
}

.zk-comment-reply-2nd {
  margin-top: 10px;
}

.zk-comment-reply:hover {
  color: #9f8f7c;

}

.zk-comment-alert-menu {
  float: right;
}

.zuke-icon-like:hover {
  /*font-size: 80px;*/
  color: #BBAB95;
}

.zuke-icon-like-fill {
  /*color: rgba(24, 144, 255, 1);*/
  color: #BBAB95;
}

.zk-comment-send {
  /*float: left;*/
  /*width: calc(100% - (calc(1.7 * 48px) + 80px));*/
  width: calc(100% - 70px);
  margin-left: 0;
}

textarea {
  /*-webkit-writing-mode: horizontal-tb !important;*/
  /*text-rendering: auto;*/
  /*color: -internal-light-dark-color(black, white);*/
  display: inline-block;
  /*background-color: -internal-light-dark-color(white, black);*/
  resize: none;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  border: 1px solid rgb(169, 169, 169);
  /*border-image: initial;*/
  padding: 2px;
}

.zk-comment-send .textarea-container .ipt-txt {
  display: inline-block;
  box-sizing: border-box;
  overflow: auto;
  border-radius: 6px;
  width: calc(100% - 100px);
  height: 50px;
  transition: 0.2s;
  padding: 5px 10px;
  line-height: 18px;
  outline: none;
  vertical-align: middle;
  background-color: rgba(245, 245, 245, 0.6);
}

.zk-comment-send .textarea-container .ipt-txt:focus {
  height: 80px;
  background-color: white;
}


.zk-comment-send .comment-submit {
  width: 80px;
  height: 50px;
  margin: 0 0 0 10px;
  padding: 4px 15px;
  font-size: 16px;
  background-color: rgba(187, 171, 149, 0.8);
  color: white;
  border-radius: 4px;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  border: none;
  transition: 0.2s;
  user-select: none;
  outline: none;
}

.zk-comment-send .comment-submit-high {
  height: 80px;
  transition: 0.2s;
}

.zk-comment-like, .zk-comment-unlike {
  width: 60px;
  display: inline-block;
  /*border: solid 1px darkcyan;*/
}

.zk-comment-reply-username:nth-child(1) {
  /*color: rgba(68,84,106,1);*/
  color: #9f8f7c;
  font-weight: bold;
}

.zk-comment-reply-username:nth-child(2) {
  color: #9f8f7c;
  font-weight: bold;
}

.zk-comment-divider {
  height: 1px;
  width: 100%;
  /*margin-left: 5%;*/
  background-color: #BBAB95;
  margin: 20px 0 20px 0;
}

</style>