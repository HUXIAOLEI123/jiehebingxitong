<template>
  <div>
    <el-select
      v-bind:value="value"
      :filterable="filterable"
      :remote="remote"
      @change="SelectChange"
      :multiple="multiple"
      :disabled="disabled"
      :clearable="clearable"
      @blur='blurSelect'
      :placeholder="placeholder"
      :remote-method="remotMethod"
    >
      <el-option
        v-for="item in options"
        :key="item.index"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import enumDataList from "./index";
import { isEmpty } from "@/utils/index";
export default {
  props: {
    // v-model绑定的值
    value: {
      default: "",
      type: [String, Array, Boolean, Number],
    },
    // placeholder提示语
    placeholder: {
      default: "请选择",
      type: String,
    },
    // 是否支持多选
    multiple: {
      default: false,
      type: Boolean,
    },
    // 是否可以清空选项
    clearable: {
      default: false,
      type: Boolean,
    },
    //是否可搜索
    filterable: {
      default: false,
      type: Boolean,
    },
    //是否为远程搜索
    remote: {
      default: false,
      type: Boolean,
    },
    /**
     * 枚举值获取来源，本地定义的枚举/后台返回的枚举
     * sysEnum :本地枚举
     * 后台枚举建议使用接口地址
     */
    dataType: {
      default: "sysEnum",
      type: String,
    },
    //字典名称
    getDictionaryName: {
      default: "",
      type: String,
    },
    // 是否禁用
    disabled: {
      default: false,
      type: Boolean,
    },
    //是否带有查询
    isQuery: {
      type: Boolean,
      default: false,
    },
    /**
     * 枚举值名字  只有当dataType的值为sysEnum时才启用
     */
    enumName: {
      default: "",
      type: String,
    },
    /**
     * 是否联动查询，如果是的话，必须要求传入searchValue,否则不加载线上数据
     */
    isLinkage: {
      type: Boolean,
      default: false,
    },
    /**
     * 模糊搜索的值来自关联的表的时候用
     */
    searchValue: {
      default: "",
      type: [String, Array, Boolean, Number],
    },
    /**
     * 模糊搜索的值来自关联的表的时候用
     */
    searchValue2: {
      default: "",
      type: String,
    },
    /**
     * 从父组件传过来的下拉选项
     */
    pathwaytemplateOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      enumData: enumDataList.enumData, //定义的静态枚举
      options: [], //下拉框选择的数据
      searchkey: "", //下拉框搜索条件
    };
  },
  created() {
    this.initData();
    if (this.pathwaytemplateOptions.length > 0) {
      this.options = this.pathwaytemplateOptions;
    }
  },
  watch: {
    // 关联的外界查询参数改变的时候，那么也要同步去查询
    searchValue: function (newValue, oldValue) {
      this.getEnum();
    },
    // 关联的外界查询参数改变的时候，那么也要同步去查询
    searchValue2: function (newValue, oldValue) {
      this.getEnum();
    },
    value() {
      if (
        this.dataType === "GetICDCodeList" ||
        this.dataType == "GetOperationList"
      ) {
        this.getEnum();
      }
    },
    pathwaytemplateOptions: function (newValue) {
      if (newValue.length > 0) {
        this.options = newValue;
      }
    },
  },
  mounted() {},
  methods: {
    //失焦事件
    blurSelect(){
      this.searchkey = '';
    },
    // 值改变事件
    SelectChange(value) {
      let item = {};
      for (let i of this.options) {
        if (value == i.value) {
          item = i;
        }
      }
      this.$emit("input", value, item);
    },
    initData() {
      if (this.dataType === "sysEnum") {
        if (this.enumName !== "") {
          if (this.isQuery) {
            var item = {
              label: "全部",
              value: "",
            };
            this.options.push(item);
            for (let item of this.enumData[this.enumName]) {
              this.options.push(item);
            }
          } else {
            this.options = this.enumData[this.enumName];
          }
        }
      } else if (this.dataType == "Dictionaries") {
        this.initDictionariesData();
      } else {
        this.getEnum();
      }
    },
    initDictionariesData() {
      let enumList = JSON.parse(window.localStorage.getItem("enumList"));
      if (this.isQuery) {
        var row = {
          label: "全部",
          value: "",
        };
        this.options.push(row);
      }
      for (let item of enumList[this.getDictionaryName]) {
        this.options.push({
          label: item.name,
          value: item.code,
        });
      }
    },
    // 获取线上接口
    getEnum() {
      this.options = [];
      switch (this.dataType) {
        //获取角色信息
        case "Organizationroles":
          var param = {
            tenantid: this.$utilsFun.getUserInfo().organization_Code,
            pageindex: 1,
            pagesize: 9999,
          };
          this.$store
            .dispatch("function/getApi", {
              reqData: param,
              url: "api/organizationroles",
            })
            .then((res) => {
              if (res.resultCode == -1) {
                return this.$message.error(res.resultMessage);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.result.length !== 0) {
                for (let item of res.result) {
                  this.options.push({
                    label: item.roleName,
                    value: item.roleId,
                  });
                }
              }
            });
          break;
        //获取机构信息列表 不带上下级
        case "TenantUserList":
          var param = {
            pageindex: 1,
            pagesize: 9999,
            tenantid: this.$utilsFun.getUserInfo().organization_Code,
            searchkey: this.searchkey,
            outOrganizationCode: this.searchValue,
            referralType: this.searchValue2,
          };
          //判断是否有查询条件，如果没有，则不继续查询
          if (this.isLinkage) {
            if (isEmpty(this.searchValue)) {
              return;
            }
          }
          this.$store
            .dispatch("function/postApi", {
              reqData: param,
              url: this.$URL.urls.TenantUserList,
            })
            .then((res) => {
              this.searchkey = '';
              if (res.resultCode == "-1") {
                return this.$message.error(res.resultMessage);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.result.length !== 0) {
                for (let item of res.result) {
                  this.options.push(item);
                }
              }
            });
          break;
        //根据当前登录人的权限获取机构列表 ---不带上下级
        case "TenantList":
          var param = {
            pageindex: 1,
            pagesize: 9999,
            searchkey: this.searchkey,
            tenantid: this.$utilsFun.getUserInfo().organization_Code,
            outOrganizationCode: this.searchValue,
            referralType: this.searchValue2,
          };
          //判断是否有查询条件，如果没有，则不继续查询
          if (this.isLinkage) {
            if (isEmpty(this.searchValue)) {
              return;
            }
          }
          this.$store
            .dispatch("function/postApi", {
              reqData: param,
              url: this.$URL.urls.TenantList,
            })
            .then((res) => {
              this.searchkey = ''
              if (res.resultCode == "-1") {
                return this.$message.error(res.resultMessage);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.result.length !== 0) {
                for (let item of res.result) {
                  this.options.push(item);
                }
              }
            });
          break;
        //获取随访方式
        case "GetFollowUpWayList":
          var param = {
            tenantid: this.$utilsFun.getUserInfo().organization_Code,
            pageindex: 1,
            pagesize: 9999,
          };
          this.$store
            .dispatch("function/getApi", {
              reqData: param,
              url: this.$URL.urls.GetFollowUpWayList,
            })
            .then((res) => {
              if (res.retrunID == "0") {
                return this.$message.error(res.resultMessage);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.status.length !== 0) {
                for (let item of res.status) {
                  this.options.push({
                    label: item.followUpWayName,
                    value: item.followUpWayId,
                  });
                }
              }
            });
          break;
        //获取交流类型
        case "selectActivityType":
          var param = {
            pageindex: 1,
            pagesize: 9999,
          };
          this.$store
            .dispatch("function/getApi", {
              reqData: param,
              url: this.$URL.urls.GetActivityTypeList,
            })
            .then((res) => {
              if (res.retrunID == "0") {
                return this.$message.error(res.resultMessage);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.status.length !== 0) {
                for (let item of res.status) {
                  this.options.push({
                    label: item.activityTypeName,
                    value: item.activityTypeId,
                  });
                }
              }
            });
          break;

        //获取转诊协议的机构
        case "getAgree":
          var param = {
            pageindex: 1,
            pagesize: 9999,
            outOrganizationCode: this.searchValue,
            referralType: this.searchValue2,
            intoOrganizationName:this.searchkey
          };
          //判断是否有查询条件，如果没有，则不继续查询
          if (this.isLinkage) {
            if (isEmpty(this.searchValue)) {
              return;
            }
          }
          this.$store
            .dispatch("function/postApi", {
              reqData: param,
              url: this.$URL.urls.GetAgreeList,
            })
            .then((res) => {
              this.searchkey = ''
              if (res.retrunID == 0) {
                return this.$message.error(res.errorMsg);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.status !== null) {
                for (let item of res.status) {
                  this.options.push({
                    label: item.intoOrganizationName,
                    value: item.intoOrganizationCode,
                  });
                }
              }
            });
          break;
        //获取机构信息
        case "SelectTenantid":
          var param = {
            pageindex: 1,
            pagesize: 9999,
            tenantid: this.$utilsFun.getUserInfo().organization_Code,
          };
          this.$store
            .dispatch("function/postApi", {
              reqData: param,
              url: this.$URL.urls.GetTenantUserList,
            })
            .then((res) => {
              if (res.resultCode == -1) {
                return this.$message.error(res.resultMessage);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.result.length !== 0) {
                for (let item of res.result) {
                  this.options.push({
                    label: item.tenantname,
                    value: item.tenantid,
                  });
                }
              }
            });
          break;

        //获取机构信息
        case "GetTenantUserList":
          var param = {
            pageindex: 1,
            pagesize: 9999,
            tenantid: this.$utilsFun.getUserInfo().organization_Code,
          };
          this.$store
            .dispatch("function/postApi", {
              reqData: param,
              url: this.$URL.urls.GetTenantUserList,
            })
            .then((res) => {
              if (res.resultCode == -1) {
                return this.$message.error(res.resultMessage);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.result.length !== 0) {
                for (let item of res.result) {
                  this.options.push({
                    label: item.tenantname,
                    value: item.organizationCode,
                  });
                }
              }
            });
          break;
        //获取路径类别信息列表
        case "GetTemplateTypeList":
          var param = {
            tenantid: this.$utilsFun.getUserInfo().organization_Code,
          };
          this.$store
            .dispatch("function/postApi", {
              reqData: param,
              url: this.$URL.urls.GetTemplateTypeTree,
            })
            .then((res) => {
              if (res.resultCode == -1) {
                return this.$message.error(res.resultMessage);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.result.length !== 0) {
                for (let item of res.result) {
                  this.options.push(item);
                }
              }
            });
          break;

        //获取变异字典类型信息列表
        case "GetCauseTypeList":
          var param = {
            tenantid: this.$utilsFun.getUserInfo().organization_Code,
          };
          this.$store
            .dispatch("function/postApi", {
              reqData: param,
              url: this.$URL.urls.GetCauseTypeList,
            })
            .then((res) => {
              if (res.resultCode == -1) {
                return this.$message.error(res.resultMessage);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.result.length !== 0) {
                for (let item of res.result) {
                  this.options.push({
                    label: item.causetypename,
                    value: item.causetypeid,
                  });
                }
              }
            });
          break;

        //获取科室信息列表
        case "GetDeptList":
          var param = {
            tenantid: this.$utilsFun.getUserInfo().organization_Code,
          };
          this.$store
            .dispatch("function/postApi", {
              reqData: param,
              url: this.$URL.urls.GetDeptList,
            })
            .then((res) => {
              if (res.resultCode == -1) {
                return this.$message.error(res.resultMessage);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.result.length !== 0) {
                for (let item of res.result) {
                  this.options.push({
                    label: item.deptname,
                    value: item.deptcode,
                  });
                }
              }
            });
          break;

        //获取ICD码信息列表
        case "GetICDCodeList":
          var param = {
            tenantid: this.$utilsFun.getUserInfo().organization_Code,
            searchkey: this.searchkey || this.value,
          };
          if (typeof param.searchkey == "object") {
            param.searchlist = param.searchkey.join(",");
            param.searchkey = "";
          }
          this.$store
            .dispatch("function/postApi", {
              reqData: param,
              url: this.$URL.urls.GetICDCodeList,
            })
            .then((res) => {
              this.searchkey = ''
              if (res.resultCode == -1) {
                return this.$message.error(res.resultMessage);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.result.length !== 0) {
                for (let item of res.result) {
                  this.options.push({
                    label: item.icdname + "(" + item.icdcode + ")",
                    value: item.icdcode,
                  });
                }
              }
            });
          break;

        //获取手术操作码列表
        case "GetOperationList":
          var param = {
            tenantid: this.$utilsFun.getUserInfo().organization_Code,
            searchkey: this.searchkey || this.value,
          };
          if (typeof param.searchkey == "object") {
            param.searchlist = param.searchkey.join(",");
            param.searchkey = "";
          }
          this.$store
            .dispatch("function/postApi", {
              reqData: param,
              url: this.$URL.urls.GetOperationList,
            })
            .then((res) => {
              this.searchkey = ''
              if (res.resultCode == -1) {
                return this.$message.error(res.resultMessage);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.result.length !== 0) {
                for (let item of res.result) {
                  this.options.push({
                    label: item.operationname + "(" + item.operationcode + ")",
                    value: item.operationcode,
                  });
                }
              }
            });
          break;

        //获取产品信息列表
        case "GetProjectInfoList":
          var param = {
            searchkey: this.searchkey,
            pageindex: 1,
            pagesize: 9999,
          };
          this.$store
            .dispatch("function/postApi", {
              reqData: param,
              url: this.$URL.urls.GetProjectInfoList,
            })
            .then((res) => {
              this.searchkey = ''
              if (res.resultCode == -1) {
                return this.$message.error(res.resultMessage);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.result.length !== 0) {
                for (let item of res.result) {
                  this.options.push({
                    label: item.projectname,
                    value: item.projectid,
                  });
                }
              }
            });
          break;

        //获取产品功能信息列表
        case "GetProjectFunctionList":
          var param = {
            searchkey: this.searchkey,
            pageindex: 1,
            pagesize: 9999,
          };
          this.$store
            .dispatch("function/postApi", {
              reqData: param,
              url: this.$URL.urls.GetProjectFunctionList,
            })
            .then((res) => {
              this.searchkey = ''
              if (res.resultCode == -1) {
                return this.$message.error(res.resultMessage);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.result.length !== 0) {
                for (let item of res.result) {
                  this.options.push({
                    label: item.functionname,
                    value: item.functionid,
                  });
                }
              }
            });
          break;

        //获取路径模板信息列表
        case "GetTemplateList":
          var param = {
            tenantid: this.$utilsFun.getUserInfo().organization_Code,
            sysicdcode: this.searchValue,
            pageindex: 1,
            pagesize: 9999,
          };
          this.$store
            .dispatch("function/postApi", {
              reqData: param,
              url: this.$URL.urls.GetTemplateList,
            })
            .then((res) => {
              if (res.resultCode == -1) {
                return this.$message.error(res.resultMessage);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.result.length !== 0) {
                for (let item of res.result) {
                  this.options.push({
                    label: item.pathwayname,
                    value: item.pathwaycode,
                  });
                }
              }
            });
          break;

        //获取诊疗类别信息列表
        case "GetTherapyTypeList":
          var param = {
            tenantid: this.$utilsFun.getUserInfo().organization_Code,
            therapypower: this.searchValue,
            pageindex: 1,
            pagesize: 9999,
          };
          this.$store
            .dispatch("function/postApi", {
              reqData: param,
              url: this.$URL.urls.GetTherapyTypeList,
            })
            .then((res) => {
              if (res.resultCode == -1) {
                return this.$message.error(res.resultMessage);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.result.length !== 0) {
                for (let item of res.result) {
                  this.options.push({
                    label: item.therapyname,
                    value: item.therapytypeid,
                  });
                }
              }
            });
          break;

        //获取变异原因字典信息列表
        case "GetCauseList":
          var param = {
            tenantid: this.$utilsFun.getUserInfo().organization_Code,
            causetypeid: this.searchValue,
            pageindex: 1,
            pagesize: 9999,
          };
          //判断是否有查询条件，如果没有，则不继续查询
          if (this.isLinkage) {
            if (isEmpty(this.searchValue)) {
              return;
            }
          }
          this.$store
            .dispatch("function/postApi", {
              reqData: param,
              url: this.$URL.urls.GetCauseList,
            })
            .then((res) => {
              if (res.resultCode == -1) {
                return this.$message.error(res.resultMessage);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.result.length !== 0) {
                for (let item of res.result) {
                  this.options.push({
                    label: item.causeremark,
                    value: item.causeid,
                  });
                }
              }
            });
          break;
        //获取角色信息列表
        case "GetRoleList":
          var param = {
            tenantid: this.$utilsFun.getUserInfo().organization_Code,
            pageindex: 1,
            isenabled: "0",
            pagesize: 9999,
          };
          //判断是否有查询条件，如果没有，则不继续查询
          if (this.isLinkage) {
            if (isEmpty(this.searchValue)) {
              return;
            }
          }
          this.$store
            .dispatch("function/postApi", {
              reqData: param,
              url: this.$URL.urls.GetRoleList,
            })
            .then((res) => {
              if (res.resultCode == -1) {
                return this.$message.error(res.resultMessage);
              }
              if (this.isQuery) {
                var row = {
                  label: "全部",
                  value: "",
                };
                this.options.push(row);
              }
              if (res.result.length !== 0) {
                for (let item of res.result) {
                  this.options.push({
                    label: item.rolename,
                    value: item.sysroleid,
                  });
                }
              }
            });
          break;
      }
    },
    // 远程搜索方法
    remotMethod(query) {
      this.searchkey = query;
      this.getEnum();
    },
  },
};
</script>
