<template>
<!-- 行政地址封装组件 -->
  <el-cascader
    :key="currentHospCode"
    :props="props"
    :show-all-levels="false"
    :clearable="clearable"
    :options="options"
    v-model="selectedValue"
    @change="changeHosp"
    placeholder=""
    class="cascaderHosp"
    :disabled="isDisabled"
  ></el-cascader>
</template>
<script>
//行政地址请求
import { administrativearea
               } from "@/api/inputselect.js";
import { getLoginInfo } from "@/utils/auth";
export default {
  name: "cascaderHosp",
  props: {
    //是否可清空，不传默认是
    clearable: {
      type: [Boolean],
      default: true
    },
    //是否清空选项值
    isClearableVal: {
      type: [Boolean],
      default: false
    },
    //是否可选
    isDisabled: {
      type: [Boolean],
      default: false
    },
    //机构编码，传入将查询这一机构的父级及同级所有数据
    currentHospCode: {
      type: [String, Number],
      default: null
    },
    //是否权限控制，为true将对currentHospCode查询后的数据进行处理
    isAccessControl: {
      type: [Boolean],
      default: true
    }
  },
  data() {
    let _self = this;
    return {
      options: [],
      selectedValue: [], //选中值
      props: {
        lazy: true,
        label: "HospName",
        value: "HospId",
        children: "Children",
        checkStrictly: true, //控制单选选择任意一级选项
        lazyLoad(node, resolve) {
          if (node?.level > 0 && node?.value) {
            _self.getChildHosp(node?.value).then(res => {
              resolve(res);
            });
          }
        }
      }
    };
  },
  watch: {
    isClearableVal: {
      immediate: true,
      handler(val) {
        if (val) {
          this.selectedValue = [];
        }
      }
    },
    currentHospCode: {
      immediate: true,
      handler(val) {
        this.selectedValue = [];
        if (val) {
          this.fullParentHospital();
        } else if (val != "") {
          this.getCurrentHosp();
        }
      }
    }
  },
  methods: {
    //获取当前账号的机构信息
    getCurrentHosp() {
      this.$store
        .dispatch("function/getApi", {
          reqData: {
            HospId: getLoginInfo().HospitalID,
            PageNumber: 1,
            PageSize: 2147483646
          },
          url: this.$URL.urls.hospitals
        })
        .then(res => {
          let nodes = this.handleData(res.Response.items);
          this.options = nodes;
          if (this.options?.length > 0) {
            this.selectedValue.push(this.options[0].HospId);
            this.changeHosp(this.selectedValue);
          }
        });
    },
    //根据传递的机构编码获取它的上级及同级机构数据
    async fullParentHospital() {
      this.$loading({ text: "加载中...", target: ".cascaderHosp" });
      let res = await this.$store.dispatch("function/getApi", {
        url: this.$URL.urls.fullParentHospital + `/${this.currentHospCode}`
      });
      let resData = res.Response;
      if (this.isAccessControl) {
        resData = await this.filterOneHospData(resData);
      }
      this.options = await this.filterHospData(resData);
      this.changeHosp(this.selectedValue);
      this.$hideLoading();
    },
    //递归处理机构数据
    filterHospData(data) {
      if (!data && data.length) {
        return [];
      }
      let newRegion = []; //组装新数据
      for (let i = 0, len = data.length; i < len; i++) {
        data[i].leaf = false;
        // data[i].children=data[i]?.Children;
        newRegion.push(data[i]);
        if (data[i].IsSelected) {
          this.selectedValue.push(data[i].HospId);
        }
        if (data[i]?.Children) {
          this.filterHospData(data[i].Children);
        }
      }
      return newRegion;
    },
    //处理机构从哪一级开始
    filterOneHospData(list) {
      if (!list && list.length) {
        return [];
      }
      let newRegion = []; //组装新数据
      fn(list);
      function fn(data) {
        for (let i = 0, len = data.length; i < len; i++) {
          if (data[i].HospId === getLoginInfo().HospitalID) {
            newRegion.push(data[i]);
            break;
          } else if (data[i]?.Children) {
            fn(data[i].Children);
          }
        }
      }
      return newRegion;
    },
    //获取下级机构数据
    getChildHosp(HospId) {
      return new Promise(resolve => {
        this.$store
          .dispatch("function/getApi", {
            reqData: {
              Hos_HospId: HospId,
              PageNumber: 1,
              PageSize: 2147483646
            },
            url: this.$URL.urls.hospitals
          })
          .then(res => {
            let nodes = this.handleData(res.Response.items);
            resolve(nodes);
          });
      });
    },
    handleData(data) {
      let nodes = [];
      data.forEach(e => {
        nodes.push({
          HospId: e.HospId,
          HospName: e.HospName,
          leaf: false
        });
      });
      return nodes;
    },
    changeHosp(e) {
      if (e.length > 0) {
        this.$store
          .dispatch("function/getApi", {
            reqData: {
              HospId: e[e.length - 1],
              PageNumber: 1,
              PageSize: 2147483646
            },
            url: this.$URL.urls.hospitals
          })
          .then(res => {
            this.$emit("changeHosp", res.Response.items[0]);
          });
      } else {
        this.$emit("changeHosp", {});
      }
    }
  }
};
</script>
<style lang="scss"></style>
