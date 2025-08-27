interface RoleHistoryItem {
  role: string;
  projectName: string;
  department: string;
}

export const parseProjectName = (projectName: string) => {
  if (projectName === "统战管理系统") return 10;
  // 为不同项目分配排序权重
  const projectOrder: Record<string, number> = {
    "智能陪护": 1,
    "新乡市卡口车辆防疫管理系统": 2,
    "新生报道系统": 3,
    "无人车定位跟踪系统": 4,
    "网格化管理系统": 5,
    "统战管理系统": 6,
    "场所工作人员管理界面": 7,
    "XXX市信访预警系统": 8
  };
  return projectOrder[projectName] || 99;
};

export const sortRoles = (roles: RoleHistoryItem[]) => {
  return roles.sort((a, b) => {
    const aValue = parseProjectName(a.projectName);
    const bValue = parseProjectName(b.projectName);
    return bValue - aValue;
  });
};
