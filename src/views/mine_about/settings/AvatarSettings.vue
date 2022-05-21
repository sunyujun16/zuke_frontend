<template>
  <div class="avatar-upload-container">
    <div>
      <img v-if="avatarFlag" :src="avatarSrc" alt="avatar"
           class="zuke-current-avatar">
    </div>
    <el-button @click="dialogVisible = true">上传新头像</el-button>
    <!--    <span style="font-size: 12px">仅支持png, jpg, jpeg, 图像大小不超过3M</span>-->
    <el-dialog
        title="裁剪头像"
        :visible.sync="dialogVisible"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closeDialog"
        width="600px"
    >
      <div class="avatar-container">
        <!-- 待上传图片 -->
        <div v-show="!options.img">
          <el-upload
              class="upload"
              ref="upload"
              action=""
              :on-change="upload"
              accept="image/png, image/jpeg, image/jpg"
              :show-file-list="false"
              :auto-upload="false"
              drag
          >
            <el-button slot="trigger" size="small" type="primary" ref="uploadBtn" class="choose-btn">
              选择图片
            </el-button>
            <!--            <div slot="trigger" style="position: relative;">点击按钮, 或拖拽到此区域上传</div>-->
            <div slot="tip">点击或拖拽上传, <br>支持jpg、jpeg、png格式的图片，大小不超过3M</div>
          </el-upload>
          <!--          <div >点击或拖拽上传, <br>支持jpg、jpeg、png格式的图片，大小不超过5M</div>-->

        </div>
        <!-- 已上传图片 -->
        <div v-show="options.img" class="avatar-crop">
          <vueCropper
              v-if="dialogVisible"
              class="crop-box"
              ref="cropper"
              :img="options.img"
              :autoCrop="options.autoCrop"
              :fixedBox="options.fixedBox"
              :canMoveBox="options.canMoveBox"
              :autoCropWidth="options.autoCropWidth"
              :autoCropHeight="options.autoCropHeight"
              :centerBox="options.centerBox"
              :fixed="options.fixed"
              :fixedNumber="options.fixedNumber"
              :canMove="options.canMove"
              :canScale="options.canScale"
              :outputSize="options.outputSize"
              @realTime = realTime
          ></vueCropper>
        </div>
      </div>

      <div>

<!--        <div class="show-preview"-->
<!--             :style="{'width': previews.w + 'px', 'height': previews.h + 'px',-->
<!--           'overflow': 'hidden', 'margin': '5px'}">-->
<!--          <div :style="previews.div">-->
<!--            <img :src="options.img" :style="previews.img">-->
<!--          </div>-->
<!--        </div>-->
<!--        <p>中等大小</p>-->
<!--        <div :style="previewStyle1">-->
<!--          <div :style="previews.div">-->
<!--            <img :src="previews.url" :style="previews.img">-->
<!--          </div>-->
<!--        </div>-->

<!--        <span>预览</span>-->
<!--        <div :style="previewStyle2">-->
<!--          <div :style="previews.div">-->
<!--            <img :src="previews.url" :style="previews.img" alt="预览">-->
<!--          </div>-->
<!--        </div>-->

      </div>


      <span slot="footer" class="dialog-footer"></span>

      <div style="margin-top: 10px">
        <el-button @click="closeDialog" type="danger">取 消</el-button>
        <el-button v-show="options.img" @click="reupload">重新上传</el-button>
        <el-button v-show="options.img" type="primary" @click="confirmAndSend">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import {VueCropper} from 'vue-cropper';
import md5 from 'js-md5';
import $ from 'jquery';
import {mapMutations, mapState} from "vuex";
import Vue from 'vue'

