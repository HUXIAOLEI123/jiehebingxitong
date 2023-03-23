<template>
  <div class="box">
    <!-- 搜索 -->
    <el-form ref="searchForm" :model="searchForm" label-width="110px" class="form_row">
      <el-row :gutter="6">
        <el-col :span="6">
          <el-form-item prop="RegionCode" label="区划编码:">
            <el-input v-model="searchForm.RegionCode" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="RegionName" label="区划名称:">
            <el-input v-model="searchForm.RegionName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="Reg_RegionCode" label="上级区划编码:">
            <el-input v-model="searchForm.Reg_RegionCode" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- <el-button @click="queryBtn" type="primary" style="margin-left: 10px">查询</el-button>
          <el-button @click="resetBtn" plain>重置</el-button>
          <el-button @click="add" type="success">新增行政区划</el-button> -->
		  <div class="searchbox">
		  	<div class="searchBtn" @click="queryBtn">
		  		<img class="Btnicon" src="@/assets/images/searchicon2.png" alt="">
		  		查询
		  	</div>
		  	<div class="ResetBtn" style="margin-left: 10px;" @click="resetBtn">
		  		<img class="Btnicon" src="@/assets/images/reseticon.svg" alt="">
		  		重置
		  	</div>
		  </div>
        </el-col>
      </el-row>
    </el-form>
    <!-- table -->
	<div class="butt">
		<div class="buttbox">
			<el-row :gutter="15">
				<el-col :span="1.5">
					<el-button class="addBtn Btn" round type="primary" @click="add">
						<img class="addBtnimg" src="../../../assets/images/addbtnicon.svg" alt="" />
						新增
					</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
    <vxe-table
      :data="tableData"
      ref="multipleTable"
      tooltip-effect="light"
      border
      resizable
      :height="tableHeight"
      class="mytable-scrollbar"
      v-loading="tableLoading"
    >
      <vxe-table-column field="RegionCode" title="区划编码" width="160" align="center" />
      <vxe-table-column field="RegionName" title="区划名称" min-width="160" />
      <vxe-table-column field="FullRegionName" title="地区全称" min-width="160" />
      <vxe-table-column field="RegionLevel" title="区划级别" width="80" align="center" />
      <vxe-table-column title="操作" fixed="right" align="center" width="140">
        <template slot-scope="scope">
		  <div class="flex_center ">
			  <el-link type="primary" @click="edit(scope.row)">修改</el-link>
			  <div class="Divider"></div>
			  <el-link type="danger" @click="delet(scope.row)">删除</el-link>
		  </div>
          <!-- <el-button @click="edit(scope.row)" type="primary" size="mini">修改</el-button>
          <el-button @click="delet(scope.row)" type="danger" size="mini">删除</el-button> -->
		  
        </template>
      </vxe-table-column>
    </vxe-table>
    <!-- 分页器 -->
    <div class="app-pagination">
      <el-pagination
        ref="elPage"
        :layout="paginationLayout"
        :total="total"
        :current-page="searchForm.PageNumber"
        :page-size="searchForm.PageSize"
        @current-change="handlerPageChange"
        @size-change="handlerPageSizeChange"
      ></el-pagination>
    </div>
    <!-- 新增编辑行政区划信息 -->
    <pageEdit ref="pageEdit" @submit="queryBtn" />
  </div>
</template>
<script>
import pageEdit from "./components/pageEdit";
import { getList, deletes } from "@/api/systemManage/Region";
export default {
  name: "medicalSettle",
  components: { pageEdit },
  data () {
    return {
      tableData: [],
      tableHeight: "300", //table高度
      tableLoading: false,
      tableData: [],
      searchForm: {
        PageNumber: 1,
        PageSize: 10,
      },
      total: 0,
    };
  },
  mounted () {
    this.initTableHeight();
  },
  created () {
    this.query();
  },
  methods: {
    initTableHeight () {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        var elPageClientHeight = this.$refs.elPage.$el.clientHeight; // 分页器高度
        var moreSearchFormClientHeight =
          this.$refs.searchForm.$el.clientHeight; // 搜索框高度
        this.tableHeight =
          availHeight - elPageClientHeight - moreSearchFormClientHeight - 340;
      });
    },  //查询按钮
    queryBtn () {
      this.searchForm.PageNumber = 1;
      this.query();
    },
    //重置
    resetBtn () {
      this.$refs["searchForm"].resetFields();
      this.query()
    },
    // 获取机构信息列表
    async query () {
      this.tableLoading = true;
      let res = await getList(this.searchForm)
      this.tableLoading = false;
      this.tableData = res.Response.items;
      this.total = res.Response.TotalCount;
    },
    // 删除
    delet (row) {
      this.$confirm("确认要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        roundButton:true,
      }).then(async () => {
        await deletes([row.RegionCode])
        this.$message.success('删除成功');
        this.queryBtn()
      });
    },
    // 新增行政区划
    add () {
      var param = {
        title: "新增行政区划",
        visible: true,
        opt: "add"
      };
      this.$refs.pageEdit.getDetail(param);
    },
    // 修改行政区划
    edit (row) {
      var param = {
        title: "修改行政区划",
        visible: true,
        opt: "edit",
        RegionCode: row.RegionCode,
      };
      this.$refs.pageEdit.getDetail(param);
    },
    // 行政区划详情
    detail (row) {
      var param = {
        title: "行政区划详情",
        visible: true,
        opt: "detail",
        RegionCode: row.RegionCode,
      };
      this.$refs.pageDetail.getDetail(param);
    },
    // 分页当前页变化回调
    handlerPageChange (PageNumber) {
      this.searchForm.PageNumber = PageNumber;
      this.query();
    },
    // 分页每页条数变化回调
    handlerPageSizeChange (PageSize) {
      this.searchForm.PageSize = PageSize;
      this.query();
    },
  },
};
</script>