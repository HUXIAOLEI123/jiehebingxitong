<template>
  <div class="box">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin: 20px">
      <!-- <el-form-item label="行政区划" prop="RegionCode">
        <my-cascader v-model="form.RegionCode" :props="props" isAccessControl clearable></my-cascader>
      </el-form-item> -->

      <el-form-item label="管理机构:" prop="AdminOrganization">
        <el-cascader style="width: 100%" :options="tenantData" :props="propslist" v-model="form.AdminOrganization" clearable></el-cascader>
      </el-form-item>
      <el-form-item label="统计日期" style="margin-left: 30px">
        <el-date-picker
          v-model="value1"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="center"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="margin-left: 30px">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="exportExcle">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="Response" border :height="tableHeight" v-loading="loading" row-key="RegionCode" lazy :load="load">
      <el-table-column prop="OrganizationName" label="管理机构" width="200"></el-table-column>
      <el-table-column prop="JHBZRS" label="结核病总人数" min-width="150"></el-table-column>
      <el-table-column prop="YGLJHBRS" label="已管理结核病人数" width="150"></el-table-column>
      <el-table-column prop="JSJJGQZBTZJCJGDJHBHZ" label="经上级机构确诊并通知基层管理的结核患者" width="300"></el-table-column>
      <el-table-column prop="HZGLL" label="患者管理率" sortable width="140"></el-table-column>
      <!-- <el-table-column prop="HZGLL" width="140">
        <template slot="header">
          
          <el-tooltip class="item" effect="dark" content="">
            <i class="el-icon-top"><i class="el-icon-bottom"></i></i>
          </el-tooltip>
        </template>
      </el-table-column> -->
      <el-table-column prop="GZFYRS" label="规则服药结核病人数" width="150"></el-table-column>
      <el-table-column prop="YSFCS" label="应随访次数" width="120"></el-table-column>
      <el-table-column prop="SJSFCS" label="实际随访次数" width="120"></el-table-column>
      <el-table-column prop="SJSFCS" label="随访完成率" sortable width="140"></el-table-column>
      <!-- <el-table-column prop="SFWCL" width="140">
        <template slot="header">
          
          <el-tooltip class="item" effect="dark" content="患者管理的">
            <i class="el-icon-top"><i class="el-icon-bottom"></i></i>
          </el-tooltip>
        </template>
      </el-table-column> -->
      <el-table-column prop="BLFYRS" label="不良反应人数" width="120"></el-table-column>
      <el-table-column prop="BLFYCZRS" label="不良反应处置人数" width="150"></el-table-column>
      <el-table-column prop="BLFYCZL" sortable label="不良反应处置率" width="170"></el-table-column>
      <!-- <el-table-column prop="BLFYCZRS" label="不良反应处置率" width="170">
        <template slot="header">
          不良反应处置率
          <el-tooltip class="item" effect="dark" content="患者管理的">
            <i class="el-icon-top"><i class="el-icon-bottom"></i></i>
          </el-tooltip>
        </template>
      </el-table-column> -->
      <el-table-column prop="GZFYRS" label="规则服药人数" width="120"></el-table-column>
      <el-table-column prop="BGZFYRS" label="不规则服药人数" width="120"></el-table-column>
      <el-table-column prop="FYSPZHS" label="服药视频转化数" width="120"></el-table-column>
      <el-table-column prop="FYSPZHL" label="服药视频转化率" width="120"></el-table-column>
      <el-table-column prop="GZFYL" sortable label="规则服药率" width="150"></el-table-column>
      <!-- <el-table-column prop="GZFYL" label="" width="150">
        <template slot="header">
          规则服药率
          <el-tooltip class="item" effect="dark" content="患者管理的">
            <i class="el-icon-top"><i class="el-icon-bottom"></i></i>
          </el-tooltip>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>
