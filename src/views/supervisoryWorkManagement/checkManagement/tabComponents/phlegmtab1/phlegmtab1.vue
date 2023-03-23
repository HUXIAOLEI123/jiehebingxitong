<template>
  <div class="Room">
    <!-- 表格 -->
    <el-button class="checkbtn" type="primary" round @click="handlerEdit('newcheck')">检查预约</el-button>
    <vxe-table
      align="center"
      :height="tableHeight"
      size="small"
      width="400"
      style="margin-top: 20px"
      stripe
      :data="tableList"
      show-overflow
      class="mytable-scrollbar"
    >
      <vxe-column field="Name" title="姓名" width="100">
        <template slot-scope="{ row }">
          <span>
            <!-- {{ row.Name | hideMiddle}} -->
            {{ row.Name }}
          </span>
        </template>
      </vxe-column>
      <vxe-column field="SexName" title="性别" width="100"></vxe-column>
      <vxe-column field="Age" title="年龄" width="100"></vxe-column>
      <vxe-column field="IsClosed" title="结案状态" width="100">
        <template #default="{ row }">
          <!-- <div>{{ row.IsClosed ? '已结案' : '在案' }}</div> -->
          <el-tag :type="row.IsClosed ? 'danger' : 'success'">{{ row.IsClosed ? '已结案' : '在案' }}</el-tag>
        </template>
      </vxe-column>
      <vxe-column field="CardNo" title="证件号" width="120">
        <template slot-scope="{ row }">
          <span>
            {{ row.CardNo | hideMiddlelong }}
          </span>
        </template>
      </vxe-column>
      <vxe-column field="Address" title="居住地址" width="120">
        <template slot-scope="{ row }">
          <span>
            {{ row.Address | hideMiddlelong }}
          </span>
        </template>
      </vxe-column>
      <vxe-column field="DiagnosisTypeName" title="结核病类型" width="120"></vxe-column>
      <vxe-column field="ApplicationTypeName" title="检查原因" width="100" v-show="form.ApplicationItemCategory">
        <template slot-scope="{ row }">
          <span>
            {{ row.ApplicationType == '1' ? '常规检查' : '复查' }}
          </span>
        </template>
      </vxe-column>
      <vxe-column title="检查状态" width="100">
        <template slot-scope="{ row }">
          <!-- <span>
            {{ row.InspectResultTime == null ? '未检查' : '已检查' }}
          </span> -->
          <el-tag :type="row.InspectResultTime == null ? 'warning' : 'success'">
            {{ row.InspectResultTime == null ? '未检查' : '已检查' }}
          </el-tag>
        </template>
      </vxe-column>
      <vxe-column field="ApplicationInspectTime" title="预约时间" width="130">
        <template slot-scope="{ row }">
          <span>
            {{ row.ApplicationInspectTime | parseTime('{y}-{m}-{d}') }}
          </span>
        </template>
      </vxe-column>
      <vxe-column field="InspectResultTime" title="检查日期" width="130">
        <template slot-scope="{ row }">
          <span>
            {{ row.InspectResultTime | parseTime('{y}-{m}-{d}') }}
          </span>
        </template>
      </vxe-column>
      <vxe-column field="InspectResultName" title="检查结果" width="120"></vxe-column>
      <vxe-column field="AdminOrganizationName" title="管理机构" width="130"></vxe-column>
      <vxe-column field="ResponsibilityName" title="责任医师" width="100"></vxe-column>
      <vxe-column title="操作" width="220" fixed="right" v-if="form.ApplicationItemCategory">
        <template #default="{ row }">
          <div class="flex_center">
            <el-link :disabled="row.InspectResultTime == null" type="primary" @click="handlerEdit('details', row)">详情</el-link>
            <div class="Divider"></div>
            <el-link
              :disabled="row.IsClosed ? true : false"
              type="warning"
              v-if="!row.InspectResultName"
              @click="handlerEdit('Modify', row)"
            >
              修改预约
            </el-link>
            <div class="Divider" v-if="!row.InspectResultName"></div>
            <el-link
              :disabled="row.IsClosed ? true : false"
              type="success"
              v-if="row.InspectResultTime == null"
              @click="handlerEdit('warning', row)"
            >
              结果录入
            </el-link>
            <el-link :disabled="row.IsClosed ? true : false" type="warning" @click="handlerEdit('Modify2', row)" v-else>修改录入</el-link>
            <div class="Divider"></div>
            <el-link type="danger" @click="handlerEdit('recurrence', row)">删除</el-link>
          </div>
        </template>
      </vxe-column>
    </vxe-table>
    <Edit ref="edit" @submit="getList"></Edit>
    <AppointmentEdit ref="appointmentEdit" @sumite="getList"></AppointmentEdit>
    <Checktab6Edit ref="checktab6Edit"></Checktab6Edit>
  </div>
