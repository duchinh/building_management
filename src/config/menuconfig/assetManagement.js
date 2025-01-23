const prefix = "/asset-management";

export const AssetManagementAsset = {
  id: "ASSET_MANAGEMENT_MENU",
  icon: "DashboardIcon",
  text: "Quản lý tài sản Giảng đường",
  child: [
		{
			id: "ASSET_MANAGEMENT_MENU.VENDORS",
      path: `${prefix}/vendors`,
      isPublic: true,
      text: "Quản lý nhà cung cấp thiết bị giảng dạy",
      child: [],
		}, 
		{
			id: "ASSET_MANAGEMENT_MENU.ASSETS",
			path: `${prefix}/assets`,
			isPublic: true,
			text: "Quản lý tài sản giảng dạy",
			child: [],
		}, 
  ],
};
