//Server root address
var IP = "http://127.0.0.1";
var HOST = IP + ":8080/";
var SYSTEMNAME = "Face";
var MqttServer = `47.100.9.64`;
var ServerPort = Number(61623);
var ServerTOPIC = ["staff/sign_in", "staff/vip/sign_in"];
var HOME_SCREEN_TITLE = "员工签到墙"

var EveryPageNum = 10;
var MaxUpDownItems = 4;

const STATISTICS_DATE_MODE = {
	YEAR: 0,
	MONTH: 1,
	DAY: 2
}

const DISPART_LIST = [
	{
		name: "Office",
		text: "办公室",
	},
	{
		name: "Real_Estate_Investmen",
		text: "不动产投资事业部",
	},
	{
		name: "Accounting",
		text: "账务部",
	},
	{
		name: "Product",
		text: "产品开发部",
	}
	,
	{
		name: "Board_Office",
		text: "董事会办公室",
	}
	,
	{
		name: "Risk_Management",
		text: "风险管理合资部",
	}
	,
	{
		name: "Fixed_Income",
		text: "固定收益部",
	}
	,
	{
		name: "Equity_Investment",
		text: "股权投资事业部",
	}
	,
	{
		name: "Monitoring",
		text: "监察部",
	}
	,
	{
		name: "Business_Deal",
		text: "交易部",
	}
	,
	{
		name: "Financial_Markets",
		text: "金融市场部",
	}
	,
	{
		name: "Quantification_Strategy",
		text: "量化及策略部",
	}
	,
	{
		name: "Alternative_Investment",
		text: "另类投资事业部",
	}
	,
	{
		name: "Equity_Investment",
		text: "权益投资事业部",
	}
	,
	{
		name: "Human_Resources",
		text: "人力资源部",
	}
	,
	{
		name: "Post_Investment_Management",
		text: "投后管理部",
	}
	,
	{
		name: "Project_Review",
		text: "项目评审及监督部",
	}
	,
	{
		name: "Information_Technology",
		text: "信息技术部",
	}
	,
	{
		name: "Credit_Evaluation",
		text: "信用评估部",
	}
	,
	{
		name: "Research",
		text: "研究部",
	}
	,
	{
		name: "Operation_Management",
		text: "运营管理部",
	}
	,
	{
		name: "Strategic_Development",
		text: "战略发展部",
	}
	,
	{
		name: "Asset_Management",
		text: "资产管理事业部",
	}
	,
	{
		name: "Combination_Management",
		text: "组合管理部",
	}
]




