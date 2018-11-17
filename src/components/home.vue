<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div>
        <img :src="bgImg"
             style="width: 100%;height: 100%;position: absolute;z-index: -100; background-position: center;"/>
        <div class="homeDiv">
            <el-row>
                <span style="font-size: 20px;">签到：</span>
                <span style="font-size: 20px;">{{getSignIn()}}</span>
            </el-row>

            <el-row style="margin-top: 5px">
                <span>{{currentTime}}</span>
            </el-row>
        </div>

        <VipSignPage ref="vipPage" v-if="isShowVIP"></VipSignPage>
        <StaffSignPage ref="staffPage" v-else></StaffSignPage>


    </div>

</template>

<script>
    $(document).ready(function () {
        client.connect(options);//连接服务器并注册连接成功处理事件
        client.onConnectionLost = onConnectionLost;//注册连接断开处理事件
        client.onMessageArrived = onMessageArrived;//注册消息接收处理事件
        window.onclick = () => {
            requestFullScreen();
        };
        window.resize = () => {
            _this.bgImg = require('../assets/img/main.png');
        };
    })
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
            data = JSON.parse(message.payloadString);
            console.log("解析出来的：data：" + JSON.stringify(data));
        } catch (e) {
            console.log(e);
            data = message.payloadString;
        }
        if (data != null) {
            switch (message.destinationName) {
                case ServerTOPIC[0]: //statff
                    _this.isShowVIP = false;
                    onVisitorSign(data);
                    break;
                case ServerTOPIC[1]://vip
                    _this.isShowVIP = true;
                    onShowVipUI(data);
                    break;
                default:
                    console.log("未知主题消息...")
                    break;
            }
            console.log(`show UI VIP:${_this.isShowVIP}`);
        }
    }

    function onShowVipUI(signDataList) {
        var dataList = [];
        for (let i = 0; i < signDataList.length; i++) {
            let signData = signDataList[i];
            let data = Object.assign(signData.person.person_information);
            try {
                data.signTime = new Date(signData.timestamp * 1000).format("hh:mm:ss");
            } catch (e) {
            }
            data.device_id = signData.device_id;
            // data.photo = require('../assets/img/male.png');
            data.photo = signData.person.face_list[0].face_image_id;//http://api.vaiwan.com:8081/image/
            dataList.push(data);
        }
        if (_this.$refs.vipPage && dataList.length > 0) {
            _this.$refs.vipPage.updateData(dataList);
        }
    }

    function onVisitorSign(signDataList) {
        if (_this.$refs.staffPage && signDataList.length > 0) {
            _this.$refs.staffPage.updateData(signDataList);
            let percent = 0;
            if (_this.staffNum != 0) {
                percent = Math.ceil(_this.signInNum / _this.staffNum * 100)
            }
            _this.$refs.staffPage.updatePercentNum(percent);
        }
    }

    var _this;
    var currentInterval;
    import Vue from 'vue';
    import StaffSignPage from '../components/staffsign_page.vue';
    import VipSignPage from '../components/vipsign_page.vue';

    export default {
        name: "home",
        components: {
            StaffSignPage,
            VipSignPage,
        },
        data() {
            _this = this;
            return {
                sendText: "Hello mqtt",
                currentTime: "",
                staffNum: 0,
                signInNum: 0,
                isShowVIP: false,
                bgImg: require('../assets/img/main.png'),
                currentDate: '',
            }
        },
        methods: {
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
            _this.currentDate = new Date();
        },
        mounted: function () {
            currentInterval = setInterval(function updateTime() {
                _this.currentTime = new Date().format("MM月dd日 hh:mm");
                let d = new Date();
                if (d.getHours() == 0 && d.getMinutes() == 0 && d.getSeconds() == 0) //当时间为00:00时，背景日期图片计算并更新
                {
                    if (_this.$refs.staffPage) {
                        _this.$refs.staffPage.updateDateImage();
                    }
                    if (_this.$refs.vipPage) {
                        _this.$refs.vipPage.updateDateImage();
                    }
                }
                let dtime = new Date() - _this.currentDate;  // 计算时间差
                let diffDays = Math.floor(dtime / (24 * 3600 * 1000));
                if (diffDays >= 1) {
                    _this.currentDate = new Date();
                    if (_this.$refs.staffPage) {
                        _this.$refs.staffPage.updateDateImage();
                    }
                    if (_this.$refs.vipPage) {
                        _this.$refs.vipPage.updateDateImage();
                    }
                }

                $.ajax({
                    url: HOST + "user/getStaffNum",
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 200) {
                            _this.staffNum = data.data;
                        }
                    },
                    error: function (data) {

                    }
                })
                $.ajax({
                    url: HOST + "user/getStaffSignInNum",
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 200) {
                            _this.signInNum = data.data;
                        }
                    },
                    error: function (data) {

                    }
                })

            }, 1000);//定时器

        },
        destroyed: function () {
            clearInterval(currentInterval);
        }
    }

</script>
<style>
    span {
        text-align: center;
        font-size: 20px;
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
</style>
