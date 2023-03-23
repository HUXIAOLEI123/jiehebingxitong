<template>
  <div class="box">
    <h3>用户列表</h3>
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input placeholder="请输入搜索内容" suffix-icon="el-icon-search" :value="input">
          </el-input>
        </div>
      </el-col>

      <el-col :span="6" :offset='12'>
        <div class="grid-content bg-purple btnsort">
          <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
          <el-button type="primary">批量处理</el-button>
        </div>
      </el-col>

    </el-row>

    <!-- 展示区 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" fixed label="序号" width="100">
      </el-table-column>
      <el-table-column prop="name" fixed label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small">删除</el-button>

        </template>
      </el-table-column>
      <el-table-column prop="address" label="用户ID" width="220">
      </el-table-column>
      <el-table-column prop="name" label="用户姓名" width="120">
      </el-table-column>
      <el-table-column prop="name" label="启用状态" width="180">
        <template #default="{ row }">
          <el-switch v-model="row.status" active-value="1" inactive-value="0" @change="handleChangeStatus(row, $event)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="用户账号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="用户密码" width="180">
      </el-table-column>
      <el-table-column prop="name" label="机构名称" width="220">
      </el-table-column>
      <el-table-column prop="name" label="联系电话" width="180">
      </el-table-column>
      <el-table-column prop="name" label="用户角色" width="180">
      </el-table-column>
    </el-table>
    <!-- 弹框 -->

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" :inline="true">
        <el-form-item label="机构ID" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="行政区划" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="机构名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="启用状态" :label-width="formLabelWidth">
          <template>
            <el-switch v-model="status" active-value="1" inactive-value="0">
            </el-switch>
          </template>
        </el-form-item>

        <el-form-item label="机构拼音" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构别名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="机构地址" :label-width="formLabelWidth">
          <el-col :span="20">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>


        <el-form-item label="联系人姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="父级机构ID" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="级别序号" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>



      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 页码器 -->
    <!-- <el-pagination background :layout="paginationLayout" :total="total" :current-page="pageObject.pageNum"
				:page-size="pageObject.pageSize" @current-change="handlerPageChange" @size-change="handlerPageSizeChange">
			</el-pagination> -->
  </div>
</template>

<script>
export default {
  name: 'UserManagement',
  data() {
    return {
      input: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      status:'',
    }
   
  },
  methods: {
    handleClick() {

    },
    // 状态修改
    handleChangeStatus(row) {
      this.$baseConfirm(
        `确定要${row.status == 1 ? '启用' : '停用'} ${row.name} 角色吗？`, null,
        () => {
          this.$baseMessage('角色状态修改成功', 'success')
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.btnsort {
  display: flex;
  justify-content: end;
  padding: 0 20px;
}
</style>