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

// 项目的英文显示名称映射
export const projectDisplayNames: { [key: string]: { ch: string; en: string } } = {
  "智能陪护": { ch: "智能陪护", en: "Smart Companion" },
  "新乡市卡口车辆防疫管理系统": { ch: "新乡市卡口车辆防疫管理系统", en: "Xinxiang Checkpoint Vehicle Management System" },
  "新生报道系统": { ch: "新生报道系统", en: "Freshman Registration System" },
  "无人车定位跟踪系统": { ch: "无人车定位跟踪系统", en: "Autonomous Vehicle Tracking System" },
  "网格化管理系统": { ch: "网格化管理系统", en: "Grid Management System" },
  "统战管理系统": { ch: "统战管理系统", en: "United Front Management System" },
  "场所工作人员管理界面": { ch: "场所工作人员管理界面", en: "Workplace Staff Management Interface" },
  "XXX市信访预警系统": { ch: "XXX市信访预警系统", en: "Petition Warning System" },
  "RT01": { ch: "RT01", en: "RT01" },
  "RT02": { ch: "RT02", en: "RT02" },
  "RT03": { ch: "RT03", en: "RT03" },
  "RT04": { ch: "RT04", en: "RT04" },
  "RT05": { ch: "RT05", en: "RT05" },
  "RT06": { ch: "RT06", en: "RT06" },
  "RT07": { ch: "RT07", en: "RT07" }
};

// 根据语言获取项目显示名称
export const getProjectDisplayName = (projectName: string, language: "ch" | "en"): string => {
  const displayInfo = projectDisplayNames[projectName];
  if (displayInfo) {
    return displayInfo[language];
  }
  return projectName; // 如果没有找到映射，返回原名称
};
