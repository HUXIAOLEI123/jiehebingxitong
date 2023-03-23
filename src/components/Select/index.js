const enumData = {
  doctorAdvice:[
    {label:"主要诊疗工作",value:'1'},
    {label:"长期医嘱",value:'2'},
    {label:"临时医嘱",value:'3'},
    {label:"出院医嘱",value:'4'},
    {label:"主要护理工作",value:'5'}
  ],
  mzzybz:[
    {label:"门诊",value:'1'},
    {label:"住院",value:'2'},
  ],
  sfyjzz:[
    {label:"是",value:'1'},
    {label:"否",value:'2'},
  ],
  grbslx:[
    {label:"自费",value:'1'},
    {label:"居民",value:'2'},
    {label:"职工",value:'3'},
  ],
  zzzt:[
    {label:"未审核",value:'1'},
    {label:"分诊员已接收",value:'2'},
    {label:"分诊员已驳回",value:'3'},
    {label:"医院分诊员已接收",value:'4'},
    {label:"医院分诊员已驳回",value:'5'},
    {label:"已撤回",value:'6'},
    {label:"分诊员已撤回",value:'7'},
  ],
  zsfs:[
    {label:"上转",value:'1'},
    {label:"下转",value:'2'},
  ],
  xbmc:[
    {label:"男",value:'1'},
    {label:"女",value:'2'},
    {label:"未知",value:'9'},
  ],
  sexTxt:[
    {label:"男",value:'男'},
    {label:"女",value:'女'},
  ],
  ageUnit:[
    {label:"岁",value:'岁'},
    {label:"月",value:'月'},
    {label:"天",value:'天'},
  ],
  linkType:[
    {label:"术前",value:'1'},
    {label:"手术日",value:'2'},
    {label:"术后",value:'3'},
    {label:"出院日",value:'4'},
    {label:"出院标准",value:'5'}
  ],
  //模板状态
  templatestate:[
    {label:"启用",value:'0'},
    {label:"草稿",value:'1'}
  ],
  //医生测试枚举
  doctorEnum:[
    {label:'潘石屹',value:'0001'},
    {label:'王 石',value:'0002'},
    {label:'蒋锡培',value:'0003'},
    {label:'向文波',value:'0004'},
    {label:'牛根生',value:'0005'},
  ],
  //性别
  patientsex:[
    {label:'男',value:'男'},
    {label:'女',value:'女'},
  ],
  //入径状态
  pathwaystate:[
    {label:'未入径',value:'0'},
    {label:'执行中',value:'1'},
    {label:'已完成',value:'2'},
    {label:'变异',value:'3'},
    {label:'出径',value:'5'},
    {label:'潜在入径',value:'6'},
  ],
  //关系
  relation:[
    {label:'依赖',value:'依赖'},
    {label:'包含',value:'包含'},
    {label:'关联',value:'关联'},
  ],
  //变异登记类型
  examplestype:[
    {label:'路径实例环节',value:'1'},
    {label:'路径实例',value:'2'},
  ],
  //类别分类
  therapypower:[
    {label:'主要诊疗工作',value:'1'},
    {label:'重点医嘱',value:'2'},
    {label:'护理',value:'3'},
    // {label:'护嘱',value:'4'},
  ],
  // 诊疗项目状态
  causeType:[
    {label:'全部',value:''},
    {label:'已执行',value:'1'},
    {label:'未执行',value:'2'},
    {label:'已作废',value:'3'},
    {label:'正常',value:'4'},
    {label:'必选项',value:'5'},
    {label:'非必选项',value:'6'}
  ],
  //作废状态
  isDelete:[
    {label:'作废',value:'1'},
    {label:'正常',value:'0'},
  ],
  //退出路劲类型
  outType:[
    {label:'治愈',value:'1'},
    {label:'好转',value:'2'},
    {label:'死亡',value:'3'},
    {label:'其他',value:'4'},
  ],
  //用药频次
  userFrequency:[
    {label:'一天一次',value:'1'},
    {label:'一天两次',value:'2'},
    {label:'一天三次',value:'3'},
    {label:'一天四次',value:'4'},
  ],
  //用户状态
  userState:[
    {label:"在职",value:"0"},
    {label:"离职",value:"1"},
  ],
  //角色状态
  roleState:[
    {label:"启用",value:"0"},
    {label:"停用",value:"1"},
  ],
  //病理状态
  bignliState:[
    {label:"未提交",value:"0"},
    {label:"已提交",value:"1"},
    {label:"登记列表",value:"2"},
  ],
  //患者类型
  paT_TYPE:[
    {label:"急诊",value:"1"},
    {label:"门诊",value:"2"},
    {label:"体检",value:"3"},
    {label:"住院",value:"4"},
  ],
  //送检项目
  examitem:[
    {label:"常规",value:"1"},
    {label:"冰冻",value:"2"},
    {label:"细胞学",value:"3"},
    {label:"尸检",value:"4"},
    {label:"免疫组化",value:"5"},
  ],
  //申请单状态
  ordeR_STATUS:[
    {label:"已申请",value:"10"},
    {label:"已取材",value:"20"},
    {label:"已采集",value:"30"},
    {label:"已报告",value:"40"},
    {label:"已审核",value:"50"},
  ],
  //病理材料状态
  geT_MATERIAL_STATUS:[
    {label:"未取材",value:"10"},
    {label:"需重取",value:"20"},
    {label:"已取材",value:"30"},
  ],
  //是否退回
  isReject:[
    {label:"未退回",value:"0"},
    {label:"已退回",value:"1"},
  ],
  getInOutPathwayPathwaytype:[
    {label:"按照入径时间查询",value:"1"},
    {label:"按照出径时间查询",value:"2"},
    {label:"按照入院时间查询",value:"3"},
    {label:"按照出院时间查询",value:"4"}
  ],
  getInOutPathwayState:[
    {label:"未入径",value:"0"},
    {label:"执行中",value:"1"},
    {label:"出径",value:"2"},
  ],
  requestMethod:[
    {label:"GET",value:"GET"},
    {label:"POST",value:"POST"},
    {label:"PATCH",value:"PATCH"},
    {label:"PUT",value:"PUT"},
    {label:"DELETE",value:"DELETE"},
    {label:"HEAD",value:"HEAD"},
    {label:"OPTIONS",value:"OPTIONS"},
    {label:"TRACE",value:"TRACE"},
    {label:"CONNECT",value:"CONNECT"}
  ],
  isTrueOrFalse:[
    {label:"是",value:true},
    {label:"否",value:false},
  ],
  AuthorityScope:[
    {label:"无任何权限",value:"-1"},
    {label:"自定义权限",value:"1"},
    {label:"本部门",value:"2"},
    {label:"本部门及以下",value:"3"},
    {label:"仅自己",value:"4"},
    {label:"本机构",value:"5"},
    {label:"本机构及以下",value:"6"},
    {label:"全部",value:"9"},
  ],
  identityType:[
    {label:"账号",value:"1"},
    {label:"身份证",value:"2"},
    {label:"手机号码",value:"3"},
    {label:"微信",value:"4"},
    {label:"QQ",value:"5"},
    {label:"支付宝",value:"6"},
    {label:"其他",value:"9"},
  ],
  organizationpermissionsisButton:[
    {label:"系统",value:"0"},
    {label:"目录",value:"1"},
    {label:"菜单",value:"2"},
    {label:"按钮",value:"3"},
  ],
  referraltype:[
    {label:"分钟",value:"1"},
    {label:"小时",value:"2"},
    {label:"天",value:"3"},
    {label:"周",value:"4"},
    {label:"月",value:"5"},
    {label:"年",value:"6"},
  ],
  referralTypeIntOrOut:[
    {label:"向上转诊",value:"1"},
    {label:"向下转诊",value:"2"},
  ],
  satisfaction:[
    {label:"很不满意",value:"1"},
    {label:"不满意",value:"2"},
    {label:"一般",value:"3"},
    {label:"满意",value:"4"},
    {label:"很满意",value:"5"},
  ],
}
export default {
  enumData
}