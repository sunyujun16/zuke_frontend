<template>
  <div class="zk-comment-container">
    <div class="zk-comment-order">
      <el-select v-model="orderType" placeholder="排序方式" size="mini">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div style="clear: left"></div>
    <div class="zk-comment-list">
      <!--      {{ this.$util.timeUtil.parseToDate(2908000000000) }}-->
      <div class="zk-comment-item" v-for="comment in commentList" :key="comment.id">
        <img :src="comment.avatarSrc" alt="avatar" title="avatar" class="zk-avatar-s">
        <div class="zk-comment-comment">
          <div class="zk-comment-content">
            <span class="comment-name">{{ comment.username }}</span><br>
            <span class="comment-content">{{ comment.content }}</span><br>
            <div class="comment-time">
              {{ parseToDate(comment.time) }}
              <span ></span>
              点赞 1 、点踩 3、回复        举报
            </div>
          </div>
          <div class="zk-comment-reply"></div>
        </div>


      </div>

    </div>


  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "Comments",
  data() {
    return {
      orderType: 'heatOrder',
      options: [
        {label: '按热度', value: 'heatOrder'},
        {label: '按时间', value: 'timeOrder'},
      ],
      commentList: [
        {
          id: '007',
          communityName: '五常大道127号豪宅', // 不需要，可以直接从store获取
          content: '小区太烂了, 按理说快点解封哈里斯开局多好烦啦开始就接口拉斯肯德基返回了啊可接受的阿斯顿发送到交流交流看你两节' +
              '课类库近两年噢你好看了网络葵花 哦UI环球网IE丶啦u掠往哪里科技趣闻呢卡拉奇问啊里盛开的解放后萨达爱斯达克发上来的即发生的',
          avatarSrc: require('@/assets/img/avatars/th1.jpeg'),
          username: '王八犊子',
          likes: 5210,
          time: 1648723738673,
          replies: [
            {
              sender: '二狗',
              receiver: '二丫',
              content: '丫儿说得对',
              time: 1602000000000,
            }
          ],

        }
      ]
    }
  },
  watch: {
    orderType() {
      console.log('排序方式切换为: ', this.orderType)
    }
  },
  methods: {
    ...mapMutations('detailsStore',['SET_ACTIVE_COMMENT_TAG_NAME']),
    parseToDate(timeStamp) {
      let timeDiff = -timeStamp + Date.now();
      // console.log(timeDiff, Date.now())
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

      // console.log(timeStamp)
      let date = this.$util.timeUtil.parseToDate(timeStamp);
      let now = this.$util.timeUtil.parseToDate(Date.now());

      let dateDay = date.split(' ')[0];
      let today = now.split(' ')[0];
      if (dateDay === today)
        date = '今天 ' + date.split(' ')[1]
      return date
    },

  },
  activated() {
    console.log("修改活动标签为：comment")
    this.SET_ACTIVE_COMMENT_TAG_NAME('comment')
  },
  beforeMount() {
    // 请求评论列表，按热度，页码
  }
}
</script>

<style scoped>
.zk-comment-container {
  text-align: left;
}

.zk-comment-order {
  float: left;
  margin-bottom: 24px;
}

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
  border: dotted 2px gray;
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
  font-size: 12px;
  color: grey;
}


</style>