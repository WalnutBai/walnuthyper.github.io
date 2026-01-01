// Timeline data configuration file
// Used to manage data for the timeline page

export interface TimelineItem {
	id: string;
	title: string;
	description: string;
	type: "education" | "work" | "project" | "achievement";
	startDate: string;
	endDate?: string; // If empty, it means current
	location?: string;
	organization?: string;
	position?: string;
	skills?: string[];
	achievements?: string[];
	links?: {
		name: string;
		url: string;
		type: "website" | "certificate" | "project" | "other";
	}[];
	icon?: string; // Iconify icon name
	color?: string;
	featured?: boolean;
}

export const timelineData: TimelineItem[] = [
	{
		id: "current-study",
		title: "全国职业技能大赛（软件测试赛道）",
		description:
			"参与全国职业技能大赛软件测试赛道竞赛，系统学习软件测试理论与实操技术，提升自动化测试、缺陷管理等核心能力。",
		type: "education",
		startDate: "2025-12-07",
		location: "江苏",
		organization: "计算机学院",
		skills: [
			"Java",
			"Python",
			"JavaScript",
			"HTML/CSS",
			"MySQL",
			"软件测试",
			"缺陷管理",
			"自动化测试",
		],
		achievements: [
			"系统掌握黑盒测试、白盒测试核心流程与方法",
			"熟练使用Python编写自动化测试脚本",
			"完成多个实战项目的全流程测试与缺陷报告撰写",
		],
		icon: "material-symbols:school",
		color: "#059669",
	},
	{
		id: "student-management-system",
		title: "铃兰云",
		description: "网页开发课程期末项目，开发完成一套完整的ERP信管理系统。",
		type: "project",
		startDate: "2024-07-13",
		endDate: "2024-07-17",
		skills: ["Java", "MySQL", "Swing", "JDBC"],
		achievements: [
			"课程设计获评优秀等级",
			"实现完整的增删改查（CRUD）功能",
			"学习数据库设计与优化方法",
		],
		icon: "material-symbols:database",
		color: "#EA580C",
	},
	{
		id: "programming-contest",
		title: "校级程序设计竞赛",
		description: "参与学校举办的程序设计竞赛，提升算法应用与编程实践能力。",
		type: "achievement",
		startDate: "2024-10-20",
		endDate: "2024-10-22",
		location: "江苏",
		organization: "计算机学院",
		skills: ["C++", "算法", "数据结构"],
		achievements: [
			"获校级程序设计竞赛三等奖",
			"提升算法思维能力",
			"夯实编程基础功底",
		],
		icon: "material-symbols:emoji-events",
		color: "#7C3AED",
	},
	{
		id: "first-programming-experience",
		title: "首次接触编程",
		description: "高中信息技术课中首次接触编程，开始学习Python基础语法。",
		type: "education",
		startDate: "2021-03-01",
		endDate: "2021-04-01",
		skills: ["Python", "编程基础概念"],
		achievements: [
			"完成首个「Hello World」程序编写",
			"掌握基础循环与条件语句用法",
			"培养对编程的兴趣",
		],
		icon: "material-symbols:code",
		color: "#7C3AED",
	},
];

// Get timeline statistics
export const getTimelineStats = () => {
	const total = timelineData.length;
	const byType = {
		education: timelineData.filter((item) => item.type === "education")
			.length,
		work: timelineData.filter((item) => item.type === "work").length,
		project: timelineData.filter((item) => item.type === "project").length,
		achievement: timelineData.filter((item) => item.type === "achievement")
			.length,
	};

	return { total, byType };
};

// Get timeline items by type
export const getTimelineByType = (type?: string) => {
	if (!type || type === "all") {
		return timelineData.sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime(),
		);
	}
	return timelineData
		.filter((item) => item.type === type)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime(),
		);
};

// Get featured timeline items
export const getFeaturedTimeline = () => {
	return timelineData
		.filter((item) => item.featured)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime(),
		);
};

// Get current ongoing items
export const getCurrentItems = () => {
	return timelineData.filter((item) => !item.endDate);
};

// Calculate total work experience
export const getTotalWorkExperience = () => {
	const workItems = timelineData.filter((item) => item.type === "work");
	let totalMonths = 0;

	workItems.forEach((item) => {
		const startDate = new Date(item.startDate);
		const endDate = item.endDate ? new Date(item.endDate) : new Date();
		const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
		const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
		totalMonths += diffMonths;
	});

	return {
		years: Math.floor(totalMonths / 12),
		months: totalMonths % 12,
	};
};
