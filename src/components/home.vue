<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <div >
        <img :src="bgImg"
        style="width: 100%;height: 100%;position: absolute;z-index: -100; background-position: center;" />
        <div class="homeDiv" >
            <el-row >
                    <span style="font-size: 36px;" @click="btnTest" >签到：</span >
                    <span style="font-size: 36px;" >{{getSignIn()}}</span >
            </el-row >
            <br />
            <el-row >
                <span >{{currentTime}}</span >
            </el-row >
        </div >
        <!--<StaffPage ref="staffPage" ></StaffPage >-->
        <StaffSignPage ref="staffPage" ></StaffSignPage >
    </div >

</template >

<script >
    var isLoading = false;
    var hostname = MqttServer,
		    port = ServerPort,
		    clientId = `client-${newGuid()}`,
		    timeout = 5,
		    keepAlive = 100,
		    cleanSession = false,
		    ssl = false,
		    userName = 'admin',
		    password = 'password',
		    sendTopic = "sign_feedback";
    var client = new Paho.MQTT.Client(hostname, port, clientId);
    //建立客户端实例
    var options = {
	    invocationContext: {
		    host: hostname,
		    port: port,
		    path: client.path,
		    clientId: clientId
	    },
	    timeout: timeout,
	    keepAliveInterval: keepAlive,
	    cleanSession: cleanSession,
	    useSSL: ssl,
	    userName: userName,
	    password: password,
	    onSuccess: onConnect,
	    onFailure: function (e) {
		    console.log(`connect failure: ${e}`);
	    },
    };

    function onConnect() {
	    console.log("connect successfully");
	    for (let item of ServerTOPIC)//订阅主题
	    {
		    console.log(`subscribed server topic: ${item}`);
		    client.subscribe(item);
	    }
    }

    var isActived = true;
    window.ondeactivate = () => {
	    isActived = false;
    };
    window.onactivate = () => {
	    isActived = true;
    };
    window.onblur = () => {
	    isActived = false;
    };
    window.onfocus = () => {
	    isActived = true;
    };

    window.onclick = () => {
	    //requestFullScreen();
    };
    window.onload = function () {

	    client.connect(options);//连接服务器并注册连接成功处理事件
	    client.onConnectionLost = onConnectionLost;//注册连接断开处理事件
	    client.onMessageArrived = onMessageArrived;//注册消息接收处理事件
    };

    function onConnectionLost(responseObject) {
	    if (responseObject.errorCode !== 0) {
		    console.log("onConnectionLost:" + responseObject.errorMessage);
		    console.log("连接已断开");
	    }
    }

    function onMessageArrived(message) {
	    console.log("收到消息:" + message.payloadString);
	    console.log("主题：" + message.destinationName);
	    var data = null;
	    try {
		    data = jQuery.parseJSON(message.payloadString);
		    console.log("解析出来的：data：" + JSON.stringify(data));
	    } catch (e) {
		    console.log(e);
	    }
	    while (isLoading) {
		    sleep(1000); //wait;
	    }
	    if (data != null) {
		    switch (message.destinationName) {
			    case ServerTOPIC[0]: //statff
				    _this.isShowVIP = false;
				    onVisitorSign(data);
				    break;
			    case ServerTOPIC[1]://vip
				    _this.isShowVIP = true;
				    onVisitorSign(data);
				    break;
			    default:
				    console.log("未知主题消息...")
				    break;
		    }
		    console.log(`show UI VIP:${isShowVIP}`);
	    }
    }

    function onVisitorSign(signDataList) {
	    isLoading = true;
	    var dataList = [];
	    try {
		    console.log(signDataList.length)
		    for (let i = 0; i < signDataList.length; i++) {

			    let signData = signDataList[i];
			    let data = Object.assign(signData.person.person_information);
			    try {
				    data.signTime = new Date(signData.timestamp * 1000).format("hh:mm:ss");
			    } catch (e) {
			    }
			    data.device_id = signData.device_id;
			    data.photo = require('../assets/img/male.png'); //`http://api.vaiwan.com:8081/image/${signData.person.face_list[0].face_image_id}`;
			    //data.photo = "http://192.168.0.119" + ":9812/image/" + signData.person.face_list[0].face_image_id; //`http://api.vaiwan.com:8081/image/${signData.person.face_list[0].face_image_id}`;
			    dataList.push(data);

		    }
		    let promise = new Promise(function (resolve, reject) {
			    if (_this.$refs.staffPage) {
				    _this.$refs.staffPage.updateData(dataList);
			    }
			    resolve();
		    });
		    promise.then(() => {
			    isLoading = false;
		    });
	    } catch (e) {
		    console.log(e)
	    } finally {
		    isLoading = false;
	    }
    }

    var _this;
    var currentInterval;
    import Vue from 'vue'
    import StaffPage from '../components/staff_page.vue';
    import StaffSignPage from '../components/staffsign_page.vue';
    export default {
	    name: "home",
	    components: {
		    StaffPage,
		    StaffSignPage,
	    },
	    data() {
		    _this = this;
		    return {
			    sendText: "Hello mqtt",
			    title: HOME_SCREEN_TITLE,
			    currentTime: "",
			    staffNum: 0,
			    signInNum: 0,
			    isShowVIP: false,
			    bgImg: require('../assets/img/main.png'),
		    }
	    },
	    methods: {
		    btnTest() {

			    onVisitorSign(JSON.parse(`
[
  {
    "device_id": "string",
    "face_id": "string",
    "face_image_id": "string",
    "identity": "STRANGER",
    "person": {
      "face_list": [
        {
          "face_id": "string",
          "face_image_id": "string",
          "scene_image_id": "string"
        }
      ],
      "identity": "STAFF",
      "meta": {},
      "person_id": "string",
      "person_information": {
        "birthday": "string",
        "company": "string",
        "employed_date": "string",
        "id": "string",
        "identity_number": "string",
        "name": "string1",
        "phone": "string",
        "remark": "string",
        "visit_end_timestamp": 0,
        "visit_purpose": "0",
        "visit_start_timestamp": 0,
        "visit_time_type": "0",
        "visitee_name": "string"
      },
      "tag_id_list": [
        "string"
      ],
      "upload_time": 0
    },
    "scene_image_id": "string",
    "score": 0,
    "timestamp": 0,
    "track_id": "string"
  }
]`
			    ));//方法1
		    },

		    onSend() {
			    let strMsg = _this.sendText;// document.getElementById("msg").value;
			    if (strMsg) {
				    let message = new Paho.MQTT.Message(strMsg);
				    message.destinationName = sendTopic; //发送主题
				    client.send(message);
				    console.log(`send data: ${strMsg}`)
				    _this.sendText = "";
			    }
		    },
		    getSignIn() {
			    return _this.signInNum + " / " + _this.staffNum;
		    }
	    },
	    computed: {},
	    filters: {},
	    created: function () {
		    _this = this;

	    },
	    mounted: function () {
		    currentInterval = setInterval(function doAnimation() {

			    _this.currentTime = new Date().format("MM月dd日 hh:mm");
//			    $.ajax({
//				    url: HOST + "user/getStaffNum",
//				    type: 'GET',
//				    dataType: 'json',
//				    success: function (data) {
//					    if (data.code == 200) {
//						    _this.staffNum = data.data;
//					    }
//				    },
//				    error: function (data) {
//
//				    }
//			    })
//			    $.ajax({
//				    url: HOST + "user/getStaffSignInNum",
//				    type: 'GET',
//				    dataType: 'json',
//				    success: function (data) {
//					    if (data.code == 200) {
//						    _this.signInNum = data.data;
//					    }
//				    },
//				    error: function (data) {
//
//				    }
//			    })

		    }, 1000);//定时器

	    },
	    destroyed: function () {
		    clearInterval(currentInterval);
	    }
    }

</script >
<style >
    span {
	    text-align: center;
	    font-size: 32px;
	    font-weight: bold;
	    color: white;
    }

    .homeDiv {
	    right: 0;
	    text-align: right;
	    margin-top: 20px;
	    margin-right: 20px;
	    position: absolute;
	    z-index: 0;
    }
</style >