export default {
  name: "AvatarSettings",
  components: {VueCropper,},
  data() {
    return {
      imageUrl: '',
      dialogVisible: false,
      // vueCropper组件 裁剪配置信息
      options: {
        img: '', // 原图文件
        autoCrop: true, // 默认生成截图框
        fixedBox: false, // 固定截图框大小
        canMoveBox: true, // 截图框可以拖动
        // autoCropWidth: 200, // 截图框宽度
        // autoCropHeight: 200, // 截图框高度
        fixed: true, // 截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        centerBox: true, // 截图框被限制在图片里面
        canMove: false, // 上传图片不允许拖动
        canScale: false, // 上传图片不允许滚轮缩放
        outputSize: 1
      },
      previews: {},
      previewStyle2: {}

    };
  },
  computed: {
    ...mapState('userStore', ['avatarSrc', 'avatarFlag'])
  },
  methods: {
    ...mapMutations('userStore', ['SET_AVATAR_SRC', 'FLIP_AVATAR_FLAG']),
    // 读取原图
    upload(file) {
      this.$message.info("图片加载完毕")
      console.log(file)
      const isIMAGE = file.raw.type === 'image/jpeg'
          || file.raw.type === 'image/jpg'
          || file.raw.type === 'image/png'
      const isLt3M = file.raw.size / 1024 / 1024 < 3
      if (!isIMAGE) {
        this.$message({
          showClose: true,
          message: '请选择 jpg、png 格式的图片',
          type: 'warning'
        })
        return false
      }
      if (!isLt3M) {
        this.$message({
          showClose: true,
          message: '图片大小不能超过 3MB',
          type: 'warning'
        })
        return false
      }
      let reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = e => {
        this.options.img = e.target.result // base64
      }
    },
    // 获取截图信息
    confirmAndSend() {
      let _this = this
      let avatarDTO = {
        userId: '',
        avatarData: '',
        fileName: ''
      }
      let currentUser = this.$store.state.userStore.currentUser;
      let fileType = ''
      // 获取截图的 base64 数据
      this.$refs.cropper.getCropData((data) => {
        // console.log("base64", data);
        avatarDTO.avatarData = data;
      });

      // // 获取截图的 blob 数据
      this.$refs.cropper.getCropBlob(data => {
        console.log("blob", data)
        fileType = data.type.split("/")[1];
        let arrayBuffer = data.arrayBuffer();
        console.log(arrayBuffer)
        // 构建DTO对象,
        avatarDTO.userId = currentUser.id
        // avatarDTO.fileName = '' + md5(currentUser.id + currentUser.username) + "." + fileType;
        // 后缀不要了, 后端统一作修改.
        avatarDTO.fileName = '' + md5(Date.now().toString()) + currentUser.username;
        console.log('DTO: ~ ~ ~')
        // 发送请求, 在内部处理返回的fileName.
        this.sendAvatar(avatarDTO);

        // 通过v-if的延时切换, 触发头像的刷新. -- 取消, 直接返回字符串覆盖掉头像src好了
        // this.FLIP_AVATAR_FLAG();
        // setTimeout(() => {
        //   // _this.$forceUpdate()
        //   _this.FLIP_AVATAR_FLAG();
        //   _this.$message.info("强制刷新执行???")
        // }, 1000)
      });
      this.closeDialog();


      // let src = this.avatarSrc;
      // this.SET_AVATAR_SRC('')
      // this.$nextTick(()=>{
      //   this.SET_AVATAR_SRC(src)
      // })


    },
    // 重新上传
    reupload() {
      this.$refs.uploadBtn.$el.click()
    },
    // 关闭弹框
    closeDialog() {
      this.dialogVisible = false
      this.options.img = ''
    },
    sendAvatar(avatarDTO) {
      console.log(avatarDTO);
      let _this = this;
      let url = this.$store.state.constsStore.backEndHost + '/upload_avatar'
      _this.$message.info("头像上传中 ... ")
      $.ajax(url, {
        type: "POST",
        data: JSON.stringify(avatarDTO),
        async: false, // 此处阻止异步是为了避免阿里云没刷新完, 或数据库没更新, 就执行浏览器的图片刷新. 所以等待返回值, 再进行后续处理.
        xhrFields: {
          withCredentials: true
        },
        // 设置为JSON, 方便后端封装对象, 默认的application/x-www-form-urlencoded表单格式会把数据拼接到路径, hein不方便
        contentType: 'application/json',
        dataType: 'text', // 返回字符串即可, 没必要设置为json? 一会儿看看吧, 要不要从数据库返回访问路径
        crossDomain: true,
        success: function (res) {
          console.log(" --- 头像上传成功")
          _this.$message.success("头像上传成功")
          console.log("Settings 里的 res: ", res)
          _this.SET_AVATAR_SRC("https://alifile.sunyujun.com/zuke/avatars/"
              + avatarDTO.fileName + '.jpg')
        },
        error: function () {
          _this.$message.error("头像上传失败~")
        }


      })


    },
    realTime(data) {
      var previews = data
      var h = 0.5
      var w = 0.5

      let theStyle = document.getElementsByClassName("cropper-crop-box")[0].style;
      let theStyle2 = document.getElementsByClassName("cropper-face")[0].style;
      // theStyle.backgroundColor = 'rgba(1,1,1,0.4)';
      // theStyle.color = 'white';
      // theStyle.borderRight = '3px solid red'
      theStyle.borderRadius = previews.w + 'px'
      theStyle.overflow = 'hidden'
      // theStyle2.borderRadius = '50px'

      // 预览小窗口, 不需要了, 上面直接原生JS修改style
      // this.previewStyle2 = {
      //   width: previews.w + "px",
      //   height: previews.h + "px",
      //   overflow: "hidden",
      //   margin: "0",
      //   zoom: 100 / previews.w,
      //   // borderRadius: previews.w / 2 + "px",
      //   borderRadius: previews.w / 2 + "px",
      //   display: "inline-block"
      // }
      // this.previews = data
    }

  }
}
</script>

<style lang="scss" scoped>
.avatar-upload-container {
  text-align: left;
}

.zuke-current-avatar {
  height: 200px;
  margin-bottom: 10px;
  background-color: var(--grey3);
  border-radius: 100px;
}

.choose-btn {
  margin-top: 80px;
  margin-bottom: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;

  .reupload {
    color: #409eff;
    cursor: pointer;
    margin: 10px 0;
  }
}

.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 560px;
  height: 400px;
  background-color: #f0f2f5;
  margin-right: 10px;
  border-radius: 4px;

  .upload {
    text-align: center;
    margin-bottom: 24px;
  }

  .avatar-crop {
    width: 560px;
    height: 400px;
    position: relative;

    .crop-box {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      overflow: hidden;

      .cropper-crop-box {
        border-radius: 100px;

        //.cropper-face {
        //  border-radius: 100px;
        //}
      }

    }

  }
}
</style>