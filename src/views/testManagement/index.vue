<template>
  <div class="box">
    <el-table
      :data="tableData"
      border
      v-loading="loading"
      :header-cell-style="headStyles"
      :height="tableHeight"
      :cell-style="headStyle"
      row-key="RegionCode"
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'RegionCode' }"
    >
      <el-table-column prop="RegionName" label="管理机构" width="180"></el-table-column>
      <el-table-column prop="XCJHBRS" label="现存结核病人数" width="180"></el-table-column>
      <el-table-column prop="ZRXZ" label="昨日新增建档病人数"></el-table-column>
      <el-table-column prop="ZYBRS" label="治愈病人数"></el-table-column>
      <el-table-column prop="FFBRS" label="复发病人数"></el-table-column>
      <el-table-column prop="BYXYANGX" label="病原学结果阳性"></el-table-column>
      <el-table-column prop="BYXYINX" label="病原学结果阴性"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { RegulatoryInfo } from '@/api/report';
export default {
  name: 'testManagement02',
  data() {
    return {
      tableHeight: '300', //table高度
      tableData: [],
      loading: false,
    };
  },
  mounted() {
    this.getRegulatoryInfo();
    this.initTableHeight();
  },
  methods: {
    initTableHeight() {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        this.tableHeight = availHeight - 300;
      });
    },
    // 表格内容居中
    headStyle() {
      return 'text-align:left;';
    },
    headStyles() {
      return 'text-align:left;color: #373737 !important;';
    },
    getRegulatoryInfo() {
      this.loading = true;
      let option = { RegionCode: this.$utilsFun.getUserInfo().authRegionCode };
      RegulatoryInfo(option).then(res => {
        this.tableData = [...res.Response];
        this.loading = false;
        console.log(this.tableData, 'tableData结核病数据统计模块');
      });
    },
    // 表格下钻
    async load(tree, treeNode, resolve) {
      let options = { RegionCode: tree.RegionCode };
      let res = await RegulatoryInfo(options);
      console.log(res, '结核病数据监管');
      if (res.StatusCode == 200) {
        let a = res.Response.length;
        let arrdata = res.Response.filter(function (item) {
          return item.RegionCode !== '0';
        });
        resolve([...arrdata]);
      } else {
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  overflow: auto;
}
</style>