<script>
import { Pulmonarystandard, Pulmonarystandardexcle } from '@/api/report';
import { exportmanagementist } from '@/api/Person';
import { RegulatoryInfo } from '@/api/report';
import { getOrganizationList, getorgcascader, getuserDrop } from '@/api/organizationManagement.js';
// 级联选择器
import MyCascader from '@/components/MyCascader';
import { reject } from 'q';
import Axios from 'axios';
export default {
  name: 'StandardStatistical01',
  components: { MyCascader },
  data() {
    return {
      // 表单绑定数据
      form: {
        SelectOnly: false,
        AdminOrganization: this.$utilsFun.getUserInfo(),
        IsClosed: true,
      },

      tenantData: [
        {
          OrganizationId: this.$utilsFun.getUserInfo().authOrgId,
          OrganizationName: this.$utilsFun.getUserInfo().authOrgName,
          Children: [],
        },
      ], //机构数组
      tableHeight: '300', //table高度
      loading: false,
      formInline: {},
      RegionCode: '',
      // 起始时间
      value1: [],
      // 表格展示数据
      Response: [],
      // 多级下拉
      props: {
        emitPath: false,
        label: 'RegionName',
        children: 'Children',
        value: 'RegionCode',
        multiple: false,
        checkStrictly: true,
        lazy: true,
      },
      propslist: {
        value: 'OrganizationId',
        label: 'OrganizationName',
        children: 'Children',
        checkStrictly: true,
        emitPath: false,
        lazy: true,
        lazyLoad: this.lazyLoad,
      },
      form: {},
      nodeList: '',
    };
  },
  mounted() {
    var date = new Date();
    var year = date.getFullYear();
    this.value1.push(`${year}-01-01`);
    this.value1.push(this.getNowDate());
    this.form = { StartDate: this.value1[0], EndDate: this.value1[1], OrganizationId: this.$utilsFun.getUserInfo().authOrgId };
    this.getRegionsList(this.form);
    this.initTableHeight();
    this.form.AdminOrganization = this.$utilsFun.getUserInfo().authOrgId;
    console.log(this.value1, 'this.value1', this.form, 'this.form', this.$utilsFun.getUserInfo(), 'this.$utilsFun.getUserInfo().authOrgId');
  },
  methods: {
    //获取管理机构,级联列表
    async getorganizationlist() {
      this.form.AdminOrganization = this.$utilsFun.getUserInfo().authOrgId;
      const res = await getorgcascader(this.form.AdminOrganization);
      console.log(res, '00');
      this.tenantData = res.Response;
    },
    // 传递数据
    async lazyLoad(node, resolve) {
      console.log(node, '----', resolve, 'node, resolve');
      this.nodeList = node.value;
      let res = await getOrganizationList({
        Org_OrganizationId: node.value,
        PageNumber: 1,
        PageSize: 9999,
      });
      console.log(res, 'chaudi ');
      let data = [];
      if (node.level > 0) {
        data = res.Response.items;
      }
      resolve(data);
    },

    initTableHeight() {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        this.tableHeight = availHeight - 380;
      });
    },
    // 获取当前时间
    getNowDate() {
      var date = new Date();
      var seperator1 = '-';
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    // 表格数据
    getRegionsList(option) {
      console.log(option, '表格数据');

      this.loading = true;
      // ----------------------------------------
      // 后端说用线上接口,这个直接可使用,我没换,下面这行当参考
      // Axios({
      //   url: `http://zhjk.jxcdc.cn:8865/api/report/pulmonarystandard?OrganizationId=${this.form.OrganizationId}&EndDate=${this.form.EndDate}&StartDate=${this.form.StartDate}`,
      //   method: 'get',
      //   headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') },
      // })
      //   .then(res => {
      //     console.log(res, 'res2');
      //     this.Response = [...res.data.Response];
      //     this.loading = false;
      //   })
      //   .catch(err => {
      //     console.log(err, 'err');
      //   });
      // --------------------------------------------
      try {
        Pulmonarystandard(option)
          .then(res => {
            console.log(option, res, '只返回合计187行');
            this.Response = [...res.Response];
            this.loading = false;
          })
          .catch(err => {
            console.log(reject.err, 'err');
          });
        console.log(this.Response, 'this.Response');
      } catch (error) {
        console.log(error, 'error');
      }
    },
    // 导出功能
    exportExcle() {
      this.$baseConfirm('确认导出所有数据？', null, async () => {
        const res = await Pulmonarystandardexcle({ ...this.form, ...this.paParams });
        let { StatusCode, Message, Response } = res;
        // 拿到源地址参数
        let origin = process.env.VUE_APP_BASE;
        if (StatusCode == 200) {
          window.open(origin + res.Response);
          this.$baseMessage('数据导出成功', 'success');
        } else {
          this.$baseMessage(`${Message}`, 'error');
        }
      });
    },

    // 表格下钻
    async load(tree, treeNode, resolve) {},
    headStyle() {
      return 'text-align:center;';
    },
    headStyles() {
      return 'text-align:center;color: #373737 !important;';
    },

    // 查询 向服务器发送请求
    search() {
      let { value1 } = this;
      let option = {
        OrganizationId: this.nodeList,
        StartDate: value1[0],
        EndDate: value1[1],
      };
      console.log(option, 'option');
      this.getRegionsList(option);
    },
  },
  // 递归处理分类回显问题
  // key就是接口拿到的值,treeData是全部数据
  changeDetSelect(key, treeData) {
    let arr = []; // 在递归时操作的数组
    let returnArr = []; // 存放结果的数组
    let depth = 0; // 定义全局层级
    // 定义递归函数
    function childrenEach(childrenData, depthN) {
      for (var j = 0; j < childrenData.length; j++) {
        depth = depthN; // 将执行的层级赋值 到 全局层级
        arr[depthN] = childrenData[j].id;
        if (childrenData[j].id == key) {
          returnArr = arr.slice(0, depthN + 1); //将目前匹配的数组，截断并保存到结果数组，
          break;
        } else {
          if (childrenData[j].children) {
            depth++;
            childrenEach(childrenData[j].children, depth);
          }
        }
      }
      return returnArr;
    }
    return childrenEach(treeData, depth);
  },
  editClick(row) {
    this.dialogFormVisible = true;
    this.pids = this.changeDetSelect(row.id, this.tableData);
  },
};
</script>

<style lang="scss" scoped>
.box {
  overflow: auto;
}

.search {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  padding-right: 20px;
}
</style>







