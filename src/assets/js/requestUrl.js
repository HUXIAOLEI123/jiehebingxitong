const urls = {
  // login: "/login/tokens/JWTToken3.0", //登录
  login: "/api/Login/GetJwtToken", //登录
  refreshToken: "/login/tokens/RefreshToken", //刷新token

  //病理接口 
  OrderInforDel: "/pathology/api/OrderInforDel", //获取患者资料列表
  PatientBaseInfoQuery: "/pathology/api/PatientBaseInfoQuery", //获取患者资料列表
  PatientBaseInforReg: "/pathology/api/PatientBaseInforReg", //更新患者资料
  PatientBaseInfoDetail: "/pathology/api/PatientBaseInfoDetail", //获取病人基本信息

  //病理病理信息管理
  OrderInforReg: "/pathology/api/OrderInforReg", //病理申请单登记
  OrderInforQuery: "/pathology/api/OrderInforQuery", //病理申请单列表
  OrderInforDetail: "/pathology/api/OrderInforDetail", //病理申请单详情
  OrderInforDel: "/pathology/api/OrderInforDel", //病理申请单删除

  //病理报告单信息管理
  PathologyReportSave: "/pathology/api/PathologyReportSave", //病理报告单登记
  PathologyReportQuery: "/pathology/api/PathologyReportQuery", //病理报告单列表
  PathologyReportDetail: "/pathology/api/PathologyReportDetail", //病理报告单详情
  PathologyReportDel: "/pathology/api/PathologyReportDel", //病理报告单根删除
  PathologyReportInfoByOrder: "/pathology/api/PathologyReportInfoByOrder", //病理报告单根据病理申请单编码查看

  //患者信息管理
  GetTenantListInfo: "/api/pathway/GetTenantListInfo", //获取患者资料列表
  PostTenantInfo: "/api/pathway/PostTenantInfo", //更新患者资料
  GetTenantInfo: "/api/pathway/GetTenantInfo", //获取患者资料详情
  PostDiagnosisInfo: "/api/pathway/PostDiagnosisInfo", //更新患者诊断资料
  //入出径管理
  GetIfEnter: "/api/pathway/GetIfEnter", //患者是否已入径判定
  GetConfirmEnter: "/api/pathway/GetConfirmEnter", //患者是否符合入径条件判定
  GetPotentialEnter: "/api/pathway/GetPotentialEnter", //潜在入径患者判定
  GetPotentialEnterList: "/api/pathway/GetPotentialEnterList", //更新潜在入径患者列表
  GetPotentialExit: "/api/pathway/GetPotentialExit", //潜在出径患者判定
  GetPotentialOutList: "/api/pathway/GetPotentialOutList", //更新潜在出径患者列表
  PostEnterRegister: "/api/pathway/PostEnterRegister", //入径登记
  PostExitRegister: "/api/pathway/PostExitRegister", //出径登记
  PostExitRegister: "/api/pathway/PostExitRegister", //发布临床路径信息
  GetPathInstance: "/api/pathway/GetPathInstance", //患者入径信息管理横排
  GetPatientPathwayList: "/api/pathway/GetPatientPathwayList", //获取患者的路径列表
  //患者临床路径管理
  GetScheduleList: "/api/pathway/GetScheduleList", //患者日程管理
  PostDailyItem: "/api/pathway/PostDailyItem", //每日执行项目提醒
  PostExecSummary: "/api/pathway/PostExecSummary", //项目执行信息汇总
  IfVariation: "/api/pathway/IfVariation", //判断执行的项目是否是临床路径指南的内容
  ExecConfirm: "/api/pathway/ExecConfirm", //执行信息确认
  VariationRegister: "/api/pathway/VariationRegister", //变异登记
  ExtentSchedule: "/api/pathway/ExtentSchedule", //延长日程
  ShortenSchedule: "/api/pathway/ShortenSchedule", //缩短日程
  GetAccessInfo: "/api/pathway/GetAccessInfo", //患者入径信息管理
  GetPatientPath: "/api/pathway/GetPatientPath", //患者入径实例信息
  GetPatientCauseInfo: "/api/pathway/GetPatientCauseInfo", //患者入径实例信息
  PostPatientCauseRevoke: "/api/pathway/PostPatientCauseRevoke", //患者路径变异撤销   
  IfPostCause: "/api/pathway/IfPostCause", //判断患者的诊疗阶段是否可提交变异
  PostPatientCause: "/api/pathway/PostPatientCause", //诊疗内容变异登记
  IfPostAdvice: "/api/pathway/IfPostAdvice", //判断患者的诊疗阶段是否可开立医嘱
  OpenDocotorAdvice: "/api/pathway/OpenDocotorAdvice", //医生开立医嘱
  IfExecAdvice: "/api/pathway/IfExecAdvice", //判断患者的诊疗阶段是否可执行医嘱
  ExcuAdvice: "/api/pathway/ExcuAdvice", //护士执行医嘱
  IfRevokeAdvice: "/api/pathway/IfRevokeAdvice", //判断患者的诊疗内容是否可撤销执行的医嘱
  RevokeAdvice: "/api/pathway/RevokeAdvice", //护士撤销执行医嘱
  ExcuTreatment: "/api/pathway/ExcuTreatment", //执行诊疗内容
  IfRevokeExecRequest: "/api/pathway/IfRevokeExecRequest", //判断是否可撤销执行主要诊疗工作或者护理工作
  RevokeExcuTreatment: "/api/pathway/RevokeExcuTreatment", //撤销执行诊疗内容
  PostPatientLinkCause: "/api/pathway/PostPatientLinkCause", //路径环节变异登记
  PostPatientPathCause: "/api/pathway/PostPatientPathCause", //路径变异登记
  PostMidwayExitCause: "/api/pathway/PostMidwayExitCause", //路径中途退出登记
  PostOutPath: "/api/pathway/PostOutPath", //出径登记
  GetCauseListHZ: "/api/pathway/GetCauseList", //获取患者变异记录列表
  //临床路径配置管理
  // 路径类别信息管理
  GetTemplateTypeList: "/api/config/GetTemplateTypeList", //获取路径类别信息列表
  GetTemplateTypeTree: "/api/config/GetTemplateTypeTree", //获取路径类别列表树结构
  GetTemplateTypeInfo: "/api/config/GetTemplateTypeInfo", //获取路径类别信息详情
  DeleteTemplateTypeInfo: "/api/config/DeleteTemplateTypeInfo", //删除路径类别信息
  UpdateTemplateTypeInfo: "/api/config/UpdateTemplateTypeInfo", //修改路径类别信息
  PostTemplateTypeInfo: "/api/config/PostTemplateTypeInfo", //新增路径类别信息
  GetTemplateTherapyInfo: "/api/config/GetTemplateTherapyInfo", //获取路径诊疗内容模板信息详情
  // 路径模板信息管理
  PostTemplateInfo: "/api/config/PostTemplateInfo", //新增路径模板信息
  UpdatePostTemplateInfo: "/api/config/UpdatePostTemplateInfo", //修改路径模板信息
  DeleteTemplateInfo: "/api/config/DeleteTemplateInfo", //删除路径模板信息
  SetTemplateStateInfo: "/api/config/SetTemplateStateInfo", //设置路径模板信息状态
  GetTemplateInfo: "/api/config/GetTemplateInfo", //获取路径模板信息详情
  GetTemplateList: "/api/config/GetTemplateList", //获取路径模板信息列表
  CopyTemplateInfo: "/api/config/CopyTemplateInfo", //复制路径模版信息
  UpdateTemplateState: "/api/config/UpdateTemplateState", //设置路径模板信息状态
  // 路径环节信息管理
  PostTemplateLinkInfo: "/api/config/PostTemplateLinkInfo", //新增路劲环节信息
  UpdateTemplateLinkInfo: "/api/config/UpdateTemplateLinkInfo", //修改路径环节信息
  GetTemplateLinkInfo: "/api/config/GetTemplateLinkInfo", //根据路径环节模板编号获取路径环节模板信息详情
  GetTemplateLinkList: "/api/config/GetTemplateLinkList", //获取路径环节模板列表
  DeleteLinkInfo: "/api/config/DeleteLinkInfo", //根据路径环节模板编号删除路径环节模板信息  
  // 路径详细项目模板信息管理
  PostTemplateItemInfo: "/api/config/PostTemplateItemInfo", //新增路径详细项目模板信息
  UpdateTemplateItemInfo: "/api/config/UpdateTemplateItemInfo", //修改路径详细项目模板信息
  DeleteItemInfo: "/api/config/DeleteItemInfo", //删除路径详细项目模板信息
  GetTemplateItemInfo: "/api/config/GetTemplateItemInfo", //获取路径详细项目模板信息详情
  GetTemplateItemList: "/api/config/GetTemplateItemList", //获取路径详细项目模板信息列表  
  
  // 路劲诊疗内容
  DeleteTherapyInfo: "/api/config/DeleteTherapyInfo", //删除路径诊疗内容模板信息   
  AddTemplateTherapyInfo: "/api/config/AddTemplateTherapyInfo", //新增路劲诊疗内容模板信息   
  UpdatePostTemplateTherapyInfo: "/api/config/UpdatePostTemplateTherapyInfo", //修改路劲诊疗内容模板信息
  GetTemplateTherapyInfo: "/api/config/GetTemplateTherapyInfo", //获取路径诊疗内容模板信息详情
  GetTemplateTherapyList: "/api/config/GetTemplateTherapyList", //获取路径诊疗内容模板信息列表
  
  // 科室管理
  PostDeptInfo: "/api/config/PostDeptInfo", //新增科室管理信息
  UpdateDeptInfo: "/api/config/UpdateDeptInfo", //修改科室管理信息
  DeleteDeptInfo: "/api/config/DeleteDeptInfo", //删除科室管理信息
  GetDeptInfo: "/api/config/GetDeptInfo", //获取科室管理信息详情
  GetDeptList: "/api/config/GetDeptList", //获取科室管理信息列表
  // 变异类型字典信息管理
  PostCauseTypeInfo: "/api/config/PostCauseTypeInfo", //新增变异类型字典信息
  UpdateCauseTypeInfo: "/api/config/UpdateCauseTypeInfo", //修改变异类型字典信息
  DeleteCauseTypeInfo: "/api/config/DeleteCauseTypeInfo", //删除变异类型字典信息
  GetCauseTypeInfo: "/api/config/GetCauseTypeInfo", //获取变异类型字典信息详情
  GetCauseTypeList: "/api/config/GetCauseTypeList", //获取变异字典类型信息列表
  // 变异原因字典信息管理
  PostCauseInfo: "/api/config/PostCauseInfo", //变异原因字典信息管理
  UpdateCauseInfo: "/api/config/UpdateCauseInfo", //修改变异原因字典信息
  DeleteCauseInfo: "/api/config/DeleteCauseInfo", //删除变异原因字典信息
  GetCauseInfo: "/api/config/GetCauseInfo", //获取变异原因字典信息详情
  GetCauseList: "/api/config/GetCauseList", //获取变异原因字典信息列表
  // 诊疗类别信息管理
  PostTherapyTypeInfo: "/api/config/PostTherapyTypeInfo", //新增诊疗类别信息
  UpdateTherapyTypeInfo: "/api/config/UpdateTherapyTypeInfo", //修改诊疗类别信息
  DeleteTherapyTypeInfo: "/api/config/DeleteTherapyTypeInfo", //删除诊疗类别信息
  GetTherapyTypeInfo: "/api/config/GetTherapyTypeInfo", //获取诊疗类别信息详情
  GetTherapyTypeList: "/api/config/GetTherapyTypeList", //获取路径类别信息列表
  //系统管理
  //ICD码管理
  PostICDCodeInfo: "/api/sys/PostICDCodeInfo", //新增ICD码信息
  UpdateICDCodeInfo: "/api/sys/UpdateICDCodeInfo", //修改ICD码信息
  DeleteICDCodeInfo: "/api/sys/DeleteICDCodeInfo", //删除ICD码信息
  GetICDCodeInfo: "/api/sys/GetICDCodeInfo", //获取ICD码信息详情
  GetICDCodeList: "/api/sys/GetICDCodeList", //获取ICD码信息列表
  // 手术操作码管理
  PostOperationInfo: "/api/sys/PostOperationInfo", //新增手术操作码信息
  UpdateOperationInfo: "/api/sys/UpdateOperationInfo", //修改手术操作码信息
  DeleteOperationInfo: "/api/sys/DeleteOperationInfo", //删除手术操作码信息
  GetOperationInfo: "/api/sys/GetOperationInfo", //获取手术操作码信息详情
  GetOperationList: "/api/sys/GetOperationList", //获取手术操作码信息列表
  // 角色信息管理
  PostRoleInfo: "/api/sys/PostRoleInfo", //新增角色信息
  UpdateRoleInfo: "/api/sys/UpdateRoleInfo", //修改角色信息
  SetRoleInfo: "/api/sys/SetRoleInfo", //设置角色操作关系信息
  GetRoleInfo: "/api/sys/GetRoleInfo", //获取角色信息详情
  SetRoleStateInfo: "/api/sys/SetRoleStateInfo", //设置角色状态
  DeleteRoleInfo: "/api/sys/DeleteRoleInfo", //删除角色信息
  GetRoleList: "/api/sys/GetRoleList", //获取角色信息列表
  // 用户信息管理
  PostUserInfo: "/api/sys/PostUserInfo", //新增用户信息
  UpdateUserInfo: "/api/sys/UpdateUserInfo", //修改用户信息
  SetUserRoleInfo: "/api/sys/SetUserRoleInfo", //分配用户角色信息
  GetUserInfo: "/api/sys/GetUserInfo", //获取用户信息详情
  SetUserState: "/api/sys/SetUserState", //设置用户状态
  DeleteUserRoleInfo: "/api/sys/DeleteUserRoleInfo", //删除用户信息
  GetUserList: "/api/sys/GetUserList", //获取用户信息列表
  UpdatePassword: "/api/sys/UpdatePassword", //修改密码（需要提供原密码）
  ResetPassword: "/api/sys/ResetPassword", //重置密码（不需要提供原密码）
  //机构管理
  //机构信息管理
  GetTenantUserList: "/api/tenant/GetTenantUserList", //获取机构信息列表
  TenantUserList: "/api/tenant/TenantUserList", //获取机构信息列表 不带上下级
  TenantList: "/api/tenant/TenantList", //根据当前登录人的权限获取机构列表 ---不带上下级
  GetTenantUserInfo: "/api/tenant/GetTenantUserInfo", //获取机构详细信息
  PostTenantUserInfo: "/api/tenant/PostTenantUserInfo", //新增机构信息
  UpdateTenantInfo: "/api/tenant/UpdateTenantInfo", //修改机构信息
  DeleteTenantUser: "/api/tenant/DeleteTenantUser", //删除机构信息
  //产品信息管理
  PostProjectInfo: "/api/tenant/PostProjectInfo", //新增产品信息
  UpdateProjectInfo: "/api/tenant/UpdateProjectInfo", //修改产品信息
  DeleteProjectInfo: "/api/tenant/DeleteProjectInfo", //删除产品信息
  GetProjectInfoList: "/api/tenant/GetProjectInfoList", //获取产品信息列表
  GetProjectInfo: "/api/tenant/GetProjectInfo", //获取机构详细信息
  //产品功能管理
  PostProjectFunction: "/api/tenant/PostProjectFunction", //新增产品功能信息
  UpdateProjectFunction: "/api/tenant/UpdateProjectFunction", //修改产品功能信息
  DeleteProjectFunction: "/api/tenant/DeleteProjectFunction", //删除产品功能信息
  GetProjectFunctionList: "/api/tenant/GetProjectFunctionList", //获取产品功能信息列表
  GetProjectFunction: "/api/tenant/GetProjectFunction", //获取产品功能详情信息
  //产品功能关系管理
  PostProjectRelation: "/api/tenant/PostProjectRelation", //新增产品功能关系信息
  UpdateProjectRelation: "/api/tenant/UpdateProjectRelation", //修改产品功能关系信息
  DeleteProjectRelation: "/api/tenant/DeleteProjectRelation", //删除产品功能关系信息
  GetProjectRelation: "/api/tenant/GetProjectRelation", //获取产品功能关系详情信息
  GetProjectRelationList: "/api/tenant/GetProjectRelationList", //获取产品功能关系信息列表
  //机构租用产品信息管理
  PostTenantRental: "/api/tenant/PostTenantRental", //新增机构租用产品（单个产品功能编码）
  UpdateTenantRental: "/api/tenant/UpdateTenantRental", //修改机构租用产品（单个产品功能编码）
  DeleteTenantRental: "/api/tenant/DeleteTenantRental", //根据租用信息编码删除机构租用产品信息
  GetTenantRental: "/api/tenant/GetTenantRental", //根据租用信息编码获取机构租用产品详细信息
  GetTenantRentalList: "/api/tenant/GetTenantRentalList", //获取机构租用产品信息列表
  PostTenantRentalList: "/api/tenant/PostTenantRentalList", //根据产品功能列表更新机构租用产品信息
  PostRentalList: "/api/tenant/PostRentalList", //根据产品信息更新机构租用产品信息
  GetProjectInfoListForFunction: "/api/tenant/GetProjectInfoListForFunction", //获取产品信息列表及产品功能列表


  //临床路径统计查询
  QueryReferral: "/api/Referral/QueryReferral", //对于关键病种的重点人群提供转诊报表
  GetPathwayQuery: "/api/query/GetPathwayQuery", //获取临床路径报表信息
  GetInOutPathway: "/api/query/GetInOutPathway", //出入径明细查询
  GetExitPathway: "/api/query/GetExitPathway", //路径退出管理
  GetVariationPathway: "/api/query/GetVariationPathway", //病人变异原因一览表
  GetDiseaseIndex: "/api/query/GetDiseaseIndex", //病种指标评估表
  GetVariationReson: "/api/query/GetVariationReson", //变异原因统计
  PathExecute: "/api/query/PathExecute", //路径执行情况统计


  //权限部分
  Organizationmodules: "/api/Organizationmodules", //获取接口信息列表
  OrganizationmodulesDeletes: "/api/organizationmodules/deletes", //删除接口信息
  // organizationmodules: "/api/organizationmodules", //获取接口信息列表
  // organizationmodules: "/api/organizationmodules", //获取接口信息列表
  /**
   * 双向转诊系统
   */
   ReferralQueryList: "/api/Referral/QueryList", //获取双向转诊列表
   QueryFollowUpList: "/api/Referral/QueryFollowUpList", //双向转诊随访管理
   ReferralAuditStatus: "/api/Referral/AuditStatus", //审核双向转诊信息
   ReferralQueryStayTreatmentList: "/api/Referral/QueryStayTreatmentList", //查询可转诊的接诊数据
   ReferralQueryStatusList: "/api/Referral/QueryStatusList", //获取双向转诊状态
   ReferralTwo_Way_Referral: "/api/Referral/Two_Way_Referral", //更新双向转诊信息
   QueryInfo: "/api/Referral/QueryInfo/", //获取双向转诊信息 post


   //双向转诊交流管理
   CreateActivityType: "/api/ReferralActivity/CreateActivityType", //新增交流类型
   UpdateActivityType: "/api/ReferralActivity/UpdateActivityType/", //修改交流类型
   GetActivityType: "/api/ReferralActivity/GetActivityType/", //获取交流类型信息
   GetActivityTypeList: "/api/ReferralActivity/GetActivityType", //获取交流类型列表
   DeletesActivityType: "/api/ReferralActivity/DeletesActivityType/", //删除交流类型

   //随访方式
   CreateFollowUpWay: "/api/Referral/CreateFollowUpWay", //新增随访方式 POST
   UpdateFollowUpWay: "/api/Referral/UpdateFollowUpWay/", //修改随访方式 PATCH
   GetFollowUpWay: "/api/Referral/GetFollowUpWay/", //获取随访方式 GET
   GetFollowUpWayList: "/api/Referral/GetFollowUpWay", //获取随访方式列表 GET
   DeletesFollowUpWay: "/api/Referral/DeletesFollowUpWay/", //删除随访方式 POST


   //随访
   CreateFollowUp: "/api/Referral/CreateFollowUp", //新增随访 POST
   UpdateFollowUp: "/api/Referral/UpdateFollowUp/", //修改随访 PATCH
   GetFollowUp: "/api/Referral/GetFollowUp/", //获取随访 GET
   GetFollowUpList: "/api/Referral/GetFollowUpList/", //获取随访列表 GET
   DeletesFollowUp: "/api/Referral/DeletesFollowUp/", //删除随访 POST


   //转诊协议
   CreateAgree: "/api/Referral/CreateAgree", //新增转诊协议 POST
   UpdateAgree: "/api/Referral/UpdateAgree/", //修改转诊协议 PATCH
   GetAgree: "/api/Referral/GetAgree/", //获取转诊协议 GET
   GetAgreeList: "/api/Referral/GetAgree", //获取转诊协议列表 GET
   DeletesAgree: "/api/Referral/DeletesAgree/", //删除转诊协议 POST

   //转诊评价
   CreateReferralEvaluate: "/api/Referral/CreateReferralEvaluate", //新增转诊评价 POST
   UpdateReferralEvaluate: "/api/Referral/UpdateReferralEvaluate/", //修改转诊评价 PATCH
   GetReferralEvaluate: "/api/Referral/GetReferralEvaluate/", //获取转诊评价 GET
   GetReferralEvaluateList: "/api/Referral/GetReferralEvaluateList/", //获取转诊评价列表 GET
   DeletesReferralEvaluate: "/api/Referral/DeletesReferralEvaluate/", //删除转诊评价 POST
   
   //活动
   CreateActivity: "/api/ReferralActivity/CreateActivity", //新增活动 POST
   UpdateActivity: "/api/ReferralActivity/UpdateActivity/", //修改活动 PATCH
   GetActivity: "/api/ReferralActivity/GetActivity/", //获取活动 GET
   GetActivityList: "/api/ReferralActivity/GetActivityList", //获取活动列表 GET
   DeletesActivity: "/api/ReferralActivity/DeletesActivity/", //删除活动 POST

   //活动评价
   CreateActivityEvaluate: "/api/ReferralActivity/CreateActivityEvaluate", //新增活动评价 POST
   UpdateActivityEvaluate: "/api/ReferralActivity/UpdateActivityEvaluate/", //修改活动评价 PATCH
   GetActivityEvaluate: "/api/ReferralActivity/GetActivityEvaluate/", //获取活动评价 GET
   GetActivityEvaluateList: "/api/ReferralActivity/GetActivityEvaluateList", //获取活动评价列表 GET
   DeletesActivityEvaluate: "/api/ReferralActivity/DeletesActivityEvaluate/", //删除活动评价 POST
   //诊疗信息
   CreatePatient: "/api/Referral/CreatePatient", //新增诊疗信息 POST
   UpdatePatient: "/api/Referral/UpdatePatient/", //修改诊疗信息 PATCH
   GetPatient: "/api/Referral/GetPatient/", //获取诊疗信息 GET
   GetPatientList: "/api/Referral/GetPatient", //获取诊疗信息列表 GET
   DeletesPatient: "/api/Referral/DeletesPatient/", //删除诊疗信息 POST
   //字典类别
   AddCategory: "/api/Dictionary/AddCategory", //新增字典类别 POST
   UpdateCategory: "/api/Dictionary/UpdateCategory", //修改字典类别 POST
   DeleteCategory: "/api/Dictionary/DeleteCategory/", //根据分类编码删除分类信息 GET
   GetCategoryInfo: "/api/Dictionary/GetCategoryInfo/", //获取字典类别信息 POST
   GetCategoryList: "/api/Dictionary/GetCategoryList", //获取字典分类列表 POST
   AddDictionary: "/api/Dictionary/AddDictionary", //新增字典信息 POST
   UpdateDictionary: "/api/Dictionary/UpdateDictionary", //修改字典信息 POST
   DeleteDictionary: "/api/Dictionary/DeleteDictionary/", //根据字典编码删除字典信息 POST
   GetDictionaryInfo: "/api/Dictionary/GetDictionaryInfo/", //根据字典编码获取字典信息 POST
   GetDicotoryList: "/api/Dictionary/GetDicotoryList", //获取字典列表 POST
   GetDicotoryAllList: "/api/Dictionary/GetDicotoryAllList", //获取字典列表 POST




   GetDrugCatlgList: "/api/DrugCatlg/GetDrugCatlgList", //获取药品目录列表 POST
   
};
export default {
  urls,
};
