<template>

  <div class="zuke-community-item">
    <img class="community-small-img" src="@/assets/img/demos/ted-small.jpg" alt="demo_img" >
    <div class="community-msg-card">
      <!--      <div class="zuke-community-card-title">-->
      <!--        <span>刎颈花园，刎颈花园，刎颈花园，刎颈花园，刎颈花园，刎颈花园，刎颈花园，刎颈花园，刎颈花园，刎颈花园，刎颈花园，刎颈花园，刎颈花园，刎颈花园</span>-->
      <!--      </div>-->
      <div class="zuke-cmt-card-title" >
        <span @click="showDetail">{{cmtNameShown}}</span>
        <a ref="detailALink" :href="detailLink" target="_blank" v-show="false"></a>
      </div>

      <div class="zuke-cmt-card-ico-container">
        <div class="zuke-cmt-card-ico" v-show="stared">
          <i class="el-icon-star-off" @click="stared = !stared"></i><br/>
          <span>1.2万</span>
        </div>

        <div class="zuke-cmt-card-ico" v-show="!stared">
          <i class="el-icon-star-on" @click="stared = !stared"></i><br/>
          <span id="amount">1.2万</span>
        </div>

        <div class="zuke-cmt-card-ico">
          <i class="el-icon-chat-dot-round"></i><br/>
          <span>1346</span>
        </div>

        <div class="zuke-cmt-card-ico">
          <i class="el-icon-trophy"></i><br/>
          <span>4.7</span>
        </div>

      </div>
      <div class="zuke-cmt-card-amount">
      </div>
    </div>
    <!--    <div class="community-star">star</div>-->

    <div style="clear: left"></div>
  </div>
</template>

<script>
export default {
  name: "CommunityInfoCard",
  // props: ['community'],
  data(){
    return {
      community: {
        // 这是高德API返回的完整数据
        id :  "B0FFFA82R7",
        name :  "五常大道127号小区",
        type :  "商务住宅;住宅区;住宅小区",
        location : {
          lng :  120.043033,
          lat :  30.245526
        },
        address :  "五常大道127",
        tel :  "",
        distance :  NaN,
        shopinfo :  "0"
      },
      stared: true,
      detailLink: ''
    }
  },
  computed: {
    cmtNameShown(){
      let showName = this.community.name
      return showName.length > 11 ? showName.slice(0,10) + '...' : showName
    }
  },
  methods: {
    showDetail(){
      // 设置 store - detail 里面的currentCommunity，注意不同页面并不共享一个store，所以不会影响其它页面
      console.log('调用showDetail')
      // push, 由于要打开新页面，所以不能用push，直接访问路由地址
      let target = this.$refs.detailALink
      this.detailLink = this.$store.state.constsStore.frontEndHost + '/detail'
      console.log(this.detailLink)
      // target.setAttribute('href', window.location.origin + '/map_list')
      // 注意，上面的赋值对这里的target跳转并没有发生影响，因为函数执行过程中无法实时渲染DOM元素，所以...nextTick()，啊我真jb聪明，艹。
      this.$nextTick(()=>{
        target.click()
      })
    }
  },
  activated() {
    this.num++
  }
}
</script>

<style scoped>
.zuke-community-item {
  margin: 10px 0 10px 5%;
  height: 150px;
  width: 90%;
  background-color: #FFFFFF;
  border: solid 1px #BBAB95;
  border-radius: 4px;
  box-shadow: 1px 1px 6px #9f8f7c;
  user-select: none;
}

/* 左侧边栏里面的小区缩略图相关设置 */
.community-small-img {
  float: left;
  height: 100%;
  border-right: solid 1px #BBAB95;
  border-radius: 4px;
  max-width: 240px;
  object-fit: cover;
}

.community-msg-card {
  float: left;
  margin-top: 20px;
  margin-left: 3%;
  background-color: white;
  width: 40%;
  /*border: solid 1px greenyellow;*/
  color: #9f8f7c;
}

.zuke-cmt-card-title {
  font-weight: bold;
  font-size: 16px;
  /*border: solid 1px rebeccapurple;*/
  height: 26px;
  margin-top: 24px;
  margin-bottom: 3%;
  text-align: left;
}

.zuke-cmt-card-title:hover {
  text-shadow: 1px 1px 0 rgba(187,171,149,0.2);
}

.zuke-cmt-card-ico-container {
  /*padding-left: 1%;*/
  /*text-align: left;*/
  /*border: solid 1px orange;*/
  float: left;
}

.zuke-cmt-card-ico {
  margin: 8px 10px 8px 0;
  float: left;
  text-align: center;
  width: 32px;
  /*border: solid 1px seagreen;*/
}
.zuke-cmt-card-ico > span {
  float: top;
  font-size: 10px;
}

.el-icon-star-on {
  margin-top: 4px;
  font-size: 20px;
  line-height: 8px;
}

#amount {
  float: top;
  position: relative;
  top: -1px;
}

</style>