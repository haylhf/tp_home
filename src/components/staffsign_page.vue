<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <div >
	    <div class="centerDiv" >
	    </div >

       <v-stage :config="configKonva" style="border: black 1px solid;">
		    <v-layer>
		      <v-circle :config="configCircle"></v-circle>
		    </v-layer>
	    </v-stage>
	</div>

</template >

<script >
	var myDiagram = null;
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
				configKonva: {
					width: 500,
					height: 500,
				},
				configCircle: {
					x: 300,
					y: 300,
					radius: 100,
					fill: "red",
					stroke: "black",
					strokeWidth: 4
				},
			}
		},
		methods: {},
		computed: {},
		filters: {},
		created: function () {

		},
		mounted: function () {
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
