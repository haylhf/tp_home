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



