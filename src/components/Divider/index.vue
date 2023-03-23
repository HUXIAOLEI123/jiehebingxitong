<template>
  <div>
    <div class="gw-divider">
      <div class="gw-divider__text">
        <a class="el-link el-link--primary">
          <span class="el-link--inner">{{ title }}</span>
        </a>
      </div>
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      defalut: "",
    },
  },
};
</script>
<style scoped>
.gw-divider .gw-divider__text {
  position: absolute;
  background-color: #fff;
  padding: 0 0.833333rem;
  font-size: 0.777778rem;
  font-family: Microsoft YaHei;
  font-weight: 700;
  color: #2a2a2a;
  line-height: 2.777778rem;
  height: 2.777778rem;
  top: -1.388889rem;
  left: 1.111111rem;
}
.el-link {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  font-size: 0.777778rem;
  font-weight: 500;
}
.el-link.el-link--primary {
  color: #1890ff;
}
.gw-divider {
  width: 100%;
  border: 0.055556rem solid #dcdfe6;
  margin: 1.388889rem 0;
  padding: 0.833333rem;
  position: relative;
}
.el-cascader {
  width: 100%;
}
.el-dialog-div-30 {
  height: 70vh;
  overflow: auto;
}
.card-title {
  padding: 0 0 10px 24px;
  font-size: 18px;
  color: #303133;
  font-weight: 500;
  font-family: Microsoft YaHei;
}
.card-detail {
  padding: 12px 0 12px 0;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  margin-bottom: 8px;
}
.card-two .card-detail {
  height: 350px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: scroll;
}
.card-detail::-webkit-scrollbar {
  display: none;
}
</style>
