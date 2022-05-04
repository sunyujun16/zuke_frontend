<template>
  <div>
    <div :class="selectorClass">
      <el-cascader
          v-model="selectedValue"
          placeholder="切换城市"
          :options="provinces"
          @change="handleChange"
          filterable>
      </el-cascader>
    </div>




  </div>
</template>

<script>
import {mapState} from "vuex";
import $ from "jquery";

export default {
  name: "CitySelector",
  props: ['map', 'aMap'],
  data() {
    return {
      selectedValue: [],
      provinces: [ // 初始数据, 没什么用.
        {
          value: 'default',
          label: '河南',
          children: [
            {
              value: 'NewYork',
              label: '纽约',
              children: [
                {
                  value: 'brooklyn',
                  label: '布鲁克林'
                },
                {
                  value: 'liItaly',
                  label: '小意大利'
                },
              ]
            },
          ]
        },
      ],
      sth: '',

    };
  },
  computed: {
    ...mapState('mapStore', ['comListShow']),
    selectorClass() {
      return this.comListShow ? 'zk-map-selector-default' : 'zk-map-selector-hidden'
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    initCities() {
      let _this = this;
      $.ajax('http://localhost:9527/get_cities', {
        type: "GET",
        contentType: 'application/json',
        success: function (response) {
          console.log("初始化成功")
          _this.provinces.pop();

          response.provinces.forEach((province) => {
            let childrenTemp = [];
            province.cities.forEach(city => {
              let cityTemp = {value: '', label: ''};
              cityTemp.value = city.name;
              cityTemp.label = city.name;
              cityTemp.adCode = city.adCode;
              childrenTemp.push(cityTemp);
            })
            let provinceTemp = {value: '', label: '', children: []};
            provinceTemp = {value: province.name, label: province.name, children: childrenTemp}
            _this.provinces.push(provinceTemp)
          })
        },
        error: function (e) {
          _this.$message.error(e.status + "无法从服务器获取数据")
          // console.log("数据同步失败" + e.message)
        }
      })
    }
  },
  mounted() {
    // setTimeout(() => { console.log("map: ", this.map) }, 1000) // map 加载没问题
    // 初始化列表
    this.initCities()

  }
}
</script>

<style scoped>
.zk-map-selector-default {
  position: absolute;
  left: 540px;
  top: 20px;
  transition: 0.5s ease
}

.zk-map-selector-hidden {
  position: absolute;
  left: 20px;
  top: 20px;
  transition: 0.5s ease
}

.el-menu-zuke {
  border: 1px solid var(--tea-op5);
}

</style>