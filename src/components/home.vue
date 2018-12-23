<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <div >
        <!--<img v-bind:src="bgImg"-->
        <!--style="width: 100%;height: 100%;position: absolute;z-index: -100; background-position: center;"/>-->
        <div class="homeDiv" >
            <el-row >
                <span >员工状态&nbsp;</span >
                <span >{{getSignIn()}}</span >
            </el-row >

            <el-row style="margin-top: 5px;" >
                <span >{{currentTime}}</span >
            </el-row >
        </div >

        <!--<VipSignPage ref="vipPage" v-show="isShowVIP" v-if="!resetVIP"></VipSignPage>-->
        <StaffSignPage ref="staffPage" :isVip="isShowVIP" v-if="!resetStaff"></StaffSignPage >

    </div >

</template >

<script >
    $(document).ready(function () {
	    document.onclick = () => {

            if (!checkFull()) {
                requestFullScreen();
                reset();
            }else {
                //TEST TODO
                // let isvip = !_this.isShowVIP;
                // if (_this.isShowVIP != isvip) {
                //     if (_this.$refs.staffPage) {
                //         _this.$refs.staffPage.reloadData(isvip);
                //         _this.isShowVIP = isvip;
                //     }
                // }
                //TEST TODO
            }
	    };
    });
    function reset() {
        _this.resetStaff = true;
        _this.$nextTick(() => {
            _this.resetStaff = false;
            setTimeout(() => {
                if (_this.$refs.staffPage) {

                    _this.$refs.staffPage.initData();
                    //_this.$refs.staffPage.reloadData(!_this.isShowVIP);
                }
            }, 3000)
        })
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
            data.photo = photoURL + signData.person.face_list[0].face_image_id;//http://api.vaiwan.com:8081/image/
            dataList.push(data);
	    }
	    if (_this.$refs.staffPage && dataList.length > 0 && _this.isShowVIP) {
		    _this.$refs.staffPage.updateDataVip(dataList);
	    }
    }

    function onVisitorSign(signDataList) {
	    if (_this.$refs.staffPage && signDataList.length > 0 && !_this.isShowVIP) {
		    _this.$refs.staffPage.pullLatestData(signDataList);
		    let percent = 0;
		    if (_this.staffNum != 0) {
			    percent = Math.ceil(_this.signInNum / _this.staffNum * 100)
		    }
		    _this.$refs.staffPage.updatePercentNum(percent);
	    }
    }

    var _this;
    var currentInterval;
    const api = new API();
    import API from '../api/API'
    import Vue from 'vue';
    import StaffSignPage from '../components/staffsign_page.vue';
    //import VipSignPage from '../components/vipsign_page.vue';

    export default {
	    name: "home",
	    components: {
		    StaffSignPage,
		    //VipSignPage,
	    },
	    data() {
		    _this = this;
		    return {
			    currentTime: "",
			    staffNum: 0,
			    signInNum: 0,
			    isShowVIP: false,
			    bgImg: require('../assets/img/main.png'),
			    currentDate: '',
			    serverInterval: 0,
			    isShowLogo: false,
			    divstyle: {
				    "background-image": require('../assets/img/bottomBg.png'),
				    "width": "100%",
				    "height": "100%"
			    },
			    resetStaff: false,
			    resetVIP: false,
			    vipTimeOutId: ""
		    }
	    },
	    methods: {
		    getSignIn() {
			    return _this.signInNum + " / " + _this.staffNum;
		    },

		    getDataFromServer() {
			    _this.serverInterval = window.setInterval(() => {
				    _this.currentTime = new Date().format("MM月dd日 hh:mm");

				    $.ajax({
					    url: HOST + "user/getSendingVipList",
					    type: 'GET',
					    dataType: 'json',
					    withCredentials: false,               // allow CORS
					    headers: {
						    "Access-Control-Allow-Headers": "*"
					    },
					    success: function (res) {
						    if (res.code == 200) {
							    try {
								    if (res.data && res.data.length > 0) {
									    if (_this.isShowVIP) {
										    //当连续来VIP的情况
										    clearTimeout(_this.vipTimeOutId);
										    onShowVipUI(res.data);
									    } else {
										    if (_this.$refs.staffPage) {
											    _this.$refs.staffPage.reloadData(true);
											    setTimeout(function load() {
												    onShowVipUI(res.data);
											    }, 200)
										    }
										    _this.isShowVIP = true;
									    }
									    _this.vipTimeOutId = setTimeout(() => {
										    if (_this.isShowVIP != false) {
											    if (_this.$refs.staffPage) {
												    _this.$refs.staffPage.reloadData(false);//show staff
											    }
										    }
										    _this.isShowVIP = false;

									    }, 15000)
								    }
							    }
							    catch (e) {
								    console.log(e);
							    }
						    }
					    },
					    error: function (res) {
					    }
				    })

				    $.ajax({
					    url: HOST + "user/getSignInOutList",
					    type: 'GET',
					    dataType: 'json',
					    withCredentials: false,               // allow CORS
					    headers: {
						    "Access-Control-Allow-Headers": "*"
					    },
					    success: function (res) {
						    if (res.code == 200) {
							    try {
								    if (res.data && res.data.length > 0) {

									    if (!_this.isShowVIP) {
										    if (_this.$refs.staffPage) {
											    _this.$refs.staffPage.reloadData(false);
											    setTimeout(function load() {
												    onVisitorSign(res.data);
											    }, 200)
										    }
									    } else {
										    onVisitorSign(res.data);
									    }
								    }
							    }
							    catch (e) {
								    console.log(e);
							    }
						    }
					    },
				    })

				    $.ajax({
					    url: HOST + "user/getStaffNum",
					    type: 'GET',
					    dataType: 'json',
					    withCredentials: false,               // allow CORS
					    headers: {
						    "Access-Control-Allow-Headers": "*"
					    },
					    success: function (data) {
						    if (data.code == 200) {
							    _this.staffNum = data.data;
							    let percent = 0;
							    if (_this.staffNum != 0) {
								    percent = Math.ceil(_this.signInNum / _this.staffNum * 100)
							    }
							    if (_this.$refs.staffPage && !_this.isShowVIP) {
								    _this.$refs.staffPage.updatePercentNum(percent);
							    }
						    }
					    },
				    })
				    $.ajax({
					    url: HOST + "user/getStaffSignInNum",
					    type: 'GET',
					    dataType: 'json',
					    withCredentials: false,               // allow CORS
					    headers: {
						    "Access-Control-Allow-Headers": "*"
					    },
					    success: function (data) {
						    if (data.code == 200) {
							    _this.signInNum = data.data;
							    let percent = 0;
							    if (_this.staffNum != 0) {
								    percent = Math.ceil(_this.signInNum / _this.staffNum * 100)
							    }
							    if (_this.$refs.staffPage && !_this.isShowVIP) {
								    _this.$refs.staffPage.updatePercentNum(percent);
							    }
						    }
					    },
				    })
			    }, 800);
		    }


	    },
	    computed: {},
	    filters: {},
	    created: function () {
		    _this.currentDate = new Date();
	    },
	    mounted: function () {
		    currentInterval = setInterval(function updateTime() {
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

		    }, 60 * 1000);//定时器

		    _this.getDataFromServer();

	    },
	    destroyed: function () {
		    clearInterval(currentInterval);
		    clearInterval(_this.serverInterval);
	    }
    }

</script >
<style >
    span {
	    text-align: center;
	    font-family: "SquareFont";
	    font-size: 16px;
	    opacity: 0.7;
	    color: white;
    }

    .homeDiv {
	    right: 0;
	    text-align: right;
	    margin-top: 30px;
	    margin-right: 30px;
	    position: absolute;
	    z-index: 0;
	    font-family: "SquareFont";
    }
</style >
