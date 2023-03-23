<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    v-if="dialogVisible"
    :close-on-click-modal="false"
    width="70%"
    top="4%"
    @close="close"
  >
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{ title }}</span>
      <div class="button-right">
        <span class="title-close" @click="close"></span>
      </div>
    </div>
    <el-form class="form_row" ref="form" :model="form" label-width="100px">
      <div class="detailstitlo">
        <p class="xqtitolstyle">基本信息</p>
      </div>
      <!-- <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="行政区划:" prop="RegionCode">
              <MyCascader v-model="form.RegionCode" :props="props" clearable></MyCascader>
            </el-form-item>
        </el-col>
      </el-row> -->

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="姓名">
            <span>{{ form.Name }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="性别">
            <span>{{ form.SexName }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="年龄">
            <span>{{ form.Age }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="联系方式">
            <span>{{ form.Phone }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出生日期">
            <span>{{ form.BirthDay | parseTime('{y}-{m}-{d}') }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件号">
            <span>{{ form.CardNo }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="管理机构">
            <span>{{ form.AdminOrganizationName }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="工作地址">
            <span>{{ form.WorkUnit }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="责任医师">
            <span>{{ form.ResponsibilityName }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="居住地址">
            <span>{{ form.Address }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="户籍地址">
            <span>{{ form.ResidenceAddress }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建档日期">
            <span>{{ form.FileDate | parseTime('{y}-{m}-{d}') }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item label="人群属性" prop="ContractStaffs">
            <el-checkbox-group v-model="form.ContractStaffs">
              <el-checkbox v-for="item in ContractStaffList" :key="item.DetailsName" :label="Number(item.DetailsCode)">
                {{ item.DetailsName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button class="cancelbtn" @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
/* api */
import {
  usedictionarydetails
} from '@/api/dict.js'
import {
  detailmanagementist
} from '@/api/Person.js'
import MyCascader from "@/components/MyCascader"
export default {
  name: "Edit",
  components: {
    MyCascader
  },
  data () {
    return {
      props: {
        emitPath: false,
        label: "RegionName",
        children: "Children",
        value: "RegionCode",
        multiple: false,
        checkStrictly: true,
        lazy: true,
      },
      title: "",
      // 弹窗的开关
      dialogVisible: false,
      flag: "",
      ContractStaffList: [],
      // 保存修改信息
      copyform: {},
      form: {
        ContractStaffs: []
      },
      hasinfo: [],


    };
  },
  created () {
    this.usedictionarydetails()


  },
  methods: {
    //人群属性
    async usedictionarydetails (params) {
      const res = await usedictionarydetails({
        CategoryCode: 'A0021'
      })
      this.ContractStaffList = res.Response.items
    },
    async detailmanagementistlist () {
      const res = await detailmanagementist(this.form.PersonId)
      this.form = {
        ...res.Response
      };
    },




    // 确认新增？修改
    show (flag, data) {
      this.dialogVisible = true;
      this.flag = flag;
      this.title = "详情";
      this.form = {
        ...data
      };
      this.copyform = {
        ...data
      }
      this.detailmanagementistlist()


    },

    close () {
      this.dialogVisible = false;
      // 重置数据(封装的方法)
      this.form = this.$options.data().form;
      this.$refs["form"].resetFields();
    },

  },
};
</script>

<style lang=scss scoped>
::v-deep .el-form-item__label {
  font-size: 16px;
  color: #999999 100%;
}

span {
  font-size: 16px;
  color: #252d57;
  margin-left: 10px;
}
</style>
