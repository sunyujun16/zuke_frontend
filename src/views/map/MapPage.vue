<template>
  <div id="zuke-map-page">
    <!--    <div class="zk-map-operation-bg">-->
    <!--      <div class="zk-map-operation-bar">-->
    <!--        <button @click="addCover">添加覆盖物</button>-->
    <!--      </div>-->

    <!--    </div>-->
    <div id="zk-map-container"></div>
    <button style="position: absolute; top: 300px; left:300px" @click="moveMap">点击移动map</button>

  </div>
</template>

<script>
import {mapMutations} from "vuex";
import AMapLoader from "@amap/amap-jsapi-loader"

export default {
  name: "MapPage",
  data() {
    return {
      map: null,
      aMap: null,

    }
  },
  methods: {
    ...mapMutations('headerStore', ['SET_MAIN', 'SET_MAP', 'SET_MINE']),
    initMap() {
      let _this = this;
      AMapLoader.load({
            key: "1651ad391fda68d74c988ea812bf3a04",              // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
          }
      ).then((AMap) => {
            let map = new AMap.Map('zk-map-container', {
                  zoom: 12,
                  // center: [116.397428, 39.90933]
                }
            );
            _this.map = map
            _this.aMap = AMap

            AMap.plugin([
              'AMap.ToolBar',
              'AMap.Scale',
              // 'AMap.HawkEye', // 右下角的菊部缩略图
              // 'AMap.MapType', // 图层切换, 不需要
              'AMap.Geolocation', // 定位控件 // 以上为地图基础控件
              'AMap.ElasticMarker',
              'AMap.AutoComplete',
              'AMap.PlaceSearch',
              'AMap.StationSearch',
              'AMap.Geocoder',
              'AMap.CitySearch',
            ], function () {
              //异步同时加载多个插件
              let n = 1;
              try {
                map.addControl(new AMap.ToolBar());
                n++;
                // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
                map.addControl(new AMap.ToolBar());

                // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
                map.addControl(new AMap.Scale());

                // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
                // map.addControl(new AMap.HawkEye({isOpen:true}));

                // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
                // map.addControl(new AMap.MapType());

                // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
                let geolocation = new AMap.Geolocation({
                  // 是否使用高精度定位，默认：true
                  enableHighAccuracy: true,
                  // 设置定位超时时间，默认：无穷大
                  timeout: 10000,
                  // 定位按钮的停靠位置的偏移量
                  offset: [20, 100],
                  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                  zoomToAccuracy: true,
                  //  定位按钮的排放位置,  RB表示右下
                  position: 'RB'
                });

                geolocation.getCurrentPosition(function (status, result) {
                  if (result.status === 'complete') {
                    console.log(result)
                  } else {
                    console.log(result)
                    if (result.status === 1)
                    _this.$message.info('获取浏览器定位超时')
                  }
                });


                // let infoWindow = new AMap.InfoWindow({
                //   content: '信息窗体_天安门',
                //   anchor: 'bottom-center',
                // });
                // // 在地图上打开信息窗体
                // infoWindow.open(map, [116.397389, 39.909466]);

              } catch (e) {
                console.log(e, e.message, n)
              }

            });

            this.addRightClickMenu()
            //
          }
      ).catch(e => {
            console.log(e);
          }
      )
    },
    addRightClickMenu() {
      let AMap = this.aMap
      let map = this.map
      //创建右键菜单
      var contextMenu = new AMap.ContextMenu();

      //右键放大
      contextMenu.addItem("放大一级", function () {
        map.zoomIn();
      }, 0);

      //右键缩小
      contextMenu.addItem("缩小一级", function () {
        map.zoomOut();
      }, 1);

      //右键显示全国范围
      // contextMenu.addItem("缩放至全国范围", function (e) {
      //   map.setZoomAndCenter(4, [108.946609, 34.262324]);
      // }, 2);

      let contextMenuPositon = null;

      //右键添加Marker标记
      contextMenu.addItem("添加标记", function (e) {
        var marker = new AMap.Marker({
          map: map,
          position: contextMenuPositon //基点位置
        });
      }, 3);

      //地图绑定鼠标右击事件——弹出右键菜单
      map.on('rightclick', function (e) {
        contextMenuPositon = e.lnglat;
        contextMenu.open(map, e.lnglat);
      });

      // contextMenu.open(map, lnglat);
    },
    addCover() {
      let AMap = this.aMap

      var icon = new AMap.Icon({
        size: new AMap.Size(40, 50),    // 图标尺寸
        image: require('@/assets/img/avatars/sans.jpeg'),  // Icon的图像
        // image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',  // Icon的图像
        imageOffset: new AMap.Pixel(0, 0),  // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new AMap.Size(40, 50)   // 根据所设置的大小拉伸或压缩图片
      });
      // 构造点标记，添加icon属性就出问题，唔。。。再议。
      let marker = new AMap.Marker({
        offset: new AMap.Pixel(0, 0),
        // icon: icon, // 添加 Icon 图标 URL
        // icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
        // size: new AMap.Size(100,40),
        // content: '海澜之家，男人的出柜',
        position: [116.405567, 39.910651],
        title: 'fucker'
      });
// 构造矢量圆形
      let circle = new AMap.Circle({
        center: new AMap.LngLat("116.403322", "39.920255"), // 圆心位置
        radius: 1000,  //半径
        strokeColor: "#F33",  //线颜色
        strokeOpacity: 1,  //线透明度
        strokeWeight: 3,  //线粗细度
        fillColor: "#ee2200",  //填充颜色
        fillOpacity: 0.35 //填充透明度
      });

      // 将以上覆盖物添加到地图上
      // 单独将点标记添加到地图上
      this.map.add(marker);
      // add方法可以传入一个覆盖物数组，将点标记和矢量圆同时添加到地图上
      this.map.add([marker, circle]);
    },
    moveMap() {
      // this.map.setCenter([116.392309, 39.900466], false)

      this.$message({
        message: 'moving',
        type: 'info',
        offset: 60,
        // duration: 500

      })
      // this.map
    }
  },
  activated() {
    this.SET_MAIN(false);
    this.SET_MAP(true);
    this.SET_MINE(false);
  },
  // beforeRouteEnter(from, to, next) {
  //   next()
  // },
  beforeMount() {
    this.initMap()
  },
  mounted() {
    if (this.aMap) {
      console.log('aMap加载完币1')
    }
    setTimeout(() => {
      if (this.aMap) {
        console.log('aMap加载完币2')
      }
      this.addCover()
    }, 1000)
  },
  beforeDestroy() {
    // let allOverlays = this.map.getAllOverlays();
    // allOverlays.forEach(lay => {
    //   this.map.remove(lay)
    // })
    // this.map.clearMap();
    this.map.destroy()
  }

}
</script>

<style scoped>
#zuke-map-page {
  position: absolute;
  width: 100%;
  height: calc(100% - 60px - 24px);
  /*background-color: red;*/
  background-color: rgba(245, 245, 245, 0.6);
  z-index: -200;
}

.zk-map-operation-bg {
  width: 100%;
  height: 24px;
}

#zk-map-container {
  width: 100%;
  height: 100%;
}

</style>