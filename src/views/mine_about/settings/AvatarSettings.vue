<template>
  <div class="avatar-upload-container">
    <div>
      <img :src="imgSrc" alt="avatar" style="height: 200px; margin-bottom: 10px">
    </div>
    <el-button @click="dialogVisible = true">上传头像</el-button>
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
            <div slot="tip">点击或拖拽上传, <br>支持jpg、jpeg、png格式的图片，大小不超过5M</div>
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
          ></vueCropper>
        </div>
      </div>
      <span slot="footer" class="dialog-footer"></span>

      <div style="margin-top: 10px">
        <el-button @click="closeDialog">取 消</el-button>
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
      // imgSrc: 'https://alifile.sunyujun.com/zuke/avatars/7b7d771f683058602af7a5f215f8708.jpg',
      imgSrc: this.$store.state.userStore.avatarSrc

    };
  },
  methods: {
    // 读取原图
    upload(file) {
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
        avatarDTO.fileName = '' + md5(currentUser.id + currentUser.username);
        console.log('DTO: ~ ~ ~')
        this.sendAvatar(avatarDTO);
      });
      this.closeDialog();

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
    sendAvatar(avatarDTO){
      console.log(avatarDTO);
      let _this = this;
      let url = this.$store.state.constsStore.backEndHost + '/upload_avatar'
      $.ajax(url, {
        type: "POST",
        data: JSON.stringify(avatarDTO),
        // async: !noAsync, // 此处没有阻止异步的理由.
        xhrFields: {
          withCredentials: true
        },
        // 设置为JSON, 方便后端封装对象, 默认的application/x-www-form-urlencoded表单格式会把数据拼接到路径, hein不方便
        dataType: 'text', // 返回字符串即可, 没必要设置为json? 一会儿看看吧, 要不要从数据库返回访问路径
        contentType: 'application/json',
        crossDomain: true,
        success: function () {
          console.log(" --- 头像上传成功")
          _this.$message.success("头像上传成功")
        },
        error: function () {
          _this.$message.error("头像上传失败~")
        }


      })



    }

  }
}
</script>

<style lang="scss" scoped>
.avatar-upload-container {
  text-align: left;

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
    }

  }
}
</style>