<template>

  <div class="box">
    <Role></Role>
  </div>
  <!-- <div class="box">
    <div class="room"> -->
  <!--查询 -->

  <!-- <el-form ref="form" :model="form" inline class="form_row" label-width="80px">
        <el-row :gutter="10">
          <el-col :lg="5" :md="12" :xs="24">
            <el-form-item label="角色名称">
              <el-input v-model="form.roleName" placeholder="请输入角色名称" @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="5" :md="12" :xs="24">
            <el-form-item label="权限字符">
              <el-input v-model="form.roleKey" placeholder="请输入权限字符" @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="5" :md="12" :xs="24">
            <el-form-item label="状态">
              <el-select v-model="form.status" placeholder="角色状态"> -->
  <!-- 使用字典的数据 -->
  <!-- <el-option :label="item.label" :value="item.value" v-for="item in dict.sys_role_status"
                  :key="item.value"></el-option> -->
  <!-- </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="5" :md="12" :xs="24">
            <el-form-item label="创建时间">
              <el-date-picker v-model="dateRange" type="daterange" range-separator="-" start-placeholder="开始日期"
                end-placeholder="结束日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="12" :xs="24">
            <el-form-item>
              <el-button type="primary" size="mini" icon="el-icon-search" @click="handleQuery">查询</el-button>
              <el-button size="mini" round icon="el-icon-refresh" @click="handleReset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form> -->

  <!--按钮区域 -->
  <!-- <div class="but">
        <el-row :gutter="10" class="m_b">
          <el-col :span="1.5">
            <el-button type="primary" round icon="el-icon-circle-plus-outline" size="mini" @click="handlerEdit('add')">
              新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button :disabled="checkRows.length !== 1" type="success" round icon="el-icon-edit" size="mini"
              @click="handlerEdit('edit')">修改</el-button>
          </el-col>

          <el-col :span="1.5">
            <el-button :disabled="checkRows.length == 0" type="text" round icon="el-icon-delete" size="mini"
              @click="handlerDelete">删除</el-button>
          </el-col>
        </el-row>
      </div> -->

  <!-- 表格区域 -->
  <!-- <vxe-table size="small" align="center" stripe :data="tableData" @checkbox-change="checkboxChange"
        @checkbox-all="checkboxAll">
        <vxe-column type="checkbox" width="60"></vxe-column>
        <vxe-column field="roleName" title="角色编号"></vxe-column>
        <vxe-column field="charactername" title="角色名称"></vxe-column>
        <vxe-column field="roleKey" title="字符权限"></vxe-column>
        <vxe-column title="状态">
          <template #default="{ row }">
            <el-switch v-model="row.status" 
            active-value="1" 
            inactive-value="0"
            active-text="启用"
            inactive-text="关闭"
          @change="handleChangeStatus(row, $event)">
            </el-switch>
          </template>
        </vxe-column>

        <vxe-column field="timer" title="创建时间"></vxe-column>
        <vxe-column field="address" title="其他" show-overflow></vxe-column>
      </vxe-table> -->

  <!-- 页码器 -->
  <!-- <el-row :gutter="10">
        <el-col :span="24">
          <el-pagination background :layout="paginationLayout" :current-page="pagination.pageNum" :total="total"
            :page-size="pagination.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
          </el-pagination>
        </el-col>
      </el-row> -->

  <!-- 弹窗子组件 -->
  <!-- <Edit ref="edit" @edit="edit"></Edit>
    </div>
  </div> -->

</template>

<script>
// 检测对象属性为空的方法
import Role from './role.vue'
import { removeProp } from '@/utils/validate.js'
import { FormItem } from 'element-ui'
import Edit from './components/Edit.vue'
export default {
  name: 'RoleManagement',
  components: { Edit, Role },
  //  字典
  dicts: ["sys_role_status"],
  data() {
    return {
      // 表单参数
      form: {
        roleName: '',
        roleKey: '',
        status: ''
      },
      // 创建时间范围查询参数
      dateRange: [],
      showSearch: true,
      // 列表数据
      tableData: [
        { id: 10001, roleName: 'a1', charactername: '普通角色', roleKey: 'A', status: '1', timer: '2022-7-22', address: '暂无' },
        { id: 10002, roleName: 's1', charactername: '管理员', roleKey: 'S', status: '1', timer: '2022-6-22', address: '暂无' },
        { id: 10003, roleName: 'S', charactername: '超级管理员', roleKey: 'Ss', status: '0', timer: '2022-6-22', address: '暂无' },
      ],

      // 已选列表数据
      checkRows: [],
      pagination: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 3,

    }

  },
  created() {
    // this.handleQuery();

  },

  methods: {

    // 查询（派发请求）async
    handleQuery() {
      // 重构查询参数
      // let queryParams = Object.assign(
      // 	{},
      // 	{
      // 		pageNum: this.pagination.pageNum,
      // 		pageSize: this.pagination.pageSize,
      // 	},
      // 	removeProp(this.form)
      // );
      // const res = await listRole(queryParams);
      // let { total, rows, code, msg } = res;
      // if (code !== 200) {
      // 	this.$baseAlert(msg || `获取角色列表失败, 错误码: ${code}`, null);
      // 	this.tableData = [];
      // 	return;
      // }
      // this.total = total;
      // this.tableData = rows;

      this.$baseMessage('派发请求查询成功', 'success')


    },
    // 重置
    handleReset() {
      this.form = this.$options.data().form;
      this.handleQuery();
    },
    // 新增or修改弹窗
    handlerEdit(flag) {
      const len = this.checkRows.length
      if (flag == 'add') {
        this.$refs.edit.show(flag)
      } else {
        if (len !== 1) {
          return this.$baseMessage("请选择一项操作进行修改", "error");
        }
        const [data] = this.checkRows
        this.$refs.edit.show(flag, data)
      }
    },

    // 删除
    handlerDelete() {
      let len = this.checkRows.length
      if (!len) {
        return this.$baseMessage("至少选择一项！", "error");
      }
      this.$baseConfirm("确定要删除所选项吗？", null, async () => {
        let storeId = this.checkRows.map((item) => {
          return item.storeId
        })

        let ids = storeId.toString()
        // 派发请求
        this.$baseMessage('删除成功', "success")
      })
    },

    // 确认新增或修改(弹窗子组件的事件)
    edit(flag) {
      const len = this.checkRows.length
      if (flag == 'add') {
        this.$refs.edit.show(flag)
      } else {
        if (len !== 1) {
          return this.$baseMessage('请选择一项数据进行修改', 'error')
        }
        const [data] = this.checkRows
        this.$refs.edit.show(flag, data)
      }
    },

    //修改角色使用状态
    handleChangeStatus(row) {
      this.$baseConfirm(
        `确定要${row.status == 1 ? '启用' : '停用'} ${row.roleName} 角色吗？`, null,
        () => {
          // async派发请求
          this.$baseMessage('角色状态修改成功', 'success')

        }
      )

    },



    // 复选框事件
    checkboxChange({ records }) {
      this.checkRows = records
    },
    // 全选按钮事件
    checkboxAll({ records }) {
      this.checkRows = records
    },
    // 分页当前页变化回调
    handleCurrentChange(pageNum) {
      this.pageObject.pageNum = pageNum;
      // this.getStaffList();
    },
    // 分页每页条数变化回调
    handleSizeChange(pageSize) {
      this.pageObject.pageSize = pageSize;
      // this.getStaffList();
    },

  },
}
</script>

<style lang="scss" scoped>
// .el-row{
//   margin-bottom: 20px;
// }
.but {
  margin-bottom: 20px;
}
</style>