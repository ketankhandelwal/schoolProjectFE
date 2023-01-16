export const getPermissionsWithStatus = (
  permissionStatus = [],
  permissionList = []
) => {
  const finalData = [];
  const data = permissionList?.map((item) => {
    const permission = permissionStatus?.filter(
      (x) => x.permission_id === item.id
    )[0];
    finalData.push({
      ...permission,
      name: item.name,
    });
  });
  return finalData;
};
