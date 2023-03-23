export default {
    data() {
        return{
            // 获取row的key值
            getRowKeys(row) {
                return row.highRiskId;
            },
            tableLoading:false,
            tableData: [],
            selecteRowData: [], //当前页选中的数据
            selectRowIndex: [], // 保存选中行的位置数组
            searchForm:{
                highRiskClassNo:null,
                highRiskName:null,
                highRiskLevel:null
            },
            highRiskClassNoArr:[],//高危分类
            highRiskLevelArr:[],//风险级别
        }
    },
    watch: {
        selecteRowData(newData) {
            this.selectRowIndex = [];
            if(newData.length > 0) {
                newData.forEach(item => {
                    this.tableData.forEach((tableItem, index) => {
                        tableItem.highRiskId == item.highRiskId ? this.selectRowIndex.push(index) : null;
                    })
                })
            }
        },
        dialogVisible: {
            immediate: true,
            handler(val) {
                if (val) {
                }
            }
        }
    },
    created(){
        this.init();
        this.queryBtn();
    },
    methods:{          
        /**
         * 初始化
         */
         init() {
            this.highRiskClassNoArr=this.$PARTTEN.highRiskClassNo;
            // this.searchForm.highRiskClassNo=this.highRiskClassNoArr[0].value;
            this.highRiskLevelArr=this.$PARTTEN.riskLevel;
        },
        queryBtn(){
            this.pagenum=1;
            this.query();
        },
        query(){
            this.tableLoading=true;
            // this.searchForm.highRiskClassNo=this.searchForm.highRiskClassNo?this.searchForm.highRiskClassNo:null;
            // this.searchForm.highRiskName=this.searchForm.highRiskName?this.searchForm.highRiskName:null;
            // this.searchForm.highRiskLevel=this.searchForm.highRiskLevel?this.searchForm.highRiskLevel:null;
            this.$store.dispatch('function/getApi',{reqData:this.searchForm,url:this.$URL.basics.listAllHighRiskElements}).then((res) => { 
                this.tableData=res.data;
                this.tableLoading=false;
            }).catch(err=>{
                this.tableLoading=false;
            })
        },
        //table选择项发生变化时
        handleSelectionChange(val) {
            this.selecteRowData = val;  
        },
        //某一行被点击时会触发
        handleRowClick(row){
            this.$refs.multipleTable.toggleRowSelection(row);           
        },
        // 表格多选高亮选中行
        selectRowStyle({ row, rowIndex }) {
            if(this.selectRowIndex.includes(rowIndex)) {
                return { background:this.$PARTTEN.TableRowBG}
            }
        },
        save(){
            if(this.selecteRowData.length==0){
                this.$message({
                    message:'请选择高危因素',
                    type:'warning'
                });
                return false;
            }
            this.$emit('dialogClose',{selecteRowData:this.selecteRowData}); 
            this.$refs.multipleTable.clearSelection();
        },
        dialogClose(){
            this.$refs.multipleTable.clearSelection();
            this.$emit('dialogClose');
        },
    }
}