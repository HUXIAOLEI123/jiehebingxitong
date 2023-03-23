<template>
    <!-- 反馈 -->
    <el-dialog
      :title="title" 
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"  
      :before-close="dialogClose"   
      class="components-feedback"
      width="50%">
        <div v-if="type=='1'" class="panel">
            <div class="question">1.视频画面是否清晰？音频视频是否流畅？</div>
            <el-radio-group v-model="form.isClear">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
            </el-radio-group>
        </div>
        <div v-if="type=='1'" class="panel">
            <div class="question">2.满意这样的远程培训方式吗？</div>
            <el-radio-group v-model="form.isSatisfaction">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
            </el-radio-group>
        </div>
        <div class="panel">
            <div class="question">描述</div>
            <el-input type="textarea" v-model="form.descContent" :rows="4"></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogClose()">取消</el-button>
            <el-button @click="save" class="gw-primary-btn" type="primary">确定</el-button>  
        </div>
    </el-dialog>
</template>
<script>
export default {
    props: {
        title:{
            type:String,
            default:'反馈'
        },
        dialogVisible:{
            type:Boolean,
            default:false
        },
        id:{
            type:[String,Number],
            default:null
        },
        type:{//1  直播平台反馈  1  课程课件反馈 
            type:[String,Number],
            default:null
        },
    },
    data(){
        return{
            form:{
                isClear:1,
                isSatisfaction:1,
                descContent:''
            }
        }
    },
    methods:{
        save(){
            let url="";
            let reqData={};
            if(this.type=='1'){//直播反馈
                url=this.$URL.zbptgl.addFeedback;
                reqData=this.form;
                reqData.liveId=this.id;
            }else if(this.type=='2'){//课程课件反馈
                url=this.$URL.kckjgl.saveCourseFeedback;
                reqData=this.form;
                reqData.courseId=this.id;
            }
            this.$store.dispatch('function/postApi',{reqData:reqData,url:url}).then((res) => { 
                this.$message({
                    message:res.msg,
                    type:res.code==200?'success':'warning'
                });
                this.dialogClose();
            })
        },
        //弹框关闭
        dialogClose(){
            this.form={
                isClear:1,
                isSatisfaction:1,
                descContent:''
            };
            this.$emit('dialogClose');
        }
    }
}
</script>
<style lang="scss" scoped>
.components-feedback{
    .panel{
        margin-bottom: 35px;
        .question{
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #222222;
            margin-bottom: 16px;
        }
        .el-radio-group{
            margin-left: 13px;
        }
    }
}
</style>