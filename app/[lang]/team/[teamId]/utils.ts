interface RoleHistoryItem {
  role: string;
  bolidName: string;
  department: string;
}

export const parseBolidName = (bolidName: string) => {
  if (bolidName === "RTX") return 10;
  const match = bolidName.match(/RT(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

export const sortRoles = (roles: RoleHistoryItem[]) => {
  return roles.sort((a, b) => {
    const aValue = parseBolidName(a.bolidName);
    const bValue = parseBolidName(b.bolidName);
    return bValue - aValue;
  });
};
