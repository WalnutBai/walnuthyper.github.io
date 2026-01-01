// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = {
	[categoryName: string]: Device[];
} & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
	手机: [
		{
			name: "OnePlus 13T",
			image: "/images/device/oneplus13t.png",
			specs: "Gray / 16G + 1TB",
			description:
				"Flagship performance, Hasselblad imaging, 80W SuperVOOC.",
			link: "https://www.oneplus.com/cn/13t",
		},
	],
	平板: [
		{
			name: "Xiaomi Pad 6S Pro 12.4",
			image: "/images/device/Xiaomi Pad 6S Pro 12.4.png",
			specs: "黑色 / 12G + 256G",
			description:
				"第二代骁龙8，12.4英寸3K护眼屏，144Hz刷新率，120W秒充，10000mAh大电池",
			link: "https://www.mi.com/prod/xiaomi-pad-6s-pro",
		},
		{
			name: "小米焦点触控笔",
			image: "/images/device/小米焦点触控笔.png",
			specs: "",
			description: "",
			link: "https://www.mi.com/shop/buy/detail?product_id=20597&cfrom=search",
		},
		{
			name: "Xiaomi Pad 6S Pro 智能触控键盘",
			image: "/images/device/Xiaomi Pad 6S Pro 智能触控键盘.png",
			specs: "",
			description:
				"Flagship performance, Hasselblad imaging, 80W SuperVOOC.",
			link: "https://www.mi.com/shop/buy/detail?product_id=19668&cfrom=search",
		},
	],
	电脑: [
		{
			name: "Redmi G Pro 2024",
			image: "/images/device/Redmi G Pro游戏本 2024.png",
			specs: "黑色 / i9-14900HX / RTX 4060",
			description:
				"130W Intel处理器，140W RTX 4060显卡，整机性能最高210W，冰封散热",
			link: "https://www.mi.com/redmi-books/g-pro-game",
		},
	],
	外设: [
		{
			name: "GL-MT3000",
			image: "/images/device/mt3000.png",
			specs: "1000Mbps / 2.5G",
			description:
				"Portable WiFi 6 router suitable for business trips and home use.",
			link: "https://www.gl-inet.cn/products/gl-mt3000/",
		},
	],
};
