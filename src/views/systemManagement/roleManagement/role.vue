<template>
  <div>
    <el-row :gutter="40">
      <!-- 左侧 -->
      <el-col :span="6">
        <div class="grid-content">
          <div>角色列表</div>
          <div class="treestyle">
            <el-input placeholder="输入搜索的内容" v-model="filterText" suffix-icon="el-icon-search"></el-input>
            <!-- 角色列表展示 -->
            <!-- <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
              background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu> -->

            <!-- 单选框 -->
            <el-radio-group v-model="radio" size="mini" style="margin-top: 20px">
              <el-radio :label="3">全部</el-radio>
              <el-radio :label="6">已启用</el-radio>
              <el-radio :label="9">已禁用</el-radio>
            </el-radio-group>
            <el-card class="box-card" style="margin-top: 20px">
              <div slot="header" class="clearfix">
                <span>全部分组</span>
                <el-button style="float: right; padding: 3px 0" type="text">新增</el-button>
              </div>
              <!-- <div v-for="o in roles" :key="o.RoleId" class="text item" >
                {{ o.RoleName }}
                <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>
              </div> -->

              <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-submenu :index="o.RoleId" v-for="o in roles" :key="o.RoleId">
                  <template slot="title">
                    <!-- <i class="el-icon-location"></i>
                    <span>{{ o.RoleName }}</span> -->
                    <!-- <i class="el-icon-location"></i> -->
                    <span>{{ o.RoleName }}</span>
                  </template>
                </el-submenu>
              </el-menu>
            </el-card>
          </div>
        </div>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="19">
        <div class="grid-content bg-purple-light">
          <!-- 顶部按钮 -->
          <!-- <el-row>
            <el-col :span="8">
              <el-input placeholder="请输入搜索内容" suffix-icon="el-icon-search"></el-input>
            </el-col>
            <el-col :span="6" :offset="10">
              <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
              <el-button type="primary">批量处理</el-button>
            </el-col>
          </el-row> -->
          <!-- 展示区 -->

          <!-- 分页器 -->

          <!-- <Slect></Slect> -->
        </div>
      </el-col>
    </el-row>
    <!-- dialog -->
    <!-- <el-dialog title="新增机构" :visible.sync="dialogFormVisible">
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
    </el-dialog> -->
  </div>
</template>

<script>
import { getRoleList, getRoleLiss, getRoleTree, getTreeList, getOverList, getNavigationbarList, getorganizationpermissionsList, getpermissiontreetableList } from '@/api/roleManagement'
export default {
  name: 'Role',
  data () {
    return {
      filterText: "",
      radio: 3,
      roles: []
    }
  },
  mounted () {
    getpermissiontreetableList().then(res => { })
    let option = { roleId: '583dae90-c066-421e-86a9-3f99089a9dfe' }
    getRoleList().then(res => this.roles = [...res.Response.items])
  },
  methods: {
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    },
    dialogFormVisible () { }
  },
  handleOpen (key, keyPath) {
  },
  handleClose (key, keyPath) {
  }
}

</script>

<style scoped lang=scss>
.text {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.box-card {
  // background-color: #e4e4e4;
  min-height: 460px;
}
</style>