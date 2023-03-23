<template>
  <div class="Room">
    <!-- 表格 -->
    <vxe-table
      align="center"
      :height="tableHeight"
      size="small"
      style="margin-top: 20px"
      stripe
      :data="tableList"
      show-overflow
      class="mytable-scrollbar"
    >
      <vxe-column field="Name" title="姓名" width="120">
        <template slot-scope="{ row }">
          <span>
            <!-- {{ row.Name | hideMiddle }} -->
            {{ row.Name }}
          </span>
        </template>
      </vxe-column>
      <vxe-column field="SexName" title="性别" width="100"></vxe-column>
      <vxe-column field="IsClosed" title="结案状态" width="100">
        <template #default="{ row }">
          <div>{{ row.IsClosed ? '已结案' : '在案' }}</div>
        </template>
      </vxe-column>
      <vxe-column field="Age" title="年龄" width="100"></vxe-column>
      <vxe-column field="CardNo" title="证件号" width="180">
        <template slot-scope="{ row }">
          <span>
            {{ row.CardNo | hideMiddlelong }}
          </span>
        </template>
      </vxe-column>
      <vxe-column field="Address" title="居住地址" min-width="120">
        <template slot-scope="{ row }">
          <span>
            {{ row.Address | hideMiddlelong }}
          </span>
        </template>
      </vxe-column>
      <vxe-column field="DiagnosisTypeName" title="结核病类型" width="120"></vxe-column>
      <vxe-column field="ShouldInspectCount" title="应检查次数" width="120"></vxe-column>
      <vxe-column field="ActualInspectCount" title="实际检查次数" width="120"></vxe-column>
      <vxe-column field="NotInspectCount" title="未检查次数" width="120"></vxe-column>
      <vxe-column field="AdminOrganizationName" title="管理机构" width="180"></vxe-column>
      <vxe-column field="ResponsibilityName" title="责任医师" width="100"></vxe-column>
    </vxe-table>
    <Edit ref="edit" @edit="edit"></Edit>
    <Details ref="detail" @edit="edit"></Details>

    <AppointmentEdit ref="appointmentEdit"></AppointmentEdit>
  </div>
</template>
<script>
// 弹窗子组件
import Edit from './components/Edit.vue';
import Details from './components/details.vue';
import AppointmentEdit from './components/appointmentEdit.vue';
export default {
  name: 'patientRecords',
  components: { Edit, AppointmentEdit, Details },
  props: ['tableList', 'form', 'changePage', 'getListInfo', 'TotalCount'],
  data() {
    return {
      tableHeight: '300', //table高度
      showSearch: true,
      isShow: false,
    };
  },
  created() {},
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
        this.tableHeight = availHeight - elPageClientHeight - 470;
      });
    },

    // 确认
    edit(flag, data) {
      if (flag == 'details') {
        this.$baseMessage('增加成功', 'success');
      }
    },

    // 分页当前页变化回调
    childerChangePage(page) {
      console.log('ssss');
      this.changePage(page);
    },
    handleSizeChange(data) {
      console.log('ssss11111');
      this.form.PageSize = data;
      this.$emit('getList');
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
</style>