</template>
<script>
// 弹窗子组件
import Edit from './components/Edit.vue';
import AppointmentEdit from './components/appointmentEdit.vue';
import Checktab6Edit from '../../../../patientManagement/patientManagement/components/tabComponents/EditComponents/checktab6Edit.vue';
import { InspectApplicationedeletes } from '@/api/InspectApplication.js';
export default {
  name: 'patientRecords',
  components: { Edit, AppointmentEdit, Checktab6Edit },
  props: ['tableList', 'form', 'changePage', 'getListInfo', 'ApplicationItemCategory'],
  data() {
    return {
      tableHeight: '300', //table高度
      showSearch: true,
      isShow: false,
    };
  },
  mounted() {
    this.initTableHeight();
  },
  methods: {
    tabShow() {
      return form.ApplicationItemCategory;
    },
    //计算table的高度
    initTableHeight() {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        var elPageClientHeight = this.$refs.elPage?.$el?.clientHeight || 0; // 分页器高度
        this.tableHeight = availHeight - elPageClientHeight - 500;
      });
    },
    // 新增或修改按钮 弹窗显示
    handlerEdit(flag, data) {
      if (flag == 'details') {
        // data['DiagnosisId'] = data.SourceId;
        //       localStorage.setItem('Patientsdetails', JSON.stringify(data))
        //       this.$router.push({
        //         name: 'PatientManagementdetaltab',
        //         query: { diagnosisId: data.DiagnosisId }
        //       })
        this.$refs.checktab6Edit.show(flag, data);
      } else if (flag == 'warning') {
        //结果录入
        data['DiagnosisId'] = data.SourceId;
        var enumType = '';
        switch (this.form.ApplicationItemCategory) {
          case '1':
            enumType = 'A0040';
            break;
          case '2':
            enumType = 'A0015';
            break;
          case '3':
            enumType = 'A0041';
            break;
          case '4':
            enumType = 'A0024';
            break;
          case '5':
            enumType = 'A0041';
            break;
        }
        this.$refs.edit.show('warning', data, this.form, enumType);
      } else if (flag == 'Modify2') {
        //修改录入
        var enumType = '';
        switch (this.form.ApplicationItemCategory) {
          case '1':
            enumType = 'A0040';
            break;
          case '2':
            enumType = 'A0015';
            break;
          case '3':
            enumType = 'A0041';
            break;
          case '4':
            enumType = 'A0024';
            break;
          case '5':
            enumType = 'A0041';
            break;
        }
        this.$refs.edit.show('Modify2', data, this.form, enumType);
      } else if (flag == 'newcheck') {
        //预约检查
        this.$refs.appointmentEdit.show(flag, '', this.form.ApplicationItemCategory);
      } else if (flag == 'Modify') {
        // 修改预约
        this.$refs.appointmentEdit.show(flag, data);
      } else if (flag == 'Phlegm') {
        data['DiagnosisId'] = data.SourceId;
        this.$refs.appointmentEdit.show(flag, data, this.form.ApplicationItemCategory);
      } else if (flag == 'recurrence') {
        data['DiagnosisId'] = data.SourceId;
        this.$baseConfirm(
          `确认要删除此信息吗？`,
          '删除',
          async () => {
            const inspectApplicationId = data.InspectApplicationId;
            const res = await InspectApplicationedeletes([inspectApplicationId]);
            let { StatusCode, Message } = res;
            if (StatusCode != 200) {
              return this.$baseMessage(Message || '删除失败', 'error');
            }
            this.$baseMessage('删除成功', 'success');
            this.$emit('getListInfo');
          },
          null,
          'error'
        );
      }
    },
    // 分页当前页变化回调
    childerChangePage(page) {
      this.changePage(page);
    },
    getList() {
      this.$emit('getListInfo');
    },
    handleSizeChange(data) {
      this.form.PageSize = data;
      this.getListInfo();
    },
  },
};
</script>

<style lang="scss" scoped>
.Room {
  width: 100%;
}

.search {
  margin-left: 70px;
}

.heard {
  width: 100%;
  height: 140px;
}

.heard > div {
  width: 20%;
  height: 100%;
  margin-right: 30px;
  border-radius: 8px;
  background: #31c86e;
  float: left;
  position: relative;
  padding: 20px 0 0 25px;
}

.heard > div > span {
  font-size: 20px;
  font-weight: 600;
}

.heard > div > i {
  position: absolute;
  top: 50px;
  right: 20px;
  font-size: 50px;
}

.Room {
  .heard {
    span {
      color: #fff;
    }

    p {
      color: #fff;
      line-height: 40px;
      font-size: 18px;
      margin-left: 10px;
    }
  }
}

.el-icon-s-custom {
  color: #fca08d;
}

.el-icon-s-data {
  color: #37d975;
}

.heard > .graphics1 {
  background: #fe856e;
}

.conter {
  width: 100%;
  height: 40px;
  padding-right: 30px;
}

.conter > .but {
  float: right;

  margin-top: 5px;
}
.checkbtn {
  // margin-left: 90%;
}
</style>