<template>
    <el-dialog
      title="高危因素" 
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"  
      :before-close="dialogClose"  
      class="highRisk-dialog"
      width="70%">
        <div class="app-search">
            <el-form ref="searchForm" :model="searchForm" label-width="80px" class="el-form-wid8">
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="高危分类：">
                            <el-select v-model="searchForm.highRiskClassNo"  placeholder="" clearable>
                                <el-option
                                v-for="item in highRiskClassNoArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>                        
                    </el-col>   
                    <el-col :span="8">
                        <el-form-item label="高危因素：">
                            <el-input v-model="searchForm.highRiskName"  placeholder="模糊搜索" clearable></el-input>
                        </el-form-item>                        
                    </el-col>   
                    <el-col :span="7">
                        <el-form-item label="风险级别：">
                            <el-select v-model="searchForm.highRiskLevel"  placeholder="" clearable>
                                <el-option
                                v-for="item in highRiskLevelArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                <span class="risk-span" :class="item.className"></span>
                                <span>{{item.label}}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>                        
                    </el-col>   
                    <el-col :span="2">  
                        <el-button @click="queryBtn"  class="margin-l-7 gw-primary-btn" type="primary">搜索</el-button>
                    </el-col>   
                </el-row>
            </el-form>   
        </div>
        <!-- table -->
        <div class="app-table">
            <el-table
            :data="tableData"
            height="350"
            ref="multipleTable"
            tooltip-effect="light"
            border
            style="width: 100%"
            resizable
            v-loading="tableLoading"
            :row-key="getRowKeys"
            @selection-change="handleSelectionChange"
            @row-click="handleRowClick"
            :row-style="selectRowStyle">
                <el-table-column label="选择"
                 type="selection" 
                 :reserve-selection="true"
                 width="50"></el-table-column>
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column
                    prop="highRiskName"
                    label="高危因素">
                </el-table-column>
                 <el-table-column
                    prop="highRiskClassNo"
                    label="高危分类"
                    width="120">
                        <template slot-scope="scope">
                            <template v-if="scope.row.highRiskClassNo =='1'">
                                基本情况
                            </template>
                            <template v-else-if="scope.row.highRiskClassNo =='2'">
                                妊娠合并症
                            </template>
                            <template v-else-if="scope.row.highRiskClassNo =='3'">
                                妊娠并发症
                            </template>
                            <template v-else-if="scope.row.consultStatus =='4'">
                                妊娠合并传染性疾病
                            </template>
                        </template>
                </el-table-column>
                 <el-table-column
                    prop="highRiskLevel"
                    label="风险级别"
                    width="180">
                    <template slot-scope="scope">
                        <div v-if="scope.row.highRiskLevel=='1'">
                            <span class="risk-span risk-span-green"></span>
                            <span>绿色（低风险）</span>
                        </div>
                        <div v-else-if="scope.row.highRiskLevel=='2'">
                            <span class="risk-span risk-span-yellow"></span>
                            <span>黄色（一般风险）</span>
                        </div>
                        <div v-else-if="scope.row.highRiskLevel=='4'">
                            <span class="risk-span risk-span-orange"></span>
                            <span>橙色（较高风险）</span>
                        </div>
                        <div v-else-if="scope.row.highRiskLevel=='8'">
                            <span class="risk-span risk-span-red"></span>
                            <span>红色（高风险）</span>
                        </div>
                        <div v-else-if="scope.row.highRiskLevel=='16'">
                            <span class="risk-span risk-span-violet"></span>
                            <span>紫色（孕妇患有传染性疾病）</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>    
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogClose()">取消</el-button>
            <el-button @click="save()" class="gw-primary-btn" type="primary">确定</el-button>  
        </div>
    </el-dialog>
</template>
<script>
import indexMixin from "./mixin/indexMixin";
export default {
    mixins: [indexMixin],
    props: {
        dialogVisible:{
            type:Boolean,
            default:false
        }
    },
}
</script>
<style lang="scss">
.highRisk-dialog{
    .risk-span {
		height: 25px;
		margin-top: 0;
	}
}
</style>