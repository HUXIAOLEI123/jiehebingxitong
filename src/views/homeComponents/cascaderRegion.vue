<template>
  <!-- 行政区划子组件 -->
  <!-- :options="options" -->
  <el-cascader
    class="cascader-region"
    :props="props"
    :clearable="clearable"
    v-model="selectedValue"
    placeholder=""
    @change="changeHosp"
  ></el-cascader>
</template>
<script>

import { regions, fullparentregion, getRegions } from "@/api/inputselect.js";
export default {
  name: "Region",
  props: {
    //是否可清空，不传默认是
    clearable: {
      type: [Boolean],
      default: true,
    },
    //是否清空选项值
    isClearableVal: {
      type: [Boolean],
      default: false,
    },
    //本级地区编码,传入此参数将作为行政区划第一级开始
    currentRegionCode: {
      type: [String, Number],
      default: "",
    },
    //子级地区编码,传入此参数将获取所有上级行政区划
    childRegionCode: {
      type: [String, Number],
      default: "",
    },
  },
  data () {
    let _self = this;
    return {
      selectedValue: ['360000000000'],
      options: [],
      regionData: [],
      props: {
        lazy: true,
        label: "RegionName",
        value: "RegionCode",
        checkStrictly: true, //控制单选选择任意一级选项
        lazyLoad (node, resolve) {
          let localCode = (JSON.parse(localStorage.getItem('userInfo')) || {}).authRegionCode;
          if (!node.value) {
            node.value = localCode
          }
          let { level } = node;
          _self.getChildRegion(node?.value, level).then((res) => {
            resolve(res);
          });
        },
      },
    };
  },
  watch: {
    isClearableVal: {
      immediate: true,
      handler (val) {
        if (val) {
          this.selectedValue = [];
        }
      },
    },
    currentRegionCode: {
      immediate: true,
      handler (val) {
        if (val) {
          this.getCurrentRegion();
        }
      },
    },
    childRegionCode: {
      immediate: true,
      handler (val) {
        if (val) {
          this.fullParentRegion();
        }
      },
    },
  },
  methods: {
    /**
     * 1.获取传递的行政区划数据
     */
    async getCurrentRegion (level) {

      const { Response } = await regions(this.currentRegionCode);

      let nodes = this.handleData(Response, level);
      this.options = nodes;
    },
    /**
     * 2.根据传递的行政区划编码获取它的所有上级及本身
     */
    async fullParentRegion () {
      const res = await fullparentregion({ regionCode: this.childRegionCode });
      this.options = this.filterRegionData(res);
      this.changeHosp(this.selectedValue)
    },
    //递归处理行政区划数据
    filterRegionData (data) {
      if (!data && data.length) {
        return [];
      }
      let newRegion = []; //组装新数据
      for (let i = 0, len = data.length; i < len; i++) {
        data[i].leaf = data[i].RegionLevel >= 6;
        data[i].children = data[i]?.Children;
        newRegion.push(data[i]);
        if (this.childRegionCode == data[i].RegionCode) {
          this.selectedValue = data[i].CodeRelationShip.split(",");
          this.selectedValue.push(this.childRegionCode);
        }
        if (data[i]?.Children) {
          this.filterRegionData(data[i].Children);
        }
      }
      return newRegion;
    },
    //获取下级行政区划数据
    getChildRegion (RegionCode, level) {
      return new Promise((resolve, reject) => {
        regions(RegionCode).then(res => {
          let result;
          result = res.Response
          resolve(result)
        })
      })
    },
    handleData (data, level) {
      let nodes = [];
      data.forEach((e) => {
        e.leaf = level >= 6;
        nodes.push(e);
      });
      return nodes;
    },
    async changeHosp (data) {
      if (data.length > 0) {
        this.$emit("changeRegion", data[data.length - 1]);
      } else {
        this.$emit("changeRegion", '360000000000');
        this.selectedValue = this.$options.data().selectedValue
      }
    },
  },
};
</script>
<style lang="scss">
</style>