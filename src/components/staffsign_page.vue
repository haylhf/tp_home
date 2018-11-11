<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <div >
        <!--<div class="centerDiv" >-->
        <!--</div >-->
        <div id="container" ></div >
    </div >

</template >

<script >

    var rootWidth = window.innerWidth;
    var rootHeight = window.innerHeight;
    var stage = null;
    var layer = null;
    var circle = null;
    var imgSize = 80;

    $(document).ready(function () {
	    loadData();
    })
    window.onresize = function () {
	    loadData();
    }

    function loadData() {
	    let date = new Date();
	    let currentMonth = date.getMonth() + 1;//从 Date 对象返回月份 (0 ~ 11)
	    let currentDay = date.getDate();
	    let allays = getDaysByMonth(date.getYear(), currentMonth);
	    if (layer && layer != null) {
		    layer.clear();
	    }
	    if (stage && stage != null) {
		    stage.clear();
	    }

	    rootWidth = window.innerWidth;
	    rootHeight = window.innerHeight;
	    stage = new Konva.Stage({
		    container: 'container',
		    width: rootWidth,
		    height: rootHeight,

	    });
	    stage.on('click', function (e) {
		    _this.updateData()
	    });

	    layer = new Konva.Layer();
	    let r = 100
	    circle = new Konva.Circle({
		    x: stage.getWidth() / 2,
		    y: stage.getHeight() / 2,
		    radius: r, //半径
		    fill: '',
		    stroke: 'white',
		    strokeWidth: 2
	    });
	    layer.add(circle);

	    //添加中心圆
	    var circleImage = new Image();//Html Image
	    circleImage.onload = function () {
		    let img = generateImage(this,
				    {
					    x: stage.getWidth() / 2 - 240 / 2,
					    y: stage.getHeight() / 2 - 240 / 2,
				    },
				    {
					    w: 240,
					    h: 240
				    });//Konva Image
		    img.setName(`circleImage`);
		    img.setId(`circleImage`);
		    layer.add(img);
	    };
	    circleImage.src = require('../assets/img/bg_mid_round.png');


	    //添加中心圆-月份
	    var monthImage = new Image();//Html Image
	    monthImage.onload = function () {
		    let mimg = generateImage(this,
				    {
					    x: stage.getWidth() / 2 - 260 / 2,
					    y: stage.getHeight() / 2 - 260 / 2,
				    },
				    {
					    w: 260,
					    h: 260
				    });//Konva Image
		    mimg.setName(`monthImage`);
		    mimg.setId(`monthImage`);
		    layer.add(mimg);
	    };
	    monthImage.src = require('../assets/img/circl_month_all.png');


	    var currentMonthImage = new Image();//Html Image
	    currentMonthImage.onload = function () {
		    let mimg = generateImage(this,
				    {
					    x: stage.getWidth() / 2 - 260 / 2,
					    y: stage.getHeight() / 2 - 260 / 2,
				    },
				    {
					    w: 260,
					    h: 260
				    });//Konva Image
		    mimg.setName(`currentMonthImage`);
		    mimg.setId(`currentMonthImage`);
		    layer.add(mimg);
	    };
	    let currentMonthImageName = `circl_month_${currentMonth}.png`;
	    if (currentMonth.toString().length == 1) {
		    currentMonthImageName = `circl_month_0${currentMonth}.png`;
	    }
	    currentMonthImage.src = require('../assets/img/month/' + currentMonthImageName);


	    //添加中心圆-日期-天
	    var dayImage = new Image();//Html Image
	    dayImage.onload = function () {
		    let dimg = new Konva.Image({
			    image: this,
			    x: Math.round(stage.getWidth() / 2 - 320 / 2) + 1,
			    y: Math.round(stage.getHeight() / 2 - 320 / 2),
			    width: 320,
			    height: 320,
		    });
		    dimg.setName(`dayImage`);
		    dimg.setId(`dayImage`);
		    layer.add(dimg);
		    stage.add(layer);
	    };
	    let dayImageName = `circle_date_all_${allays}.png`;
	    dayImage.src = require('../assets/img/' + dayImageName);

	    //添加中心圆-当前具体日期-天
	    var currentDayImage = new Image();//Html Image
	    currentDayImage.onload = function () {
		    let dimg = new Konva.Image({
			    image: this,
			    x: Math.round(stage.getWidth() / 2 - 320 / 2) + 1,
			    y: Math.round(stage.getHeight() / 2 - 320 / 2),
			    width: 320,
			    height: 320,
		    });
		    dimg.setName(`currentDayImage`);
		    dimg.setId(`currentDayImage`);
		    layer.add(dimg);
		    stage.add(layer);
	    };
	    let currentDayImageName = `circle_date_${currentDay}.png`;
	    if (currentDay.toString().length == 1) {
		    currentDayImageName = `circle_date_0${currentDay}.png`;
	    }
	    currentDayImage.src = require('../assets/img/day/' + currentDayImageName);


	    let angle = 360 / DISPART_LIST.length;// 算出每一个对象所要显示在圆周上的角度
	    /*
	     *  根据部门对象列表循环添加到UI图层上
	     * */
	    for (let i = 0; i < DISPART_LIST.length; i++) {
		    addDispartToUI(angle * i, DISPART_LIST[i], i);
	    }

    }

    /*
     * 添加每个部门对象到图层，包括文字，直线
     *
     */
    function addDispartToUI(angle, item, id) {

	    let arrowLength = getRandomInt(rootWidth / 2 - circle.getRadius(), rootWidth / 2);//这里可以位置的调整取值范围

	    if (id % 2 == 0) {
		    arrowLength = getRandomInt(rootHeight / 2 - circle.getRadius(), rootHeight / 2);
	    }

	    let startPointer = getPointByAngle({x: 0, y: 0}, circle.getRadius(), angle); //线起始点，随着角度变化
	    let endPointer = getPointByAngle({x: 0, y: 0}, arrowLength - imgSize / 2, angle);// 结束点，角度不变，仅长度变长。

	    let slope = (endPointer.y - startPointer.y) / (endPointer.x - startPointer.x); //斜率
	    if (Math.abs(endPointer.x) >= rootWidth / 2 - imgSize / 2) {
		    if (endPointer.x < 0) {
			    endPointer.x += Math.abs(endPointer.x) - (rootWidth / 2 - imgSize / 2);
		    } else {
			    endPointer.x -= Math.abs(endPointer.x) - (rootWidth / 2 - imgSize / 2);
		    }
		    endPointer.y = slope * endPointer.x;

	    }
	    if (Math.abs(endPointer.y) >= rootHeight / 2 - imgSize / 2) {
		    if (endPointer.y < 0) {
			    endPointer.y += Math.abs(endPointer.y) - (rootHeight / 2 - imgSize);
		    } else {
			    endPointer.y -= Math.abs(endPointer.y) - (rootHeight / 2 - imgSize);
		    }
		    endPointer.x = endPointer.y / slope;
	    }

	    //circle.attrs
	    let x = Math.cos(angle) * circle.getRadius();//基于画布的坐标 从圆周上的点
	    let y = Math.sin(angle) * circle.getRadius();
	    var arrowLine = new Konva.Arrow({
		    x: circle.getX(),//圆 心
		    y: circle.getY(),//圆 心
		    points: [startPointer.x, startPointer.y, endPointer.x, endPointer.y], //
		    pointerLength: 0,//不显示箭头
		    pointerWidth: 0,//不显示箭头
		    fill: '#EE6911',
		    stroke: '#EE6911',
		    strokeWidth: 2,
		    id: `arrowLine_${id}`,
		    name: `arrowLine_${item.name}`,
	    });
	    layer.add(arrowLine);

	    var group = new Konva.Group({
		    x: 0,
		    y: 0,
		    opacity: 0.6,
		    id: `group_${id}`,
		    name: `group_${item.name}`,
//		rotation: 0
	    });

	    var bgImage = new Image();//Html Image background image

	    bgImage.onload = function () {
		    let img = generateImage(this,
				    {
					    x: circle.getX() + endPointer.x - imgSize / 2,
					    y: circle.getY() + endPointer.y - imgSize / 2,
				    },
				    {
					    w: imgSize,
					    h: imgSize
				    });//Konva Image
		    img.setName(`bgImage_${item.name}`);
		    img.setId(`bgImage_${id}`);
		    group.add(img)

	    };
	    bgImage.src = require('../assets/img/signed_block.png');

	    var signedUser = new Konva.Text({
		    x: circle.getX() + endPointer.x - imgSize / 2 + 15,
		    y: circle.getY() + endPointer.y - imgSize / 2 + 30,
		    text: '10',
		    fontSize: 24,
		    fontFamily: 'Calibri',
		    fill: 'black',
		    fontStyle: 'bold',
		    align: 'center',
		    id: `signedUser_${id}`,
		    name: `signedUser_${item.name}`,
	    });
	    var totalUser = new Konva.Text({
		    x: circle.getX() + endPointer.x + 12,
		    y: circle.getY() + endPointer.y + 5,
		    text: '20',
		    fontSize: 24,
		    fontStyle: 'bold',
		    fontFamily: 'Calibri',
		    fill: 'white',
		    align: 'right',
		    id: `totalUser_${id}`,
		    name: `totalUser_${item.name}`,
	    });

	    var imgDepart = new Image();//Html Image
	    imgDepart.onload = function () {
		    let departimg = new Konva.Image({
			    image: imgDepart,
			    x: circle.getX() + endPointer.x - imgSize / 2,
			    y: circle.getY() + endPointer.y + imgSize / 2,//在上个图下方显示部门图片

			    scale: {
				    x: 0.5,
				    y: 0.5
			    }
		    });
		    if (departimg.getX() + departimg.getWidth() >= rootWidth) {
			    departimg.offsetX((departimg.getX() + departimg.getWidth() - rootWidth));
		    }
		    departimg.setName(`imgDepart_${item.name}`);
		    departimg.setId(`imgDepart_${id}`);
		    departimg.setHeight(50)
		    group.add(departimg)
		    group.add(signedUser);
		    group.add(totalUser);
		    layer.add(group);
		    stage.add(layer);
	    };
	    try {
		    imgDepart.src = require(`../assets/img/depart/${item.imgUrl}`);
	    } catch (e) {
		    console.log(e)
	    }
    }

    /*
     *  生成图对象 Konva Image
     *  Note：这不是Html上 的image
     * */
    function generateImage(img, pointer, size) {
	    return new Konva.Image({
		    image: img,
		    x: pointer.x,
		    y: pointer.y,
		    width: size.w,
		    height: size.h,
	    });
    }

    /*
     * 根据角度算出相应在圆周上的点坐标，后续要以这点为起始点画直线
     * */
    function getPointByAngle(centerPoint, r, angle) {
	    let point = {};
	    //从centerPoint点开始算 r时，过圆心上的圆周交点坐标x=r*sin(angle),y=r*cos(angle)
	    point.x = Math.sin(angle * Math.PI / 180) * r + centerPoint.x;
	    point.y = centerPoint.y - Math.cos(angle * Math.PI / 180) * r;
	    return point;
    }

    import Vue from 'vue'
    var _this
    export default {
	    name: "StaffSignPage",
	    components: {},
	    data() {
		    _this = this;
		    return {
			    userList: [],
			    recentList: [],
		    }
	    },
	    methods: {
		    updateData(data)
		    {
			    _this.playAnimation();
		    },
		    updateDateImage()
		    {
			    let date = new Date();
			    let m = date.getMonth() + 1;//从 Date 对象返回月份 (0 ~ 11)
			    let d = date.getDate();
			    let allays = getDaysByMonth(date.getYear(), m);
			    _this.updateAllDaysImage(allays);
			    _this.updateCurrentMonthImage(m);
			    _this.updateCurrentDayImage(d);

		    },

		    updateAllDaysImage(allays)
		    {
			    let dayImage = stage.find('#dayImage')[0];
			    if (dayImage) {
				    let dayImageName = `circle_date_all_${allays}.png`;
				    let img = new Image();
				    img.src = require('../assets/img/' + dayImageName);
				    dayImage.draw();
			    }
		    },

		    updateCurrentMonthImage(currentMonth)
		    {
			    let currentMonthImage = stage.find('#currentMonthImage')[0];
			    if (currentMonthImage) {
				    let currentMonthImageName = `circl_month_${currentMonth}.png`;
				    if (currentMonth.toString().length == 1) {
					    currentMonthImageName = `circl_month_0${currentMonth}.png`;
				    }
				    let img = new Image();
				    img.src = require('../assets/img/month/' + currentMonthImageName);
				    currentMonthImage.setImage(img);
				    currentMonthImage.draw();
			    }
		    },

		    updateCurrentDayImage(currentDay)
		    {
			    let currentDayImage = stage.find('#currentDayImage')[0];
			    if (currentDayImage) {
				    console.log("updateCurrentDayImage");
				    let currentDayImageName = `circle_date_${currentDay}.png`;
				    if (currentDay.toString().length == 1) {
					    currentDayImageName = `circle_date_0${currentDay}.png`;
				    }
				    let img = new Image();
				    img.src = require('../assets/img/day/' + currentDayImageName);
				    currentDayImage.setImage(img);
				    currentDayImage.draw();
			    }
		    },

		    playAnimation()
		    {
			    let bgImage = stage.find('#bgImage_1')[0];
			    var tween = new Konva.Tween({
				    node: bgImage,
				    duration: 1,
				    opacity: 0.6,
				    scaleX: 1.5
			    });

			    // start tween after 2 seconds
			    setTimeout(function () {
				    tween.play();
			    }, 500);
		    }
	    },
	    computed: {},
	    filters: {},
	    created: function () {
		    console.log('created')
	    },
	    mounted: function () {
		    console.log('mounted')
	    },
	    destroyed: function () {

	    }
    }

</script >
<style >
    @-webkit-keyframes animtran {
	    from {
		    transform: rotateZ(0deg);
	    }
	    to {
		    transform: rotateZ(360deg);
	    }
    }

    span {
	    text-align: center;
    }

    .centerDiv {
	    background-image: url('../assets/img/male.png');
	    background-position: center;
	    background-clip: border-box;
	    background-origin: border-box;
	    background-repeat: no-repeat;
	    left: 50%;
	    top: 50%;
	    z-index: 0;
	    margin-left: -130px;
	    margin-top: -130px;
	    width: 260px;
	    height: 260px;
	    border: green 20px solid;
	    border-radius: 50%;
	    position: absolute;
	    animation: animtran 16s linear infinite;
	    -webkit-animation: animtran 16s linear infinite;

    }
</style >
