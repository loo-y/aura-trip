export const productsSearch = async ({ keywords }: { keywords: string[] }): Promise<Record<string, any>[]> => {
	return [];
};

export const getProductDetail = async ({ productId }: { productId: number }): Promise<Record<string, any> | null> => {
	if (!productId) {
		return null;
	}

	return {};
};

// 根据用户IP/Geo 获取用户当前所在的城市
export const getLocationCity = async (): Promise<Record<string, any>> => {
	return {};
};
