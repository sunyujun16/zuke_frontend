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
      <!--      一条评论开始-->
      <Comment  v-for="comment in commentList" :key="comment.id" :comment="comment"/>

      <!--      一条评论结束-->

    </div>


  </div>
</template>

<script>
import {mapMutations} from "vuex";
import Comment from "@/views/details/Comment";

export default {
  name: "Comments",
  components: {Comment},
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
              '课类 哦UI环球网IE丶啦u掠往哪里科技趣闻呢卡拉奇问啊里盛开的解放后萨达爱斯达克发上来的即发生的',
          username: '王八犊子',
          likes: 5210,
          time: 1648723738673,
          replies: [
            {
              sender: '二狗',
              receiver: '二丫',
              content: '丫说得对',
              time: 1962000000000,
            },
            {
              sender: '二丫',
              receiver: '二狗',
              content: '狗说得也对',
              time: 1983000000000,
            }
          ],

        },
        {
          id: '008',
          communityName: '刎颈花园', // 不需要，可以直接从store获取
          content: '啪啪啪',
          username: '天王老子',
          likes: 5120,
          unlikes: 438,
          time: 1648453738673,
          replies: [
            {
              sender: '狗',
              receiver: '丫',
              content: '丫。。。',
              likes: 1520,
              unlikes: 18,
              time: 1962800000000,
            },
            {
              sender: '丫',
              receiver: '狗',
              content: '狗。。。',
              likes: 521,
              unlikes: 28,
              time: 1983008800000,
            }
          ],

        }
      ],
      liked: true,
      unliked: false,
      replyFocused: true,
    }
  },
  computed: {
    // 从服务器查询，可是如果这样的话，加载评论列表需要太多次请求了，应该加载详细评分时，设置一个短暂的setTimeOut,一次性请求出来，
    // 然后放到store里面。嗯，没错,不过万一不成功，岂不是数据不准确了？可以设置一个flag，用来提醒组件：点赞数据是否已经加载完毕。
    // liked() {
    //   return true
    // },

  },
  watch: {
    orderType() {
      console.log('排序方式切换为: ', this.orderType)
    }
  },
  methods: {
    ...mapMutations('detailsStore', ['SET_ACTIVE_COMMENT_TAG_NAME']),

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



</style>