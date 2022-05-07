<template>
  <div class="avatar-upload-container">
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
            <div slot="trigger" style="position: relative;">点击按钮, 或拖拽到此区域上传</div>
          </el-upload>
          <div>支持jpg、png格式的图片，大小不超过5M</div>
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
      <div class="reupload" @click="reupload">
        <span v-show="options.img">重新上传</span>
      </div>
      <div>
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="getAndSendCrop">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import {VueCropper} from 'vue-cropper'

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
        autoCropWidth: 200, // 截图框宽度
        autoCropHeight: 200, // 截图框高度
        fixed: true, // 截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        centerBox: true, // 截图框被限制在图片里面
        canMove: false, // 上传图片不允许拖动
        canScale: false, // 上传图片不允许滚轮缩放
        outputSize: 0.1
      }

    };
  },
  methods: {
    // 读取原图
    upload(file) {
      console.log(file)
      const isIMAGE = file.raw.type === 'image/jpeg'
          || file.raw.type === 'image/jpg'
          || file.raw.type === 'image/png'
      const isLt5M = file.raw.size / 1024 / 1024 < 5
      if (!isIMAGE) {
        this.$message({
          showClose: true,
          message: '请选择 jpg、png 格式的图片',
          type: 'warning'
        })
        return false
      }
      if (!isLt5M) {
        this.$message({
          showClose: true,
          message: '图片大小不能超过 5MB',
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
    getAndSendCrop() {
      // 获取截图的 base64 数据
      // this.$refs.cropper.getCropData((data) => {
      // console.log(data)
      //   this.closeDialog()
      // });
      // console.log("获取blob ....")
      // // 获取截图的 blob 数据
      this.$refs.cropper.getCropBlob(data => {
        console.log(data)
        this.closeDialog()
      })
    },
    // 重新上传
    reupload() {
      this.$refs.uploadBtn.$el.click()
    },
    // 关闭弹框
    closeDialog() {
      this.dialogVisible = false
      this.options.img = ''
    }

  }
}
</script>

<style lang="scss" scoped>
.avatar-upload-container {
  text-align: left;

}

.choose-btn {
  margin-top: 60px;
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