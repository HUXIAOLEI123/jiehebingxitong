<template>
  <div class="index">
  <el-cascader style="width: 100%;" v-model="bindValue" :options="options" :show-all-levels="showAllLevels" :props="bindProps"
  @change="handleChange" :placeholder="placeholder" :clearable="clearable"></el-cascader>
  </div>
</template>

<script>
import { getorgcascader, getOrganizationList } from "@/api/inputselect.js";
export default {
  name: "OrgCascader",
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
      default() {
        return {};
      },
    },
  },
  computed: {
    bindValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("cas-change", value);
      },
    },
    bindProps() {
      return Object.assign(this.props, { lazyLoad: this.lazyLoadMethod });
    },
  },
  watch: {
    bindValue(n, o) {
      if (n) {
        getorgcascader(n).then((res) => {
		  for(let i in res.Response.items){
		  	res.Response.items[i]['label']=res.Response.items[i].OrganizationName
		  	res.Response.items[i]['value']=res.Response.items[i].OrganizationId
		  }
          this.options = res.Response.items;
        });
      }
    },
  },
  created() {
    this.bindValue = (
      JSON.parse(localStorage.getItem("userInfo")) || {}
    ).authOrgId;
  },
  data() {
    return {
      options: [],
    };
  },
  methods: {
    handleChange(node) {
    },
    lazyLoadMethod(node, resolve) {
      getOrganizationList({ OrganizationId: node.value }).then((res) => {
        resolve(res.Response.items);
      });
    },
  },
};
</script>

<style scoped>
   
</style>