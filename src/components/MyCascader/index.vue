<template>
  <div class="index">
    <el-cascader
      style="width: 100%"
      ref="cascaderMallCatergory"
      v-model="bindValue"
      :options="options"
      :show-all-levels="showAllLevels"
      :props="bindProps"
      @change="handleChange"
      :placeholder="placeholder"
      :clearable="clearable"
    ></el-cascader>
  </div>
</template>

<script>
import { regions, getRegions } from "@/api/inputselect.js";
export default {
  name: "MyCascader",
  model: {
    prop: "value",
    event: "cas-change",
  },
  props: {
    value: [String, Array],
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    showAllLevels: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    props: {
      type: Object,
      default () {
        return {};
      },
    },
    //是否权限控制
    isAccessControl: {
      type: Boolean,
      default: false
    }

  },
  computed: {
    bindValue: {
      get () {
        return this.value;
      },
      set (value) {
        this.$emit("cas-change", value);
      },
    },
    bindProps () {
      return Object.assign(this.props, { lazyLoad: this.lazyLoadMethod });
    },
  },
  watch: {
    async bindValue (n, o) {
      if (n) {
        await regions(n).then(async (res) => {
          if (this.isAccessControl) {
            this.options = [...await this.filterOneHospData(res.Response)]
          } else {
            this.options = res.Response;
          }
        });
      }
    },
  },
  async created () {
    let authRegionCode = this.$utilsFun.getUserInfo().authRegionCode;
    await regions(authRegionCode).then(async (res) => {
      if (this.isAccessControl) {
        this.options = [...await this.filterOneHospData(res.Response)]
      } else {
        this.options = res.Response;
      }
    });
  },
  mounted () {
    this.bindValue = ''
  },
  data () {
    return {
      options: [],
    };
  },
  methods: {
    //处理机构从哪一级开始
    filterOneHospData (list) {
      if (!list && list.length) {
        return [];
      }
      let newRegion = []; //组装新数据
      let authRegionCode = this.$utilsFun.getUserInfo().authRegionCode
      fn(list);
      function fn (data) {
        for (let i = 0, len = data.length; i < len; i++) {
          if (data[i].RegionCode === authRegionCode) {
            newRegion.push(data[i]);
            break;
          } else if (data[i]?.Children) {
            fn(data[i].Children);
          }
        }
      }
      return newRegion;
    },
    handleChange (node) {
      if (this.bindValue.length != 0) {
        let arr = this.$refs['cascaderMallCatergory'].getCheckedNodes()[0].pathLabels
        this.$emit('callbackbindValue', this.bindValue)
        this.$emit('callbacklable', arr)
      }
    },
    lazyLoadMethod (node, resolve) {
      if (node.level == 0) return
      getRegions({ Reg_RegionCode: node.value, PageSize: 999 }).then((res) => {
        resolve(res.Response.items);
      });
    },
  },
};
</script>

<style scoped>
</style>