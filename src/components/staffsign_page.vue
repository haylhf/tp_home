<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <div >
	    <!--<div class="centerDiv" >-->
	    <!--</div >-->
		<div id="container" ></div >
	</div >

</template >

<script >
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
	var rootWidth = window.innerWidth;
	var rootHeight = window.innerHeight;
	var stage = null;
	var layer = null;
	var circle = null;
	var lineLength = 0;
	var minLength = 0;
	var maxLength = 0;
	var imgSize = 110;
	var cengerGroup = null;

	/*
	 * 添加每个部门对象到图层，包括文字，直线
	 *
	 */
	function addDispartToUI(angle, name, id) {
//		let arrowLength = getRandomInt(rootHeight / 2 - circle.getRadius() / 2, rootWidth / 2);
		let arrowLength = getRandomInt(rootWidth / 2 - imgSize*2 , rootWidth / 2);//这里可以位置的调整取值范围

		let startPointer = getPointByAngle({x: 0, y: 0}, circle.getRadius(), angle); //线起始点，随着角度变化
		let endPointer = getPointByAngle({x: 0, y: 0}, arrowLength - imgSize, angle);// 结束点，角度不变，仅长度变长。

		if (Math.abs(endPointer.x) >= rootWidth / 2) {
			if (endPointer.x < 0) {
				endPointer.x += Math.abs(endPointer.x) - rootWidth / 2 + imgSize / 2;
			} else {
				endPointer.x -= Math.abs(endPointer.x) - rootWidth / 2 + imgSize / 2;
			}
		}
		if (Math.abs(endPointer.y) >= rootHeight / 2) {
			if (endPointer.y < 0) {
				endPointer.y += Math.abs(endPointer.y) - rootHeight / 2 + imgSize / 2;
			} else {
				endPointer.y -= Math.abs(endPointer.y) - rootHeight / 2 + imgSize / 2;
			}
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
			id: `Arrow_${id}`,
			name: `Arrow_${name}`,
		});
//		arrowLine.move({
//			x: 100,
//			y: 100,
//		});
		layer.add(arrowLine);

		var group = new Konva.Group({
			x: 0,
			y: 0,
			id: `Group_${id}`,
			name: `Group_${name}`,
//		rotation: 0
		});

		var imgObj = new Image();//Html Image

		imgObj.onload = function () {
			let img = generateImage(this,
					{
						x: circle.getX() + endPointer.x - imgSize / 2,
						y: circle.getY() + endPointer.y - imgSize / 2,
					},
					{
						w: 110,
						h: 110
					});//Konva Image
			img.setName(`Image_${name}`);
			img.setId(`Image_${id}`);

			group.add(img)

		};
		imgObj.src = require('../assets/img/signed_block.png');

		var imgDepart = new Image();//Html Image

		imgDepart.onload = function () {
			let departimg = generateImage(this,
					{
						x: circle.getX() + endPointer.x - imgSize / 2,
						y: circle.getY() + endPointer.y - imgSize / 2-20,//在上个图下方显示部门图片
					},
					{
						w: 110,
						h: 50
					});//Konva Image
			departimg.setName(`imgDepart_${name}`);
			departimg.setId(`imgDepart_${id}`);

			group.add(departimg)
			layer.add(group);
			stage.add(layer);
		};
		imgDepart.src = require('../assets/img/signed_block.png');
	}

	$(document).ready(function () {
		rootWidth = window.innerWidth;
		rootHeight = window.innerHeight;
		stage = new Konva.Stage({
			container: 'container',
			width: rootWidth,
			height: rootHeight,

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
			stage.add(layer);
//			cengerGroup.add(img)

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
			stage.add(layer);
//			cengerGroup.add(mimg)

		};
		monthImage.src = require('../assets/img/circl_month_all.png');


		//添加中心圆-日期-天
		var dayImage = new Image();//Html Image
		dayImage.onload = function () {
			let dimg = generateImage(this,
					{
						x: Math.round(stage.getWidth() / 2 - 320 / 2) + 1,
						y: Math.round(stage.getHeight() / 2 - 320 / 2),
					},
					{
						w: 320,
						h: 320
					});//Konva Image
			dimg.setName(`dayImage`);
			dimg.setId(`dayImage`);
			layer.add(dimg);
			stage.add(layer);
//			cengerGroup.add(dimg)
//			layer.add(cengerGroup);
//			stage.add(layer);
		};
		dayImage.src = require('../assets/img/circle_date_all_31.png');

		let angle = 360 / DISPART_LIST.length;// 算出每一个对象所要显示在圆周上的角度
		/*
		 *  根据部门对象列表循环添加到UI图层上
		 * */
		for (let i = 0; i < DISPART_LIST.length; i++) {
			addDispartToUI(angle * i, DISPART_LIST[i].name, i);
		}

//		var amplitude = 100;
//		var period = 2000;
//		// in ms
//		var centerX = stage.getWidth() / 2;
//		var anim = new Konva.Animation(function (frame) {
//			circle.setX(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerX);
//		}, layer);
//		anim.start();

	})

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
		methods: {},
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
