<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="45%"
    @close="close"
  >
    <div>
      <el-form
        class="form_row"
        ref="formline"
        :model="formline"
        label-width="120px"
      >
        <!-- 变更返回地 -->
        <el-form-item label="变更返回地" prop="DetailedAddress">
          <Region
            @changeRegion="estinationArea"
            class="cascader-region"
            :childRegionCode="DestinationArea"
            style="width: 350px"
          ></Region>
          <el-input
            v-model="formline.DetailedAddress"
            style="width: 250px"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="handlerSave">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
 import { getregisters } from "@/api/inputselect.js";

export default {
  name: "XiuEdit",
  dicts: ["AAA006"],
  created() {},
  data() {
    return {
      title: "",
      dialogVisible: false,
      flagtittle: false,
      options: [],
      flag: "",
      fladdis: true,
      flagarrive: true,
      flagarrived: false,
      form: {},
      remarktrue: false,
      DestinationArea: "",
      formline: {
        IsArriveTownship: "1",
        ArriveTownshipTime: "",
        IsNucleicAcids: "",
        CheckResult: "",
        DetailedAddress: "",
      },
      // 复制信息
      formcopy: {},
      wuzilist: [],
      // 复制信息
      // 保存用户已经修改的信息
      hasEditorInfo: [],
    };
  },

  methods: {
    show(flag, data) {
      this.dialogVisible = true;
      this.flag = flag;
      if (flag == "add") {
        this.title = "新增";
        this.flagtittle = false;
      } else if (flag == "edit") {
        this.title = "修改地址";
        this.getregisterslist(data);
        this.fladdis = true;
        this.flagarrive = true;
        this.flagarrived = false;
      }
    },
    // 保存
    handlerSave() {
      this.$refs["formline"].validate((valid) => {
        if (!valid) return;
        this.hasEditorInfo = [];
        for (let key in this.formline) {
          let obj = {};
          if (this.formline[key] !== this.formcopy[key]) {
            if (key != "seRange") {
              obj.op = "replace";
              obj.value = this.formline[key];
              obj.path = key;
              this.hasEditorInfo.push(obj);
            }
          }
        }
        let len = this.hasEditorInfo.length;
        if (len == 0) return this.$message.warning("无信息修改，无需提交");
        let falg = false;
        this.hasEditorInfo.forEach((item) => {
          if (item.path == "DestinationArea") {
            if (item.value.substring(item.value.length - 3) == "000") {
              falg = true;
            } else {
              falg = false;
            }
          }
        });
        if (falg) return this.$alert("请精确到村");
        this.$baseConfirm(`确认要${this.title}此项目吗？`, null, () => {
          this.$emit("xiuEdit", this.hasEditorInfo);
          // this.close();
        });
      });
    },
    async getregisterslist(data) {
      const res = await getregisters(data);
      this.form = res;
      this.$set(
        this.formline,
        "DetailedAddress",
        { ...this.form }.DetailedAddress
      );
      this.DestinationArea = { ...this.form }.DestinationArea;
      this.formcopy = { ...this.formline };
    },
    estinationArea(val) {
      if (val) {
        this.formline.DestinationArea = val;
      } else {
        this.formline.DestinationArea = "";
      }
    },

    foramtremake(val) {
      this.form.useRange = val.toString();
    },
    close() {
      this.dialogVisible = false;
      this.formline = this.$options.data().formline;
      this.$refs["formline"].clearValidate();
      this.DestinationArea = "";
    },
    checkhe(val) {
      if (val == 0) {
        this.fladdis = true;
        this.$set(this.formline, "CheckResult", "");
      } else {
        this.fladdis = false;
      }
    },
  },
};
</script>

<style lang=scss scoped>
.tittle {
  font-size: 18px;
  font-weight: 600;

  span {
    height: 18px;
    border-left: 4px solid #006cea;
    /* background: #006cea; */
  }
}
li {
  list-style-type: none;
}
/* .main td {
  height: 30px;
  border: #cccccc 1px solid;
} */
.main {
  background: #cccccc;
}
.main td {
  background: #fff;
  text-align: center;
  height: 40px;
  width: 25%;
}
</style>