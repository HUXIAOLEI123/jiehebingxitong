<template>
    <el-dialog
      title="审核" 
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"  
      :before-close="dialogClose" 
      class="examine-dialog" 
      width="30%">
       <el-form :model="form" :ref="form" label-width="100px" :inline="true">
          <el-form-item label="审核状态：" class="form-item-per-100">
                <el-select v-model="form.checkStatus" placeholder="">
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="不通过" value="2"></el-option>
                </el-select>
            </el-form-item>      
       </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogClose()">关闭</el-button>
            <el-button @click="examine()" class="gw-primary-btn" type="primary">确定</el-button>  
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
        },
        type:{//type=1 课程课件审核
          type:String,
          default:null
        },
    },
    data(){
        return{
            form:{checkStatus:'1'}
        }
    },
    methods:{
        examine(){
            let url='';
            let reqData={};
            if(this.type=='1'){//课程课件审核
                url=this.$URL.kckjgl.check;
                reqData={
                    courseId:this.id,
                    checkStatus:this.form.checkStatus=="1"?"2":"3"
                }
            }else if(this.type=='2'){//直播审核
                url=this.$URL.zbptgl.check;
                reqData={
                    liveId:this.id,
                    checkStatus:this.form.checkStatus=="1"?"2":"3"
                }
            }else if(this.type=='3'){//会诊审核
                url=this.$URL.hzzdgl.check;
                reqData={
                    consultGuideId:this.id,
                    consultStatus:this.form.checkStatus
                }
            }else if(this.type=='4'){//转诊审核
                url=this.$URL.zzgl.check;
                reqData={
                    referralId:this.id,
                    acceptStatus:this.form.checkStatus
                }
            }else if(this.type=='test'){//转诊审核
                this.$message({
                    message:'处理成功',
                    type:'success'
                });
                this.$emit('dialogClose',{isRefresh:true,checkStatus:this.form.checkStatus,id:this.id});
                return;
            }
            this.$store.dispatch('function/putApi',{reqData:reqData,url:url}).then((res) => { 
                this.$message({
                    message:res.msg,
                    type:res.code==200?'success':"marning"
                });
                if(res.code==200){
                    this.$emit('dialogClose',{isRefresh:true,checkStatus:this.form.checkStatus,id:this.id});
                }
            })
        },
        dialogClose(){            
            this.$emit('dialogClose');
        },
    }
}
</script>
<style lang="scss">
.examine-dialog{
    .el-dialog__body{padding-bottom: 0;}
}
</style>