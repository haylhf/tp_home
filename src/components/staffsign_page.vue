<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div>
        <div id="container"></div>
    </div>

</template>

<script>

    var rootWidth = window.innerWidth;
    var rootHeight = window.innerHeight;
    var stage = null;
    var layer = null;
    var dateLayer = null;
    var circle = null;
    var imgSize = 50;
    var departmentList = DEPARTMENT_LIST;

    $(document).ready(function () {
        _this.getInitData();
    })

    function drawCurrentDayImage(currentDay) {
//添加中心圆-当前具体日期-天
        var currentDayImage = new Image();//Html Image
        currentDayImage.onload = function () {
            let dimg = new Konva.Image({
                image: this,
                x: Math.round(stage.getWidth() / 2 - 200 / 2) + 1,
                y: Math.round(stage.getHeight() / 2 - 200 / 2),
                width: 200,
                height: 200,
            });
            dimg.setName(`currentDayImage`);
            dimg.setId(`currentDayImage`);
            let tid = setTimeout(() => {
                dateLayer.add(dimg);
                stage.draw();
                window.clearTimeout(tid);
            }, 200)
        };
        let currentDayImageName = `circle_date_${currentDay}.png`;
        if (currentDay.toString().length == 1) {
            currentDayImageName = `circle_date_0${currentDay}.png`;
        }
        currentDayImage.src = require('../assets/img/day/' + currentDayImageName);
    }

    function drawAllDaysImage(alldays) {
//添加中心圆-日期-天
        var dayImage = new Image();//Html Image
        dayImage.onload = function () {
            let dimg = new Konva.Image({
                image: this,
                x: Math.round(stage.getWidth() / 2 - 200 / 2) + 1,
                y: Math.round(stage.getHeight() / 2 - 200 / 2),
                width: 200,
                height: 200,
            });
            dimg.setName(`dayImage`);
            dimg.setId(`dayImage`);

            dateLayer.add(dimg);
        };
        let dayImageName = `circle_date_all_${alldays}.png`;
        dayImage.src = require('../assets/img/' + dayImageName);
    }

    function drawCurrentMonthImage(currentMonth) {
        var currentMonthImage = new Image();//Html Image
        currentMonthImage.onload = function () {
            let mimg = generateImage(this,
                {
                    x: stage.getWidth() / 2 - 160 / 2,
                    y: stage.getHeight() / 2 - 160 / 2,
                },
                {
                    w: 160,
                    h: 160
                });//Konva Image
            mimg.setName(`currentMonthImage`);
            mimg.setId(`currentMonthImage`);
            let tid = setTimeout(() => {
                dateLayer.add(mimg);
                stage.draw();
                window.clearTimeout(tid);
            }, 200)

        };
        let currentMonthImageName = `circl_month_${currentMonth}.png`;
        if (currentMonth.toString().length == 1) {
            currentMonthImageName = `circl_month_0${currentMonth}.png`;
        }
        currentMonthImage.src = require('../assets/img/month/' + currentMonthImageName);
    }

    function drawAllMonthImage() {
//添加中心圆-月份
        var monthImage = new Image();//Html Image
        monthImage.onload = function () {
            let mimg = generateImage(this,
                {
                    x: stage.getWidth() / 2 - 160 / 2,
                    y: stage.getHeight() / 2 - 160 / 2,
                },
                {
                    w: 160,
                    h: 160
                });//Konva Image
            mimg.setName(`monthImage`);
            mimg.setId(`monthImage`);
            dateLayer.add(mimg);
        };
        monthImage.src = require('../assets/img/circl_month_all.png');
    }

    function drawCircleImage() {
//添加中心圆
        var circleImage = new Image();//Html Image
        circleImage.onload = function () {
            let img = generateImage(this,
                {
                    x: stage.getWidth() / 2 - 180 / 2,
                    y: stage.getHeight() / 2 - 180 / 2,
                },
                {
                    w: 180,
                    h: 180
                });//Konva Image
            img.setName(`circleImage`);
            img.setId(`circleImage`);
            dateLayer.add(img);
            drawPercent();
            drawPercentNumber();
        };
        circleImage.src = require('../assets/img/bg_mid_round.png');
    }

    function drawPercentNumber() {
        let percentNumber = new Konva.Text({
            x: stage.getWidth() / 2 - 15,
            y: stage.getHeight() / 2 - 40,
            text: "0",
            fontSize: 50,
            fontFamily: 'Calibri',
            fontStyle: 'bold',
            align: 'center',
            id: `percentNumber`,
            name: `percentNumber`,
            zIndex: 100,
            fillLinearGradientColorStops: [0, 'white', 0, 'rgb(150,5,13)'],
            fillLinearGradientStartPoint: {x: 0, y: 0},
            fillLinearGradientEndPoint: {x: 0, y: 100},
        });
        dateLayer.add(percentNumber);
    }

    function drawPercent() {
        var percent = new Konva.Text({
            x: stage.getWidth() / 2 + 30,
            y: stage.getHeight() / 2,
            text: '%',
            fontSize: 14,
            fontFamily: 'Calibri',
            fontStyle: 'bold',
            align: 'center',
            id: `percent`,
            name: `percent`,
            fill: 'rgb(150,5,13)',
        });
        dateLayer.add(percent);
    }

    function loadData() {
        try {
            if (layer && layer != null) {
                layer.clear();
            }

            if (dateLayer && dateLayer != null) {
                dateLayer.clear();
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
            layer = new Konva.Layer();
            dateLayer = new Konva.Layer();
            let r = 60
            circle = new Konva.Circle({
                x: stage.getWidth() / 2,
                y: stage.getHeight() / 2,
                radius: r, //半径
                fill: '',
                stroke: 'white',
                strokeWidth: 2
            });
            dateLayer.add(circle);

            circle.hide();

            drawCircleImage();

            drawAllMonthImage();

            let date = new Date();
            let currentMonth = date.getMonth() + 1;//从 Date 对象返回月份 (0 ~ 11)
            let currentDay = date.getDate();
            let alldays = getDaysByMonth(date.getYear(), currentMonth);

            drawCurrentMonthImage(currentMonth);

            drawAllDaysImage(alldays);

            drawCurrentDayImage(currentDay);
            stage.add(dateLayer);

            /*
             *  根据部门对象列表循环添加到UI图层上
             * */
            for (let i = 0; i < departmentList.length; i++) {
                if (departmentList[i].tagId == "") {
                    continue;
                }
                addDepartmentToUI(departmentList[i], i);
            }
        } catch (e) {
            alert(JSON.stringify(e));
        }
        // stage.on('click', function (e) {//Test TODO
        //     let num = getRandomInt(0, departmentList.length - 2)//Test TODO
        //
        //     _this.updateData([
        //         {
        //             tagId: departmentList[num].tagId,
        //             totalNum: 50,
        //             currentNum: 30,
        //         },
        //         {
        //             tagId: departmentList[num + 1].tagId,
        //             totalNum: 50,
        //             currentNum: 20,
        //         }
        //     ])
        // });
    }

    /*
     * 添加每个部门对象到图层，包括文字，直线
     *
     */
    function generateEndPointer(index, startPointer) {
        let angle = 360 / departmentList.length * index;
        let arrowLength = getRandomInt(rootWidth / 2 - circle.getRadius(), rootWidth / 2) - imgSize / 2;//这里可以位置的调整取值范围

        if (departmentList[index].isInnerSide && departmentList[index].isInnerSide == true) {
            arrowLength = rootHeight / 2 - circle.getRadius() - imgSize / 2; //getRandomInt(rootHeight / 2 - circle.getRadius(), rootHeight / 2) - imgSize / 2;
        }
        if (index == 4 || index == 8 || index == 16 || index == 20) {
            arrowLength += 55;
        }

        let endPointer = getPointByAngle({x: 0, y: 0}, arrowLength * 0.7, angle);// 结束点，角度不变，仅长度变长。

        let slope = (endPointer.y - startPointer.y) / (endPointer.x - startPointer.x); //斜率
        if (Math.abs(endPointer.x) >= rootWidth / 2 - imgSize / 2) {
            if (endPointer.x < 0) {
                endPointer.x += Math.abs(endPointer.x) - (rootWidth / 2 - imgSize / 2);
            } else {
                endPointer.x -= Math.abs(endPointer.x) - (rootWidth / 2 - imgSize / 2);
            }
            endPointer.y = slope * endPointer.x;

        }
        if (Math.abs(endPointer.y) >= rootHeight / 2 - imgSize - 30) {
            if (endPointer.y < 0) {
                endPointer.y += Math.abs(endPointer.y) - (rootHeight / 2 - imgSize - 30);
            } else {
                endPointer.y -= Math.abs(endPointer.y) - (rootHeight / 2 - imgSize - 30);
            }
            endPointer.x = endPointer.y / slope;
        }
        return endPointer;
    }

    function addDepartmentToUI(item, index) {

        let angle = 360 / departmentList.length * index;// 算出每一个对象所要显示在圆周上的角度
        let startPointer = getPointByAngle({x: 0, y: 0}, circle.getRadius(), angle); //线起始点，随着角度变化
        var endPointer = generateEndPointer(index, startPointer);

        var arrowLine = new Konva.Arrow({
            x: circle.getX(),//圆 心
            y: circle.getY(),//圆 心
            points: [startPointer.x, startPointer.y, endPointer.x, endPointer.y], //
            pointerLength: 0,//不显示箭头
            pointerWidth: 0,//不显示箭头
            stroke: '#DF6911',
            strokeWidth: 2,
            opacity: 0.4,
            zIndex: -100,
            id: `arrowLine_${index}`,
            name: `arrowLine_${item.name}`,
        });
        layer.add(arrowLine);

        var group = new Konva.Group({
            x: 0,
            y: 0,
            opacity: 1,
            id: `group_${index}`,
            name: `group_${item.name}`,
        });

        var bgImage = new Image();//Html Image background image

        bgImage.onload = function () {
            let img = new Konva.Image({
                image: bgImage,
                x: circle.getX() + endPointer.x - imgSize / 2,
                y: circle.getY() + endPointer.y - imgSize / 2,
                width: imgSize,
                height: imgSize,
                opacity: 0.7,
            });
            img.setName(`bgImage_${item.name}`);
            img.setId(`bgImage_${index}`);
            group.add(img)

        };
        bgImage.src = require('../assets/img/signed_block.png');

        var signedUser = new Konva.Text({
            x: circle.getX() + endPointer.x - imgSize / 2 + 8,
            y: circle.getY() + endPointer.y - imgSize / 2 + 12,
            text: item.currentNum ? item.currentNum.toString() : "0",
            fontSize: 20,
            opacity: 0.5,
            fontFamily: 'Calibri',
            // fill: 'black',
            fontStyle: 'bold',
            align: 'center',
            id: `signedUser_${index}`,
            name: `signedUser_${item.name}`,
        });
        var totalUser = new Konva.Text({
            x: circle.getX() + endPointer.x + 8,
            y: circle.getY() + endPointer.y + 6,
            text: item.totalNum ? item.totalNum.toString() : "0",
            opacity: 0.5,
            fontSize: 12,
            fontStyle: 'bold',
            fontFamily: 'Calibri',
            fill: 'white',
            align: 'right',
            id: `totalUser_${index}`,
            name: `totalUser_${item.name}`,
        });

        var imgDepart = new Image();//Html Image
        let offset = 60;
        if (item.text.length < 5) {
            offset = 61;
        }
        imgDepart.onload = function () {
            let departimg = new Konva.Image({
                image: imgDepart,
                x: circle.getX() + endPointer.x - imgSize / 2 - offset,
                y: circle.getY() + endPointer.y + imgSize / 2,//在上个图下方显示部门图片
                opacity: 0.5,
                scale: {
                    x: 0.4,
                    y: 0.48
                }
            });
            // if (departimg.getX() + departimg.getWidth() >= rootWidth) {
            //     departimg.offsetX((departimg.getX() + departimg.getWidth() - rootWidth));
            // }
            departimg.setName(`imgDepart_${item.name}`);
            departimg.setId(`imgDepart_${index}`);
            departimg.setHeight(40)
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

    var currentInterval = 0;
    var dataInterval = 0;
    var _this
    export default {
        name: "StaffSignPage",
        components: {},
        data() {
            _this = this;
            return {}
        },
        methods: {
            reloadData() {
                setTimeout(() => {
                    loadData()
                }, 0)
            },
            updatePercentNum(num) {
                let fs = 50;
                let x = num.toString().length >= 2 ? 10 : 0
                if (num.toString().length == 3) {
                    x = 15;
                    fs = 40
                }
                try {
                    let percentNumber = stage.find('#percentNumber')[0];
                    if (percentNumber && percentNumber.getText() == num.toString()) {
                        return;
                    }
                    if (percentNumber) {
                        percentNumber.fontSize(fs);
                        percentNumber.offsetX(x);
                        percentNumber.text(num.toString())
                    }
                    stage.draw();
                } catch (e) {
                    console.log(e)
                }
            },

            pullLatestData(dataList) {
                let updateList = [];
                for (let item of dataList) {
                    for (let i = 0; i < departmentList.length; i++) {
                        if (departmentList[i].tagId != "" && departmentList[i].tagId == item.tagId) {
                            if (departmentList[i].currentNum != item.currentNum
                                || departmentList[i].totalNum != item.totalNum) {
                                updateList.push(item);//new data
                            }
                            break;
                        }
                    }
                }
                if (updateList.length > 0) {
                    _this.updateData(updateList);
                }

            },
            updateData(dataList) {
                if (!dataList || dataList.length == 0) {
                    return;
                }
                //console.log(`[staffsign] updateData dataList:\r\n${JSON.stringify(dataList)}`);
                for (let i = 0; i < 1; i++) {
                    _this.updateDataToUI(dataList[i], dataList, (itemList) => {
                        if (!itemList || itemList.length == 0) {
                            return;
                        }
                        _this.updateData(itemList);
                    });
                    break;
                }
            },

            updateDataToUI(data, dataList, callback) {
                let tid = setTimeout(() => {
                    for (let i = 0; i < departmentList.length; i++) {
                        if ((departmentList[i].tagId && departmentList[i].tagId == data.tagId)) {
                            departmentList[i] = Object.assign(departmentList[i], data);
                            if (departmentList[i].tagId == "") {
                                return;
                            }
                            _this.playZoominAnimation(i, departmentList[i]);
                            break;
                        }
                    }
                    if (dataList && dataList.length > 0) {
                        dataList.splice(0, 1);
                    }
                    callback(dataList);
                    window.clearTimeout(tid);
                }, 200)
            },

            updateDateImage() {
                let date = new Date();
                let m = date.getMonth() + 1;//从 Date 对象返回月份 (0 ~ 11)
                let d = date.getDate();
                let alldays = getDaysByMonth(date.getYear(), m);
                _this.updateAllDaysImage(alldays);
                _this.updateCurrentMonthImage(m);
                _this.updateCurrentDayImage(d);
            },

            updateAllDaysImage(alldays) {
                let dayImage = stage.find('#dayImage')[0];
                if (dayImage) {
                    dayImage.remove();
                    dayImage.destroy();
                    dayImage = null;
                }
                drawAllDaysImage(alldays);
            },

            updateCurrentMonthImage(currentMonth) {
                let currentMonthImage = stage.find('#currentMonthImage')[0];
                if (currentMonthImage) {
                    currentMonthImage.remove();
                    currentMonthImage.destroy();
                    currentMonthImage = null;
                }
                drawCurrentMonthImage(currentMonth);
            },

            updateCurrentDayImage(currentDay) {
                let currentDayImage = stage.find('#currentDayImage')[0];
                if (currentDayImage) {
                    currentDayImage.remove();
                    currentDayImage.destroy();
                    currentDayImage = null;
                }
                drawCurrentDayImage(currentDay);
            },

            //有人刷卡，数据更新了，将执行动画
            playZoominAnimation(index, signedData) {
                //console.log(`playZoominAnimation index:${index}\r\nsignedData:\r\n${JSON.stringify(signedData)}`);

                let signedUser = stage.find('#signedUser_' + index)[0];
                if (signedUser) {
                    let text = signedData.currentNum.toString()
                    signedUser.text(text); //更新相应部门刷卡人数
                }

                let totalUser = stage.find('#totalUser_' + index)[0];
                if (totalUser) {
                    let text = signedData.totalNum.toString()
                    totalUser.text(text); //更新相应部门总人数
                }

                if (departmentList[index].isZoomIn && departmentList[index].isZoomIn == true) {
                    layer.draw(); //re-draw the UI,update text
                    return;
                }

                if (signedUser && signedUser.getAbsoluteScale().x > 1) { //已经放大过了
                    layer.draw(); //re-draw the UI,update tex
                    return;
                }

                let rate = 0.3;
                let arrowLine = stage.find('#arrowLine_' + index)[0];
                let points = arrowLine.getPoints();
                let startPointer = {
                    x: points[0],
                    y: points[1]
                }
                let endPointer = {
                    x: points[2],
                    y: points[3]
                }
                let slope = (endPointer.y - startPointer.y) / (endPointer.x - startPointer.x); //斜率
                endPointer = {
                    x: points[2] * (1 + rate), //需要拉近 坐标变小
                    y: points[3] * (1 + rate)
                }
                if (Math.abs(endPointer.x) >= rootWidth / 2 - imgSize / 2) {
                    if (endPointer.x < 0) {
                        endPointer.x += Math.abs(endPointer.x) - (rootWidth / 2 - imgSize / 2);
                    } else {
                        endPointer.x -= Math.abs(endPointer.x) - (rootWidth / 2 - imgSize / 2);
                    }
                    endPointer.y = slope * endPointer.x;

                }
                if (Math.abs(endPointer.y) >= rootHeight / 2 - imgSize - 50) {
                    if (endPointer.y < 0) {
                        endPointer.y += Math.abs(endPointer.y) - (rootHeight / 2 - imgSize - 50);
                    } else {
                        endPointer.y -= Math.abs(endPointer.y) - (rootHeight / 2 - imgSize - 50);
                    }
                    endPointer.x = endPointer.y / slope;
                }

                if (arrowLine) {
                    var tweenArrowLine = new Konva.Tween({
                        node: arrowLine,
                        duration: 1,
                        opacity: 1,
                        stroke: '#EE8000',
                        zIndex: -100,
                        points: [startPointer.x, startPointer.y, endPointer.x, endPointer.y],
                        onFinish: function () {
                            // remove all references from Konva
                            tweenArrowLine.destroy();
                        }
                    });
                }
                try {
                    let bgImage = stage.find('#bgImage_' + index)[0];
                    if (bgImage) {
                        var tweenBgImage = new Konva.Tween({
                            node: bgImage,
                            duration: 1,
                            opacity: 1,
                            x: circle.getX() + endPointer.x - imgSize / 2,
                            y: circle.getY() + endPointer.y - imgSize / 2,
                            scaleX: bgImage.getAbsoluteScale().x * (1 + rate + 0.2),
                            scaleY: bgImage.getAbsoluteScale().y * (1 + rate + 0.2),
                            onFinish: function () {
                                // remove all references from Konva
                                tweenBgImage.destroy();
                            }
                        });
                    }

                } catch (e) {
                    console.log(e);
                }
                if (signedUser) {
                    var tweenSignedUser = new Konva.Tween({
                        node: signedUser,
                        duration: 1,
                        opacity: 1,
                        scaleX: signedUser.getAbsoluteScale().x * (1 + rate),
                        scaleY: signedUser.getAbsoluteScale().y * (1 + rate),
                        x: circle.getX() + endPointer.x - imgSize / 2 + 15,
                        y: circle.getY() + endPointer.y - imgSize / 2 + 20,
                        onFinish: function () {
                            // remove all references from Konva
                            tweenSignedUser.destroy();
                        }
                    });
                }

                if (totalUser) {
                    var tweenTotalUser = new Konva.Tween({
                        node: totalUser,
                        duration: 1,
                        opacity: 1,
                        scaleX: totalUser.getAbsoluteScale().x * (1 + rate),
                        scaleY: totalUser.getAbsoluteScale().y * (1 + rate),
                        x: circle.getX() + endPointer.x + 24,
                        y: circle.getY() + endPointer.y + 20,
                        onFinish: function () {
                            // remove all references from Konva
                            tweenTotalUser.destroy();
                        }
                    });
                }
                try {
                    let imgDepart = stage.find('#imgDepart_' + index)[0];
                    if (imgDepart) {
                        var tweenImgDepart = new Konva.Tween({
                            node: imgDepart,
                            duration: 1,
                            opacity: 1,
                            scaleX: imgDepart.getAbsoluteScale().x * (1 + rate),
                            scaleY: imgDepart.getAbsoluteScale().y * (1 + rate),
                            x: circle.getX() + endPointer.x - imgSize / 2 - 75,
                            y: circle.getY() + endPointer.y + imgSize / 2 + 25,
                            onFinish: function () {
                                // remove all references from Konva
                                tweenImgDepart.destroy();
                            }
                        });
                    }

                } catch (e) {
                    console.log(e);
                }
                try {

                    let group = stage.find('#group_' + index)[0];
                    if (group) {
                        var tweenGroup = new Konva.Tween({
                            node: group,
                            duration: 1,
                            opacity: 1,
                            zIndex: 100,
                            onFinish: function () {
                                tweenGroup.destroy();
                            }
                        });
                    }
                } catch (e) {
                    console.log(e);
                }
                departmentList[index].isZoomIn = true;
                departmentList[index].updateTime = new Date();
                let tid = setTimeout(function () {
                    tweenBgImage.play();
                    tweenSignedUser.play();
                    tweenTotalUser.play();
                    tweenImgDepart.play();
                    tweenGroup.play();
                    tweenArrowLine.play();
                    window.clearTimeout(tid);
                }, 500);
            },

            //重置状态，部门变小回退到原来位置
            playAnimationToReset(index) {
                if (!(departmentList[index].isZoomIn && departmentList[index].isZoomIn == true)) {
                    return;
                }
                try {
                    let angle = 360 / departmentList.length * index;// 算出每一个对象所要显示在圆周上的角度
                    let startPointer = getPointByAngle({x: 0, y: 0}, circle.getRadius(), angle); //线起始点，随着角度变化
                    var endPointer = generateEndPointer(index, startPointer);

                    let arrowLine = stage.find('#arrowLine_' + index)[0];
                    var tweenArrowLine = new Konva.Tween({
                        node: arrowLine,
                        duration: 1,
                        opacity: 0.4,
                        zIndex: -100,
                        stroke: '#EE8000',
                        points: [startPointer.x, startPointer.y, endPointer.x, endPointer.y],
                        onFinish: function () {
                            // remove all references from Konva
                            tweenArrowLine.destroy();
                        }
                    });

                    try {
                        let group = stage.find('#group_' + index)[0];
                        var tweenGroup = new Konva.Tween({
                            node: group,
                            duration: 1,
                            opacity: 1,
                            zIndex: 0,
                            onFinish: function () {
                                // remove all references from Konva
                                tweenGroup.destroy();
                            }
                        });

                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        let bgImage = stage.find('#bgImage_' + index)[0];

                        var tweenBgImage = new Konva.Tween({
                            node: bgImage,
                            duration: 1,
                            opacity: 0.7,
                            scaleX: 1,
                            scaleY: 1,
                            x: circle.getX() + endPointer.x - imgSize / 2,
                            y: circle.getY() + endPointer.y - imgSize / 2,
                            onFinish: function () {
                                // remove all references from Konva
                                tweenBgImage.destroy();
                            }
                        });

                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        let signedUser = stage.find('#signedUser_' + index)[0];
                        var tweenSignedUser = new Konva.Tween({
                            node: signedUser,
                            duration: 1,
                            opacity: 0.5,
                            scaleX: 1,
                            scaleY: 1,
                            x: circle.getX() + endPointer.x - imgSize / 2 + 6,
                            y: circle.getY() + endPointer.y - imgSize / 2 + 15,
                            onFinish: function () {
                                // remove all references from Konva
                                tweenSignedUser.destroy();
                            }
                        });

                    } catch (e) {
                        console.log(e);
                    }

                    try {

                        let totalUser = stage.find('#totalUser_' + index)[0];
                        var tweenTotalUser = new Konva.Tween({
                            node: totalUser,
                            duration: 1,
                            opacity: 0.5,
                            scaleX: 1,
                            scaleY: 1,
                            x: circle.getX() + endPointer.x + 8,
                            y: circle.getY() + endPointer.y + 3,
                            onFinish: function () {
                                // remove all references from Konva
                                tweenTotalUser.destroy();
                            }
                        });

                    } catch (e) {
                        console.log(e);
                    }
                    try {

                        let imgDepart = stage.find('#imgDepart_' + index)[0];
                        var tweenImgDepart = new Konva.Tween({
                            node: imgDepart,
                            duration: 1,
                            opacity: 0.5,
                            scaleX: 0.4,
                            scaleY: 0.48,
                            x: circle.getX() + endPointer.x - imgSize / 2 - 55,
                            y: circle.getY() + endPointer.y + imgSize / 2 + 5,
                            onFinish: function () {
                                // remove all references from Konva
                                tweenImgDepart.destroy();
                            }
                        });

                    } catch (e) {
                        console.log(e);
                    }
                    departmentList[index].isZoomIn = false;
                    let tid = setTimeout(function () {
                        tweenBgImage.play();
                        tweenSignedUser.play();
                        tweenTotalUser.play();
                        tweenImgDepart.play();
                        tweenGroup.play();
                        tweenArrowLine.play();
                        window.clearTimeout(tid);
                    }, 500);
                } catch (e) {
                    console.log(e)
                }
            },

            getInitData() {
                $.ajax({
                    url: HOST + "user/getInitData",
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
                                    for (let item of res.data) {//填充数据
                                        for (let i = 0; i < departmentList.length; i++) {
                                            if (departmentList[i].tagId == "") {
                                                continue;
                                            }
                                            if (item.tagId == departmentList[i].tagId) {
                                                departmentList[i] = Object.assign(item, departmentList[i]);
                                                break;
                                            }
                                        }
                                    }

                                }
                            }
                            catch (e) {
                                console.log(e);
                            }
                            finally {
                                loadData();
                            }
                        }
                        else {
                            loadData();
                        }
                    },
                    error: function (res) {
                        loadData();
                    }
                })
            }
        },

        computed: {},
        filters: {},
        created: function () {
            console.log('created')
            dataInterval = setInterval(() => {
                $.ajax({
                    url: HOST + "user/getMovingList",
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
                                    for (let item of res.data) {
                                        for (let i = 0; i < departmentList.length; i++) {
                                            if (departmentList[i].tagId == "") {
                                                continue;
                                            }
                                            if (departmentList[i].tagId == item) {
                                                if (!departmentList[i].isZoomIn || departmentList[i].isZoomIn == false) {
                                                    _this.playZoominAnimation(i, departmentList[i]);// play animation
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    },
                })
                //Test TODO
                let num = getRandomInt(0, departmentList.length - 1)//Test TODO
                _this.updateData([
                    {
                        tagId: departmentList[num].tagId,
                        totalNum: 50,
                        currentNum: 30,
                    },
                    {
                        tagId: departmentList[num + 1].tagId,
                        totalNum: 50,
                        currentNum: 20,
                    }
                ])
                num = getRandomInt(0, 100)//Test TODO
                _this.updatePercentNum(num)
                //Test TODO
            }, 5 * 1000)
        },
        mounted: function () {
            console.log('mounted')
            currentInterval = setInterval(function updateTime() {
                for (let i = 0; i < departmentList.length; i++) {
                    if (departmentList[i].updateTime) {
                        let dtime = new Date() - departmentList[i].updateTime;  // 计算时间差
                        let diffTimes = Math.floor(dtime / 1000); //算出总的分钟数差值
                        if (diffTimes >= 5) {//1 分钟内没有人刷卡，则部门变小回退到原来位置
                            if (departmentList[i].isZoomIn && departmentList[i].isZoomIn == true) {
                                _this.playAnimationToReset(i);
                            }
                        }
                    }
                }


            }, 4 * 1000);//定时器每1分钟检查一次
        },
        destroyed: function () {
            window.clearInterval(currentInterval);
            window.clearInterval(dataInterval);
            layer.remove();
            layer.destroy();
            dateLayer.remove()
            dateLayer.destroy();
            stage.remove();
            stage.destroy();
        }
    }

</script>
<style>
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
        font-family: "SquareFont";
    }
</style>
