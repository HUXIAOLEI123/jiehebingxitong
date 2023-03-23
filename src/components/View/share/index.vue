<template>
    <el-dialog
      title="分享" 
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"  
      :before-close="dialogClose" 
      class="course-manage-share" 
      width="40%">
            <div class="msg">标题：孕期保健宣讲第一讲</div>
            <div class="msg">授课老师：刘丽丽</div>
            <div class="msg">时间：2021年8月20日 14:30</div>
            <div class="msg">链接：{{url}}</div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogClose()">关闭</el-button>
            <el-button @click="share()" class="gw-primary-btn" type="primary">一键分享</el-button>  
        </div>
      </el-dialog> 
</template>
<script>
export default {
    props: {
        dialogVisible:{//弹框
            type:Boolean,
            default:false
        },
        id:{//唯一标识符
          type:String,
          default:null
        }
    },
    data(){
        return{
            url:'https://www.iconfont.cn/search/index?searchType=icon&q=%E8%A7%86%E9%A2%91&page=3&fromCollection=1&fills=&tag='
        }
    },
    methods:{
        share(){
            this.copyUrl(this.url)
            this.$notify({
                title: '链接已复制,快去分享吧!',
                type: 'success'
            });
        //    this.dialogClose() 
        },
        copyUrl(url) {
            var domUrl = document.createElement("input");
            domUrl.value = url;
            domUrl.id = "creatDom";
            document.body.appendChild(domUrl);
            domUrl.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            let creatDom = document.getElementById("creatDom");
            creatDom.parentNode.removeChild(creatDom);
        },
        dialogClose(){            
            this.$emit('dialogClose');
        },
    }
}
</script>
<style lang="scss">
.course-manage-share{
    .el-dialog__body{padding-bottom: 100px;}
    .msg{
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
        margin-bottom: 16px;
    }
}
</style>