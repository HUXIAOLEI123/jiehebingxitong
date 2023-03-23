<template>
  <div class="box">
    <div>
      <el-button type="primary" round @click="collback">返回</el-button>
    </div>
    <div class="title">
      <h1>{{ data.Title }}</h1>
      <p>
        <span>{{ data.OperatorOrganizationFirstName }}</span>
        <span>{{ data.OperateTimeFirst | parseTime('{y}-{m}-{d}') }}</span>
      </p>
    </div>
    <div class="content">
      <el-input v-model="data.Content" readonly class="textareasty" type="textarea" maxlength="1000" :rows="10"></el-input>
    </div>
    <div></div>
  </div>
</template>

<script>
import {
  DetailAnnouncements
} from '@/api/annoucement.js';
export default {
  name: 'Detil',
  // props:['datas'],
  data () {
    return {
      text: "根据   x市教育局春节放假的有关要求，xx学院的拟定与x月x日放假，时间定于x月x日——x月x日。保卫处（科）应做好留守工作。      根据x市教育局春节放假的有关要求，xx学院的拟定与x月x日放假，时间定于x月x日——x月x日。保卫处（科）应做好留守工作。",
      data: {},
    }
  },
  mounted () {
    var self = this;
    this.getDetailAnnouncements();

  },
  created () {
    var self = this;
    self.data = self.$route.query.datas
  },
  methods: {
    collback () {
      this.$router.go(-1)
    },
    async getDetailAnnouncements () {
      // let res = await DetailAnnouncements(op)
    }

  },

}
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  .title {
    h1 {
      height: 60px;
      text-align: center;
      line-height: 60px;
    }

    p {
      text-align: center;
      font-size: 16px;
      color: rgb(160, 157, 157);
      text-align: center;
      font-weight: normal;

      span {
        margin-right: 20px;
      }
    }
  }
  .textareasty {
    border: 0;
    outline: none;
    background-color: rgba(0, 0, 0, 0); // 透明背景
  }
  .el-textarea__inner:hover {
    border: none !important;
  }
  .content {
    height: 500px;
    padding: 10px 50px;
    text-indent: 2rem;
    font-size: 20px;
    font-weight: 300;
    font-family: 'Times New Roman', Times, serif;

    h4 {
      word-wrap: normal;
      letter-spacing: 2px;
    }
  }
  ::v-deep .el-textarea__inner {
    border: 0;
    resize: none; /* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */
  }
  .footer {
    display: flex;
    height: 200px;
    flex-direction: column;
    padding: 0 80px;
    font-size: 24px;
    line-height: 10px;
    font-weight: normal;

    p {
      align-items: flex-end;
      align-content: flex-end;
      align-self: flex-end;
    }
  }
}
</style>