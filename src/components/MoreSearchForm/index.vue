<template>
  <!-- 搜索 -->
  <div class="app-search" ref="appSearch">
    <!-- 查询条件提醒以及查询条件展开 -->
    <div class="title" v-if="isMoreSearch">
      <div><div></div>查询条件</div>
      <div class="xuanfu" v-show="IsShowMore && isMoreSearch" @click="changeMore('0')">更多条件<img src="@/assets/images/bottom.png" align='center'></div>
      <div class="xuanfu" v-show="!IsShowMore && isMoreSearch" @click="changeMore('1')">收起条件<img src="@/assets/images/top.png" align='center'></div>
    </div>
    <!-- 不会被折叠的部分 -->
    <div >
      <slot name="SearchA"></slot>
      <slot name="BtnSearch"></slot>
      <slot name="Btn"></slot>
    </div>
    <!-- 会被折叠的部分 -->
    <div v-show="!IsShowMore">
      <slot name="SearchB"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 默认是否折叠 默认折叠
    IsShowMoreP: {
      type: Boolean,
      default: true,
    },
    // 是否有很多折叠选项
    isMoreSearch: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      IsShowMore: this.IsShowMoreP,
    };
  },
  methods: {
    changeMore(type) {
      this.IsShowMore = type === "0" ? false : true;
      this.$emit("changeMore",this.IsShowMore)
    }
  },
};
</script>
<style lang="scss" scoped>
.xuanfu{
  cursor: pointer;
}
.title{
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}
.title div:nth-child(1){
  height: 16px;
  font-size: 15px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #222222;
  div{
    width: 6px;
    height: 14px;
    float: left;
    margin-top: 4px;
    margin-right: 5px;
    background: #1B65B9;
  }
}
.title div:nth-child(2){
  height: 15px;
  font-size: 15px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #1B65B9;
  img{
    width: 14px;
    height: 14px;
    margin-left: 7px;
  }
}
.title div:nth-child(3){
  height: 15px;
  font-size: 15px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #1B65B9;
  img{
    width: 14px;
    height: 14px;
    margin-left: 7px;
  }
}
.app-search{
  background: #fff;
}
.btn-more {
  float: left;
  width: 100px;
  height: 40px;
  line-height: 20px;
  padding: 10px;
  text-align: center;
  color: rgb(64, 158, 255);
  background: rgb(249, 250, 252);
}
</style>
