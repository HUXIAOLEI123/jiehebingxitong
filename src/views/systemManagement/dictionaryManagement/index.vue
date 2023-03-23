<template>
	<div class="box">
		<!-- 表单搜索 -->
		<el-form ref="form" :model="form" label-width="80px" size="small" inline class="form_row">
			<el-row>
				<el-col :span="6">
					<el-form-item label="类别名称:" prop="CategoryName">
						<el-input v-model="form.CategoryName" clearable placeholder="请输入搜索内容"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="字典ID:" prop="CategoryCode">
						<el-input v-model="form.CategoryCode" clearable placeholder="请输入搜索内容"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<div class="searchbox">
						<div class="searchBtn" @click="getStaffList">
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
						<el-button class="addBtn Btn" round type="primary" @click="add">
							<img class="addBtnimg" src="../../../assets/images/addbtnicon.svg" alt="" />
							新增
						</el-button>
					</el-col>
				</el-row>
			</div>
		</div>
		<!-- 表格区域 -->
		<vxe-table size="small" align="center" stripe :data="tableData" class="mytable-scrollbar" ref="multipleTable"
			tooltip-effect="light" border resizable :height="tableHeight">
			<vxe-column field="CategoryName" title="类别名称" width="160"></vxe-column>
			<vxe-column field="CategoryCode" title="类别ID" width="160"></vxe-column>
			<vxe-column field="Sort" title="排序" width="80"></vxe-column>
			<vxe-column field="Remarks" title="备注"></vxe-column>
			<vxe-column field="IsEnable" title="启用标识" width="80">
				<template #default="{ row }">
					<el-tag type="primary" v-if="row.IsEnable">正常</el-tag>
					<el-tag type="danger" v-if="!row.IsEnable">停用</el-tag>
				</template>
			</vxe-column>
			<vxe-column title="操作" width="140" fixed="right">
				<template #default="{ row }">
					<div class="flex_center">
						<el-link type="warning" @click="edit(row)">修改</el-link>
						<div class="Divider"></div>
						<el-link type="danger" @click="handlerDelete(row)">删除</el-link>
					</div>
				</template>
			</vxe-column>
		</vxe-table>
		<!-- 分页器 -->
		<div class="app-pagination">
			<!-- 页码器 -->
			<el-pagination ref="elPage" :layout="paginationLayout" :total="total" :current-page="form.pageNum"
				:page-size="form.pageSize" @current-change="handlerPageChange" @size-change="handlerPageSizeChange">
			</el-pagination>
		</div>
		<!--   -->
		<pageEdit ref="pageEdit" @submit="getStaffList"></pageEdit>
		<pageEditDictionary ref="pageEditDictionary" @submit="getStaffList"></pageEditDictionary>
	</div>
</template>
<script>
	import {
		dictionarydetails,
		adddictionarycategory,
		updatedictionarycategory,
		deletedictionarycategory
	} from "@/api/dict.js";
	import pageEdit from "./components/pageEdit.vue";
	import pageEditDictionary from "./components/pageEditDictionary.vue";
	export default {
		name: 'DictionaryManagement',
		components: {
			pageEdit,
			pageEditDictionary
		},
		// 字典使用
		data() {
			return {
				tableHeight: "300",
				form: {
					PageNumber: 1,
					PageSize: 10,
				},
				tableData: [],
				total: 0,
			}
		},
		created() {
			// 搜索请求初始渲染
			this.getStaffList();
		},
		mounted() {
			this.initTableHeight()
		},
		methods: {
			//重置
			resetBtn() {
				this.$refs["form"].resetFields();
				this.form.PageNumber = 1
				this.getStaffList()
			},
			// 搜索请求
			async getStaffList(params) {
				const res = await dictionarydetails({
					...params,
					...this.form
				})
				this.tableData = res.Response.items;
				this.total = res.Response.TotalCount;
			},
			// 新增字典
			add() {
				var param = {
					title: '新增字典',
					visible: true,
					opt: "add"
				}
				this.$refs.pageEdit.getDetail(param)
			},
			// 修改字典
			edit(row) {
				var param = {
					title: '编辑字典管理',
					visible: true,
					opt: 'edit',
					CategoryCode: row.CategoryCode
				}
				this.$refs.pageEditDictionary.getDetail(param)
			},
			// 删除
			async handlerDelete(row) {
				this.$confirm("确认要删除这条数据吗?", "删除", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "error",
					roundButton:true,
				}).then(async () => {
					await deletedictionarycategory([row.CategoryCode])
					this.$message.success('删除成功');
					this.getStaffList()
				});
			},
			// 分页当前页变化回调
			handlerPageChange(PageNumber) {
				this.form.PageNumber = PageNumber;
				this.getStaffList();
			},
			// 分页每页条数变化回调
			handlerPageSizeChange(PageSize) {
				this.form.PageSize = PageSize;
				this.getStaffList();
			},
			initTableHeight() {
				this.$nextTick(() => {
					let availHeight = window.screen.availHeight; //页面可视化高度
					var elPageClientHeight = this.$refs.elPage.$el.clientHeight; // 分页器高度
					this.tableHeight = availHeight - elPageClientHeight - 380;
				});
			},
		}
	}
</script>
