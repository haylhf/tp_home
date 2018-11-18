//Server root address
var IP = "http://10.17.4.28";
var HOST = IP + ":9090/";
var SYSTEMNAME = "Face";
var MqttServer = `47.100.9.64`;
var ServerPort = Number(61623);
var SOCKECT_SERVER = "ws://172.16.30.30:9090/websocket";
var ServerTOPIC = ["staff/sign_in", "staff/vip/sign_in"];
var photoURL = "";


const STATISTICS_DATE_MODE = {
    YEAR: 0,
    MONTH: 1,
    DAY: 2
}

const DEPARTMENT_LIST = [
    {
        name: "Office",
        text: "办公室",
        tagId: '5b0f9bb4941fab316da21bc7',
        // totalNum: 0,
        // currentNum: 0,
        imgUrl: `icon_bangong.png`
    },
    {
        tagId: '5b1d45e3941fabdad68d3958',
        name: "Real_Estate_Investmen",
        text: "不动产投资事业部",
        imgUrl: 'icon_budongchan.png'
    },
    {
        tagId: '5b1d4788941fabdad68d3964',
        name: "Accounting",
        text: "财务部",
        imgUrl: 'icon_caiwu.png'
    },
    {
        tagId: '5b0f9bab941fab316da21b96',
        name: "Research",
        text: "研究部",
        imgUrl: 'icon_yanjiu.png'
    }
    ,
    {
        tagId: '5b1d46e9941fabdad68d3961',
        name: "Risk_Management",
        text: "风险管理合资部",
        imgUrl: 'icon_fengxian.png'

    }
    ,
    {
        tagId: '5b27adb2941fabdad68f2917',
        name: "Fixed_Income",
        text: "固定收益部",
        imgUrl: 'icon_guding.png'
    }
    ,
    {
        tagId: '5b0f9bb9941fab316da21be6',
        name: "Equity_Investment",
        text: "股权投资事业部",
        imgUrl: 'icon_guquan.png'
    }
    ,
    {
        tagId: '5b1d458a941fabdad68d3956',
        name: "Monitoring",
        text: "监察部",
        imgUrl: 'icon_jiancha.png'
    }
    ,
    {
        tagId: '5b1d2fa6941fabdad68d38f5',
        name: "Business_Deal",
        text: "交易部",
        imgUrl: 'icon_jiaoyi.png'
    }

    ,
    {
        tagId: '5b1d4897941fabdad68d3968',
        name: "Quantification_Strategy",
        text: "量化及策略部",
        imgUrl: 'icon_lianghua.png'
    }
    ,
    {
        tagId: '5b1d46cb941fabdad68d395e',
        name: "Alternative_Investment",
        text: "另类投资事业部",
        imgUrl: 'icon_linglei.png'
    }
    ,
    {
        tagId: '5b1d465a941fabdad68d395b',
        name: "Equity_Investment",
        text: "权益投资事业部",
        imgUrl: 'icon_quanyi.png'
    }
    ,
    {
        tagId: '5b0f9bb0941fab316da21bb3',
        name: "Human_Resources",
        text: "人力资源部",
        imgUrl: 'icon_renli.png'
    }
    ,
    {
        tagId: '5b1d472e941fabdad68d3963',
        name: "Post_Investment_Management",
        text: "投后管理部",
        imgUrl: 'icon_touhou.png'

    }
    ,
    {
        tagId: '5b0f9bae941fab316da21ba4',
        name: "Project_Review",
        text: "项目评审及监督部",
        imgUrl: 'icon_xiangmu.png'

    }
    ,
    {
        tagId: '5b1d45e9941fabdad68d3959',
        name: "Information_Technology",
        text: "信息技术部",
        imgUrl: 'icon_xinxi.png'

    }
    ,
    {
        tagId: '5b1d47ae941fabdad68d3965',
        name: "Credit_Evaluation",
        text: "信用评估部",
        imgUrl: 'icon_xinyong.png'

    }
    ,
    {
        tagId: '5b1d4518941fabdad68d3954',
        name: "Board_Office",
        text: "董事会办公室",
        imgUrl: 'icon_dongshi_text.png'
    }
    ,
    {
        tagId: '5b0f9bb6941fab316da21bd5',
        name: "Operation_Management",
        text: "运营管理部",
        imgUrl: 'icon_yunying.png'
    }
    ,
    {
        tagId: '5b1d495e941fabdad68d3969',
        name: "Strategic_Development",
        text: "战略发展部",
        imgUrl: 'icon_zhanlue.png'

    },
    {
        tagId: '5b0f9bb1941fab316da21bba',
        name: "Combination_Management",
        text: "组合管理部",
        imgUrl: 'icon_zuhe.png'
    },
    {
        tagId: '5b1d4697941fabdad68d395c',
        name: "CaiFu",
        text: "财富管理中心",
        imgUrl: 'icon_caifu.png'
    },
    // {
    //     tagId: '5ba45d23204aabfb82ea6ae2',
    //     name: "Asset_Management",
    //     text: "资产管理事业部",
    //     imgUrl: 'icon_zichanguanli.png'
    // }
    // ,
    // {
    //     tagId: '5b11248a941fab03c2791586',//test
    //     name: "Product",
    //     text: "产品开发部",
    //     imgUrl: 'icon_chanping.png'
    // }
    // ,
    // {
    //     tagId: '5b554a76941fab8650979c99',
    //     name: "Financial_Markets",
    //     text: "金融市场部",
    //     imgUrl: 'icon_jinrong.png'
    // }
]




