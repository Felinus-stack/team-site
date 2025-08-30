// 项目名称到英文文件名的映射
export const projectNameToEnglishMapping: { [key: string]: string } = {
  "智能陪护": "smart-companion",
  "新乡市卡口车辆防疫管理系统": "xinxiang-checkpoint-system", 
  "新生报道系统": "freshman-registration-system",
  "无人车定位跟踪系统": "autonomous-vehicle-tracking",
  "网格化管理系统": "grid-management-system",
  "统战管理系统": "united-front-management",
  "场所工作人员管理界面": "workplace-staff-management",
  "XXX市信访预警系统": "petition-warning-system",
  // RT项目保持原样
  "RT01": "RT01",
  "RT02": "RT02", 
  "RT03": "RT03",
  "RT04": "RT04",
  "RT05": "RT05",
  "RT06": "RT06",
  "RT07": "RT07"
};

// 根据中文项目名获取英文文件名
export const getEnglishFileName = (chineseName: string): string => {
  return projectNameToEnglishMapping[chineseName] || chineseName;
};

// 根据英文文件名获取中文项目名（用于反向查找）
export const getChineseProjectName = (englishName: string): string => {
  const entry = Object.entries(projectNameToEnglishMapping).find(
    ([chinese, english]) => english === englishName
  );
  return entry ? entry[0] : englishName;
};
