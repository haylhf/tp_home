<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <div style="position: relative" >
	    <div class="centerDiv" >
	    </div >
        <div id="sample" style="z-index: 0" >
	        <div id="myDiagramDiv"
	             style="background-color: white; border: solid 1px black; width: 100%;" ></div >
            </div >
        </div >
	</div>

</template >

<script id="code" >
	var myDiagram = null;
	function initTree() {
		var $ = go.GraphObject.make;  // for conciseness in defining templates

		var blues = ['#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B'];

		myDiagram =
				$(go.Diagram, "myDiagramDiv",  // must name or refer to the DIV HTML element
						{
							initialAutoScale: go.Diagram.UniformToFill,
							contentAlignment: go.Spot.Center,
							isReadOnly: true,
							allowMove: false,
							allowDelete: false,
							layout: $(go.ForceDirectedLayout),
							// moving and copying nodes also moves and copies their subtrees
							"commandHandler.copiesTree": true,  // for the copy command
							"commandHandler.deletesTree": true, // for the delete command
							"draggingTool.dragsTree": false,  // dragging for both move and copy
							"undoManager.isEnabled": false
						});

		// Define the Node template.
		// This uses a Spot Panel to position a button relative
		// to the ellipse surrounding the text.
		myDiagram.nodeTemplate =
				$(go.Node, "Spot",
						{
							selectionObjectName: "PANEL",
							isTreeExpanded: true,
							isTreeLeaf: true
						},
						// the node's outer shape, which will surround the text
						$(go.Panel, "Auto",
								{name: "PANEL"},
								$(go.Shape, "RoundedRectangle", //shape
										{
											minSize: new go.Size(100, 100),
											fill: "whitesmoke",
											stroke: "black",
										},
										new go.Binding("fill", "rootdistance", function (dist) {
											dist = Math.min(blues.length - 1, dist);
											return blues[dist];
										})),
								$(go.TextBlock,
										{
											font: "12pt sans-serif",
											margin: 5,
										},
										new go.Binding("text")),
								$(go.TextBlock,
										{
											font: "12pt sans-serif",
											margin: 5,
										},
										new go.Binding("text","info"))
						),
				);  // end Node

		// create the model with a root node data
		myDiagram.model = new go.TreeModel([  //中心
			{key: 0, color: blues[0], everExpanded: true, text: "0"}
		]);

		createSubTree(myDiagram.model.nodeDataArray[0]);
		document.getElementById("myDiagramDiv").style.height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) + "px";

	}

	function createSubTree(parentdata) {
		var numchildren = 10;//创建个数
		// create several node data objects and add them to the model
		var model = myDiagram.model;
//		var parent = myDiagram.findNodeForData(parentdata);
//
//		var degrees = 5;
//		var grandparent = parent.findTreeParentNode();
//		while (grandparent) {
//			degrees++;
//			grandparent = grandparent.findTreeParentNode();
//		}

		for (var i = 0; i < numchildren; i++) {
			var childdata = {
				key: model.nodeDataArray.length,
				text: `${i}/10`,
				parent: parentdata.key,
				rootdistance: 1,
				info: "test" + i,
			};
			// add to model.nodeDataArray and create a Node
			model.addNodeData(childdata);
			// position the new child node close to the parent
			var child = myDiagram.findNodeForData(childdata);
		}
		return numchildren;
	}

	import Vue from 'vue'
	var _this
	export default {
		name: "StaffPage",
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

		},
		mounted: function () {
			initTree();
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
