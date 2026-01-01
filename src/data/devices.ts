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
			name: "Redmi K70 至尊版",
			image: "/images/device/Redmi K70 至尊版.png",
			specs: "晴雪白 / 16G + 1TB",
			description: "出厂HyperOS1 但是Root的嘻嘻嘻",
			link: "https://www.mi.com/prod/redmi-k70-ultra",
		},
	],
	平板: [
		{
			name: "Xiaomi Pad 6S Pro 12.4",
			image: "/images/device/Xiaomi Pad 6S Pro 12.4.png",
			specs: "黑色 / 12G + 256G",
			description: "Root的嘻嘻嘻，学习好帮手，bug满天飞，体验一般般",
			link: "https://www.mi.com/prod/xiaomi-pad-6s-pro",
		},
		{
			name: "小米焦点触控笔",
			image: "/images/device/小米焦点触控笔.png",
			specs: "白色",
			description: "买了两根，因为丢了一根",
			link: "https://www.mi.com/shop/buy/detail?product_id=20597&cfrom=search",
		},
		{
			name: "Xiaomi Pad 6S Pro 智能触控键盘",
			image: "/images/device/Xiaomi Pad 6S Pro 智能触控键盘.png",
			specs: "黑色",
			description: "挺不错外观满分，就是有点贵",
			link: "https://www.mi.com/shop/buy/detail?product_id=19668&cfrom=search",
		},
	],
	电脑: [
		{
			name: "Redmi G Pro 2024",
			image: "/images/device/Redmi G Pro游戏本 2024.png",
			specs: "黑色 / i9-14900HX / RTX 4060",
			description:
				"踩雷了，i9-14900HX缩肛了，但是小米售后直接给我换了台全新的嘻嘻嘻",
			link: "https://www.mi.com/redmi-books/g-pro-game",
		},
	],
	外设: [
		{
			name: "CUKTECH酷态科15号电能柱",
			image: "/images/device/CUKTECH酷态科15号电能柱.jpg",
			specs: "灰色/20000mAh",
			description: "买早了，现在15Ultra才235",
			link: "https://www.xiaomiyoupin.com/detail?gid=166003&spmref=YouPinPC.$SearchFilter$1.search_list.1.29080797&last_scmv2=3001.21.1:zero-3:zero-4:zero-5:zero-6:zero-7:zero-8:zero-19:zero.0.0&scmv2_num=0",
		},
		{
			name: "MCHOSE迈从BH288",
			image: "/images/device/BH288.jpg",
			specs: "黑白",
			description: "345买入用了三年，个人买过最满意的产品",
			link: "https://www.ednchina.com/technews/19241.html",
		},
		{
			name: "籁特易耳星环Ultra",
			image: "/images/device/籁特易耳星环Ultra.png",
			specs: "柔蓝",
			description: "丑是丑了点，但是真极致降噪，再也不怕室友打瓦了",
			link: "https://item.jd.com/10155702727321.html",
		},
		{
			name: "武影子X9",
			image: "/images/device/武影子X9.png",
			specs: "黑色",
			description: "便宜好使",
			link: "https://item.jd.com/10126993296520.html",
		},
	],
};
