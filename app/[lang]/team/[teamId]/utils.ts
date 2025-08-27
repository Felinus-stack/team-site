interface RoleHistoryItem {
  role: string;
  projectName: string;
  department: string;
}

export const parseBolidName = (projectName: string) => {
  if (projectName === "RTX") return 10;
  const match = projectName.match(/RT(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

export const sortRoles = (roles: RoleHistoryItem[]) => {
  return roles.sort((a, b) => {
    const aValue = parseBolidName(a.projectName);
    const bValue = parseBolidName(b.projectName);
    return bValue - aValue;
  });
};
