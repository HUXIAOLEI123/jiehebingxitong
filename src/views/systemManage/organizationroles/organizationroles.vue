<template>
	<div class="box">
		<!-- 搜索 -->
		<el-form ref="searchForm" :model="searchForm" label-width="80px" size="small" inline class="form_row">
			<el-row>
				<el-col :span="6">
					<el-form-item prop="RoleName" label="角色名称:">
						<el-input v-model="searchForm.RoleName" clearable />
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item prop="AuthorityScope" label="权限范围:">
						<el-select v-model="searchForm.AuthorityScope" placeholder="请选择权限范围" clearable>
							<el-option label="无任何权限" value="-1"></el-option>
							<el-option label="自定义权限" value="1"></el-option>
							<el-option label="本部门" value="2"></el-option>
							<el-option label="本部门及以下" value="3"></el-option>
							<el-option label="仅自己" value="4"></el-option>
							<el-option label="全部" value="9"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<!-- <el-button @click="queryBtn" type="primary" style="margin-left: 10px">查询</el-button>
          <el-button @click="resetBtn" plain>重置</el-button>
          <el-button @click="add({ moduleId: '0' })" type="success">新增角色</el-button> -->
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
		<div class="butt">
			<div class="buttbox">
				<el-row :gutter="15">
					<el-col :span="1.5">
						<el-button class="addBtn Btn" round type="primary" @click="add({ moduleId: '0' })">
							<img class="addBtnimg" src="../../../assets/images/addbtnicon.svg" alt="" />
							新增
						</el-button>
					</el-col>
				</el-row>
			</div>
		</div>
		<!-- table -->
		<vxe-table :data="tableData" ref="multipleTable" tooltip-effect="light" border size="small" align="center"
			class="mytable-scrollbar" resizable :height="tableHeight" v-loading="tableLoading">
			<vxe-table-column field="RoleName" title="角色名称" width="120" />
			<vxe-table-column field="AuthorityScope" title="权限范围" width="100" :formatter="filterAuthorityScope" />
			<vxe-column field="Enabled" title="激活状态" width="100">
				<template #default="{ row }">
					<el-tag type="primary" v-if="row.Enabled">是</el-tag>
					<el-tag type="danger" v-if="!row.Enabled">否</el-tag>
				</template>
			</vxe-column>
			<vxe-table-column field="OrderSort" title="排序" width="100" />
			<vxe-table-column field="Description" title="描述" />
			<vxe-column title="操作" width="150" fixed="right">
				<template #default="{ row }">
					<div class="flex_center">
						<el-link type="primary" @click="edit(row)">修改</el-link>
						<div class="Divider"></div>
						<el-link type="danger" @click="delet(row)">删除</el-link>
					</div>
				</template>
			</vxe-column>
		</vxe-table>
		<!-- 分页器 -->
		<div class="app-pagination">
			<el-pagination ref="elPage" :layout="paginationLayout" :total="total" :current-page="searchForm.PageNumber"
				:page-size="searchForm.PageSize" @current-change="handlerPageChange"
				@size-change="handlerPageSizeChange"></el-pagination>
		</div>
		<!-- 新增编辑接口信息 -->
		<pageEdit ref="pageEdit" @submit="queryBtn" />
	</div>
</template>
<script>
	import pageEdit from "./components/pageEdit";
	import {
		getOrganizationrolesList,
		deletes
	} from "@/api/systemManage/OrganizationRole";
	export default {
		name: "medicalSettle",
		components: {
			pageEdit,
		},
		data() {
			return {
				tableData: [],
				tableHeight: "300", //table高度
				tableLoading: false,
				tableData: [],
				searchForm: {
					PageNumber: 1,
					PageSize: 10,
				},
				tenantData: [], //角色数组
				total: 0
			};
		},
		mounted() {
			this.initTableHeight();
		},
		watch: {},
		created() {
			this.query();
		},
		methods: {
			filterAuthorityScope({
				row
			}) {
				switch (row.AuthorityScope) {
					case '-1':
						return '无任何权限'
					case '1':
						return '自定义权限'
					case '2':
						return '本部门'
					case '3':
						return '本部门及以下'
					case '4':
						return '仅自己'
					case '9':
						return '全部'
				}
			},
			//查询按钮
			queryBtn() {
				this.searchForm.PageNumber = 1;
				this.query();
			},
			//重置
			resetBtn() {
				this.$refs["searchForm"].resetFields();
				this.query()
			},
			// 获取角色信息列表
			async query() {
				this.tableLoading = true;
				let res = await getOrganizationrolesList(this.searchForm)
				this.tableLoading = false;
				this.tableData = res.Response.items;
				this.total = res.Response.TotalCount;
			},
			// 删除
			delet(row) {
				this.$confirm("确认要删除吗?", "删除", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "error",
					roundButton:true,
				}).then(async () => {
					await deletes(row.RoleId)
					this.$message.success('删除成功');
					this.queryBtn()
				});
			},
			// 新增角色
			add() {
				var param = {
					title: "新增角色",
					visible: true,
					opt: "add"
				};
				this.$refs.pageEdit.getDetail(param);
			},
			// 修改角色
			edit(row) {
				var param = {
					title: "修改角色",
					visible: true,
					opt: "edit",
					RoleId: row.RoleId
				};
				this.$refs.pageEdit.getDetail(param);
			},
			// 分页当前页变化回调
			handlerPageChange(PageNumber) {
				this.searchForm.PageNumber = PageNumber;
				this.query();
			},
			initTableHeight() {
				this.$nextTick(() => {
					let availHeight = window.screen.availHeight; //页面可视化高度
					var elPageClientHeight = this.$refs.elPage.$el.clientHeight; // 分页器高度
					this.tableHeight = availHeight - elPageClientHeight - 380;
				});
			},
			// 分页每页条数变化回调
			handlerPageSizeChange(PageSize) {
				this.searchForm.PageSize = PageSize;
				this.query();
			},

		}
	};
</script>
