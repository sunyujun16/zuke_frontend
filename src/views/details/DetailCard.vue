<template>
  <div class="detail-card">
    <div class="detail-rate-single-item" v-for="(value, attrName, index) in rateTypeItem" :key="attrName">
      <!--      {{ attrName }} &#45;&#45; {{ value }} ** {{ prefix }} ++ {{ index }}-->
      <img class="rate-img" :src="rateImgList[attrName]" alt="rateImg" v-show="value || value === false">
      <img class="main-img" :src="mainImgList[attrName]" :alt="index">
      <br><span></span>{{ attrName }}
    </div>
    <div style="clear: both"></div>
  </div>
</template>

<script>
export default {
  name: "DetailCard",
  props: ['rateTypeItem', 'prefix'],
  computed: {
    mainImgList() {
      // 获取各个图片的地址，添加到列表中，并返回之
      let rateItem = this.rateTypeItem
      let imgList = {}
      let imgSrc = ''
      for (const itemKey in rateItem) {
        if (Object.prototype.hasOwnProperty.call(rateItem, itemKey)) {
          // console.log(itemKey)
          imgSrc = require('/src/assets/img/detail_ico/' + this.prefix + '_' + itemKey + '.png')
          // imgSrc = require('/src/assets/img/detail_ico/quality'+'_smellProof.png')
          imgList[itemKey] = imgSrc
        }
      }
      return imgList;
    },
    rateImgList() {
      let rateItem = this.rateTypeItem
      let imgList = {}
      let imgSrc = ''
      for (const itemKey in rateItem) {
        if (Object.prototype.hasOwnProperty.call(rateItem, itemKey)) {
          // console.log(itemKey)
          let imgNum = 1;
          let itemValue = rateItem[itemKey];
          if (!itemValue && itemValue !== false)  continue;
          else if (itemValue >= 4.5) imgNum = 5
          else if (itemValue >= 3.5) imgNum = 4
          else if (itemValue >= 2.5) imgNum = 3
          else if (itemValue >= 1.5) imgNum = 2
          else {
            imgNum = itemValue;
            // console.log(itemKey,': ', itemValue)
          }

            imgSrc = require('/src/assets/img/detail_ico/circle_' + imgNum + '.png')
          imgList[itemKey] = (imgSrc)
        }
      }
      return imgList
    }
  }
}
</script>

<style scoped>
.detail-rate-single-item {
  float: left;
  font-size: 14px;
  text-align: center;
  margin-left: 50px;
}

.rate-img {
  /* 评分在上层启用这个 */
  /*margin-left: -89px;*/
  /* 评分在下层启用这个 */
    margin-right: -89px;
  opacity: 0.8;
}

.main-img {
  opacity: 0.86;
}


</style>