<template>
  <div class="box">
    <el-row :gutter="40">
      <!-- 左侧 -->
      <el-col :span="5">
        <div class="grid-content ">
          <div>行政区划</div>
          <div class="treestyle">
            <el-input placeholder="输入搜索的内容" v-model="filterText" suffix-icon="el-icon-search">
            </el-input>
            <div class="trees">
              <el-card class="box-card" style="margin-top:20px">
                <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all
                  :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick">
                </el-tree>
              </el-card>

            </div>
          </div>
        </div>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="19">
        <div class="grid-content bg-purple-light">
          <!-- 顶部按钮 -->
          <el-row>
            <el-col :span="8">
              <el-input placeholder="请输入搜索内容" suffix-icon="el-icon-search"></el-input>
            </el-col>
            <el-col :span="6" :offset="10">
              <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
              <el-button type="primary">批量处理</el-button>
            </el-col>
          </el-row>
          <!-- 展示区 -->
          <el-table :data="tableData" stripe style="width: 100%" align="center" :header-cell-style="headStyle"
            :cell-style="headStyle">
            <el-table-column type="index" fixed label="序号" width="100">
            </el-table-column>
            <el-table-column fixed label="操作" width="120">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                <el-button type="text" size="small">删除</el-button>

              </template>
            </el-table-column>
            <el-table-column prop="name" label="机构ID" width="180">
            </el-table-column>
            <el-table-column prop="OrganizationName" label="机构名称" width="220">
            </el-table-column>
            <el-table-column prop="name" label="启用状态" width="180">
              <template #default="{ row }">
                <el-switch v-model="row.status" active-value="1" inactive-value="0"
                  @change="handleChangeStatus(row, $event)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="Abbreviation" label="机构拼音" width="180">
            </el-table-column>
            <el-table-column prop="Address" label="医院地址" width="220">
            </el-table-column>
            <el-table-column prop="Phone" label="联系电话" width="120">
            </el-table-column>
            <el-table-column prop="name" label="邮政编制" width="120">
            </el-table-column>
            <el-table-column prop="name" label="备注" width="180">
            </el-table-column>
            <el-table-column prop="Org_OrganizationId" label="父级机构ID" width="180">
            </el-table-column>
            <el-table-column prop="OrganizationClass" label="级别序号" width="180">
            </el-table-column>
          </el-table>

          <!-- 分页器 -->

        </div>
      </el-col>
    </el-row>
    <!-- dialog -->
    <el-dialog title="新增机构" :visible.sync="dialogFormVisible">
      <el-form :model="form" :inline="true">
        <el-form-item label="机构ID" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="行政区划" :label-width="formLabelWidth">
          <el-cascader v-model="value" :options="options" :props='defaultParams' @change="handleChange($event)">
          </el-cascader>
        </el-form-item>

        <el-form-item label="机构名称" :label-width="formLabelWidth">
          <el-input v-model="form.OrganizationName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="启用状态" :label-width="formLabelWidth">
          <template>
            <el-switch v-model="form.status" active-value="1" inactive-value="0">
            </el-switch>
          </template>
        </el-form-item>

        <el-form-item label="机构拼音" :label-width="formLabelWidth">
          <el-input v-model="form.Abbreviation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构别名" :label-width="formLabelWidth">
          <el-input v-model="form.Abbreviation" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="机构地址" :label-width="formLabelWidth">
          <el-col :span="20">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>


        <el-form-item label="联系人姓名" :label-width="formLabelWidth">
          <el-input v-model="form.Contacts" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.Phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="父级机构ID" :label-width="formLabelWidth">
          <el-input v-model="form.Org_OrganizationId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="级别序号" :label-width="formLabelWidth">
          <el-input v-model="form.OrganizationClass" autocomplete="off"></el-input>
        </el-form-item>



      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// import Slect from './slect.vue'
import { getOrganizationList, getRegionsList } from '@/api/organizationManagement'
export default {
  name: 'OrganizationManagement',
  // components: { Slect },
  data() {
    return {
      filterText: '',
      // 树结构数据
      data: [],
      // dialog数据
      form: {

      },
      status: '',
      formLabelWidth: '',
      dialogFormVisible: false,
      tableData: [],
      defaultProps: {
        children: 'children',
        label: 'RegionName'
      },
      // 下拉框数据
      value: '',
      // dialog的下拉行政数据
      options: [],
      defaultParams: {
        value: "RegionCode", //设置默认值value
        label: "RegionName", //设置显示的是什么
        children: "children", //设置子元素数组是啥
        // lazy: true, //懒加载子节点
      },
    };
  },
  mounted() {
    let option = { Reg_RegionCode: 360000000000, PageSize: "9" }
    getOrganizationList(option).then(res => this.tableData = [...res.Response.items])
    // let op={Reg_RegionCode: 360000000000}
    // getRegionsList(op).then(res => this.data = [...res.Response.items])
    this.getlist()
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.RegionName.indexOf(value) !== -1;
    },
    // 状态修改
    handleChangeStatus(row) {
      this.$baseConfirm(
        `确定要${row.status == 1 ? '启用' : '停用'} ${row.name} 角色吗？`, null,
        () => {
          this.$baseMessage('角色状态修改成功', 'success')
        }
      )
    },
    // 行政下拉起始数据
    async getlist() {
      let options = { Reg_RegionCode: '360000000000' }
      let res = await getRegionsList(options)
      if (res.StatusCode == 200) {
        this.data = res.Response.items
        this.options = res.Response.items
        if (data.RegionCode) {
          await getRegionsList(data.RegionCode)
        }
      }
    },
    // 行政下拉
    async handleNodeClick(data) {
      let op = { Reg_RegionCode: data.RegionCode }
      let res = await getRegionsList(op)
      if (res.StatusCode == 200) {
        let arr = [...res.Response.items]
        arr.shift()
        this.$set(data, 'children', arr)
      }
    },
    // 表格内容居中
    headStyle() {
      return 'text-align:center'
    },
    // 修改表格信息
    handleClick(row) {
      this.dialogFormVisible = true;
      this.tableData = [...row]
    },
    // 对dialog下拉行政的函数
    async handleChange($event) {
    }
  },



};

</script>

<style lang="scss" scoped>
.box {
  padding: 30px;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.grid-content {
  border-radius: 4px;
  height: 500px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.treestyle {
  margin-top: 20px;
}

.trees {
  margin-top: 20px;
  font-size: 24px;
}

.box-card {
  // background-color: #e4e4e4;
  min-height: 460px;
}
</style>