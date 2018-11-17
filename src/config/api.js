//Server root address
var IP = "http://127.0.0.1";
var HOST = IP + ":8080/";
var SYSTEMNAME = "Face";
var MqttServer = `47.100.9.64`;
var ServerPort = Number(61623);
var ServerTOPIC = ["staff/sign_in", "staff/vip/sign_in"];


const STATISTICS_DATE_MODE = {
	YEAR: 0,
	MONTH: 1,
	DAY: 2
}

const DEPARTMENT_LIST = [
	{
		name: "Office",
		text: "办公室",
		tagId: 'id1',
		totalNum: 0,
		currentNum: 0,
		imgUrl: `icon_bangong.png`
	},
	{
        tagId: 'id2',
		name: "Real_Estate_Investmen",
		text: "不动产投资事业部",
		imgUrl: 'icon_budongchan.png'
	},
	{
        tagId: 'id3',
		name: "Accounting",
		text: "账务部",
		imgUrl: 'icon_caiwu.png'
	},
	{
        tagId: 'id4',
		name: "Product",
		text: "产品开发部",
		imgUrl: 'icon_chanping.png'
	}
	,
	{
        tagId: 'id5',
		name: "Board_Office",
		text: "董事会办公室",
		imgUrl: 'icon_dongshi_text.png'
	}
	,
	{
        tagId: 'id6',
		name: "Risk_Management",
		text: "风险管理合资部",
		imgUrl: 'icon_fengxian.png'

	}
	,
	{
        tagId: 'id7',
		name: "Fixed_Income",
		text: "固定收益部",
		imgUrl: 'icon_guding.png'
	}
	,
	{
        tagId: 'id8',
		name: "Equity_Investment",
		text: "股权投资事业部",
		imgUrl: 'icon_guquan.png'
	}
	,
	{
        tagId: 'id9',
		name: "Monitoring",
		text: "监察部",
		imgUrl: 'icon_jiancha.png'
	}
	,
	{
        tagId: 'id10',
		name: "Business_Deal",
		text: "交易部",
		imgUrl: 'icon_jiaoyi.png'
	}
	,
	{
        tagId: 'id11',
		name: "Financial_Markets",
		text: "金融市场部",
		imgUrl: 'icon_jinrong.png'
	}
	,
	{
        tagId: 'id12',
		name: "Quantification_Strategy",
		text: "量化及策略部",
		imgUrl: 'icon_lianghua.png'
	}
	,
	{
        tagId: 'id13',
		name: "Alternative_Investment",
		text: "另类投资事业部",
		imgUrl: 'icon_linglei.png'
	}
	,
	{
        tagId: 'id14',
		name: "Equity_Investment",
		text: "权益投资事业部",
		imgUrl: 'icon_quanyi.png'
	}
	,
	{
        tagId: 'id15',
		name: "Human_Resources",
		text: "人力资源部",
		imgUrl: 'icon_renli.png'
	}
	,
	{
        tagId: 'id16',
		name: "Post_Investment_Management",
		text: "投后管理部",
		imgUrl: 'icon_touhou.png'

	}
	,
	{
        tagId: 'id17',
		name: "Project_Review",
		text: "项目评审及监督部",
		imgUrl: 'icon_xiangmu.png'

	}
	,
	{
        tagId: 'id18',
		name: "Information_Technology",
		text: "信息技术部",
		imgUrl: 'icon_xinxi.png'

	}
	,
	{
        tagId: 'id19',
		name: "Credit_Evaluation",
		text: "信用评估部",
		imgUrl: 'icon_xinyong.png'

	}
	,
	{
        tagId: 'id20',
		name: "Research",
		text: "研究部",
		imgUrl: 'icon_yanjiu.png'
	}
	,
	{
        tagId: 'id21',
		name: "Operation_Management",
		text: "运营管理部",
		imgUrl: 'icon_yunying.png'
	}
	,
	{
        tagId: 'id22',
		name: "Strategic_Development",
		text: "战略发展部",
		imgUrl: 'icon_zhanlue.png'

	}
	,
	{
        tagId: 'id23',
		name: "Asset_Management",
		text: "资产管理事业部",
		imgUrl: 'icon_zichanguanli.png'
	}
	,
	{
        tagId: 'id24',
		name: "Combination_Management",
		text: "组合管理部",
		imgUrl: 'icon_zuhe.png'
	}
]




