<template>
  <el-dialog :title="title" :visible.sync="innerVisible" :close-on-click-modal="false" width="50%" @close="close"
    append-to-body>
	<div class="videobox"><video style="width: 30%;height: 20%;" :src="videourl"  poster controls loop ></video></div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      title: "查看视频",
      innerVisible: false,
	  videourl:''
      };
    
    },
    methods: {
      //取消
      close() {
        this.innerVisible = false;
        // 重置数据(封装的方法)
        this.form = this.$options.data().form;
        this.$refs["form"].resetFields();
      },
      show(data) {
        this.innerVisible = true;
		this.videourl = data;
      },
   

  },
  }
</script>

<style lang=scss scoped>
	.videobox{
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>