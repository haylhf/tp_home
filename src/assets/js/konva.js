/*
 * Konva JavaScript Framework v2.4.2
 * http://konvajs.github.io/
 * Licensed under the MIT
 * Date: Fri Oct 12 2018
 *
 * Original work Copyright (C) 2011 - 2013 by Eric Rowell (KineticJS)
 * Modified work Copyright (C) 2014 - present by Anton Lavrenov (Konva)
 *
 * @license
 */
!function () {
	"use strict";
	var e = Math.PI / 180, r = {
		version: "2.4.2",
		stages: [],
		idCounter: 0,
		ids: {},
		names: {},
		shapes: {},
		listenClickTap: !1,
		inDblClickWindow: !1,
		isBrowser: "undefined" != typeof window && ("[object Window]" === {}.toString.call(window) || "[object global]" === {}.toString.call(window)),
		isUnminified: /comment/.test(function () {
		}),
		enableTrace: !1,
		traceArrMax: 100,
		dblClickWindow: 400,
		pixelRatio: void 0,
		dragDistance: 3,
		angleDeg: !0,
		showWarnings: !0,
		Filters: {},
		isDragging: function () {
			var t = r.DD;
			return !!t && t.isDragging
		},
		isDragReady: function () {
			var t = r.DD;
			return !!t && !!t.node
		},
		_addId: function (t, e) {
			e && (this.ids[e] = t)
		},
		_removeId: function (t) {
			void 0 !== t && delete this.ids[t]
		},
		_addName: function (t, e) {
			e && (this.names[e] || (this.names[e] = []), this.names[e].push(t))
		},
		_removeName: function (t, e) {
			if (t) {
				var i = this.names[t];
				if (i) {
					for (var n = 0; n < i.length; n++) {i[n]._id === e && i.splice(n, 1)}
					0 === i.length && delete this.names[t]
				}
			}
		},
		getAngle: function (t) {
			return this.angleDeg ? t * e : t
		},
		_detectIE: function (t) {
			var e = t.indexOf("msie ");
			if (0 < e)return parseInt(t.substring(e + 5, t.indexOf(".", e)), 10);
			if (0 < t.indexOf("trident/")) {
				var i = t.indexOf("rv:");
				return parseInt(t.substring(i + 3, t.indexOf(".", i)), 10)
			}
			var n = t.indexOf("edge/");
			return 0 < n && parseInt(t.substring(n + 5, t.indexOf(".", n)), 10)
		},
		_parseUA: function (t) {
			var e = t.toLowerCase(), i = /(chrome)[ /]([\w.]+)/.exec(e) || /(webkit)[ /]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ /]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [], n = !!t.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i), a = !!t.match(/IEMobile/i);
			return {browser: i[1] || "", version: i[2] || "0", isIE: r._detectIE(e), mobile: n, ieMobile: a}
		},
		UA: void 0
	}, t = "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope ? self : {};
	r.UA = r._parseUA(t.navigator && t.navigator.userAgent || ""), t.Konva && console.error("Konva instance is already exist in current eviroment. Please use only one instance."), (t.Konva = r).global = t, r.window = t, r.document = t.document, "object" == typeof exports ? module.exports = r : "function" == typeof define && define.amd && define(function () {
		return r
	})
}(), function () {
	"use strict";
	Konva.Collection = function () {
		var t = [].slice.call(arguments), e = t.length, i = 0;
		for (this.length = e; i < e; i++)this[i] = t[i];
		return this
	}, Konva.Collection.prototype = [], Konva.Collection.prototype.each = function (t) {
		for (var e = 0; e < this.length; e++)t(this[e], e)
	}, Konva.Collection.prototype.toArray = function () {
		var t, e = [], i = this.length;
		for (t = 0; t < i; t++)e.push(this[t]);
		return e
	}, Konva.Collection.toCollection = function (t) {
		var e, i = new Konva.Collection, n = t.length;
		for (e = 0; e < n; e++)i.push(t[e]);
		return i
	}, Konva.Collection._mapMethod = function (n) {
		Konva.Collection.prototype[n] = function () {
			var t, e = this.length, i = [].slice.call(arguments);
			for (t = 0; t < e; t++)this[t][n].apply(this[t], i);
			return this
		}
	}, Konva.Collection.mapMethods = function (t) {
		var e = t.prototype;
		for (var i in e)Konva.Collection._mapMethod(i)
	}, Konva.Transform = function (t) {
		this.m = t && t.slice() || [1, 0, 0, 1, 0, 0]
	}, Konva.Transform.prototype = {
		copy: function () {
			return new Konva.Transform(this.m)
		}, point: function (t) {
			var e = this.m;
			return {x: e[0] * t.x + e[2] * t.y + e[4], y: e[1] * t.x + e[3] * t.y + e[5]}
		}, translate: function (t, e) {
			return this.m[4] += this.m[0] * t + this.m[2] * e, this.m[5] += this.m[1] * t + this.m[3] * e, this
		}, scale: function (t, e) {
			return this.m[0] *= t, this.m[1] *= t, this.m[2] *= e, this.m[3] *= e, this
		}, rotate: function (t) {
			var e = Math.cos(t), i = Math.sin(t), n = this.m[0] * e + this.m[2] * i, a = this.m[1] * e + this.m[3] * i, r = this.m[0] * -i + this.m[2] * e, o = this.m[1] * -i + this.m[3] * e;
			return this.m[0] = n, this.m[1] = a, this.m[2] = r, this.m[3] = o, this
		}, getTranslation: function () {
			return {x: this.m[4], y: this.m[5]}
		}, skew: function (t, e) {
			var i = this.m[0] + this.m[2] * e, n = this.m[1] + this.m[3] * e, a = this.m[2] + this.m[0] * t, r = this.m[3] + this.m[1] * t;
			return this.m[0] = i, this.m[1] = n, this.m[2] = a, this.m[3] = r, this
		}, multiply: function (t) {
			var e = this.m[0] * t.m[0] + this.m[2] * t.m[1], i = this.m[1] * t.m[0] + this.m[3] * t.m[1], n = this.m[0] * t.m[2] + this.m[2] * t.m[3], a = this.m[1] * t.m[2] + this.m[3] * t.m[3], r = this.m[0] * t.m[4] + this.m[2] * t.m[5] + this.m[4], o = this.m[1] * t.m[4] + this.m[3] * t.m[5] + this.m[5];
			return this.m[0] = e, this.m[1] = i, this.m[2] = n, this.m[3] = a, this.m[4] = r, this.m[5] = o, this
		}, invert: function () {
			var t = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]), e = this.m[3] * t, i = -this.m[1] * t, n = -this.m[2] * t, a = this.m[0] * t, r = t * (this.m[2] * this.m[5] - this.m[3] * this.m[4]), o = t * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
			return this.m[0] = e, this.m[1] = i, this.m[2] = n, this.m[3] = a, this.m[4] = r, this.m[5] = o, this
		}, getMatrix: function () {
			return this.m
		}, setAbsolutePosition: function (t, e) {
			var i = this.m[0], n = this.m[1], a = this.m[2], r = this.m[3], o = this.m[4], s = (i * (e - this.m[5]) - n * (t - o)) / (i * r - n * a), h = (t - o - a * s) / i;
			return this.translate(h, s)
		}
	};
	var e = Math.PI / 180, i = 180 / Math.PI, n = "Konva error: ", a = {
		aliceblue: [240, 248, 255],
		antiquewhite: [250, 235, 215],
		aqua: [0, 255, 255],
		aquamarine: [127, 255, 212],
		azure: [240, 255, 255],
		beige: [245, 245, 220],
		bisque: [255, 228, 196],
		black: [0, 0, 0],
		blanchedalmond: [255, 235, 205],
		blue: [0, 0, 255],
		blueviolet: [138, 43, 226],
		brown: [165, 42, 42],
		burlywood: [222, 184, 135],
		cadetblue: [95, 158, 160],
		chartreuse: [127, 255, 0],
		chocolate: [210, 105, 30],
		coral: [255, 127, 80],
		cornflowerblue: [100, 149, 237],
		cornsilk: [255, 248, 220],
		crimson: [220, 20, 60],
		cyan: [0, 255, 255],
		darkblue: [0, 0, 139],
		darkcyan: [0, 139, 139],
		darkgoldenrod: [184, 132, 11],
		darkgray: [169, 169, 169],
		darkgreen: [0, 100, 0],
		darkgrey: [169, 169, 169],
		darkkhaki: [189, 183, 107],
		darkmagenta: [139, 0, 139],
		darkolivegreen: [85, 107, 47],
		darkorange: [255, 140, 0],
		darkorchid: [153, 50, 204],
		darkred: [139, 0, 0],
		darksalmon: [233, 150, 122],
		darkseagreen: [143, 188, 143],
		darkslateblue: [72, 61, 139],
		darkslategray: [47, 79, 79],
		darkslategrey: [47, 79, 79],
		darkturquoise: [0, 206, 209],
		darkviolet: [148, 0, 211],
		deeppink: [255, 20, 147],
		deepskyblue: [0, 191, 255],
		dimgray: [105, 105, 105],
		dimgrey: [105, 105, 105],
		dodgerblue: [30, 144, 255],
		firebrick: [178, 34, 34],
		floralwhite: [255, 255, 240],
		forestgreen: [34, 139, 34],
		fuchsia: [255, 0, 255],
		gainsboro: [220, 220, 220],
		ghostwhite: [248, 248, 255],
		gold: [255, 215, 0],
		goldenrod: [218, 165, 32],
		gray: [128, 128, 128],
		green: [0, 128, 0],
		greenyellow: [173, 255, 47],
		grey: [128, 128, 128],
		honeydew: [240, 255, 240],
		hotpink: [255, 105, 180],
		indianred: [205, 92, 92],
		indigo: [75, 0, 130],
		ivory: [255, 255, 240],
		khaki: [240, 230, 140],
		lavender: [230, 230, 250],
		lavenderblush: [255, 240, 245],
		lawngreen: [124, 252, 0],
		lemonchiffon: [255, 250, 205],
		lightblue: [173, 216, 230],
		lightcoral: [240, 128, 128],
		lightcyan: [224, 255, 255],
		lightgoldenrodyellow: [250, 250, 210],
		lightgray: [211, 211, 211],
		lightgreen: [144, 238, 144],
		lightgrey: [211, 211, 211],
		lightpink: [255, 182, 193],
		lightsalmon: [255, 160, 122],
		lightseagreen: [32, 178, 170],
		lightskyblue: [135, 206, 250],
		lightslategray: [119, 136, 153],
		lightslategrey: [119, 136, 153],
		lightsteelblue: [176, 196, 222],
		lightyellow: [255, 255, 224],
		lime: [0, 255, 0],
		limegreen: [50, 205, 50],
		linen: [250, 240, 230],
		magenta: [255, 0, 255],
		maroon: [128, 0, 0],
		mediumaquamarine: [102, 205, 170],
		mediumblue: [0, 0, 205],
		mediumorchid: [186, 85, 211],
		mediumpurple: [147, 112, 219],
		mediumseagreen: [60, 179, 113],
		mediumslateblue: [123, 104, 238],
		mediumspringgreen: [0, 250, 154],
		mediumturquoise: [72, 209, 204],
		mediumvioletred: [199, 21, 133],
		midnightblue: [25, 25, 112],
		mintcream: [245, 255, 250],
		mistyrose: [255, 228, 225],
		moccasin: [255, 228, 181],
		navajowhite: [255, 222, 173],
		navy: [0, 0, 128],
		oldlace: [253, 245, 230],
		olive: [128, 128, 0],
		olivedrab: [107, 142, 35],
		orange: [255, 165, 0],
		orangered: [255, 69, 0],
		orchid: [218, 112, 214],
		palegoldenrod: [238, 232, 170],
		palegreen: [152, 251, 152],
		paleturquoise: [175, 238, 238],
		palevioletred: [219, 112, 147],
		papayawhip: [255, 239, 213],
		peachpuff: [255, 218, 185],
		peru: [205, 133, 63],
		pink: [255, 192, 203],
		plum: [221, 160, 203],
		powderblue: [176, 224, 230],
		purple: [128, 0, 128],
		rebeccapurple: [102, 51, 153],
		red: [255, 0, 0],
		rosybrown: [188, 143, 143],
		royalblue: [65, 105, 225],
		saddlebrown: [139, 69, 19],
		salmon: [250, 128, 114],
		sandybrown: [244, 164, 96],
		seagreen: [46, 139, 87],
		seashell: [255, 245, 238],
		sienna: [160, 82, 45],
		silver: [192, 192, 192],
		skyblue: [135, 206, 235],
		slateblue: [106, 90, 205],
		slategray: [119, 128, 144],
		slategrey: [119, 128, 144],
		snow: [255, 255, 250],
		springgreen: [0, 255, 127],
		steelblue: [70, 130, 180],
		tan: [210, 180, 140],
		teal: [0, 128, 128],
		thistle: [216, 191, 216],
		transparent: [255, 255, 255, 0],
		tomato: [255, 99, 71],
		turquoise: [64, 224, 208],
		violet: [238, 130, 238],
		wheat: [245, 222, 179],
		white: [255, 255, 255],
		whitesmoke: [245, 245, 245],
		yellow: [255, 255, 0],
		yellowgreen: [154, 205, 5]
	}, r = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
	Konva.Util = {
		_isElement: function (t) {
			return !(!t || 1 != t.nodeType)
		}, _isFunction: function (t) {
			return !!(t && t.constructor && t.call && t.apply)
		}, _isObject: function (t) {
			return !!t && t.constructor === Object
		}, _isArray: function (t) {
			return "[object Array]" === Object.prototype.toString.call(t)
		}, _isNumber: function (t) {
			return "[object Number]" === Object.prototype.toString.call(t) && !isNaN(t) && isFinite(t)
		}, _isString: function (t) {
			return "[object String]" === Object.prototype.toString.call(t)
		}, _isBoolean: function (t) {
			return "[object Boolean]" === Object.prototype.toString.call(t)
		}, isObject: function (t) {
			return t instanceof Object
		}, isValidSelector: function (t) {
			if ("string" != typeof t)return !1;
			var e = t[0];
			return "#" === e || "." === e || e === e.toUpperCase()
		}, _sign: function (t) {
			return 0 === t ? 0 : 0 < t ? 1 : -1
		}, createCanvasElement: function () {
			var t = Konva.isBrowser ? Konva.document.createElement("canvas") : new Konva._nodeCanvas;
			try {t.style = t.style || {}} catch (t) {}
			return t
		}, _isInDocument: function (t) {
			for (; t = t.parentNode;)if (t == Konva.document)return !0;
			return !1
		}, _simplifyArray: function (t) {
			var e, i, n = [], a = t.length, r = Konva.Util;
			for (e = 0; e < a; e++)i = t[e], r._isNumber(i) ? i = Math.round(1e3 * i) / 1e3 : r._isString(i) || (i = i.toString()), n.push(i);
			return n
		}, _getImage: function (t, e) {
			var i, n;
			if (t)if (this._isElement(t))e(t); else if (this._isString(t))(i = new Konva.window.Image).onload = function () {
				e(i)
			}, i.src = t; else if (t.data) {(n = Konva.Util.createCanvasElement()).width = t.width, n.height = t.height, n.getContext("2d").putImageData(t, 0, 0), this._getImage(n.toDataURL(), e)} else e(null); else e(null)
		}, _getRGBAString: function (t) {
			return ["rgba(", t.red || 0, ",", t.green || 0, ",", t.blue || 0, ",", t.alpha || 1, ")"].join("")
		}, _rgbToHex: function (t, e, i) {
			return ((1 << 24) + (t << 16) + (e << 8) + i).toString(16).slice(1)
		}, _hexToRgb: function (t) {
			t = t.replace("#", "");
			var e = parseInt(t, 16);
			return {r: e >> 16 & 255, g: e >> 8 & 255, b: 255 & e}
		}, getRandomColor: function () {
			for (var t = (16777215 * Math.random() << 0).toString(16); t.length < 6;)t = "0" + t;
			return "#" + t
		}, get: function (t, e) {
			return void 0 === t ? e : t
		}, getRGB: function (t) {
			var e;
			return t in a ? {
				r: (e = a[t])[0],
				g: e[1],
				b: e[2]
			} : "#" === t[0] ? this._hexToRgb(t.substring(1)) : "rgb(" === t.substr(0, 4) ? (e = r.exec(t.replace(/ /g, "")), {
				r: parseInt(e[1], 10),
				g: parseInt(e[2], 10),
				b: parseInt(e[3], 10)
			}) : {r: 0, g: 0, b: 0}
		}, colorToRGBA: function (t) {
			return t = t || "black", Konva.Util._namedColorToRBA(t) || Konva.Util._hex3ColorToRGBA(t) || Konva.Util._hex6ColorToRGBA(t) || Konva.Util._rgbColorToRGBA(t) || Konva.Util._rgbaColorToRGBA(t)
		}, _namedColorToRBA: function (t) {
			var e = a[t.toLowerCase()];
			return e ? {r: e[0], g: e[1], b: e[2], a: 1} : null
		}, _rgbColorToRGBA: function (t) {
			if (0 === t.indexOf("rgb(")) {
				var e = (t = t.match(/rgb\(([^)]+)\)/)[1]).split(/ *, */).map(Number);
				return {r: e[0], g: e[1], b: e[2], a: 1}
			}
		}, _rgbaColorToRGBA: function (t) {
			if (0 === t.indexOf("rgba(")) {
				var e = (t = t.match(/rgba\(([^)]+)\)/)[1]).split(/ *, */).map(Number);
				return {r: e[0], g: e[1], b: e[2], a: e[3]}
			}
		}, _hex6ColorToRGBA: function (t) {
			if ("#" === t[0] && 7 === t.length)return {
				r: parseInt(t.slice(1, 3), 16),
				g: parseInt(t.slice(3, 5), 16),
				b: parseInt(t.slice(5, 7), 16),
				a: 1
			}
		}, _hex3ColorToRGBA: function (t) {
			if ("#" === t[0] && 4 === t.length)return {
				r: parseInt(t[1] + t[1], 16),
				g: parseInt(t[2] + t[2], 16),
				b: parseInt(t[3] + t[3], 16),
				a: 1
			}
		}, _merge: function (t, e) {
			var i = this._clone(e);
			for (var n in t)this._isObject(t[n]) ? i[n] = this._merge(t[n], i[n]) : i[n] = t[n];
			return i
		}, haveIntersection: function (t, e) {
			return !(e.x > t.x + t.width || e.x + e.width < t.x || e.y > t.y + t.height || e.y + e.height < t.y)
		}, cloneObject: function (t) {
			var e = {};
			for (var i in t)this._isObject(t[i]) ? e[i] = this.cloneObject(t[i]) : this._isArray(t[i]) ? e[i] = this.cloneArray(t[i]) : e[i] = t[i];
			return e
		}, cloneArray: function (t) {
			return t.slice(0)
		}, _degToRad: function (t) {
			return t * e
		}, _radToDeg: function (t) {
			return t * i
		}, _capitalize: function (t) {
			return t.charAt(0).toUpperCase() + t.slice(1)
		}, throw: function (t) {
			throw new Error(n + t)
		}, error: function (t) {
			console.error(n + t)
		}, warn: function (t) {
			Konva.global.console && console.warn && Konva.showWarnings && console.warn("Konva warning: " + t)
		}, extend: function (t, e) {
			function i() {
				this.constructor = t
			}

			i.prototype = e.prototype;
			var n = t.prototype;
			for (var a in t.prototype = new i, n)n.hasOwnProperty(a) && (t.prototype[a] = n[a]);
			t.__super__ = e.prototype, t.super = e
		}, addMethods: function (t, e) {
			var i;
			for (i in e)t.prototype[i] = e[i]
		}, _getControlPoints: function (t, e, i, n, a, r, o) {
			var s = Math.sqrt(Math.pow(i - t, 2) + Math.pow(n - e, 2)), h = Math.sqrt(Math.pow(a - i, 2) + Math.pow(r - n, 2)), l = o * s / (s + h), c = o * h / (s + h);
			return [i - l * (a - t), n - l * (r - e), i + c * (a - t), n + c * (r - e)]
		}, _expandPoints: function (t, e) {
			var i, n, a = t.length, r = [];
			for (i = 2; i < a - 2; i += 2)n = Konva.Util._getControlPoints(t[i - 2], t[i - 1], t[i], t[i + 1], t[i + 2], t[i + 3], e), r.push(n[0]), r.push(n[1]), r.push(t[i]), r.push(t[i + 1]), r.push(n[2]), r.push(n[3]);
			return r
		}, _removeLastLetter: function (t) {
			return t.substring(0, t.length - 1)
		}, each: function (t, e) {
			for (var i in t)e(i, t[i])
		}, _inRange: function (t, e, i) {
			return e <= t && t < i
		}, _getProjectionToSegment: function (t, e, i, n, a, r) {
			var o, s, h, l = (t - i) * (t - i) + (e - n) * (e - n);
			if (0 == l)o = t, s = e, h = (a - i) * (a - i) + (r - n) * (r - n); else {
				var c = ((a - t) * (i - t) + (r - e) * (n - e)) / l;
				h = c < 0 ? ((o = t) - a) * (t - a) + ((s = e) - r) * (e - r) : 1 < c ? ((o = i) - a) * (i - a) + ((s = n) - r) * (n - r) : ((o = t + c * (i - t)) - a) * (o - a) + ((s = e + c * (n - e)) - r) * (s - r)
			}
			return [o, s, h]
		}, _getProjectionToLine: function (s, h, l) {
			var c = Konva.Util.cloneObject(s), d = Number.MAX_VALUE;
			return h.forEach(function (t, e) {
				if (l || e !== h.length - 1) {
					var i = h[(e + 1) % h.length], n = Konva.Util._getProjectionToSegment(t.x, t.y, i.x, i.y, s.x, s.y), a = n[0], r = n[1], o = n[2];
					o < d && (c.x = a, c.y = r, d = o)
				}
			}), c
		}, _prepareArrayForTween: function (t, e, i) {
			var n, a = [], r = [];
			if (t.length > e.length) {
				var o = e;
				e = t, t = o
			}
			for (n = 0; n < t.length; n += 2)a.push({x: t[n], y: t[n + 1]});
			for (n = 0; n < e.length; n += 2)r.push({x: e[n], y: e[n + 1]});
			var s = [];
			return r.forEach(function (t) {
				var e = Konva.Util._getProjectionToLine(t, a, i);
				s.push(e.x), s.push(e.y)
			}), s
		}, _prepareToStringify: function (t) {
			var e;
			for (var i in t.visitedByCircularReferenceRemoval = !0, t)if (t.hasOwnProperty(i) && t[i] && "object" == typeof t[i])if (e = Object.getOwnPropertyDescriptor(t, i), t[i].visitedByCircularReferenceRemoval || Konva.Util._isElement(t[i])) {
				if (!e.configurable)return null;
				delete t[i]
			} else if (null === Konva.Util._prepareToStringify(t[i])) {
				if (!e.configurable)return null;
				delete t[i]
			}
			return delete t.visitedByCircularReferenceRemoval, t
		}
	}
}(), function () {
	"use strict";
	var i;
	Konva.Canvas = function (t) {
		this.init(t)
	}, Konva.Canvas.prototype = {
		init: function (t) {
			var e = (t || {}).pixelRatio || Konva.pixelRatio || function () {
					if (i)return i;
					var t = Konva.Util.createCanvasElement().getContext("2d");
					return i = (Konva.window.devicePixelRatio || 1) / (t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1)
				}();
			this.pixelRatio = e, this._canvas = Konva.Util.createCanvasElement(), this._canvas.style.padding = 0, this._canvas.style.margin = 0, this._canvas.style.border = 0, this._canvas.style.background = "transparent", this._canvas.style.position = "absolute", this._canvas.style.top = 0, this._canvas.style.left = 0
		}, getContext: function () {
			return this.context
		}, getPixelRatio: function () {
			return this.pixelRatio
		}, setPixelRatio: function (t) {
			var e = this.pixelRatio;
			this.pixelRatio = t, this.setSize(this.getWidth() / e, this.getHeight() / e)
		}, setWidth: function (t) {
			this.width = this._canvas.width = t * this.pixelRatio, this._canvas.style.width = t + "px";
			var e = this.pixelRatio;
			this.getContext()._context.scale(e, e)
		}, setHeight: function (t) {
			this.height = this._canvas.height = t * this.pixelRatio, this._canvas.style.height = t + "px";
			var e = this.pixelRatio;
			this.getContext()._context.scale(e, e)
		}, getWidth: function () {
			return this.width
		}, getHeight: function () {
			return this.height
		}, setSize: function (t, e) {
			this.setWidth(t), this.setHeight(e)
		}, toDataURL: function (t, e) {
			try {return this._canvas.toDataURL(t, e)} catch (t) {try {return this._canvas.toDataURL()} catch (t) {return Konva.Util.warn("Unable to get data URL. " + t.message), ""}}
		}
	}, Konva.SceneCanvas = function (t) {
		var e = t || {}, i = e.width || 0, n = e.height || 0;
		Konva.Canvas.call(this, e), this.context = new Konva.SceneContext(this), this.setSize(i, n)
	}, Konva.Util.extend(Konva.SceneCanvas, Konva.Canvas), Konva.HitCanvas = function (t) {
		var e = t || {}, i = e.width || 0, n = e.height || 0;
		Konva.Canvas.call(this, e), this.context = new Konva.HitContext(this), this.setSize(i, n), this.hitCanvas = !0
	}, Konva.Util.extend(Konva.HitCanvas, Konva.Canvas)
}(), function () {
	"use strict";
	var s = ["arc", "arcTo", "beginPath", "bezierCurveTo", "clearRect", "clip", "closePath", "createLinearGradient", "createPattern", "createRadialGradient", "drawImage", "fill", "fillText", "getImageData", "createImageData", "lineTo", "moveTo", "putImageData", "quadraticCurveTo", "rect", "restore", "rotate", "save", "scale", "setLineDash", "setTransform", "stroke", "strokeText", "transform", "translate"];
	Konva.Context = function (t) {
		this.init(t)
	}, Konva.Context.prototype = {
		init: function (t) {
			this.canvas = t, this._context = t._canvas.getContext("2d"), Konva.enableTrace && (this.traceArr = [], this._enableTrace())
		}, fillShape: function (t) {
			t.getFillEnabled() && this._fill(t)
		}, strokeShape: function (t) {
			t.getStrokeEnabled() && this._stroke(t)
		}, fillStrokeShape: function (t) {
			t.getFillEnabled() && this._fill(t), t.getStrokeEnabled() && this._stroke(t)
		}, getTrace: function (t) {
			var e, i, n, a, r = this.traceArr, o = r.length, s = "";
			for (e = 0; e < o; e++)(n = (i = r[e]).method) ? (a = i.args, s += n, t ? s += "()" : Konva.Util._isArray(a[0]) ? s += "([" + a.join(",") + "])" : s += "(" + a.join(",") + ")") : (s += i.property, t || (s += "=" + i.val)), s += ";";
			return s
		}, clearTrace: function () {
			this.traceArr = []
		}, _trace: function (t) {
			var e = this.traceArr;
			e.push(t), e.length >= Konva.traceArrMax && e.shift()
		}, reset: function () {
			var t = this.getCanvas().getPixelRatio();
			this.setTransform(1 * t, 0, 0, 1 * t, 0, 0)
		}, getCanvas: function () {
			return this.canvas
		}, clear: function (t) {
			var e = this.getCanvas();
			t ? this.clearRect(t.x || 0, t.y || 0, t.width || 0, t.height || 0) : this.clearRect(0, 0, e.getWidth() / e.pixelRatio, e.getHeight() / e.pixelRatio)
		}, _applyLineCap: function (t) {
			var e = t.getLineCap();
			e && this.setAttr("lineCap", e)
		}, _applyOpacity: function (t) {
			var e = t.getAbsoluteOpacity();
			1 !== e && this.setAttr("globalAlpha", e)
		}, _applyLineJoin: function (t) {
			var e = t.getLineJoin();
			e && this.setAttr("lineJoin", e)
		}, setAttr: function (t, e) {
			this._context[t] = e
		}, arc: function () {
			var t = arguments;
			this._context.arc(t[0], t[1], t[2], t[3], t[4], t[5])
		}, beginPath: function () {
			this._context.beginPath()
		}, bezierCurveTo: function () {
			var t = arguments;
			this._context.bezierCurveTo(t[0], t[1], t[2], t[3], t[4], t[5])
		}, clearRect: function () {
			var t = arguments;
			this._context.clearRect(t[0], t[1], t[2], t[3])
		}, clip: function () {
			this._context.clip()
		}, closePath: function () {
			this._context.closePath()
		}, createImageData: function () {
			var t = arguments;
			return 2 === t.length ? this._context.createImageData(t[0], t[1]) : 1 === t.length ? this._context.createImageData(t[0]) : void 0
		}, createLinearGradient: function () {
			var t = arguments;
			return this._context.createLinearGradient(t[0], t[1], t[2], t[3])
		}, createPattern: function () {
			var t = arguments;
			return this._context.createPattern(t[0], t[1])
		}, createRadialGradient: function () {
			var t = arguments;
			return this._context.createRadialGradient(t[0], t[1], t[2], t[3], t[4], t[5])
		}, drawImage: function () {
			var t = arguments, e = this._context;
			3 === t.length ? e.drawImage(t[0], t[1], t[2]) : 5 === t.length ? e.drawImage(t[0], t[1], t[2], t[3], t[4]) : 9 === t.length && e.drawImage(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8])
		}, isPointInPath: function (t, e) {
			return this._context.isPointInPath(t, e)
		}, fill: function () {
			this._context.fill()
		}, fillRect: function (t, e, i, n) {
			this._context.fillRect(t, e, i, n)
		}, strokeRect: function (t, e, i, n) {
			this._context.strokeRect(t, e, i, n)
		}, fillText: function () {
			var t = arguments;
			this._context.fillText(t[0], t[1], t[2])
		}, measureText: function (t) {
			return this._context.measureText(t)
		}, getImageData: function () {
			var t = arguments;
			return this._context.getImageData(t[0], t[1], t[2], t[3])
		}, lineTo: function () {
			var t = arguments;
			this._context.lineTo(t[0], t[1])
		}, moveTo: function () {
			var t = arguments;
			this._context.moveTo(t[0], t[1])
		}, rect: function () {
			var t = arguments;
			this._context.rect(t[0], t[1], t[2], t[3])
		}, putImageData: function () {
			var t = arguments;
			this._context.putImageData(t[0], t[1], t[2])
		}, quadraticCurveTo: function () {
			var t = arguments;
			this._context.quadraticCurveTo(t[0], t[1], t[2], t[3])
		}, restore: function () {
			this._context.restore()
		}, rotate: function () {
			var t = arguments;
			this._context.rotate(t[0])
		}, save: function () {
			this._context.save()
		}, scale: function () {
			var t = arguments;
			this._context.scale(t[0], t[1])
		}, setLineDash: function () {
			var t = arguments, e = this._context;
			this._context.setLineDash ? e.setLineDash(t[0]) : "mozDash" in e ? e.mozDash = t[0] : "webkitLineDash" in e && (e.webkitLineDash = t[0])
		}, getLineDash: function () {
			return this._context.getLineDash()
		}, setTransform: function () {
			var t = arguments;
			this._context.setTransform(t[0], t[1], t[2], t[3], t[4], t[5])
		}, stroke: function () {
			this._context.stroke()
		}, strokeText: function () {
			var t = arguments;
			this._context.strokeText(t[0], t[1], t[2])
		}, transform: function () {
			var t = arguments;
			this._context.transform(t[0], t[1], t[2], t[3], t[4], t[5])
		}, translate: function () {
			var t = arguments;
			this._context.translate(t[0], t[1])
		}, _enableTrace: function () {
			var t, n, a = this, e = s.length, r = Konva.Util._simplifyArray, i = this.setAttr, o = function (t) {
				var e, i = a[t];
				a[t] = function () {
					return n = r(Array.prototype.slice.call(arguments, 0)), e = i.apply(a, arguments), a._trace({
						method: t,
						args: n
					}), e
				}
			};
			for (t = 0; t < e; t++)o(s[t]);
			a.setAttr = function () {
				i.apply(a, arguments);
				var t = arguments[0], e = arguments[1];
				"shadowOffsetX" !== t && "shadowOffsetY" !== t && "shadowBlur" !== t || (e /= this.canvas.getPixelRatio()), a._trace({
					property: t,
					val: e
				})
			}
		}
	}, ["fillStyle", "strokeStyle", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "lineCap", "lineDashOffset", "lineJoin", "lineWidth", "miterLimit", "font", "textAlign", "textBaseline", "globalAlpha", "globalCompositeOperation"].forEach(function (e) {
		Object.defineProperty(Konva.Context.prototype, e, {
			get: function () {
				return this._context[e]
			}, set: function (t) {
				this._context[e] = t
			}
		})
	}), Konva.SceneContext = function (t) {
		Konva.Context.call(this, t)
	}, Konva.SceneContext.prototype = {
		_fillColor: function (t) {
			var e = t.fill();
			this.setAttr("fillStyle", e), t._fillFunc(this)
		}, _fillPattern: function (t) {
			var e = t.getFillPatternX(), i = t.getFillPatternY(), n = t.getFillPatternScale(), a = Konva.getAngle(t.getFillPatternRotation()), r = t.getFillPatternOffset();
			(e || i) && this.translate(e || 0, i || 0), a && this.rotate(a), n && this.scale(n.x, n.y), r && this.translate(-1 * r.x, -1 * r.y), this.setAttr("fillStyle", this.createPattern(t.getFillPatternImage(), t.getFillPatternRepeat() || "repeat")), this.fill()
		}, _fillLinearGradient: function (t) {
			var e = t.getFillLinearGradientStartPoint(), i = t.getFillLinearGradientEndPoint(), n = t.getFillLinearGradientColorStops(), a = this.createLinearGradient(e.x, e.y, i.x, i.y);
			if (n) {
				for (var r = 0; r < n.length; r += 2)a.addColorStop(n[r], n[r + 1]);
				this.setAttr("fillStyle", a), t._fillFunc(this)
			}
		}, _fillRadialGradient: function (t) {
			for (var e = t.getFillRadialGradientStartPoint(), i = t.getFillRadialGradientEndPoint(), n = t.getFillRadialGradientStartRadius(), a = t.getFillRadialGradientEndRadius(), r = t.getFillRadialGradientColorStops(), o = this.createRadialGradient(e.x, e.y, n, i.x, i.y, a), s = 0; s < r.length; s += 2)o.addColorStop(r[s], r[s + 1]);
			this.setAttr("fillStyle", o), this.fill()
		}, _fill: function (t) {
			var e = t.fill(), i = t.getFillPriority();
			if (e && "color" === i)this._fillColor(t); else {
				var n = t.getFillPatternImage();
				if (n && "pattern" === i)this._fillPattern(t); else {
					var a = t.getFillLinearGradientColorStops();
					if (a && "linear-gradient" === i)this._fillLinearGradient(t); else {
						var r = t.getFillRadialGradientColorStops();
						r && "radial-gradient" === i ? this._fillRadialGradient(t) : e ? this._fillColor(t) : n ? this._fillPattern(t) : a ? this._fillLinearGradient(t) : r && this._fillRadialGradient(t)
					}
				}
			}
		}, _strokeLinearGradient: function (t) {
			var e = t.getStrokeLinearGradientStartPoint(), i = t.getStrokeLinearGradientEndPoint(), n = t.getStrokeLinearGradientColorStops(), a = this.createLinearGradient(e.x, e.y, i.x, i.y);
			if (n) {
				for (var r = 0; r < n.length; r += 2)a.addColorStop(n[r], n[r + 1]);
				this.setAttr("strokeStyle", a)
			}
		}, _stroke: function (t) {
			var e = t.dash(), i = t.getStrokeScaleEnabled() || t instanceof Konva.Text;
			t.hasStroke() && (i || (this.save(), this.setTransform(1, 0, 0, 1, 0, 0)), this._applyLineCap(t), e && t.dashEnabled() && (this.setLineDash(e), this.setAttr("lineDashOffset", t.dashOffset())), this.setAttr("lineWidth", t.strokeWidth()), t.getShadowForStrokeEnabled() || this.setAttr("shadowColor", "rgba(0,0,0,0)"), t.getStrokeLinearGradientColorStops() ? this._strokeLinearGradient(t) : this.setAttr("strokeStyle", t.stroke()), t._strokeFunc(this), i || this.restore())
		}, _applyShadow: function (t) {
			var e = Konva.Util, i = e.get(t.getShadowRGBA(), "black"), n = e.get(t.getShadowBlur(), 5), a = e.get(t.getShadowOffset(), {
				x: 0,
				y: 0
			}), r = t.getAbsoluteScale(), o = this.canvas.getPixelRatio(), s = r.x * o, h = r.y * o;
			this.setAttr("shadowColor", i), this.setAttr("shadowBlur", n * Math.min(Math.abs(s), Math.abs(h))), this.setAttr("shadowOffsetX", a.x * s), this.setAttr("shadowOffsetY", a.y * h)
		}, _applyGlobalCompositeOperation: function (t) {
			var e = t.getGlobalCompositeOperation();
			"source-over" !== e && this.setAttr("globalCompositeOperation", e)
		}
	}, Konva.Util.extend(Konva.SceneContext, Konva.Context), Konva.HitContext = function (t) {
		Konva.Context.call(this, t)
	}, Konva.HitContext.prototype = {
		_fill: function (t) {
			this.save(), this.setAttr("fillStyle", t.colorKey), t._fillFuncHit(this), this.restore()
		}, _stroke: function (t) {
			if (t.hasStroke() && t.strokeHitEnabled()) {
				var e = t.getStrokeScaleEnabled() || t instanceof Konva.Text;
				e || (this.save(), this.setTransform(1, 0, 0, 1, 0, 0)), this._applyLineCap(t), this.setAttr("lineWidth", t.strokeWidth()), this.setAttr("strokeStyle", t.colorKey), t._strokeFuncHit(this), e || this.restore()
			}
		}
	}, Konva.Util.extend(Konva.HitContext, Konva.Context)
}(), function () {
	"use strict";
	var d = "get", u = "set";
	Konva.Factory = {
		addGetterSetter: function (t, e, i, n, a) {
			this.addGetter(t, e, i), this.addSetter(t, e, n, a), this.addOverloadedGetterSetter(t, e)
		}, addGetter: function (t, e, i) {
			var n = d + Konva.Util._capitalize(e);
			t.prototype[n] = function () {
				var t = this.attrs[e];
				return void 0 === t ? i : t
			}
		}, addSetter: function (t, e, i, n) {
			var a = u + Konva.Util._capitalize(e);
			t.prototype[a] = function (t) {
				return i && null != t && (t = i.call(this, t, e)), this._setAttr(e, t), n && n.call(this), this
			}
		}, addComponentsGetterSetter: function (t, n, e, a, r) {
			var i, o, s = e.length, h = Konva.Util._capitalize, l = d + h(n), c = u + h(n);
			t.prototype[l] = function () {
				var t = {};
				for (i = 0; i < s; i++)t[o = e[i]] = this.getAttr(n + h(o));
				return t
			}, t.prototype[c] = function (t) {
				var e, i = this.attrs[n];
				for (e in a && (t = a.call(this, t)), t)t.hasOwnProperty(e) && this._setAttr(n + h(e), t[e]);
				return this._fireChangeEvent(n, i, t), r && r.call(this), this
			}, this.addOverloadedGetterSetter(t, n)
		}, addOverloadedGetterSetter: function (t, e) {
			var i = Konva.Util._capitalize(e), n = u + i, a = d + i;
			t.prototype[e] = function () {
				return arguments.length ? (this[n](arguments[0]), this) : this[a]()
			}
		}, addDeprecatedGetterSetter: function (t, e, i, n) {
			Konva.Util.error("Adding deprecated " + e);
			var a = d + Konva.Util._capitalize(e), r = e + " property is deprecated and will be removed soon. Look at Konva change log for more information.";
			t.prototype[a] = function () {
				Konva.Util.error(r);
				var t = this.attrs[e];
				return void 0 === t ? i : t
			}, this.addSetter(t, e, n, function () {
				Konva.Util.error(r)
			}), this.addOverloadedGetterSetter(t, e)
		}, backCompat: function (o, t) {
			Konva.Util.each(t, function (t, e) {
				var i = o.prototype[e], n = d + Konva.Util._capitalize(t), a = u + Konva.Util._capitalize(t);

				function r() {
					i.apply(this, arguments), Konva.Util.error('"' + t + '" method is deprecated and will be removed soon. Use ""' + e + '" instead.')
				}

				o.prototype[t] = r, o.prototype[n] = r, o.prototype[a] = r
			})
		}, afterSetFilter: function () {
			this._filterUpToDate = !1
		}
	}, Konva.Validators = {
		RGBComponent: function (t) {
			return 255 < t ? 255 : t < 0 ? 0 : Math.round(t)
		}, alphaComponent: function (t) {
			return 1 < t ? 1 : t < 1e-4 ? 1e-4 : t
		}, _formatValue: function (t) {
			return Konva.Util._isString(t) ? '"' + t + '"' : "[object Number]" === Object.prototype.toString.call(t) ? t : Konva.Util._isBoolean(t) ? t : Object.prototype.toString.call(t)
		}, getNumberValidator: function () {
			if (Konva.isUnminified)return function (t, e) {
				return Konva.Util._isNumber(t) || Konva.Util.warn(Konva.Validators._formatValue(t) + ' is a not valid value for "' + e + '" attribute. The value should be a number.'), t
			}
		}, getNumberOrAutoValidator: function () {
			if (Konva.isUnminified)return function (t, e) {
				return Konva.Util._isNumber(t) || "auto" === t || Konva.Util.warn(Konva.Validators._formatValue(t) + ' is a not valid value for "' + e + '" attribute. The value should be a number or "auto".'), t
			}
		}, getStringValidator: function () {
			if (Konva.isUnminified)return function (t, e) {
				return Konva.Util._isString(t) || Konva.Util.warn(Konva.Validators._formatValue(t) + ' is a not valid value for "' + e + '" attribute. The value should be a string.'), t
			}
		}, getFunctionValidator: function () {
			if (Konva.isUnminified)return function (t, e) {
				return Konva.Util._isFunction(t) || Konva.Util.warn(Konva.Validators._formatValue(t) + ' is a not valid value for "' + e + '" attribute. The value should be a function.'), t
			}
		}, getNumberArrayValidator: function () {
			if (Konva.isUnminified)return function (t, e) {
				return Konva.Util._isArray(t) ? t.forEach(function (t) {
					Konva.Util._isNumber(t) || Konva.Util.warn('"' + e + '" attribute has non numeric element ' + t + ". Make sure that all elements are numbers.")
				}) : Konva.Util.warn(Konva.Validators._formatValue(t) + ' is a not valid value for "' + e + '" attribute. The value should be a array of numbers.'), t
			}
		}, getBooleanValidator: function () {
			if (Konva.isUnminified)return function (t, e) {
				return !0 === t || !1 === t || Konva.Util.warn(Konva.Validators._formatValue(t) + ' is a not valid value for "' + e + '" attribute. The value should be a boolean.'), t
			}
		}
	}
}(), function (v) {
	"use strict";
	var p = "absoluteOpacity", i = "absoluteTransform", m = "absoluteScale", e = "listening", r = "mouseenter", o = "mouseleave", l = "Shape", n = "transform", a = "visible", c = ["id"], s = ["xChange.konva", "yChange.konva", "scaleXChange.konva", "scaleYChange.konva", "skewXChange.konva", "skewYChange.konva", "rotationChange.konva", "offsetXChange.konva", "offsetYChange.konva", "transformsEnabledChange.konva"].join(" "), h = ["scaleXChange.konva", "scaleYChange.konva"].join(" ");
	v.Node = function (t) {
		this._init(t)
	}, v.Util.addMethods(v.Node, {
		_init: function (t) {
			this._id = v.idCounter++, this.eventListeners = {}, this.attrs = {}, this._cache = {}, this._filterUpToDate = !1, this._isUnderCache = !1, this.setAttrs(t), this.on(s, function () {
				this._clearCache(n), this._clearSelfAndDescendantCache(i)
			}), this.on(h, function () {
				this._clearSelfAndDescendantCache(m)
			}), this.on("visibleChange.konva", function () {
				this._clearSelfAndDescendantCache(a)
			}), this.on("listeningChange.konva", function () {
				this._clearSelfAndDescendantCache(e)
			}), this.on("opacityChange.konva", function () {
				this._clearSelfAndDescendantCache(p)
			})
		}, _clearCache: function (t) {
			t ? delete this._cache[t] : this._cache = {}
		}, _getCache: function (t, e) {
			return void 0 === this._cache[t] && (this._cache[t] = e.call(this)), this._cache[t]
		}, _clearSelfAndDescendantCache: function (e) {
			this._clearCache(e), this.children && this.getChildren().each(function (t) {
				t._clearSelfAndDescendantCache(e)
			})
		}, clearCache: function () {
			return delete this._cache.canvas, this._filterUpToDate = !1, this
		}, cache: function (t) {
			var e = t || {}, i = this.getClientRect({
				skipTransform: !0,
				relativeTo: this.getParent()
			}), n = e.width || i.width, a = e.height || i.height, r = e.pixelRatio, o = e.x || i.x, s = e.y || i.y, h = e.offset || 0, l = e.drawBorder || !1;
			if (n && a) {
				n += 2 * h, a += 2 * h, o -= h, s -= h;
				var c = new v.SceneCanvas({pixelRatio: r, width: n, height: a}), d = new v.SceneCanvas({
					pixelRatio: r,
					width: n,
					height: a
				}), u = new v.HitCanvas({pixelRatio: 1, width: n, height: a}), g = c.getContext(), f = u.getContext();
				return u.isCache = !0, this.clearCache(), g.save(), f.save(), g.translate(-o, -s), f.translate(-o, -s), this._isUnderCache = !0, this._clearSelfAndDescendantCache(p), this._clearSelfAndDescendantCache(m), this.drawScene(c, this, !0), this.drawHit(u, this, !0), this._isUnderCache = !1, g.restore(), f.restore(), l && (g.save(), g.beginPath(), g.rect(0, 0, n, a), g.closePath(), g.setAttr("strokeStyle", "red"), g.setAttr("lineWidth", 5), g.stroke(), g.restore()), this._cache.canvas = {
					scene: c,
					filter: d,
					hit: u,
					x: o,
					y: s
				}, this
			}
			v.Util.error("Can not cache the node. Width or height of the node equals 0. Caching is skipped.")
		}, getClientRect: function () {
			throw new Error('abstract "getClientRect" method call')
		}, _transformedRect: function (t, e) {
			var i, n, a, r, o = [{x: t.x, y: t.y}, {x: t.x + t.width, y: t.y}, {
				x: t.x + t.width,
				y: t.y + t.height
			}, {x: t.x, y: t.y + t.height}], s = this.getAbsoluteTransform(e);
			return o.forEach(function (t) {
				var e = s.point(t);
				void 0 === i && (i = a = e.x, n = r = e.y), i = Math.min(i, e.x), n = Math.min(n, e.y), a = Math.max(a, e.x), r = Math.max(r, e.y)
			}), {x: i, y: n, width: a - i, height: r - n}
		}, _drawCachedSceneCanvas: function (t) {
			t.save(), t._applyOpacity(this), t._applyGlobalCompositeOperation(this), t.translate(this._cache.canvas.x, this._cache.canvas.y);
			var e = this._getCachedSceneCanvas(), i = e.pixelRatio;
			t.drawImage(e._canvas, 0, 0, e.width / i, e.height / i), t.restore()
		}, _drawCachedHitCanvas: function (t) {
			var e = this._cache.canvas.hit;
			t.save(), t.translate(this._cache.canvas.x, this._cache.canvas.y), t.drawImage(e._canvas, 0, 0), t.restore()
		}, _getCachedSceneCanvas: function () {
			var t, e, i, n, a = this.filters(), r = this._cache.canvas, o = r.scene, s = r.filter, h = s.getContext();
			if (a) {
				if (!this._filterUpToDate) {
					var l = o.pixelRatio;
					try {for (t = a.length, h.clear(), h.drawImage(o._canvas, 0, 0, o.getWidth() / l, o.getHeight() / l), e = h.getImageData(0, 0, s.getWidth(), s.getHeight()), i = 0; i < t; i++)"function" == typeof(n = a[i]) ? (n.call(this, e), h.putImageData(e, 0, 0)) : v.Util.error("Filter should be type of function, but got " + typeof n + " insted. Please check correct filters")} catch (t) {v.Util.error("Unable to apply filter. " + t.message)}
					this._filterUpToDate = !0
				}
				return s
			}
			return o
		}, on: function (t, e) {
			if (3 === arguments.length)return this._delegate.apply(this, arguments);
			var i, n, a, r, o = t.split(" "), s = o.length;
			for (i = 0; i < s; i++)a = (n = o[i].split("."))[0], r = n[1] || "", this.eventListeners[a] || (this.eventListeners[a] = []), this.eventListeners[a].push({
				name: r,
				handler: e
			});
			return this
		}, off: function (t, e) {
			var i, n, a, r, o, s = (t || "").split(" "), h = s.length;
			if (!t)for (n in this.eventListeners)this._off(n);
			for (i = 0; i < h; i++)if (r = (a = s[i].split("."))[0], o = a[1], r)this.eventListeners[r] && this._off(r, o, e); else for (n in this.eventListeners)this._off(n, o, e);
			return this
		}, dispatchEvent: function (t) {
			var e = {target: this, type: t.type, evt: t};
			return this.fire(t.type, e), this
		}, addEventListener: function (t, e) {
			return this.on(t, function (t) {
				e.call(this, t.evt)
			}), this
		}, removeEventListener: function (t) {
			return this.off(t), this
		}, _delegate: function (t, n, a) {
			var r = this;
			this.on(t, function (t) {
				for (var e = t.target.findAncestors(n, !0, r), i = 0; i < e.length; i++)(t = v.Util.cloneObject(t)).currentTarget = e[i], a.call(e[i], t)
			})
		}, remove: function () {
			var t = this.getParent();
			return t && t.children && (t.children.splice(this.index, 1), t._setChildrenIndices(), delete this.parent), this._clearSelfAndDescendantCache("stage"), this._clearSelfAndDescendantCache(i), this._clearSelfAndDescendantCache(a), this._clearSelfAndDescendantCache(e), this._clearSelfAndDescendantCache(p), this
		}, destroy: function () {
			v._removeId(this.getId());
			for (var t = (this.getName() || "").split(/\s/g), e = 0; e < t.length; e++) {
				var i = t[e];
				v._removeName(i, this._id)
			}
			return this.remove(), this
		}, getAttr: function (t) {
			var e = "get" + v.Util._capitalize(t);
			return v.Util._isFunction(this[e]) ? this[e]() : this.attrs[t]
		}, getAncestors: function () {
			for (var t = this.getParent(), e = new v.Collection; t;)e.push(t), t = t.getParent();
			return e
		}, getAttrs: function () {
			return this.attrs || {}
		}, setAttrs: function (t) {
			var e, i;
			if (!t)return this;
			for (e in t)"children" !== e && (i = "set" + v.Util._capitalize(e), v.Util._isFunction(this[i]) ? this[i](t[e]) : this._setAttr(e, t[e]));
			return this
		}, isListening: function () {
			return this._getCache(e, this._isListening)
		}, _isListening: function () {
			var t = this.getListening(), e = this.getParent();
			return "inherit" === t ? !e || e.isListening() : t
		}, isVisible: function () {
			return this._getCache(a, this._isVisible)
		}, _isVisible: function (t) {
			var e = this.getVisible(), i = this.getParent();
			return t === i && "inherit" === e || (t === i ? e : "inherit" === e ? !i || i._isVisible(t) : e)
		}, shouldDrawHit: function () {
			var t = this.getLayer();
			return !t && this.isListening() && this.isVisible() || t && t.hitGraphEnabled() && this.isListening() && this.isVisible()
		}, show: function () {
			return this.setVisible(!0), this
		}, hide: function () {
			return this.setVisible(!1), this
		}, getZIndex: function () {
			return this.index || 0
		}, getAbsoluteZIndex: function () {
			var i, n, a, r, o = this.getDepth(), s = this, h = 0;
			return "Stage" !== s.nodeType && function t(e) {
				for (i = [], n = e.length, a = 0; a < n; a++)r = e[a], h++, r.nodeType !== l && (i = i.concat(r.getChildren().toArray())), r._id === s._id && (a = n);
				0 < i.length && i[0].getDepth() <= o && t(i)
			}(s.getStage().getChildren()), h
		}, getDepth: function () {
			for (var t = 0, e = this.parent; e;)t++, e = e.parent;
			return t
		}, setPosition: function (t) {
			return this.setX(t.x), this.setY(t.y), this
		}, getPosition: function () {
			return {x: this.getX(), y: this.getY()}
		}, getAbsolutePosition: function (t) {
			var e = this.getAbsoluteTransform(t).getMatrix(), i = new v.Transform, n = this.offset();
			return i.m = e.slice(), i.translate(n.x, n.y), i.getTranslation()
		}, setAbsolutePosition: function (t) {
			var e, i = this._clearTransform();
			return this.attrs.x = i.x, this.attrs.y = i.y, delete i.x, delete i.y, (e = this.getAbsoluteTransform()).invert(), e.translate(t.x, t.y), t = {
				x: this.attrs.x + e.getTranslation().x,
				y: this.attrs.y + e.getTranslation().y
			}, this.setPosition({x: t.x, y: t.y}), this._setTransform(i), this
		}, _setTransform: function (t) {
			var e;
			for (e in t)this.attrs[e] = t[e];
			this._clearCache(n), this._clearSelfAndDescendantCache(i)
		}, _clearTransform: function () {
			var t = {
				x: this.getX(),
				y: this.getY(),
				rotation: this.getRotation(),
				scaleX: this.getScaleX(),
				scaleY: this.getScaleY(),
				offsetX: this.getOffsetX(),
				offsetY: this.getOffsetY(),
				skewX: this.getSkewX(),
				skewY: this.getSkewY()
			};
			return this.attrs.x = 0, this.attrs.y = 0, this.attrs.rotation = 0, this.attrs.scaleX = 1, this.attrs.scaleY = 1, this.attrs.offsetX = 0, this.attrs.offsetY = 0, this.attrs.skewX = 0, this.attrs.skewY = 0, this._clearCache(n), this._clearSelfAndDescendantCache(i), t
		}, move: function (t) {
			var e = t.x, i = t.y, n = this.getX(), a = this.getY();
			return void 0 !== e && (n += e), void 0 !== i && (a += i), this.setPosition({x: n, y: a}), this
		}, _eachAncestorReverse: function (t, e) {
			var i, n, a = [], r = this.getParent();
			if (e && e._id === this._id)t(this); else {
				for (a.unshift(this); r && (!e || r._id !== e._id);)a.unshift(r), r = r.parent;
				for (i = a.length, n = 0; n < i; n++)t(a[n])
			}
		}, rotate: function (t) {
			return this.setRotation(this.getRotation() + t), this
		}, moveToTop: function () {
			if (!this.parent)return v.Util.warn("Node has no parent. moveToTop function is ignored."), !1;
			var t = this.index;
			return this.parent.children.splice(t, 1), this.parent.children.push(this), this.parent._setChildrenIndices(), !0
		}, moveUp: function () {
			if (!this.parent)return v.Util.warn("Node has no parent. moveUp function is ignored."), !1;
			var t = this.index;
			return t < this.parent.getChildren().length - 1 && (this.parent.children.splice(t, 1), this.parent.children.splice(t + 1, 0, this), this.parent._setChildrenIndices(), !0)
		}, moveDown: function () {
			if (!this.parent)return v.Util.warn("Node has no parent. moveDown function is ignored."), !1;
			var t = this.index;
			return 0 < t && (this.parent.children.splice(t, 1), this.parent.children.splice(t - 1, 0, this), this.parent._setChildrenIndices(), !0)
		}, moveToBottom: function () {
			if (!this.parent)return v.Util.warn("Node has no parent. moveToBottom function is ignored."), !1;
			var t = this.index;
			return 0 < t && (this.parent.children.splice(t, 1), this.parent.children.unshift(this), this.parent._setChildrenIndices(), !0)
		}, setZIndex: function (t) {
			if (!this.parent)return v.Util.warn("Node has no parent. zIndex parameter is ignored."), !1;
			var e = this.index;
			return this.parent.children.splice(e, 1), this.parent.children.splice(t, 0, this), this.parent._setChildrenIndices(), this
		}, getAbsoluteOpacity: function () {
			return this._getCache(p, this._getAbsoluteOpacity)
		}, _getAbsoluteOpacity: function () {
			var t = this.getOpacity(), e = this.getParent();
			return e && !e._isUnderCache && (t *= this.getParent().getAbsoluteOpacity()), t
		}, moveTo: function (t) {
			return this.getParent() !== t && ((this.__originalRemove || this.remove).call(this), t.add(this)), this
		}, toObject: function () {
			var t, e, i, n = {}, a = this.getAttrs();
			for (t in n.attrs = {}, a)e = a[t], i = "function" == typeof this[t] && this[t], delete a[t], (i ? i.call(this) : null) !== (a[t] = e) && (n.attrs[t] = e);
			return n.className = this.getClassName(), v.Util._prepareToStringify(n)
		}, toJSON: function () {
			return JSON.stringify(this.toObject())
		}, getParent: function () {
			return this.parent
		}, findAncestors: function (t, e, i) {
			var n = [];
			e && this._isMatch(t) && n.push(this);
			for (var a = this.parent; a;) {
				if (a === i)return n;
				a._isMatch(t) && n.push(a), a = a.parent
			}
			return n
		}, findAncestor: function (t, e, i) {
			return this.findAncestors(t, e, i)[0]
		}, _isMatch: function (t) {
			if (!t)return !1;
			var e, i, n = t.replace(/ /g, "").split(","), a = n.length;
			for (e = 0; e < a; e++)if (i = n[e], v.Util.isValidSelector(i) || (v.Util.warn('Selector "' + i + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'), v.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'), v.Util.warn("Konva is awesome, right?")), "#" === i.charAt(0)) {if (this.id() === i.slice(1))return !0} else if ("." === i.charAt(0)) {if (this.hasName(i.slice(1)))return !0} else if (0 !== this._get(i).length)return !0;
			return !1
		}, getLayer: function () {
			var t = this.getParent();
			return t ? t.getLayer() : null
		}, getStage: function () {
			return this._getCache("stage", this._getStage)
		}, _getStage: function () {
			var t = this.getParent();
			return t ? t.getStage() : void 0
		}, fire: function (t, e, i) {
			return (e = e || {}).target = e.target || this, i ? this._fireAndBubble(t, e) : this._fire(t, e), this
		}, getAbsoluteTransform: function (t) {
			return t ? this._getAbsoluteTransform(t) : this._getCache(i, this._getAbsoluteTransform)
		}, _getAbsoluteTransform: function (t) {
			var i = new v.Transform;
			return this._eachAncestorReverse(function (t) {
				var e = t.transformsEnabled();
				"all" === e ? i.multiply(t.getTransform()) : "position" === e && i.translate(t.getX() - t.getOffsetX(), t.getY() - t.getOffsetY())
			}, t), i
		}, getAbsoluteScale: function (t) {
			return t ? this._getAbsoluteScale(t) : this._getCache(m, this._getAbsoluteScale)
		}, _getAbsoluteScale: function (t) {
			for (var e = this; e;)e._isUnderCache && (t = e), e = e.getParent();
			var i = 1, n = 1;
			return this._eachAncestorReverse(function (t) {
				i *= t.scaleX(), n *= t.scaleY()
			}, t), {x: i, y: n}
		}, getTransform: function () {
			return this._getCache(n, this._getTransform)
		}, _getTransform: function () {
			var t = new v.Transform, e = this.getX(), i = this.getY(), n = v.getAngle(this.getRotation()), a = this.getScaleX(), r = this.getScaleY(), o = this.getSkewX(), s = this.getSkewY(), h = this.getOffsetX(), l = this.getOffsetY();
			return 0 === e && 0 === i || t.translate(e, i), 0 !== n && t.rotate(n), 0 === o && 0 === s || t.skew(o, s), 1 === a && 1 === r || t.scale(a, r), 0 === h && 0 === l || t.translate(-1 * h, -1 * l), t
		}, clone: function (t) {
			var e, i, n, a, r, o = v.Util.cloneObject(this.attrs);
			for (var s in c) {delete o[c[s]]}
			for (e in t)o[e] = t[e];
			var h = new this.constructor(o);
			for (e in this.eventListeners)for (n = (i = this.eventListeners[e]).length, a = 0; a < n; a++)(r = i[a]).name.indexOf("konva") < 0 && (h.eventListeners[e] || (h.eventListeners[e] = []), h.eventListeners[e].push(r));
			return h
		}, _toKonvaCanvas: function (t) {
			t = t || {};
			var e = this.getClientRect(), i = this.getStage(), n = void 0 !== t.x ? t.x : e.x, a = void 0 !== t.y ? t.y : e.y, r = t.pixelRatio || 1, o = new v.SceneCanvas({
				width: t.width || e.width || (i ? i.getWidth() : 0),
				height: t.height || e.height || (i ? i.getHeight() : 0),
				pixelRatio: r
			}), s = o.getContext();
			return s.save(), (n || a) && s.translate(-1 * n, -1 * a), this.drawScene(o), s.restore(), o
		}, toCanvas: function (t) {
			return this._toKonvaCanvas(t)._canvas
		}, toDataURL: function (t) {
			var e = (t = t || {}).mimeType || null, i = t.quality || null, n = this._toKonvaCanvas(t).toDataURL(e, i);
			return t.callback && t.callback(n), n
		}, toImage: function (t) {
			if (!t || !t.callback)throw"callback required for toImage method config argument";
			var e = t.callback;
			delete t.callback, v.Util._getImage(this.toDataURL(t), function (t) {
				e(t)
			})
		}, setSize: function (t) {
			return this.setWidth(t.width), this.setHeight(t.height), this
		}, getSize: function () {
			return {width: this.getWidth(), height: this.getHeight()}
		}, getWidth: function () {
			return this.attrs.width || 0
		}, getHeight: function () {
			return this.attrs.height || 0
		}, getClassName: function () {
			return this.className || this.nodeType
		}, getType: function () {
			return this.nodeType
		}, getDragDistance: function () {
			return void 0 !== this.attrs.dragDistance ? this.attrs.dragDistance : this.parent ? this.parent.getDragDistance() : v.dragDistance
		}, _get: function (t) {
			return this.className === t || this.nodeType === t ? [this] : []
		}, _off: function (t, e, i) {
			var n, a, r, o = this.eventListeners[t];
			for (n = 0; n < o.length; n++)if (a = o[n].name, r = o[n].handler, !("konva" === a && "konva" !== e || e && a !== e || i && i !== r)) {
				if (o.splice(n, 1), 0 === o.length) {
					delete this.eventListeners[t];
					break
				}
				n--
			}
		}, _fireChangeEvent: function (t, e, i) {
			this._fire(t + "Change", {oldVal: e, newVal: i})
		}, setId: function (t) {
			var e = this.getId();
			return v._removeId(e), v._addId(this, t), this._setAttr("id", t), this
		}, setName: function (t) {
			var e, i, n = (this.getName() || "").split(/\s/g), a = (t || "").split(/\s/g);
			for (i = 0; i < n.length; i++)e = n[i], -1 === a.indexOf(e) && e && v._removeName(e, this._id);
			for (i = 0; i < a.length; i++)e = a[i], -1 === n.indexOf(e) && e && v._addName(this, e);
			return this._setAttr("name", t), this
		}, addName: function (t) {
			if (!this.hasName(t)) {
				var e = this.name(), i = e ? e + " " + t : t;
				this.setName(i)
			}
			return this
		}, hasName: function (t) {
			return -1 !== (this.name() || "").split(/\s/g).indexOf(t)
		}, removeName: function (t) {
			var e = (this.name() || "").split(/\s/g), i = e.indexOf(t);
			return -1 !== i && (e.splice(i, 1), this.setName(e.join(" "))), this
		}, setAttr: function (t, e) {
			var i = this["set" + v.Util._capitalize(t)];
			return v.Util._isFunction(i) ? i.call(this, e) : this._setAttr(t, e), this
		}, _setAttr: function (t, e) {
			var i;
			(i = this.attrs[t]) === e && !v.Util.isObject(e) || (null == e ? delete this.attrs[t] : this.attrs[t] = e, this._fireChangeEvent(t, i, e))
		}, _setComponentAttr: function (t, e, i) {
			var n;
			void 0 !== i && ((n = this.attrs[t]) || (this.attrs[t] = this.getAttr(t)), this.attrs[t][e] = i, this._fireChangeEvent(t, n, i))
		}, _fireAndBubble: function (t, e, i) {
			var n = !0;
			if (e && this.nodeType === l && (e.target = this), t === r && i && (this._id === i._id || this.isAncestorOf && this.isAncestorOf(i)) ? n = !1 : t === o && i && (this._id === i._id || this.isAncestorOf && this.isAncestorOf(i)) && (n = !1), n) {
				this._fire(t, e);
				var a = (t === r || t === o) && i && i.isAncestorOf && i.isAncestorOf(this) && !i.isAncestorOf(this.parent);
				(e && !e.cancelBubble || !e) && this.parent && this.parent.isListening() && !a && (i && i.parent ? this._fireAndBubble.call(this.parent, t, e, i.parent) : this._fireAndBubble.call(this.parent, t, e))
			}
		}, _fire: function (t, e) {
			var i, n = this.eventListeners[t];
			if ((e = e || {}).currentTarget = this, e.type = t, n)for (i = 0; i < n.length; i++)n[i].handler.call(this, e)
		}, draw: function () {
			return this.drawScene(), this.drawHit(), this
		}
	}), v.Node.create = function (t, e) {
		return v.Util._isString(t) && (t = JSON.parse(t)), this._createNode(t, e)
	}, v.Node._createNode = function (t, e) {
		var i, n, a, r = v.Node.prototype.getClassName.call(t), o = t.children;
		if (e && (t.attrs.container = e), i = new v[r](t.attrs), o)for (n = o.length, a = 0; a < n; a++)i.add(this._createNode(o[a]));
		return i
	}, v.Factory.addOverloadedGetterSetter(v.Node, "position"), v.Factory.addGetterSetter(v.Node, "x", 0, v.Validators.getNumberValidator()), v.Factory.addGetterSetter(v.Node, "y", 0, v.Validators.getNumberValidator()), v.Factory.addGetterSetter(v.Node, "globalCompositeOperation", "source-over", v.Validators.getStringValidator()), v.Factory.addGetterSetter(v.Node, "opacity", 1, v.Validators.getNumberValidator()), v.Factory.addGetter(v.Node, "name"), v.Factory.addOverloadedGetterSetter(v.Node, "name"), v.Factory.addGetter(v.Node, "id"), v.Factory.addOverloadedGetterSetter(v.Node, "id"), v.Factory.addGetterSetter(v.Node, "rotation", 0, v.Validators.getNumberValidator()), v.Factory.addComponentsGetterSetter(v.Node, "scale", ["x", "y"]), v.Factory.addGetterSetter(v.Node, "scaleX", 1, v.Validators.getNumberValidator()), v.Factory.addGetterSetter(v.Node, "scaleY", 1, v.Validators.getNumberValidator()), v.Factory.addComponentsGetterSetter(v.Node, "skew", ["x", "y"]), v.Factory.addGetterSetter(v.Node, "skewX", 0, v.Validators.getNumberValidator()), v.Factory.addGetterSetter(v.Node, "skewY", 0, v.Validators.getNumberValidator()), v.Factory.addComponentsGetterSetter(v.Node, "offset", ["x", "y"]), v.Factory.addGetterSetter(v.Node, "offsetX", 0, v.Validators.getNumberValidator()), v.Factory.addGetterSetter(v.Node, "offsetY", 0, v.Validators.getNumberValidator()), v.Factory.addSetter(v.Node, "dragDistance", v.Validators.getNumberValidator()), v.Factory.addOverloadedGetterSetter(v.Node, "dragDistance"), v.Factory.addSetter(v.Node, "width", v.Validators.getNumberValidator()), v.Factory.addOverloadedGetterSetter(v.Node, "width"), v.Factory.addSetter(v.Node, "height", v.Validators.getNumberValidator()), v.Factory.addOverloadedGetterSetter(v.Node, "height"), v.Factory.addGetterSetter(v.Node, "listening", "inherit", function (t) {
		return !0 === t || !1 === t || "inherit" === t || v.Util.warn(t + ' is a not valid value for "listening" attribute. The value may be true, false or "inherit".'), t
	}), v.Factory.addGetterSetter(v.Node, "preventDefault", !0, v.Validators.getBooleanValidator()), v.Factory.addGetterSetter(v.Node, "filters", null, function (t) {
		return this._filterUpToDate = !1, t
	}), v.Factory.addGetterSetter(v.Node, "visible", "inherit", function (t) {
		return !0 === t || !1 === t || "inherit" === t || v.Util.warn(t + ' is a not valid value for "visible" attribute. The value may be true, false or "inherit".'), t
	}), v.Factory.addGetterSetter(v.Node, "transformsEnabled", "all", v.Validators.getStringValidator()), v.Factory.addOverloadedGetterSetter(v.Node, "size"), v.Factory.backCompat(v.Node, {
		rotateDeg: "rotate",
		setRotationDeg: "setRotation",
		getRotationDeg: "getRotation"
	}), v.Collection.mapMethods(v.Node)
}(Konva), function () {
	"use strict";
	Konva.Filters.Grayscale = function (t) {
		var e, i, n = t.data, a = n.length;
		for (e = 0; e < a; e += 4)i = .34 * n[e] + .5 * n[e + 1] + .16 * n[e + 2], n[e] = i, n[e + 1] = i, n[e + 2] = i
	}
}(), function (t) {
	"use strict";
	t.Filters.Brighten = function (t) {
		var e, i = 255 * this.brightness(), n = t.data, a = n.length;
		for (e = 0; e < a; e += 4)n[e] += i, n[e + 1] += i, n[e + 2] += i
	}, t.Factory.addGetterSetter(t.Node, "brightness", 0, t.Validators.getNumberValidator(), t.Factory.afterSetFilter)
}(Konva), function () {
	"use strict";
	Konva.Filters.Invert = function (t) {
		var e, i = t.data, n = i.length;
		for (e = 0; e < n; e += 4)i[e] = 255 - i[e], i[e + 1] = 255 - i[e + 1], i[e + 2] = 255 - i[e + 2]
	}
}(), function (t) {
	"use strict";
	function E() {
		this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null
	}

	var B = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259], z = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
	t.Filters.Blur = function (t) {
		var e = Math.round(this.blurRadius());
		0 < e && function (t, e) {
			var i, n, a, r, o, s, h, l, c, d, u, g, f, v, p, m, _, y, K, S, b, x, C, w, F = t.data, T = t.width, P = t.height, A = e + e + 1, M = T - 1, k = P - 1, G = e + 1, N = G * (G + 1) / 2, R = new E, D = null, L = R, O = null, V = null, U = B[e], I = z[e];
			for (a = 1; a < A; a++)L = L.next = new E, a === G && (D = L);
			for (L.next = R, h = s = 0, n = 0; n < P; n++) {
				for (m = _ = y = K = l = c = d = u = 0, g = G * (S = F[s]), f = G * (b = F[s + 1]), v = G * (x = F[s + 2]), p = G * (C = F[s + 3]), l += N * S, c += N * b, d += N * x, u += N * C, L = R, a = 0; a < G; a++)L.r = S, L.g = b, L.b = x, L.a = C, L = L.next;
				for (a = 1; a < G; a++)r = s + ((M < a ? M : a) << 2), l += (L.r = S = F[r]) * (w = G - a), c += (L.g = b = F[r + 1]) * w, d += (L.b = x = F[r + 2]) * w, u += (L.a = C = F[r + 3]) * w, m += S, _ += b, y += x, K += C, L = L.next;
				for (O = R, V = D, i = 0; i < T; i++)F[s + 3] = C = u * U >> I, 0 !== C ? (C = 255 / C, F[s] = (l * U >> I) * C, F[s + 1] = (c * U >> I) * C, F[s + 2] = (d * U >> I) * C) : F[s] = F[s + 1] = F[s + 2] = 0, l -= g, c -= f, d -= v, u -= p, g -= O.r, f -= O.g, v -= O.b, p -= O.a, r = h + ((r = i + e + 1) < M ? r : M) << 2, l += m += O.r = F[r], c += _ += O.g = F[r + 1], d += y += O.b = F[r + 2], u += K += O.a = F[r + 3], O = O.next, g += S = V.r, f += b = V.g, v += x = V.b, p += C = V.a, m -= S, _ -= b, y -= x, K -= C, V = V.next, s += 4;
				h += T
			}
			for (i = 0; i < T; i++) {
				for (_ = y = K = m = c = d = u = l = 0, g = G * (S = F[s = i << 2]), f = G * (b = F[s + 1]), v = G * (x = F[s + 2]), p = G * (C = F[s + 3]), l += N * S, c += N * b, d += N * x, u += N * C, L = R, a = 0; a < G; a++)L.r = S, L.g = b, L.b = x, L.a = C, L = L.next;
				for (o = T, a = 1; a <= e; a++)s = o + i << 2, l += (L.r = S = F[s]) * (w = G - a), c += (L.g = b = F[s + 1]) * w, d += (L.b = x = F[s + 2]) * w, u += (L.a = C = F[s + 3]) * w, m += S, _ += b, y += x, K += C, L = L.next, a < k && (o += T);
				for (s = i, O = R, V = D, n = 0; n < P; n++)F[3 + (r = s << 2)] = C = u * U >> I, 0 < C ? (C = 255 / C, F[r] = (l * U >> I) * C, F[r + 1] = (c * U >> I) * C, F[r + 2] = (d * U >> I) * C) : F[r] = F[r + 1] = F[r + 2] = 0, l -= g, c -= f, d -= v, u -= p, g -= O.r, f -= O.g, v -= O.b, p -= O.a, r = i + ((r = n + G) < k ? r : k) * T << 2, l += m += O.r = F[r], c += _ += O.g = F[r + 1], d += y += O.b = F[r + 2], u += K += O.a = F[r + 3], O = O.next, g += S = V.r, f += b = V.g, v += x = V.b, p += C = V.a, m -= S, _ -= b, y -= x, K -= C, V = V.next, s += T
			}
		}(t, e)
	}, t.Factory.addGetterSetter(t.Node, "blurRadius", 0, t.Validators.getNumberValidator(), t.Factory.afterSetFilter)
}(Konva), function () {
	"use strict";
	function d(t, e, i) {
		var n = 4 * (i * t.width + e), a = [];
		return a.push(t.data[n++], t.data[n++], t.data[n++], t.data[n++]), a
	}

	function u(t, e) {
		return Math.sqrt(Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2) + Math.pow(t[2] - e[2], 2))
	}

	Konva.Filters.Mask = function (t) {
		var e = function (t, e) {
			var i = d(t, 0, 0), n = d(t, t.width - 1, 0), a = d(t, 0, t.height - 1), r = d(t, t.width - 1, t.height - 1), o = e || 10;
			if (u(i, n) < o && u(n, r) < o && u(r, a) < o && u(a, i) < o) {
				for (var s = function (t) {
					for (var e = [0, 0, 0], i = 0; i < t.length; i++)e[0] += t[i][0], e[1] += t[i][1], e[2] += t[i][2];
					return e[0] /= t.length, e[1] /= t.length, e[2] /= t.length, e
				}([n, i, r, a]), h = [], l = 0; l < t.width * t.height; l++) {
					var c = u(s, [t.data[4 * l], t.data[4 * l + 1], t.data[4 * l + 2]]);
					h[l] = c < o ? 0 : 255
				}
				return h
			}
		}(t, this.threshold());
		return e && function (t, e) {
			for (var i = 0; i < t.width * t.height; i++)t.data[4 * i + 3] = e[i]
		}(t, e = function (t, e, i) {
			for (var n = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9], a = Math.round(Math.sqrt(n.length)), r = Math.floor(a / 2), o = [], s = 0; s < i; s++)for (var h = 0; h < e; h++) {
				for (var l = s * e + h, c = 0, d = 0; d < a; d++)for (var u = 0; u < a; u++) {
					var g = s + d - r, f = h + u - r;
					if (0 <= g && g < i && 0 <= f && f < e) {
						var v = n[d * a + u];
						c += t[g * e + f] * v
					}
				}
				o[l] = c
			}
			return o
		}(e = function (t, e, i) {
			for (var n = [1, 1, 1, 1, 1, 1, 1, 1, 1], a = Math.round(Math.sqrt(n.length)), r = Math.floor(a / 2), o = [], s = 0; s < i; s++)for (var h = 0; h < e; h++) {
				for (var l = s * e + h, c = 0, d = 0; d < a; d++)for (var u = 0; u < a; u++) {
					var g = s + d - r, f = h + u - r;
					if (0 <= g && g < i && 0 <= f && f < e) {
						var v = n[d * a + u];
						c += t[g * e + f] * v
					}
				}
				o[l] = 1020 <= c ? 255 : 0
			}
			return o
		}(e = function (t, e, i) {
			for (var n = [1, 1, 1, 1, 0, 1, 1, 1, 1], a = Math.round(Math.sqrt(n.length)), r = Math.floor(a / 2), o = [], s = 0; s < i; s++)for (var h = 0; h < e; h++) {
				for (var l = s * e + h, c = 0, d = 0; d < a; d++)for (var u = 0; u < a; u++) {
					var g = s + d - r, f = h + u - r;
					if (0 <= g && g < i && 0 <= f && f < e) {
						var v = n[d * a + u];
						c += t[g * e + f] * v
					}
				}
				o[l] = 2040 === c ? 255 : 0
			}
			return o
		}(e, t.width, t.height), t.width, t.height), t.width, t.height)), t
	}, Konva.Factory.addGetterSetter(Konva.Node, "threshold", 0, Konva.Validators.getNumberValidator(), Konva.Factory.afterSetFilter)
}(), function () {
	"use strict";
	Konva.Filters.RGB = function (t) {
		var e, i, n = t.data, a = n.length, r = this.red(), o = this.green(), s = this.blue();
		for (e = 0; e < a; e += 4)i = (.34 * n[e] + .5 * n[e + 1] + .16 * n[e + 2]) / 255, n[e] = i * r, n[e + 1] = i * o, n[e + 2] = i * s, n[e + 3] = n[e + 3]
	}, Konva.Factory.addGetterSetter(Konva.Node, "red", 0, function (t) {
		return this._filterUpToDate = !1, 255 < t ? 255 : t < 0 ? 0 : Math.round(t)
	}), Konva.Factory.addGetterSetter(Konva.Node, "green", 0, function (t) {
		return this._filterUpToDate = !1, 255 < t ? 255 : t < 0 ? 0 : Math.round(t)
	}), Konva.Factory.addGetterSetter(Konva.Node, "blue", 0, Konva.Validators.RGBComponent, Konva.Factory.afterSetFilter)
}(), function () {
	"use strict";
	Konva.Filters.RGBA = function (t) {
		var e, i, n = t.data, a = n.length, r = this.red(), o = this.green(), s = this.blue(), h = this.alpha();
		for (e = 0; e < a; e += 4)i = 1 - h, n[e] = r * h + n[e] * i, n[e + 1] = o * h + n[e + 1] * i, n[e + 2] = s * h + n[e + 2] * i
	}, Konva.Factory.addGetterSetter(Konva.Node, "red", 0, function (t) {
		return this._filterUpToDate = !1, 255 < t ? 255 : t < 0 ? 0 : Math.round(t)
	}), Konva.Factory.addGetterSetter(Konva.Node, "green", 0, function (t) {
		return this._filterUpToDate = !1, 255 < t ? 255 : t < 0 ? 0 : Math.round(t)
	}), Konva.Factory.addGetterSetter(Konva.Node, "blue", 0, Konva.Validators.RGBComponent, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "alpha", 1, function (t) {
		return this._filterUpToDate = !1, 1 < t ? 1 : t < 0 ? 0 : t
	})
}(), function () {
	"use strict";
	Konva.Filters.HSV = function (t) {
		var e, i, n, a, r, o = t.data, s = o.length, h = Math.pow(2, this.value()), l = Math.pow(2, this.saturation()), c = Math.abs(this.hue() + 360) % 360, d = h * l * Math.cos(c * Math.PI / 180), u = h * l * Math.sin(c * Math.PI / 180), g = .299 * h + .701 * d + .167 * u, f = .587 * h - .587 * d + .33 * u, v = .114 * h - .114 * d - .497 * u, p = .299 * h - .299 * d - .328 * u, m = .587 * h + .413 * d + .035 * u, _ = .114 * h - .114 * d + .293 * u, y = .299 * h - .3 * d + 1.25 * u, K = .587 * h - .586 * d - 1.05 * u, S = .114 * h + .886 * d - .2 * u;
		for (e = 0; e < s; e += 4)i = o[e + 0], n = o[e + 1], a = o[e + 2], r = o[e + 3], o[e + 0] = g * i + f * n + v * a, o[e + 1] = p * i + m * n + _ * a, o[e + 2] = y * i + K * n + S * a, o[e + 3] = r
	}, Konva.Factory.addGetterSetter(Konva.Node, "hue", 0, Konva.Validators.getNumberValidator(), Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "saturation", 0, Konva.Validators.getNumberValidator(), Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "value", 0, Konva.Validators.getNumberValidator(), Konva.Factory.afterSetFilter)
}(), function () {
	"use strict";
	Konva.Factory.addGetterSetter(Konva.Node, "hue", 0, Konva.Validators.getNumberValidator(), Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "saturation", 0, Konva.Validators.getNumberValidator(), Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "luminance", 0, Konva.Validators.getNumberValidator(), Konva.Factory.afterSetFilter), Konva.Filters.HSL = function (t) {
		var e, i, n, a, r, o = t.data, s = o.length, h = Math.pow(2, this.saturation()), l = Math.abs(this.hue() + 360) % 360, c = 127 * this.luminance(), d = 1 * h * Math.cos(l * Math.PI / 180), u = 1 * h * Math.sin(l * Math.PI / 180), g = .299 + .701 * d + .167 * u, f = .587 - .587 * d + .33 * u, v = .114 - .114 * d - .497 * u, p = .299 - .299 * d - .328 * u, m = .587 + .413 * d + .035 * u, _ = .114 - .114 * d + .293 * u, y = .299 - .3 * d + 1.25 * u, K = .587 - .586 * d - 1.05 * u, S = .114 + .886 * d - .2 * u;
		for (e = 0; e < s; e += 4)i = o[e + 0], n = o[e + 1], a = o[e + 2], r = o[e + 3], o[e + 0] = g * i + f * n + v * a + c, o[e + 1] = p * i + m * n + _ * a + c, o[e + 2] = y * i + K * n + S * a + c, o[e + 3] = r
	}
}(), function () {
	"use strict";
	Konva.Filters.Emboss = function (t) {
		var e = 10 * this.embossStrength(), i = 255 * this.embossWhiteLevel(), n = this.embossDirection(), a = this.embossBlend(), r = 0, o = 0, s = t.data, h = t.width, l = t.height, c = 4 * h, d = l;
		switch (n) {
			case"top-left":
				o = r = -1;
				break;
			case"top":
				r = -1, o = 0;
				break;
			case"top-right":
				r = -1, o = 1;
				break;
			case"right":
				r = 0, o = 1;
				break;
			case"bottom-right":
				o = r = 1;
				break;
			case"bottom":
				r = 1, o = 0;
				break;
			case"bottom-left":
				o = -(r = 1);
				break;
			case"left":
				r = 0, o = -1;
				break;
			default:
				Konva.Util.error("Unknown emboss direction: " + n)
		}
		do {
			var u = (d - 1) * c, g = r;
			d + g < 1 && (g = 0), l < d + g && (g = 0);
			var f = (d - 1 + g) * h * 4, v = h;
			do {
				var p = u + 4 * (v - 1), m = o;
				v + m < 1 && (m = 0), h < v + m && (m = 0);
				var _ = f + 4 * (v - 1 + m), y = s[p] - s[_], K = s[p + 1] - s[_ + 1], S = s[p + 2] - s[_ + 2], b = y, x = 0 < b ? b : -b;
				if (x < (0 < K ? K : -K) && (b = K), x < (0 < S ? S : -S) && (b = S), b *= e, a) {
					var C = s[p] + b, w = s[p + 1] + b, F = s[p + 2] + b;
					s[p] = 255 < C ? 255 : C < 0 ? 0 : C, s[p + 1] = 255 < w ? 255 : w < 0 ? 0 : w, s[p + 2] = 255 < F ? 255 : F < 0 ? 0 : F
				} else {
					var T = i - b;
					T < 0 ? T = 0 : 255 < T && (T = 255), s[p] = s[p + 1] = s[p + 2] = T
				}
			} while (--v)
		} while (--d)
	}, Konva.Factory.addGetterSetter(Konva.Node, "embossStrength", .5, Konva.Validators.getNumberValidator(), Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "embossWhiteLevel", .5, Konva.Validators.getNumberValidator(), Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "embossDirection", "top-left", null, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "embossBlend", !1, null, Konva.Factory.afterSetFilter)
}(), function () {
	"use strict";
	function x(t, e, i, n, a) {
		var r = i - e, o = a - n;
		return 0 === r ? n + o / 2 : 0 === o ? n : o * ((t - e) / r) + n
	}

	Konva.Filters.Enhance = function (t) {
		var e, i, n, a, r = t.data, o = r.length, s = r[0], h = s, l = r[1], c = l, d = r[2], u = d, g = this.enhance();
		if (0 !== g) {
			for (a = 0; a < o; a += 4)(e = r[a + 0]) < s ? s = e : h < e && (h = e), (i = r[a + 1]) < l ? l = i : c < i && (c = i), (n = r[a + 2]) < d ? d = n : u < n && (u = n);
			var f, v, p, m, _, y, K, S, b;
			for (h === s && (h = 255, s = 0), c === l && (c = 255, l = 0), u === d && (u = 255, d = 0), 0 < g ? (v = h + g * (255 - h), p = s - g * (s - 0), _ = c + g * (255 - c), y = l - g * (l - 0), S = u + g * (255 - u), b = d - g * (d - 0)) : (v = h + g * (h - (f = .5 * (h + s))), p = s + g * (s - f), _ = c + g * (c - (m = .5 * (c + l))), y = l + g * (l - m), S = u + g * (u - (K = .5 * (u + d))), b = d + g * (d - K)), a = 0; a < o; a += 4)r[a + 0] = x(r[a + 0], s, h, p, v), r[a + 1] = x(r[a + 1], l, c, y, _), r[a + 2] = x(r[a + 2], d, u, b, S)
		}
	}, Konva.Factory.addGetterSetter(Konva.Node, "enhance", 0, Konva.Validators.getNumberValidator(), Konva.Factory.afterSetFilter)
}(), function () {
	"use strict";
	Konva.Filters.Posterize = function (t) {
		var e, i = Math.round(254 * this.levels()) + 1, n = t.data, a = n.length, r = 255 / i;
		for (e = 0; e < a; e += 1)n[e] = Math.floor(n[e] / r) * r
	}, Konva.Factory.addGetterSetter(Konva.Node, "levels", .5, Konva.Validators.getNumberValidator(), Konva.Factory.afterSetFilter)
}(), function () {
	"use strict";
	Konva.Filters.Noise = function (t) {
		var e, i = 255 * this.noise(), n = t.data, a = n.length, r = i / 2;
		for (e = 0; e < a; e += 4)n[e + 0] += r - 2 * r * Math.random(), n[e + 1] += r - 2 * r * Math.random(), n[e + 2] += r - 2 * r * Math.random()
	}, Konva.Factory.addGetterSetter(Konva.Node, "noise", .2, Konva.Validators.getNumberValidator(), Konva.Factory.afterSetFilter)
}(), function () {
	"use strict";
	Konva.Filters.Pixelate = function (t) {
		var e, i, n, a, r, o, s, h, l, c, d, u, g, f, v = Math.ceil(this.pixelSize()), p = t.width, m = t.height, _ = Math.ceil(p / v), y = Math.ceil(m / v);
		if (t = t.data, v <= 0)Konva.Util.error("pixelSize value can not be <= 0"); else for (u = 0; u < _; u += 1)for (g = 0; g < y; g += 1) {
			for (l = (h = u * v) + v, d = (c = g * v) + v, f = s = o = r = a = 0, e = h; e < l; e += 1)if (!(p <= e))for (i = c; i < d; i += 1)m <= i || (a += t[(n = 4 * (p * i + e)) + 0], r += t[n + 1], o += t[n + 2], s += t[n + 3], f += 1);
			for (a /= f, r /= f, o /= f, s /= f, e = h; e < l; e += 1)if (!(p <= e))for (i = c; i < d; i += 1)m <= i || (t[(n = 4 * (p * i + e)) + 0] = a, t[n + 1] = r, t[n + 2] = o, t[n + 3] = s)
		}
	}, Konva.Factory.addGetterSetter(Konva.Node, "pixelSize", 8, Konva.Validators.getNumberValidator(), Konva.Factory.afterSetFilter)
}(), function () {
	"use strict";
	Konva.Filters.Threshold = function (t) {
		var e, i = 255 * this.threshold(), n = t.data, a = n.length;
		for (e = 0; e < a; e += 1)n[e] = n[e] < i ? 0 : 255
	}, Konva.Factory.addGetterSetter(Konva.Node, "threshold", .5, Konva.Validators.getNumberValidator(), Konva.Factory.afterSetFilter)
}(), function () {
	"use strict";
	/**
	 * Sepia Filter
	 * Based on: Pixastic Lib - Sepia filter - v0.1.0
	 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
	 * @function
	 * @name Sepia
	 * @memberof Konva.Filters
	 * @param {Object} imageData
	 * @author Jacob Seidelin <jseidelin@nihilogic.dk>
	 * @license MPL v1.1 [http://www.pixastic.com/lib/license.txt]
	 * @example
	 * node.cache();
	 * node.filters([Konva.Filters.Sepia]);
	 */Konva.Filters.Sepia = function (t) {
		var e, i, n, a, r, o, s, h, l, c = t.data, d = t.width, u = t.height, g = 4 * d;
		do {for (e = (u - 1) * g, i = d; s = .393 * (a = c[n = e + 4 * (i - 1)]) + .769 * (r = c[n + 1]) + .189 * (o = c[n + 2]), h = .349 * a + .686 * r + .168 * o, l = .272 * a + .534 * r + .131 * o, c[n] = 255 < s ? 255 : s, c[n + 1] = 255 < h ? 255 : h, c[n + 2] = 255 < l ? 255 : l, c[n + 3] = c[n + 3], --i;);} while (--u)
	}
}(), function () {
	"use strict";
	Konva.Filters.Solarize = function (t) {
		var e = t.data, i = t.width, n = 4 * i, a = t.height;
		do {
			var r = (a - 1) * n, o = i;
			do {
				var s = r + 4 * (o - 1), h = e[s], l = e[s + 1], c = e[s + 2];
				127 < h && (h = 255 - h), 127 < l && (l = 255 - l), 127 < c && (c = 255 - c), e[s] = h, e[s + 1] = l, e[s + 2] = c
			} while (--o)
		} while (--a)
	}
}(), function () {
	"use strict";
	Konva.Filters.Kaleidoscope = function (t) {
		var e, i, n, a, r, o, s, h, l, c = t.width, d = t.height, u = Math.round(this.kaleidoscopePower()), g = Math.round(this.kaleidoscopeAngle()), f = Math.floor(c * (g % 360) / 360);
		if (!(u < 1)) {
			var v = Konva.Util.createCanvasElement();
			v.width = c, v.height = d;
			var p = v.getContext("2d").getImageData(0, 0, c, d);
			!function (t, e, i) {
				var n, a, r, o, s = t.data, h = e.data, l = t.width, c = t.height, d = i.polarCenterX || l / 2, u = i.polarCenterY || c / 2, g = 0, f = 0, v = 0, p = 0, m = Math.sqrt(d * d + u * u);
				a = l - d, r = c - u, m = m < (o = Math.sqrt(a * a + r * r)) ? o : m;
				var _, y, K, S, b = c, x = l, C = 360 / x * Math.PI / 180;
				for (y = 0; y < x; y += 1)for (K = Math.sin(y * C), S = Math.cos(y * C), _ = 0; _ < b; _ += 1)a = Math.floor(d + m * _ / b * S), g = s[0 + (n = 4 * ((r = Math.floor(u + m * _ / b * K)) * l + a))], f = s[n + 1], v = s[n + 2], p = s[n + 3], h[0 + (n = 4 * (y + _ * l))] = g, h[n + 1] = f, h[n + 2] = v, h[n + 3] = p
			}(t, p, {polarCenterX: c / 2, polarCenterY: d / 2});
			for (var m = c / Math.pow(2, u); m <= 8;)m *= 2, u -= 1;
			var _ = m = Math.ceil(m), y = 0, K = _, S = 1;
			for (c < f + m && (y = _, K = 0, S = -1), i = 0; i < d; i += 1)for (e = y; e !== K; e += S)h = 4 * (c * i + Math.round(e + f) % c), a = p.data[h + 0], r = p.data[h + 1], o = p.data[h + 2], s = p.data[h + 3], l = 4 * (c * i + e), p.data[l + 0] = a, p.data[l + 1] = r, p.data[l + 2] = o, p.data[l + 3] = s;
			for (i = 0; i < d; i += 1)for (_ = Math.floor(m), n = 0; n < u; n += 1) {
				for (e = 0; e < _ + 1; e += 1)h = 4 * (c * i + e), a = p.data[h + 0], r = p.data[h + 1], o = p.data[h + 2], s = p.data[h + 3], l = 4 * (c * i + 2 * _ - e - 1), p.data[l + 0] = a, p.data[l + 1] = r, p.data[l + 2] = o, p.data[l + 3] = s;
				_ *= 2
			}
			!function (t, e, i) {
				var n, a, r, o, s, h, l = t.data, c = e.data, d = t.width, u = t.height, g = i.polarCenterX || d / 2, f = i.polarCenterY || u / 2, v = 0, p = 0, m = 0, _ = 0, y = Math.sqrt(g * g + f * f);
				a = d - g, r = u - f, y = y < (h = Math.sqrt(a * a + r * r)) ? h : y;
				var K, S, b, x = u, C = d, w = i.polarRotation || 0;
				for (a = 0; a < d; a += 1)for (r = 0; r < u; r += 1)o = a - g, s = r - f, K = Math.sqrt(o * o + s * s) * x / y, S = (S = (180 * Math.atan2(s, o) / Math.PI + 360 + w) % 360) * C / 360, b = Math.floor(S), v = l[0 + (n = 4 * (Math.floor(K) * d + b))], p = l[n + 1], m = l[n + 2], _ = l[n + 3], c[0 + (n = 4 * (r * d + a))] = v, c[n + 1] = p, c[n + 2] = m, c[n + 3] = _
			}(p, t, {polarRotation: 0})
		}
	}, Konva.Factory.addGetterSetter(Konva.Node, "kaleidoscopePower", 2, Konva.Validators.getNumberValidator(), Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "kaleidoscopeAngle", 0, Konva.Validators.getNumberValidator(), Konva.Factory.afterSetFilter)
}(), function (t) {
	"use strict";
	t.Filters.Contrast = function (t) {
		var e, i = Math.pow((parseInt(this.contrast()) + 100) / 100, 2), n = t.data, a = n.length, r = 150, o = 150, s = 150;
		for (e = 0; e < a; e += 4)r = n[e], o = n[e + 1], s = n[e + 2], r /= 255, r -= .5, r *= i, r += .5, o /= 255, o -= .5, o *= i, o += .5, s /= 255, s -= .5, s *= i, s += .5, r = (r *= 255) < 0 ? 0 : 255 < r ? 255 : r, o = (o *= 255) < 0 ? 0 : 255 < o ? 255 : o, s = (s *= 255) < 0 ? 0 : 255 < s ? 255 : s, n[e] = r, n[e + 1] = o, n[e + 2] = s
	}, t.Factory.addGetterSetter(t.Node, "contrast", 0, t.Validators.getNumberValidator(), t.Factory.afterSetFilter)
}(Konva), function () {
	"use strict";
	Konva.Container = function (t) {
		this.__init(t)
	}, Konva.Util.addMethods(Konva.Container, {
		__init: function (t) {
			this.children = new Konva.Collection, Konva.Node.call(this, t)
		}, getChildren: function (e) {
			if (!e)return this.children;
			var i = new Konva.Collection;
			return this.children.each(function (t) {
				e(t) && i.push(t)
			}), i
		}, hasChildren: function () {
			return 0 < this.getChildren().length
		}, removeChildren: function () {
			for (var t, e = Konva.Collection.toCollection(this.children), i = 0; i < e.length; i++)delete(t = e[i]).parent, t.index = 0, t.remove();
			return e = null, this.children = new Konva.Collection, this
		}, destroyChildren: function () {
			for (var t, e = Konva.Collection.toCollection(this.children), i = 0; i < e.length; i++)delete(t = e[i]).parent, t.index = 0, t.destroy();
			return e = null, this.children = new Konva.Collection, this
		}, add: function (t) {
			if (1 < arguments.length) {
				for (var e = 0; e < arguments.length; e++)this.add(arguments[e]);
				return this
			}
			if (t.getParent())return t.moveTo(this), this;
			var i = this.children;
			return this._validateAdd(t), t.index = i.length, t.parent = this, i.push(t), this._fire("add", {child: t}), Konva.DD && t.isDragging() && Konva.DD.anim.setLayers(t.getLayer()), this
		}, destroy: function () {
			return this.hasChildren() && this.destroyChildren(), Konva.Node.prototype.destroy.call(this), this
		}, find: function (t) {
			return this._generalFind(t, !1)
		}, findOne: function (t) {
			var e = this._generalFind(t, !0);
			return 0 < e.length ? e[0] : void 0
		}, _generalFind: function (t, e) {
			var i = [];
			return "string" == typeof t ? i = this._findByString(t, e) : "function" == typeof t && (i = this._findByFunction(t, e)), Konva.Collection.toCollection(i)
		}, _findByString: function (t) {
			var e, i, n, a, r, o, s, h = [], l = t.replace(/ /g, "").split(","), c = l.length;
			for (e = 0; e < c; e++) {
				if (n = l[e], !Konva.Util.isValidSelector(n)) {
					var d = 'Selector "' + n + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".\nIf you have a custom shape with such className, please change it to start with upper letter like "Triangle".\nKonva is awesome, right?';
					Konva.Util.warn(d)
				}
				if ("#" === n.charAt(0))(r = this._getNodeById(n.slice(1))) && h.push(r); else if ("." === n.charAt(0))a = this._getNodesByName(n.slice(1)), h = h.concat(a); else for (s = (o = this.getChildren()).length, i = 0; i < s; i++)h = h.concat(o[i]._get(n))
			}
			return h
		}, _findByFunction: function (a, r) {
			var o = [], s = function (t) {
				if (!(r && 0 < o.length)) {
					var e = t.getChildren(), i = e.length;
					a(t) && (o = o.concat(t));
					for (var n = 0; n < i; n++)s(e[n])
				}
			};
			return s(this), o
		}, _getNodeById: function (t) {
			var e = Konva.ids[t];
			return void 0 !== e && this.isAncestorOf(e) ? e : null
		}, _getNodesByName: function (t) {
			var e = Konva.names[t] || [];
			return this._getDescendants(e)
		}, _get: function (t) {
			for (var e = Konva.Node.prototype._get.call(this, t), i = this.getChildren(), n = i.length, a = 0; a < n; a++)e = e.concat(i[a]._get(t));
			return e
		}, toObject: function () {
			var t = Konva.Node.prototype.toObject.call(this);
			t.children = [];
			for (var e = this.getChildren(), i = e.length, n = 0; n < i; n++) {
				var a = e[n];
				t.children.push(a.toObject())
			}
			return t
		}, _getDescendants: function (t) {
			for (var e = [], i = t.length, n = 0; n < i; n++) {
				var a = t[n];
				this.isAncestorOf(a) && e.push(a)
			}
			return e
		}, isAncestorOf: function (t) {
			for (var e = t.getParent(); e;) {
				if (e._id === this._id)return !0;
				e = e.getParent()
			}
			return !1
		}, clone: function (t) {
			var e = Konva.Node.prototype.clone.call(this, t);
			return this.getChildren().each(function (t) {
				e.add(t.clone())
			}), e
		}, getAllIntersections: function (e) {
			var i = [];
			return this.find("Shape").each(function (t) {
				t.isVisible() && t.intersects(e) && i.push(t)
			}), i
		}, _setChildrenIndices: function () {
			this.children.each(function (t, e) {
				t.index = e
			})
		}, drawScene: function (t, e, i) {
			var n = this.getLayer(), a = t || n && n.getCanvas(), r = a && a.getContext(), o = this._cache.canvas, s = o && o.scene;
			return (this.isVisible() || i) && (!i && s ? (r.save(), n._applyTransform(this, r, e), this._drawCachedSceneCanvas(r), r.restore()) : this._drawChildren(a, "drawScene", e, !1, i)), this
		}, drawHit: function (t, e, i) {
			var n = this.getLayer(), a = t || n && n.hitCanvas, r = a && a.getContext(), o = this._cache.canvas, s = o && o.hit;
			return (this.shouldDrawHit(a) || i) && (n && n.clearHitCache(), !i && s ? (r.save(), n._applyTransform(this, r, e), this._drawCachedHitCanvas(r), r.restore()) : this._drawChildren(a, "drawHit", e)), this
		}, _drawChildren: function (e, i, n, a, r) {
			var t, o, s = this.getLayer(), h = e && e.getContext(), l = this.getClipWidth(), c = this.getClipHeight(), d = this.getClipFunc(), u = l && c || d;
			if (u && s) {
				h.save();
				var g = this.getAbsoluteTransform(n), f = g.getMatrix();
				h.transform(f[0], f[1], f[2], f[3], f[4], f[5]), h.beginPath(), d ? d.call(this, h, this) : (t = this.getClipX(), o = this.getClipY(), h.rect(t, o, l, c)), h.clip(), f = g.copy().invert().getMatrix(), h.transform(f[0], f[1], f[2], f[3], f[4], f[5])
			}
			this.children.each(function (t) {
				t[i](e, n, a, r)
			}), u && h.restore()
		}, shouldDrawHit: function (t) {
			var e = this.getLayer(), i = Konva.DD && Konva.isDragging() && -1 !== Konva.DD.anim.getLayers().indexOf(e);
			return t && t.isCache || e && e.hitGraphEnabled() && this.isVisible() && !i
		}, getClientRect: function (t) {
			var i, n, a, r, e = (t = t || {}).skipTransform, o = t.relativeTo, s = {
				x: 1 / 0,
				y: 1 / 0,
				width: 0,
				height: 0
			}, h = this;
			this.children.each(function (t) {
				if (t.getVisible()) {
					var e = t.getClientRect({relativeTo: h});
					0 === e.width && 0 === e.height || (void 0 === i ? (i = e.x, n = e.y, a = e.x + e.width, r = e.y + e.height) : (i = Math.min(i, e.x), n = Math.min(n, e.y), a = Math.max(a, e.x + e.width), r = Math.max(r, e.y + e.height)))
				}
			});
			for (var l = this.find("Shape"), c = !1, d = 0; d < l.length; d++) {
				if (l[d]._isVisible(this)) {
					c = !0;
					break
				}
			}
			return s = c ? {x: i, y: n, width: a - i, height: r - n} : {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			}, e ? s : this._transformedRect(s, o)
		}
	}), Konva.Util.extend(Konva.Container, Konva.Node), Konva.Container.prototype.get = Konva.Container.prototype.find, Konva.Factory.addComponentsGetterSetter(Konva.Container, "clip", ["x", "y", "width", "height"]), Konva.Factory.addGetterSetter(Konva.Container, "clipX", void 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Container, "clipY", void 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Container, "clipWidth", void 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Container, "clipHeight", void 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Container, "clipFunc"), Konva.Collection.mapMethods(Konva.Container)
}(), function (g) {
	"use strict";
	var t = "hasShadow", e = "shadowRGBA";

	function n(t) {
		t.fill()
	}

	function a(t) {
		t.stroke()
	}

	function r(t) {
		t.fill()
	}

	function o(t) {
		t.stroke()
	}

	function s() {
		this._clearCache(t)
	}

	function h() {
		this._clearCache(e)
	}

	g.Shape = function (t) {
		this.__init(t)
	}, g.Util.addMethods(g.Shape, {
		__init: function (t) {
			this.nodeType = "Shape", this._fillFunc = n, this._strokeFunc = a, this._fillFuncHit = r, this._strokeFuncHit = o;
			for (var e, i = g.shapes; !(e = g.Util.getRandomColor()) || e in i;);
			i[this.colorKey = e] = this, g.Node.call(this, t), this.on("shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", s), this.on("shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", h)
		}, hasChildren: function () {
			return !1
		}, getChildren: function () {
			return []
		}, getContext: function () {
			return this.getLayer().getContext()
		}, getCanvas: function () {
			return this.getLayer().getCanvas()
		}, hasShadow: function () {
			return this._getCache(t, this._hasShadow)
		}, _hasShadow: function () {
			return this.getShadowEnabled() && 0 !== this.getShadowOpacity() && !!(this.getShadowColor() || this.getShadowBlur() || this.getShadowOffsetX() || this.getShadowOffsetY())
		}, getShadowRGBA: function () {
			return this._getCache(e, this._getShadowRGBA)
		}, _getShadowRGBA: function () {
			if (this.hasShadow()) {
				var t = g.Util.colorToRGBA(this.shadowColor());
				return "rgba(" + t.r + "," + t.g + "," + t.b + "," + t.a * (this.getShadowOpacity() || 1) + ")"
			}
		}, hasFill: function () {
			return !!(this.getFill() || this.getFillPatternImage() || this.getFillLinearGradientColorStops() || this.getFillRadialGradientColorStops())
		}, hasStroke: function () {
			return this.strokeEnabled() && !(!this.stroke() && !this.getStrokeLinearGradientColorStops())
		}, intersects: function (t) {
			var e = this.getStage().bufferHitCanvas;
			return e.getContext().clear(), this.drawHit(e), 0 < e.context.getImageData(Math.round(t.x), Math.round(t.y), 1, 1).data[3]
		}, destroy: function () {
			return g.Node.prototype.destroy.call(this), delete g.shapes[this.colorKey], this
		}, _useBufferCanvas: function (t) {
			return !t && this.perfectDrawEnabled() && 1 !== this.getAbsoluteOpacity() && this.hasFill() && this.hasStroke() && this.getStage() || this.perfectDrawEnabled() && this.hasShadow() && 1 !== this.getAbsoluteOpacity() && this.hasFill() && this.hasStroke() && this.getStage()
		}, getSelfRect: function () {
			var t = this.getSize();
			return {
				x: this._centroid ? Math.round(-t.width / 2) : 0,
				y: this._centroid ? Math.round(-t.height / 2) : 0,
				width: t.width,
				height: t.height
			}
		}, getClientRect: function (t) {
			var e = (t = t || {}).skipTransform, i = t.relativeTo, n = this.getSelfRect(), a = this.hasStroke() && this.strokeWidth() || 0, r = n.width + a, o = n.height + a, s = this.hasShadow() ? this.shadowOffsetX() : 0, h = this.hasShadow() ? this.shadowOffsetY() : 0, l = r + Math.abs(s), c = o + Math.abs(h), d = this.hasShadow() && this.shadowBlur() || 0, u = l + 2 * d, g = c + 2 * d, f = 0;
			Math.round(a / 2) !== a / 2 && (f = 1);
			var v = {
				width: u + f,
				height: g + f,
				x: -Math.round(a / 2 + d) + Math.min(s, 0) + n.x,
				y: -Math.round(a / 2 + d) + Math.min(h, 0) + n.y
			};
			return e ? v : this._transformedRect(v, i)
		}, drawScene: function (t, e, i, n) {
			var a, r, o = this.getLayer(), s = t || o.getCanvas(), h = s.getContext(), l = this._cache.canvas, c = this.sceneFunc(), d = this.hasShadow(), u = this.hasStroke();
			if (!this.isVisible() && !i)return this;
			if (l)return h.save(), o._applyTransform(this, h, e), this._drawCachedSceneCanvas(h), h.restore(), this;
			if (!c)return this;
			if (h.save(), this._useBufferCanvas(i) && !n) {
				if ((r = (a = this.getStage().bufferCanvas).getContext()).clear(), r.save(), r._applyLineJoin(this), !i)if (o)o._applyTransform(this, r, e); else {
					var g = this.getAbsoluteTransform(e).getMatrix();
					h.transform(g[0], g[1], g[2], g[3], g[4], g[5])
				}
				c.call(this, r, this), r.restore();
				var f = a.pixelRatio;
				d && !s.hitCanvas ? (h.save(), h._applyShadow(this), h._applyOpacity(this), h._applyGlobalCompositeOperation(this), h.drawImage(a._canvas, 0, 0, a.width / f, a.height / f), h.restore()) : (h._applyOpacity(this), h._applyGlobalCompositeOperation(this), h.drawImage(a._canvas, 0, 0, a.width / f, a.height / f))
			} else {
				if (h._applyLineJoin(this), !i)if (o)o._applyTransform(this, h, e); else {
					var v = this.getAbsoluteTransform(e).getMatrix();
					h.transform(v[0], v[1], v[2], v[3], v[4], v[5])
				}
				d && u && !s.hitCanvas ? (h.save(), i || (h._applyOpacity(this), h._applyGlobalCompositeOperation(this)), h._applyShadow(this), c.call(this, h, this), h.restore(), this.hasFill() && this.getShadowForStrokeEnabled() && c.call(this, h, this)) : d && !s.hitCanvas ? (h.save(), i || (h._applyOpacity(this), h._applyGlobalCompositeOperation(this)), h._applyShadow(this), c.call(this, h, this), h.restore()) : (i || (h._applyOpacity(this), h._applyGlobalCompositeOperation(this)), c.call(this, h, this))
			}
			return h.restore(), this
		}, drawHit: function (t, e, i) {
			var n = this.getLayer(), a = t || n.hitCanvas, r = a.getContext(), o = this.hitFunc() || this.sceneFunc(), s = this._cache.canvas, h = s && s.hit;
			if (!this.shouldDrawHit(a) && !i)return this;
			if (n && n.clearHitCache(), h)return r.save(), n._applyTransform(this, r, e), this._drawCachedHitCanvas(r), r.restore(), this;
			if (!o)return this;
			if (r.save(), r._applyLineJoin(this), !i)if (n)n._applyTransform(this, r, e); else {
				var l = this.getAbsoluteTransform(e).getMatrix();
				r.transform(l[0], l[1], l[2], l[3], l[4], l[5])
			}
			return o.call(this, r, this), r.restore(), this
		}, drawHitFromCache: function (t) {
			var e, i, n, a, r, o = t || 0, s = this._cache.canvas, h = this._getCachedSceneCanvas(), l = s.hit, c = l.getContext(), d = l.getWidth(), u = l.getHeight();
			c.clear(), c.drawImage(h._canvas, 0, 0, d, u);
			try {
				for (n = (i = (e = c.getImageData(0, 0, d, u)).data).length, a = g.Util._hexToRgb(this.colorKey), r = 0; r < n; r += 4)o < i[r + 3] ? (i[r] = a.r, i[r + 1] = a.g, i[r + 2] = a.b, i[r + 3] = 255) : i[r + 3] = 0;
				c.putImageData(e, 0, 0)
			} catch (t) {g.Util.error("Unable to draw hit graph from cached scene canvas. " + t.message)}
			return this
		}
	}), g.Util.extend(g.Shape, g.Node), g.Factory.addGetterSetter(g.Shape, "stroke", void 0, g.Validators.getStringValidator()), g.Factory.addGetterSetter(g.Shape, "strokeWidth", 2, g.Validators.getNumberValidator()), g.Factory.addGetterSetter(g.Shape, "strokeHitEnabled", !0, g.Validators.getBooleanValidator()), g.Factory.addGetterSetter(g.Shape, "perfectDrawEnabled", !0, g.Validators.getBooleanValidator()), g.Factory.addGetterSetter(g.Shape, "shadowForStrokeEnabled", !0, g.Validators.getBooleanValidator()), g.Factory.addGetterSetter(g.Shape, "lineJoin"), g.Factory.addGetterSetter(g.Shape, "lineCap"), g.Factory.addGetterSetter(g.Shape, "sceneFunc"), g.Factory.addGetterSetter(g.Shape, "hitFunc"), g.Factory.addGetterSetter(g.Shape, "dash"), g.Factory.addGetterSetter(g.Shape, "dashOffset", 0, g.Validators.getNumberValidator()), g.Factory.addGetterSetter(g.Shape, "shadowColor", void 0, g.Validators.getStringValidator()), g.Factory.addGetterSetter(g.Shape, "shadowBlur", 0, g.Validators.getNumberValidator()), g.Factory.addGetterSetter(g.Shape, "shadowOpacity", 1, g.Validators.getNumberValidator()), g.Factory.addComponentsGetterSetter(g.Shape, "shadowOffset", ["x", "y"]), g.Factory.addGetterSetter(g.Shape, "shadowOffsetX", 0, g.Validators.getNumberValidator()), g.Factory.addGetterSetter(g.Shape, "shadowOffsetY", 0, g.Validators.getNumberValidator()), g.Factory.addGetterSetter(g.Shape, "fillPatternImage"), g.Factory.addGetterSetter(g.Shape, "fill", void 0, g.Validators.getStringValidator()), g.Factory.addGetterSetter(g.Shape, "fillPatternX", 0, g.Validators.getNumberValidator()), g.Factory.addGetterSetter(g.Shape, "fillPatternY", 0, g.Validators.getNumberValidator()), g.Factory.addGetterSetter(g.Shape, "fillLinearGradientColorStops"), g.Factory.addGetterSetter(g.Shape, "strokeLinearGradientColorStops"), g.Factory.addGetterSetter(g.Shape, "fillRadialGradientStartRadius", 0), g.Factory.addGetterSetter(g.Shape, "fillRadialGradientEndRadius", 0), g.Factory.addGetterSetter(g.Shape, "fillRadialGradientColorStops"), g.Factory.addGetterSetter(g.Shape, "fillPatternRepeat", "repeat"), g.Factory.addGetterSetter(g.Shape, "fillEnabled", !0), g.Factory.addGetterSetter(g.Shape, "strokeEnabled", !0), g.Factory.addGetterSetter(g.Shape, "shadowEnabled", !0), g.Factory.addGetterSetter(g.Shape, "dashEnabled", !0), g.Factory.addGetterSetter(g.Shape, "strokeScaleEnabled", !0), g.Factory.addGetterSetter(g.Shape, "fillPriority", "color"), g.Factory.addComponentsGetterSetter(g.Shape, "fillPatternOffset", ["x", "y"]), g.Factory.addGetterSetter(g.Shape, "fillPatternOffsetX", 0, g.Validators.getNumberValidator()), g.Factory.addGetterSetter(g.Shape, "fillPatternOffsetY", 0, g.Validators.getNumberValidator()), g.Factory.addComponentsGetterSetter(g.Shape, "fillPatternScale", ["x", "y"]), g.Factory.addGetterSetter(g.Shape, "fillPatternScaleX", 1, g.Validators.getNumberValidator()), g.Factory.addGetterSetter(g.Shape, "fillPatternScaleY", 1, g.Validators.getNumberValidator()), g.Factory.addComponentsGetterSetter(g.Shape, "fillLinearGradientStartPoint", ["x", "y"]), g.Factory.addComponentsGetterSetter(g.Shape, "strokeLinearGradientStartPoint", ["x", "y"]), g.Factory.addGetterSetter(g.Shape, "fillLinearGradientStartPointX", 0), g.Factory.addGetterSetter(g.Shape, "strokeLinearGradientStartPointX", 0), g.Factory.addGetterSetter(g.Shape, "fillLinearGradientStartPointY", 0), g.Factory.addGetterSetter(g.Shape, "strokeLinearGradientStartPointY", 0), g.Factory.addComponentsGetterSetter(g.Shape, "fillLinearGradientEndPoint", ["x", "y"]), g.Factory.addComponentsGetterSetter(g.Shape, "strokeLinearGradientEndPoint", ["x", "y"]), g.Factory.addGetterSetter(g.Shape, "fillLinearGradientEndPointX", 0), g.Factory.addGetterSetter(g.Shape, "strokeLinearGradientEndPointX", 0), g.Factory.addGetterSetter(g.Shape, "fillLinearGradientEndPointY", 0), g.Factory.addGetterSetter(g.Shape, "strokeLinearGradientEndPointY", 0), g.Factory.addComponentsGetterSetter(g.Shape, "fillRadialGradientStartPoint", ["x", "y"]), g.Factory.addGetterSetter(g.Shape, "fillRadialGradientStartPointX", 0), g.Factory.addGetterSetter(g.Shape, "fillRadialGradientStartPointY", 0), g.Factory.addComponentsGetterSetter(g.Shape, "fillRadialGradientEndPoint", ["x", "y"]), g.Factory.addGetterSetter(g.Shape, "fillRadialGradientEndPointX", 0), g.Factory.addGetterSetter(g.Shape, "fillRadialGradientEndPointY", 0), g.Factory.addGetterSetter(g.Shape, "fillPatternRotation", 0), g.Factory.backCompat(g.Shape, {
		dashArray: "dash",
		getDashArray: "getDash",
		setDashArray: "getDash",
		drawFunc: "sceneFunc",
		getDrawFunc: "getSceneFunc",
		setDrawFunc: "setSceneFunc",
		drawHitFunc: "hitFunc",
		getDrawHitFunc: "getHitFunc",
		setDrawHitFunc: "setHitFunc"
	}), g.Collection.mapMethods(g.Shape)
}(Konva), function () {
	"use strict";
	var i = "mouseout", n = "mouseleave", a = "mouseover", r = "mousemove", o = "mousedown", s = "mouseup", h = "contextmenu", l = "dblclick", c = "touchstart", d = "touchend", u = "touchmove", g = "wheel", f = "_", e = [o, r, s, i, c, u, d, a, g, h], v = e.length;

	function p(e, i) {
		e.content.addEventListener(i, function (t) {
			e[f + i](t)
		}, !1)
	}

	Konva.Stage = function (t) {
		this.___init(t)
	}, Konva.Util.addMethods(Konva.Stage, {
		___init: function (t) {
			this.nodeType = "Stage", Konva.Container.call(this, t), this._id = Konva.idCounter++, this._buildDOM(), this._bindContentEvents(), this._enableNestedTransforms = !1, Konva.stages.push(this)
		}, _validateAdd: function (t) {
			"Layer" !== t.getType() && Konva.Util.throw("You may only add layers to the stage.")
		}, setContainer: function (t) {
			if ("string" == typeof t) {
				if ("." === t.charAt(0)) {
					var e = t.slice(1);
					t = Konva.document.getElementsByClassName(e)[0]
				} else {
					var i;
					i = "#" !== t.charAt(0) ? t : t.slice(1), t = Konva.document.getElementById(i)
				}
				if (!t)throw"Can not find container in document with id " + i
			}
			return this._setAttr("container", t), this
		}, shouldDrawHit: function () {
			return !0
		}, draw: function () {
			return Konva.Node.prototype.draw.call(this), this
		}, setHeight: function (t) {
			return Konva.Node.prototype.setHeight.call(this, t), this._resizeDOM(), this
		}, setWidth: function (t) {
			return Konva.Node.prototype.setWidth.call(this, t), this._resizeDOM(), this
		}, clear: function () {
			var t, e = this.children, i = e.length;
			for (t = 0; t < i; t++)e[t].clear();
			return this
		}, clone: function (t) {
			return t || (t = {}), t.container = Konva.document.createElement("div"), Konva.Container.prototype.clone.call(this, t)
		}, destroy: function () {
			var t = this.content;
			Konva.Container.prototype.destroy.call(this), t && Konva.Util._isInDocument(t) && this.getContainer().removeChild(t);
			var e = Konva.stages.indexOf(this);
			return -1 < e && Konva.stages.splice(e, 1), this
		}, getPointerPosition: function () {
			return this.pointerPos
		}, getStage: function () {
			return this
		}, getContent: function () {
			return this.content
		}, _toKonvaCanvas: function (i) {
			var n = (i = i || {}).x || 0, a = i.y || 0, t = new Konva.SceneCanvas({
				width: i.width || this.getWidth(),
				height: i.height || this.getHeight(),
				pixelRatio: i.pixelRatio || 1
			}), r = t.getContext()._context, e = this.children;
			return (n || a) && r.translate(-1 * n, -1 * a), e.each(function (t) {
				if (t.isVisible()) {
					var e = t._toKonvaCanvas(i);
					r.drawImage(e._canvas, n, a, e.getWidth() / e.getPixelRatio(), e.getHeight() / e.getPixelRatio())
				}
			}), t
		}, toImage: function (t) {
			var e = t.callback;
			t.callback = function (t) {
				Konva.Util._getImage(t, function (t) {
					e(t)
				})
			}, this.toDataURL(t)
		}, getIntersection: function (t, e) {
			var i, n, a = this.getChildren();
			for (i = a.length - 1; 0 <= i; i--)if (n = a[i].getIntersection(t, e))return n;
			return null
		}, _resizeDOM: function () {
			if (this.content) {
				var t, e, i = this.getWidth(), n = this.getHeight(), a = this.getChildren(), r = a.length;
				for (this.content.style.width = i + "px", this.content.style.height = n + "px", this.bufferCanvas.setSize(i, n), this.bufferHitCanvas.setSize(i, n), t = 0; t < r; t++)(e = a[t]).setSize(i, n), e.draw()
			}
		}, add: function (t) {
			if (1 < arguments.length) {
				for (var e = 0; e < arguments.length; e++)this.add(arguments[e]);
				return this
			}
			return Konva.Container.prototype.add.call(this, t), t._setCanvasSize(this.width(), this.height()), t.draw(), Konva.isBrowser && this.content.appendChild(t.canvas._canvas), this
		}, getParent: function () {
			return null
		}, getLayer: function () {
			return null
		}, getLayers: function () {
			return this.getChildren()
		}, _bindContentEvents: function () {
			if (Konva.isBrowser)for (var t = 0; t < v; t++)p(this, e[t])
		}, _mouseover: function (t) {
			Konva.UA.mobile || (this._setPointerPosition(t), this._fire("contentMouseover", {evt: t}))
		}, _mouseout: function (t) {
			if (!Konva.UA.mobile) {
				this._setPointerPosition(t);
				var e = this.targetShape;
				e && !Konva.isDragging() && (e._fireAndBubble(i, {evt: t}), e._fireAndBubble(n, {evt: t}), this.targetShape = null), this.pointerPos = void 0, this._fire("contentMouseout", {evt: t})
			}
		}, _mousemove: function (t) {
			return Konva.UA.ieMobile ? this._touchmove(t) : void 0 === t.movementX && void 0 === t.movementY || 0 !== t.movementY || 0 !== t.movementX ? Konva.UA.mobile ? null : (this._setPointerPosition(t), Konva.isDragging() || ((e = this.getIntersection(this.getPointerPosition())) && e.isListening() ? Konva.isDragging() || this.targetShape && this.targetShape._id === e._id ? e._fireAndBubble(r, {evt: t}) : (this.targetShape && (this.targetShape._fireAndBubble(i, {evt: t}, e), this.targetShape._fireAndBubble(n, {evt: t}, e)), e._fireAndBubble(a, {evt: t}, this.targetShape), e._fireAndBubble("mouseenter", {evt: t}, this.targetShape), this.targetShape = e) : (this.targetShape && !Konva.isDragging() && (this.targetShape._fireAndBubble(i, {evt: t}), this.targetShape._fireAndBubble(n, {evt: t}), this.targetShape = null), this._fire(r, {
				evt: t,
				target: this,
				currentTarget: this
			})), this._fire("contentMousemove", {evt: t})), void(t.cancelable && t.preventDefault())) : null;
			var e
		}, _mousedown: function (t) {
			if (Konva.UA.ieMobile)return this._touchstart(t);
			if (!Konva.UA.mobile) {
				this._setPointerPosition(t);
				var e = this.getIntersection(this.getPointerPosition());
				Konva.listenClickTap = !0, e && e.isListening() ? (this.clickStartShape = e)._fireAndBubble(o, {evt: t}) : this._fire(o, {
					evt: t,
					target: this,
					currentTarget: this
				}), this._fire("contentMousedown", {evt: t})
			}
		}, _mouseup: function (t) {
			if (Konva.UA.ieMobile)return this._touchend(t);
			if (!Konva.UA.mobile) {
				this._setPointerPosition(t);
				var e = this.getIntersection(this.getPointerPosition()), i = this.clickStartShape, n = this.clickEndShape, a = !1, r = Konva.DD;
				Konva.inDblClickWindow ? (a = !0, clearTimeout(this.dblTimeout)) : r && r.justDragged ? r && (r.justDragged = !1) : (Konva.inDblClickWindow = !0, clearTimeout(this.dblTimeout)), this.dblTimeout = setTimeout(function () {
					Konva.inDblClickWindow = !1
				}, Konva.dblClickWindow), e && e.isListening() ? ((this.clickEndShape = e)._fireAndBubble(s, {evt: t}), Konva.listenClickTap && i && i._id === e._id && (e._fireAndBubble("click", {evt: t}), a && n && n._id === e._id && e._fireAndBubble(l, {evt: t}))) : (this._fire(s, {
					evt: t,
					target: this,
					currentTarget: this
				}), Konva.listenClickTap && this._fire("click", {
					evt: t,
					target: this,
					currentTarget: this
				}), a && this._fire(l, {
					evt: t,
					target: this,
					currentTarget: this
				})), this._fire("contentMouseup", {evt: t}), Konva.listenClickTap && (this._fire("contentClick", {evt: t}), a && this._fire("contentDblclick", {evt: t})), Konva.listenClickTap = !1
			}
			t.cancelable && t.preventDefault()
		}, _contextmenu: function (t) {
			this._setPointerPosition(t);
			var e = this.getIntersection(this.getPointerPosition());
			e && e.isListening() ? e._fireAndBubble(h, {evt: t}) : this._fire(h, {
				evt: t,
				target: this,
				currentTarget: this
			}), this._fire("contentContextmenu", {evt: t})
		}, _touchstart: function (t) {
			this._setPointerPosition(t);
			var e = this.getIntersection(this.getPointerPosition());
			Konva.listenClickTap = !0, e && e.isListening() ? ((this.tapStartShape = e)._fireAndBubble(c, {evt: t}), e.isListening() && e.preventDefault() && t.cancelable && t.preventDefault()) : this._fire(c, {
				evt: t,
				target: this,
				currentTarget: this
			}), this._fire("contentTouchstart", {evt: t})
		}, _touchend: function (t) {
			this._setPointerPosition(t);
			var e = this.getIntersection(this.getPointerPosition()), i = !1;
			Konva.inDblClickWindow ? i = !0 : Konva.inDblClickWindow = !0, clearTimeout(this.dblTimeout), this.dblTimeout = setTimeout(function () {
				Konva.inDblClickWindow = !1
			}, Konva.dblClickWindow), e && e.isListening() ? (e._fireAndBubble(d, {evt: t}), Konva.listenClickTap && this.tapStartShape && e._id === this.tapStartShape._id && (e._fireAndBubble("tap", {evt: t}), i && e._fireAndBubble("dbltap", {evt: t})), e.isListening() && e.preventDefault() && t.cancelable && t.preventDefault()) : (this._fire(d, {
				evt: t,
				target: this,
				currentTarget: this
			}), Konva.listenClickTap && this._fire("tap", {
				evt: t,
				target: this,
				currentTarget: this
			}), i && this._fire("dbltap", {
				evt: t,
				target: this,
				currentTarget: this
			})), this._fire("contentTouchend", {evt: t}), Konva.listenClickTap && (this._fire("contentTap", {evt: t}), i && this._fire("contentDbltap", {evt: t})), Konva.listenClickTap = !1
		}, _touchmove: function (t) {
			this._setPointerPosition(t);
			var e, i = Konva.DD;
			Konva.isDragging() || ((e = this.getIntersection(this.getPointerPosition())) && e.isListening() ? (e._fireAndBubble(u, {evt: t}), e.isListening() && e.preventDefault() && t.cancelable && t.preventDefault()) : this._fire(u, {
				evt: t,
				target: this,
				currentTarget: this
			}), this._fire("contentTouchmove", {evt: t})), i && Konva.isDragging() && Konva.DD.node.preventDefault() && t.cancelable && t.preventDefault()
		}, _wheel: function (t) {
			this._setPointerPosition(t);
			var e = this.getIntersection(this.getPointerPosition());
			e && e.isListening() ? e._fireAndBubble(g, {evt: t}) : this._fire(g, {
				evt: t,
				target: this,
				currentTarget: this
			}), this._fire("contentWheel", {evt: t})
		}, _setPointerPosition: function (t) {
			var e = this._getContentPosition(), i = null, n = null;
			if (void 0 !== (t = t || window.event).touches) {
				if (0 < t.touches.length) {
					var a = t.touches[0];
					i = a.clientX - e.left, n = a.clientY - e.top
				}
			} else i = t.clientX - e.left, n = t.clientY - e.top;
			null !== i && null !== n && (this.pointerPos = {x: i, y: n})
		}, _getContentPosition: function () {
			var t = this.content.getBoundingClientRect ? this.content.getBoundingClientRect() : {top: 0, left: 0};
			return {top: t.top, left: t.left}
		}, _buildDOM: function () {
			if (this.bufferCanvas = new Konva.SceneCanvas, this.bufferHitCanvas = new Konva.HitCanvas({pixelRatio: 1}), Konva.isBrowser) {
				var t = this.getContainer();
				if (!t)throw"Stage has no container. A container is required.";
				t.innerHTML = "", this.content = Konva.document.createElement("div"), this.content.style.position = "relative", this.content.style.userSelect = "none", this.content.className = "konvajs-content", this.content.setAttribute("role", "presentation"), t.appendChild(this.content), this._resizeDOM()
			}
		}, _onContent: function (t, e) {
			var i, n, a = t.split(" "), r = a.length;
			for (i = 0; i < r; i++)n = a[i], this.content.addEventListener(n, e, !1)
		}, cache: function () {
			Konva.Util.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.")
		}, clearCache: function () {
		}
	}), Konva.Util.extend(Konva.Stage, Konva.Container), Konva.Factory.addGetter(Konva.Stage, "container"), Konva.Factory.addOverloadedGetterSetter(Konva.Stage, "container")
}(), function (i) {
	"use strict";
	i.BaseLayer = function (t) {
		this.___init(t)
	}, i.Util.addMethods(i.BaseLayer, {
		___init: function (t) {
			this.nodeType = "Layer", i.Container.call(this, t)
		}, createPNGStream: function () {
			return this.canvas._canvas.createPNGStream()
		}, getCanvas: function () {
			return this.canvas
		}, getHitCanvas: function () {
			return this.hitCanvas
		}, getContext: function () {
			return this.getCanvas().getContext()
		}, clear: function (t) {
			return this.getContext().clear(t), this
		}, clearHitCache: function () {
			this._hitImageData = void 0
		}, setZIndex: function (t) {
			i.Node.prototype.setZIndex.call(this, t);
			var e = this.getStage();
			return e && (e.content.removeChild(this.getCanvas()._canvas), t < e.getChildren().length - 1 ? e.content.insertBefore(this.getCanvas()._canvas, e.getChildren()[t + 1].getCanvas()._canvas) : e.content.appendChild(this.getCanvas()._canvas)), this
		}, moveToTop: function () {
			i.Node.prototype.moveToTop.call(this);
			var t = this.getStage();
			return t && (t.content.removeChild(this.getCanvas()._canvas), t.content.appendChild(this.getCanvas()._canvas)), this
		}, moveUp: function () {
			if (!i.Node.prototype.moveUp.call(this))return this;
			var t = this.getStage();
			return t && (t.content.removeChild(this.getCanvas()._canvas), this.index < t.getChildren().length - 1 ? t.content.insertBefore(this.getCanvas()._canvas, t.getChildren()[this.index + 1].getCanvas()._canvas) : t.content.appendChild(this.getCanvas()._canvas)), this
		}, moveDown: function () {
			if (i.Node.prototype.moveDown.call(this)) {
				var t = this.getStage();
				if (t) {
					var e = t.getChildren();
					t.content.removeChild(this.getCanvas()._canvas), t.content.insertBefore(this.getCanvas()._canvas, e[this.index + 1].getCanvas()._canvas)
				}
			}
			return this
		}, moveToBottom: function () {
			if (i.Node.prototype.moveToBottom.call(this)) {
				var t = this.getStage();
				if (t) {
					var e = t.getChildren();
					t.content.removeChild(this.getCanvas()._canvas), t.content.insertBefore(this.getCanvas()._canvas, e[1].getCanvas()._canvas)
				}
			}
			return this
		}, getLayer: function () {
			return this
		}, remove: function () {
			var t = this.getCanvas()._canvas;
			return i.Node.prototype.remove.call(this), t && t.parentNode && i.Util._isInDocument(t) && t.parentNode.removeChild(t), this
		}, getStage: function () {
			return this.parent
		}, setSize: function (t, e) {
			return this.canvas.setSize(t, e), this
		}, _toKonvaCanvas: function (t) {
			return (t = t || {}).width = t.width || this.getWidth(), t.height = t.height || this.getHeight(), t.x = void 0 !== t.x ? t.x : this.getX(), t.y = void 0 !== t.y ? t.y : this.getY(), i.Node.prototype._toKonvaCanvas.call(this, t)
		}, getWidth: function () {
			if (this.parent)return this.parent.getWidth()
		}, setWidth: function () {
			i.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.')
		}, getHeight: function () {
			if (this.parent)return this.parent.getHeight()
		}, setHeight: function () {
			i.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.')
		}, _applyTransform: function (t, e, i) {
			var n = t.getAbsoluteTransform(i).getMatrix();
			e.transform(n[0], n[1], n[2], n[3], n[4], n[5])
		}
	}), i.Util.extend(i.BaseLayer, i.Container), i.Factory.addGetterSetter(i.BaseLayer, "clearBeforeDraw", !0), i.Collection.mapMethods(i.BaseLayer)
}(Konva), function () {
	"use strict";
	var h = [{x: 0, y: 0}, {x: -1, y: -1}, {x: 1, y: -1}, {x: 1, y: 1}, {x: -1, y: 1}], l = h.length;
	Konva.Layer = function (t) {
		this.____init(t)
	}, Konva.Util.addMethods(Konva.Layer, {
		____init: function (t) {
			this.nodeType = "Layer", this.canvas = new Konva.SceneCanvas, this.hitCanvas = new Konva.HitCanvas({pixelRatio: 1}), Konva.BaseLayer.call(this, t)
		}, _setCanvasSize: function (t, e) {
			this.canvas.setSize(t, e), this.hitCanvas.setSize(t, e)
		}, _validateAdd: function (t) {
			var e = t.getType();
			"Group" !== e && "Shape" !== e && Konva.Util.throw("You may only add groups and shapes to a layer.")
		}, getIntersection: function (t, e) {
			var i, n, a, r;
			if (!this.hitGraphEnabled() || !this.isVisible())return null;
			for (var o = 1, s = !1; ;) {
				for (n = 0; n < l; n++) {
					if (a = h[n], (r = (i = this._getIntersection({
							x: t.x + a.x * o,
							y: t.y + a.y * o
						})).shape) && e)return r.findAncestor(e, !0);
					if (r)return r;
					if (s = !!i.antialiased, !i.antialiased)break
				}
				if (!s)return null;
				o += 1
			}
		}, _getImageData: function (t, e) {
			var i = this.hitCanvas.width || 1, n = this.hitCanvas.height || 1, a = Math.round(e) * i + Math.round(t);
			return this._hitImageData || (this._hitImageData = this.hitCanvas.context.getImageData(0, 0, i, n)), [this._hitImageData.data[4 * a + 0], this._hitImageData.data[4 * a + 1], this._hitImageData.data[4 * a + 2], this._hitImageData.data[4 * a + 3]]
		}, _getIntersection: function (t) {
			var e, i, n = this.hitCanvas.pixelRatio, a = this.hitCanvas.context.getImageData(Math.round(t.x * n), Math.round(t.y * n), 1, 1).data, r = a[3];
			return 255 === r ? (e = Konva.Util._rgbToHex(a[0], a[1], a[2]), (i = Konva.shapes["#" + e]) ? {shape: i} : {antialiased: !0}) : 0 < r ? {antialiased: !0} : {}
		}, drawScene: function (t, e) {
			var i = this.getLayer(), n = t || i && i.getCanvas();
			return this._fire("beforeDraw", {node: this}), this.getClearBeforeDraw() && n.getContext().clear(), Konva.Container.prototype.drawScene.call(this, n, e), this._fire("draw", {node: this}), this
		}, drawHit: function (t, e) {
			var i = this.getLayer(), n = t || i && i.hitCanvas;
			return i && i.getClearBeforeDraw() && i.getHitCanvas().getContext().clear(), Konva.Container.prototype.drawHit.call(this, n, e), this.imageData = null, this
		}, clear: function (t) {
			return Konva.BaseLayer.prototype.clear.call(this, t), this.getHitCanvas().getContext().clear(t), this.imageData = null, this
		}, setVisible: function (t) {
			return Konva.Node.prototype.setVisible.call(this, t), t ? (this.getCanvas()._canvas.style.display = "block", this.hitCanvas._canvas.style.display = "block") : (this.getCanvas()._canvas.style.display = "none", this.hitCanvas._canvas.style.display = "none"), this
		}, enableHitGraph: function () {
			return this.setHitGraphEnabled(!0), this
		}, disableHitGraph: function () {
			return this.setHitGraphEnabled(!1), this
		}, setSize: function (t, e) {
			return Konva.BaseLayer.prototype.setSize.call(this, t, e), this.hitCanvas.setSize(t, e), this
		}
	}), Konva.Util.extend(Konva.Layer, Konva.BaseLayer), Konva.Factory.addGetterSetter(Konva.Layer, "hitGraphEnabled", !0), Konva.Collection.mapMethods(Konva.Layer)
}(), function () {
	"use strict";
	Konva.FastLayer = function (t) {
		this.____init(t)
	}, Konva.Util.addMethods(Konva.FastLayer, {
		____init: function (t) {
			this.nodeType = "Layer", this.canvas = new Konva.SceneCanvas, Konva.BaseLayer.call(this, t)
		}, _validateAdd: function (t) {
			"Shape" !== t.getType() && Konva.Util.throw("You may only add shapes to a fast layer.")
		}, _setCanvasSize: function (t, e) {
			this.canvas.setSize(t, e)
		}, hitGraphEnabled: function () {
			return !1
		}, getIntersection: function () {
			return null
		}, drawScene: function (t) {
			var e = this.getLayer(), i = t || e && e.getCanvas();
			return this.getClearBeforeDraw() && i.getContext().clear(), Konva.Container.prototype.drawScene.call(this, i), this
		}, draw: function () {
			return this.drawScene(), this
		}, setVisible: function (t) {
			return Konva.Node.prototype.setVisible.call(this, t), this.getCanvas()._canvas.style.display = t ? "block" : "none", this
		}
	}), Konva.Util.extend(Konva.FastLayer, Konva.BaseLayer), Konva.Collection.mapMethods(Konva.FastLayer)
}(), function () {
	"use strict";
	Konva.Group = function (t) {
		this.___init(t)
	}, Konva.Util.addMethods(Konva.Group, {
		___init: function (t) {
			this.nodeType = "Group", Konva.Container.call(this, t)
		}, _validateAdd: function (t) {
			var e = t.getType();
			"Group" !== e && "Shape" !== e && Konva.Util.throw("You may only add groups and shapes to groups.")
		}
	}), Konva.Util.extend(Konva.Group, Konva.Container), Konva.Collection.mapMethods(Konva.Group)
}(), function (n) {
	"use strict";
	var c = n.global.performance && n.global.performance.now ? function () {
		return n.global.performance.now()
	} : function () {
		return (new Date).getTime()
	};

	function t(t) {
		setTimeout(t, 1e3 / 60)
	}

	var e = n.global.requestAnimationFrame || n.global.webkitRequestAnimationFrame || n.global.mozRequestAnimationFrame || n.global.oRequestAnimationFrame || n.global.msRequestAnimationFrame || t;

	function i() {
		return e.apply(n.global, arguments)
	}

	n.Animation = function (t, e) {
		var i = n.Animation;
		this.func = t, this.setLayers(e), this.id = i.animIdCounter++, this.frame = {
			time: 0,
			timeDiff: 0,
			lastTime: c()
		}
	}, n.Animation.prototype = {
		setLayers: function (t) {
			var e = [];
			return e = t ? 0 < t.length ? t : [t] : [], this.layers = e, this
		}, getLayers: function () {
			return this.layers
		}, addLayer: function (t) {
			var e, i = this.layers, n = i.length;
			for (e = 0; e < n; e++)if (i[e]._id === t._id)return !1;
			return this.layers.push(t), !0
		}, isRunning: function () {
			var t, e = n.Animation.animations, i = e.length;
			for (t = 0; t < i; t++)if (e[t].id === this.id)return !0;
			return !1
		}, start: function () {
			var t = n.Animation;
			return this.stop(), this.frame.timeDiff = 0, this.frame.lastTime = c(), t._addAnimation(this), this
		}, stop: function () {
			return n.Animation._removeAnimation(this), this
		}, _updateFrameObject: function (t) {
			this.frame.timeDiff = t - this.frame.lastTime, this.frame.lastTime = t, this.frame.time += this.frame.timeDiff, this.frame.frameRate = 1e3 / this.frame.timeDiff
		}
	}, n.Animation.animations = [], n.Animation.animIdCounter = 0, n.Animation.animRunning = !1, n.Animation._addAnimation = function (t) {
		this.animations.push(t), this._handleAnimation()
	}, n.Animation._removeAnimation = function (t) {
		var e, i = t.id, n = this.animations, a = n.length;
		for (e = 0; e < a; e++)if (n[e].id === i) {
			this.animations.splice(e, 1);
			break
		}
	}, n.Animation._runFrames = function () {
		var t, e, i, n, a, r, o, s, h = {}, l = this.animations;
		for (n = 0; n < l.length; n++)if (e = (t = l[n]).layers, i = t.func, t._updateFrameObject(c()), r = e.length, !i || !1 !== i.call(t, t.frame))for (a = 0; a < r; a++)void 0 !== (o = e[a])._id && (h[o._id] = o);
		for (s in h)h.hasOwnProperty(s) && h[s].draw()
	}, n.Animation._animationLoop = function () {
		var t = n.Animation;
		t.animations.length ? (t._runFrames(), i(t._animationLoop)) : t.animRunning = !1
	}, n.Animation._handleAnimation = function () {
		this.animRunning || (this.animRunning = !0, i(this._animationLoop))
	}, n.BaseLayer.prototype.batchDraw = function () {
		var t = this, e = n.Animation;
		return this.batchAnim || (this.batchAnim = new e(function () {
			t.batchAnim.stop()
		}, this)), this.batchAnim.isRunning() || this.batchAnim.start(), this
	}, n.Stage.prototype.batchDraw = function () {
		return this.getChildren().each(function (t) {
			t.batchDraw()
		}), this
	}
}(Konva), function () {
	"use strict";
	var l = {
		node: 1,
		duration: 1,
		easing: 1,
		onFinish: 1,
		yoyo: 1
	}, c = 0, g = ["fill", "stroke", "shadowColor"], d = function (t, e, i, n, a, r, o) {
		this.prop = t, this.propFunc = e, this.begin = n, this._pos = n, this.duration = r, this._change = 0, this.prevPos = 0, this.yoyo = o, this._time = 0, this._position = 0, this._startTime = 0, this._finish = 0, this.func = i, this._change = a - this.begin, this.pause()
	};
	d.prototype = {
		fire: function (t) {
			var e = this[t];
			e && e()
		}, setTime: function (t) {
			t > this.duration ? this.yoyo ? (this._time = this.duration, this.reverse()) : this.finish() : t < 0 ? this.yoyo ? (this._time = 0, this.play()) : this.reset() : (this._time = t, this.update())
		}, getTime: function () {
			return this._time
		}, setPosition: function (t) {
			this.prevPos = this._pos, this.propFunc(t), this._pos = t
		}, getPosition: function (t) {
			return void 0 === t && (t = this._time), this.func(t, this.begin, this._change, this.duration)
		}, play: function () {
			this.state = 2, this._startTime = this.getTimer() - this._time, this.onEnterFrame(), this.fire("onPlay")
		}, reverse: function () {
			this.state = 3, this._time = this.duration - this._time, this._startTime = this.getTimer() - this._time, this.onEnterFrame(), this.fire("onReverse")
		}, seek: function (t) {
			this.pause(), this._time = t, this.update(), this.fire("onSeek")
		}, reset: function () {
			this.pause(), this._time = 0, this.update(), this.fire("onReset")
		}, finish: function () {
			this.pause(), this._time = this.duration, this.update(), this.fire("onFinish")
		}, update: function () {
			this.setPosition(this.getPosition(this._time))
		}, onEnterFrame: function () {
			var t = this.getTimer() - this._startTime;
			2 === this.state ? this.setTime(t) : 3 === this.state && this.setTime(this.duration - t)
		}, pause: function () {
			this.state = 1, this.fire("onPause")
		}, getTimer: function () {
			return (new Date).getTime()
		}
	}, Konva.Tween = function (t) {
		var e, i, n = this, a = t.node, r = a._id, o = t.easing || Konva.Easings.Linear, s = !!t.yoyo;
		e = void 0 === t.duration ? .3 : 0 === t.duration ? .001 : t.duration, this.node = a, this._id = c++;
		var h = a.getLayer() || (a instanceof Konva.Stage ? a.getLayers() : null);
		for (i in h || Konva.Util.error("Tween constructor have `node` that is not in a layer. Please add node into layer first."), this.anim = new Konva.Animation(function () {
			n.tween.onEnterFrame()
		}, h), this.tween = new d(i, function (t) {
			n._tweenFunc(t)
		}, o, 0, 1, 1e3 * e, s), this._addListeners(), Konva.Tween.attrs[r] || (Konva.Tween.attrs[r] = {}), Konva.Tween.attrs[r][this._id] || (Konva.Tween.attrs[r][this._id] = {}), Konva.Tween.tweens[r] || (Konva.Tween.tweens[r] = {}), t)void 0 === l[i] && this._addAttr(i, t[i]);
		this.reset(), this.onFinish = t.onFinish, this.onReset = t.onReset
	}, Konva.Tween.attrs = {}, Konva.Tween.tweens = {}, Konva.Tween.prototype = {
		_addAttr: function (t, e) {
			var i, n, a, r, o, s, h, l, c = this.node, d = c._id;
			if ((a = Konva.Tween.tweens[d][t]) && delete Konva.Tween.attrs[d][a][t], i = c.getAttr(t), Konva.Util._isArray(e))if (n = [], o = Math.max(e.length, i.length), "points" === t && e.length !== i.length && (e.length > i.length ? (h = i, i = Konva.Util._prepareArrayForTween(i, e, c.closed())) : (s = e, e = Konva.Util._prepareArrayForTween(e, i, c.closed()))), 0 === t.indexOf("fill"))for (r = 0; r < o; r++)if (r % 2 == 0)n.push(e[r] - i[r]); else {
				var u = Konva.Util.colorToRGBA(i[r]);
				l = Konva.Util.colorToRGBA(e[r]), i[r] = u, n.push({
					r: l.r - u.r,
					g: l.g - u.g,
					b: l.b - u.b,
					a: l.a - u.a
				})
			} else for (r = 0; r < o; r++)n.push(e[r] - i[r]); else-1 !== g.indexOf(t) ? (i = Konva.Util.colorToRGBA(i), n = {
				r: (l = Konva.Util.colorToRGBA(e)).r - i.r,
				g: l.g - i.g,
				b: l.b - i.b,
				a: l.a - i.a
			}) : n = e - i;
			Konva.Tween.attrs[d][this._id][t] = {
				start: i,
				diff: n,
				end: e,
				trueEnd: s,
				trueStart: h
			}, Konva.Tween.tweens[d][t] = this._id
		}, _tweenFunc: function (t) {
			var e, i, n, a, r, o, s, h, l = this.node, c = Konva.Tween.attrs[l._id][this._id];
			for (e in c) {
				if (n = (i = c[e]).start, a = i.diff, h = i.end, Konva.Util._isArray(n))if (r = [], s = Math.max(n.length, h.length), 0 === e.indexOf("fill"))for (o = 0; o < s; o++)o % 2 == 0 ? r.push((n[o] || 0) + a[o] * t) : r.push("rgba(" + Math.round(n[o].r + a[o].r * t) + "," + Math.round(n[o].g + a[o].g * t) + "," + Math.round(n[o].b + a[o].b * t) + "," + (n[o].a + a[o].a * t) + ")"); else for (o = 0; o < s; o++)r.push((n[o] || 0) + a[o] * t); else r = -1 !== g.indexOf(e) ? "rgba(" + Math.round(n.r + a.r * t) + "," + Math.round(n.g + a.g * t) + "," + Math.round(n.b + a.b * t) + "," + (n.a + a.a * t) + ")" : n + a * t;
				l.setAttr(e, r)
			}
		}, _addListeners: function () {
			var i = this;
			this.tween.onPlay = function () {
				i.anim.start()
			}, this.tween.onReverse = function () {
				i.anim.start()
			}, this.tween.onPause = function () {
				i.anim.stop()
			}, this.tween.onFinish = function () {
				var t = i.node, e = Konva.Tween.attrs[t._id][i._id];
				e.points && e.points.trueEnd && t.points(e.points.trueEnd), i.onFinish && i.onFinish.call(i)
			}, this.tween.onReset = function () {
				var t = i.node, e = Konva.Tween.attrs[t._id][i._id];
				e.points && e.points.trueStart && t.points(e.points.trueStart), i.onReset && i.onReset()
			}
		}, play: function () {
			return this.tween.play(), this
		}, reverse: function () {
			return this.tween.reverse(), this
		}, reset: function () {
			return this.tween.reset(), this
		}, seek: function (t) {
			return this.tween.seek(1e3 * t), this
		}, pause: function () {
			return this.tween.pause(), this
		}, finish: function () {
			return this.tween.finish(), this
		}, destroy: function () {
			var t, e = this.node._id, i = this._id, n = Konva.Tween.tweens[e];
			for (t in this.pause(), n)delete Konva.Tween.tweens[e][t];
			delete Konva.Tween.attrs[e][i]
		}
	}, Konva.Node.prototype.to = function (t) {
		var e = t.onFinish;
		t.node = this, t.onFinish = function () {
			this.destroy(), e && e()
		}, new Konva.Tween(t).play()
	}, Konva.Easings = {
		BackEaseIn: function (t, e, i, n) {
			return i * (t /= n) * t * (2.70158 * t - 1.70158) + e
		}, BackEaseOut: function (t, e, i, n) {
			return i * ((t = t / n - 1) * t * (2.70158 * t + 1.70158) + 1) + e
		}, BackEaseInOut: function (t, e, i, n) {
			var a = 1.70158;
			return (t /= n / 2) < 1 ? i / 2 * (t * t * ((1 + (a *= 1.525)) * t - a)) + e : i / 2 * ((t -= 2) * t * ((1 + (a *= 1.525)) * t + a) + 2) + e
		}, ElasticEaseIn: function (t, e, i, n, a, r) {
			var o = 0;
			return 0 === t ? e : 1 == (t /= n) ? e + i : (r || (r = .3 * n), !a || a < Math.abs(i) ? (a = i, o = r / 4) : o = r / (2 * Math.PI) * Math.asin(i / a), -a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * n - o) * (2 * Math.PI) / r) + e)
		}, ElasticEaseOut: function (t, e, i, n, a, r) {
			var o = 0;
			return 0 === t ? e : 1 == (t /= n) ? e + i : (r || (r = .3 * n), !a || a < Math.abs(i) ? (a = i, o = r / 4) : o = r / (2 * Math.PI) * Math.asin(i / a), a * Math.pow(2, -10 * t) * Math.sin((t * n - o) * (2 * Math.PI) / r) + i + e)
		}, ElasticEaseInOut: function (t, e, i, n, a, r) {
			var o = 0;
			return 0 === t ? e : 2 == (t /= n / 2) ? e + i : (r || (r = n * (.3 * 1.5)), !a || a < Math.abs(i) ? (a = i, o = r / 4) : o = r / (2 * Math.PI) * Math.asin(i / a), t < 1 ? a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * n - o) * (2 * Math.PI) / r) * -.5 + e : a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * n - o) * (2 * Math.PI) / r) * .5 + i + e)
		}, BounceEaseOut: function (t, e, i, n) {
			return (t /= n) < 1 / 2.75 ? i * (7.5625 * t * t) + e : t < 2 / 2.75 ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : t < 2.5 / 2.75 ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e
		}, BounceEaseIn: function (t, e, i, n) {
			return i - Konva.Easings.BounceEaseOut(n - t, 0, i, n) + e
		}, BounceEaseInOut: function (t, e, i, n) {
			return t < n / 2 ? .5 * Konva.Easings.BounceEaseIn(2 * t, 0, i, n) + e : .5 * Konva.Easings.BounceEaseOut(2 * t - n, 0, i, n) + .5 * i + e
		}, EaseIn: function (t, e, i, n) {
			return i * (t /= n) * t + e
		}, EaseOut: function (t, e, i, n) {
			return -i * (t /= n) * (t - 2) + e
		}, EaseInOut: function (t, e, i, n) {
			return (t /= n / 2) < 1 ? i / 2 * t * t + e : -i / 2 * (--t * (t - 2) - 1) + e
		}, StrongEaseIn: function (t, e, i, n) {
			return i * (t /= n) * t * t * t * t + e
		}, StrongEaseOut: function (t, e, i, n) {
			return i * ((t = t / n - 1) * t * t * t * t + 1) + e
		}, StrongEaseInOut: function (t, e, i, n) {
			return (t /= n / 2) < 1 ? i / 2 * t * t * t * t * t + e : i / 2 * ((t -= 2) * t * t * t * t + 2) + e
		}, Linear: function (t, e, i, n) {
			return i * t / n + e
		}
	}
}(), function () {
	"use strict";
	Konva.DD = {
		anim: new Konva.Animation(function () {
			var t = this.dirty;
			return this.dirty = !1, t
		}), isDragging: !1, justDragged: !1, offset: {x: 0, y: 0}, node: null, _drag: function (t) {
			var e = Konva.DD, i = e.node;
			if (i) {
				if (!e.isDragging) {
					var n = i.getStage().getPointerPosition();
					n || (i.getStage()._setPointerPosition(t), n = i.getStage().getPointerPosition());
					var a = i.dragDistance();
					if (Math.max(Math.abs(n.x - e.startPointerPos.x), Math.abs(n.y - e.startPointerPos.y)) < a)return
				}
				i.getStage()._setPointerPosition(t), i._setDragPosition(t), e.isDragging || (e.isDragging = !0, i.fire("dragstart", {
					type: "dragstart",
					target: i,
					evt: t
				}, !0)), i.fire("dragmove", {type: "dragmove", target: i, evt: t}, !0)
			}
		}, _endDragBefore: function (t) {
			var e, i = Konva.DD, n = i.node;
			n && (e = n.getLayer(), i.anim.stop(), i.isDragging && (i.isDragging = !1, i.justDragged = !0, Konva.listenClickTap = !1, t && (t.dragEndNode = n)), delete i.node, (n.getLayer() || e || n instanceof Konva.Stage) && (e || n).draw())
		}, _endDragAfter: function (t) {
			var e = (t = t || {}).dragEndNode;
			t && e && e.fire("dragend", {type: "dragend", target: e, evt: t}, !0)
		}
	}, Konva.Node.prototype.startDrag = function () {
		var t = Konva.DD, e = this.getStage(), i = this.getLayer(), n = e.getPointerPosition(), a = this.getAbsolutePosition();
		n && (t.node && t.node.stopDrag(), t.node = this, t.startPointerPos = n, t.offset.x = n.x - a.x, t.offset.y = n.y - a.y, t.anim.setLayers(i || this.getLayers()), t.anim.start(), this._setDragPosition())
	}, Konva.Node.prototype._setDragPosition = function (t) {
		var e = Konva.DD, i = this.getStage().getPointerPosition(), n = this.getDragBoundFunc();
		if (i) {
			var a = {x: i.x - e.offset.x, y: i.y - e.offset.y};
			void 0 !== n && (a = n.call(this, a, t)), this.setAbsolutePosition(a), this._lastPos && this._lastPos.x === a.x && this._lastPos.y === a.y || (e.anim.dirty = !0), this._lastPos = a
		}
	}, Konva.Node.prototype.stopDrag = function () {
		var t = Konva.DD, e = {};
		t._endDragBefore(e), t._endDragAfter(e)
	}, Konva.Node.prototype.setDraggable = function (t) {
		this._setAttr("draggable", t), this._dragChange()
	};
	var e = Konva.Node.prototype.remove;
	Konva.Node.prototype.__originalRemove = e, Konva.Node.prototype.remove = function () {
		var t = Konva.DD;
		t.node && t.node._id === this._id && this.stopDrag(), e.call(this)
	}, Konva.Node.prototype.isDragging = function () {
		var t = Konva.DD;
		return !(!t.node || t.node._id !== this._id || !t.isDragging)
	}, Konva.Node.prototype._listenDrag = function () {
		var e = this;
		this._dragCleanup(), "Stage" === this.getClassName() ? this.on("contentMousedown.konva contentTouchstart.konva", function (t) {
			Konva.DD.node || e.startDrag(t)
		}) : this.on("mousedown.konva touchstart.konva", function (t) {
			1 !== t.evt.button && 2 !== t.evt.button && (Konva.DD.node || e.startDrag(t))
		})
	}, Konva.Node.prototype._dragChange = function () {
		if (this.attrs.draggable)this._listenDrag(); else {
			this._dragCleanup();
			var t = this.getStage(), e = Konva.DD;
			t && e.node && e.node._id === this._id && e.node.stopDrag()
		}
	}, Konva.Node.prototype._dragCleanup = function () {
		"Stage" === this.getClassName() ? (this.off("contentMousedown.konva"), this.off("contentTouchstart.konva")) : (this.off("mousedown.konva"), this.off("touchstart.konva"))
	}, Konva.Factory.addGetterSetter(Konva.Node, "dragBoundFunc"), Konva.Factory.addGetter(Konva.Node, "draggable", !1), Konva.Factory.addOverloadedGetterSetter(Konva.Node, "draggable"), Konva.isBrowser && (window.addEventListener("mouseup", Konva.DD._endDragBefore, !0), window.addEventListener("touchend", Konva.DD._endDragBefore, !0), window.addEventListener("mousemove", Konva.DD._drag), window.addEventListener("touchmove", Konva.DD._drag), window.addEventListener("mouseup", Konva.DD._endDragAfter, !1), window.addEventListener("touchend", Konva.DD._endDragAfter, !1))
}(), function () {
	"use strict";
	Konva.Rect = function (t) {
		this.___init(t)
	}, Konva.Rect.prototype = {
		___init: function (t) {
			Konva.Shape.call(this, t), this.className = "Rect", this.sceneFunc(this._sceneFunc)
		}, _sceneFunc: function (t) {
			var e = this.getCornerRadius(), i = this.getWidth(), n = this.getHeight();
			t.beginPath(), e ? (e = Math.min(e, i / 2, n / 2), t.moveTo(e, 0), t.lineTo(i - e, 0), t.arc(i - e, e, e, 3 * Math.PI / 2, 0, !1), t.lineTo(i, n - e), t.arc(i - e, n - e, e, 0, Math.PI / 2, !1), t.lineTo(e, n), t.arc(e, n - e, e, Math.PI / 2, Math.PI, !1), t.lineTo(0, e), t.arc(e, e, e, Math.PI, 3 * Math.PI / 2, !1)) : t.rect(0, 0, i, n), t.closePath(), t.fillStrokeShape(this)
		}
	}, Konva.Util.extend(Konva.Rect, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Rect, "cornerRadius", 0, Konva.Validators.getNumberValidator()), Konva.Collection.mapMethods(Konva.Rect)
}(), function (e) {
	"use strict";
	var i = 2 * Math.PI - 1e-4;
	e.Circle = function (t) {
		this.___init(t)
	}, e.Circle.prototype = {
		_centroid: !0, ___init: function (t) {
			e.Shape.call(this, t), this.className = "Circle", this.sceneFunc(this._sceneFunc)
		}, _sceneFunc: function (t) {
			t.beginPath(), t.arc(0, 0, this.getRadius(), 0, i, !1), t.closePath(), t.fillStrokeShape(this)
		}, getWidth: function () {
			return 2 * this.getRadius()
		}, getHeight: function () {
			return 2 * this.getRadius()
		}, setWidth: function (t) {
			e.Node.prototype.setWidth.call(this, t), this.radius() !== t / 2 && this.setRadius(t / 2)
		}, setHeight: function (t) {
			e.Node.prototype.setHeight.call(this, t), this.radius() !== t / 2 && this.setRadius(t / 2)
		}
	}, e.Util.extend(e.Circle, e.Shape), e.Factory.addGetterSetter(e.Circle, "radius", 0, e.Validators.getNumberValidator()), e.Factory.addOverloadedGetterSetter(e.Circle, "radius"), e.Collection.mapMethods(e.Circle)
}(Konva), function () {
	"use strict";
	var n = 2 * Math.PI - 1e-4;
	Konva.Ellipse = function (t) {
		this.___init(t)
	}, Konva.Ellipse.prototype = {
		_centroid: !0, ___init: function (t) {
			Konva.Shape.call(this, t), this.className = "Ellipse", this.sceneFunc(this._sceneFunc)
		}, _sceneFunc: function (t) {
			var e = this.getRadiusX(), i = this.getRadiusY();
			t.beginPath(), t.save(), e !== i && t.scale(1, i / e), t.arc(0, 0, e, 0, n, !1), t.restore(), t.closePath(), t.fillStrokeShape(this)
		}, getWidth: function () {
			return 2 * this.getRadiusX()
		}, getHeight: function () {
			return 2 * this.getRadiusY()
		}, setWidth: function (t) {
			Konva.Node.prototype.setWidth.call(this, t), this.setRadius({x: t / 2})
		}, setHeight: function (t) {
			Konva.Node.prototype.setHeight.call(this, t), this.setRadius({y: t / 2})
		}
	}, Konva.Util.extend(Konva.Ellipse, Konva.Shape), Konva.Factory.addComponentsGetterSetter(Konva.Ellipse, "radius", ["x", "y"]), Konva.Factory.addGetterSetter(Konva.Ellipse, "radiusX", 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Ellipse, "radiusY", 0, Konva.Validators.getNumberValidator()), Konva.Collection.mapMethods(Konva.Ellipse)
}(), function () {
	"use strict";
	var e = 2 * Math.PI - 1e-4;
	Konva.Ring = function (t) {
		this.___init(t)
	}, Konva.Ring.prototype = {
		_centroid: !0, ___init: function (t) {
			Konva.Shape.call(this, t), this.className = "Ring", this.sceneFunc(this._sceneFunc)
		}, _sceneFunc: function (t) {
			t.beginPath(), t.arc(0, 0, this.getInnerRadius(), 0, e, !1), t.moveTo(this.getOuterRadius(), 0), t.arc(0, 0, this.getOuterRadius(), e, 0, !0), t.closePath(), t.fillStrokeShape(this)
		}, getWidth: function () {
			return 2 * this.getOuterRadius()
		}, getHeight: function () {
			return 2 * this.getOuterRadius()
		}, setWidth: function (t) {
			Konva.Node.prototype.setWidth.call(this, t), this.outerRadius() !== t / 2 && this.setOuterRadius(t / 2)
		}, setHeight: function (t) {
			Konva.Node.prototype.setHeight.call(this, t), this.outerRadius() !== t / 2 && this.setOuterRadius(t / 2)
		}, setOuterRadius: function (t) {
			this._setAttr("outerRadius", t), this.setWidth(2 * t), this.setHeight(2 * t)
		}
	}, Konva.Util.extend(Konva.Ring, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Ring, "innerRadius", 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetter(Konva.Ring, "outerRadius", 0, Konva.Validators.getNumberValidator()), Konva.Factory.addOverloadedGetterSetter(Konva.Ring, "outerRadius"), Konva.Collection.mapMethods(Konva.Ring)
}(), function () {
	"use strict";
	Konva.Wedge = function (t) {
		this.___init(t)
	}, Konva.Wedge.prototype = {
		_centroid: !0, ___init: function (t) {
			Konva.Shape.call(this, t), this.className = "Wedge", this.sceneFunc(this._sceneFunc)
		}, _sceneFunc: function (t) {
			t.beginPath(), t.arc(0, 0, this.getRadius(), 0, Konva.getAngle(this.getAngle()), this.getClockwise()), t.lineTo(0, 0), t.closePath(), t.fillStrokeShape(this)
		}, getWidth: function () {
			return 2 * this.getRadius()
		}, getHeight: function () {
			return 2 * this.getRadius()
		}, setWidth: function (t) {
			Konva.Node.prototype.setWidth.call(this, t), this.radius() !== t / 2 && this.setRadius(t / 2)
		}, setHeight: function (t) {
			Konva.Node.prototype.setHeight.call(this, t), this.radius() !== t / 2 && this.setRadius(t / 2)
		}
	}, Konva.Util.extend(Konva.Wedge, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Wedge, "radius", 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Wedge, "angle", 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Wedge, "clockwise", !1), Konva.Factory.backCompat(Konva.Wedge, {
		angleDeg: "angle",
		getAngleDeg: "getAngle",
		setAngleDeg: "setAngle"
	}), Konva.Collection.mapMethods(Konva.Wedge)
}(), function (n) {
	"use strict";
	n.Arc = function (t) {
		this.___init(t)
	}, n.Arc.prototype = {
		_centroid: !0, ___init: function (t) {
			n.Shape.call(this, t), this.className = "Arc", this.sceneFunc(this._sceneFunc)
		}, _sceneFunc: function (t) {
			var e = n.getAngle(this.angle()), i = this.clockwise();
			t.beginPath(), t.arc(0, 0, this.getOuterRadius(), 0, e, i), t.arc(0, 0, this.getInnerRadius(), e, 0, !i), t.closePath(), t.fillStrokeShape(this)
		}, getWidth: function () {
			return 2 * this.getOuterRadius()
		}, getHeight: function () {
			return 2 * this.getOuterRadius()
		}, setWidth: function (t) {
			n.Node.prototype.setWidth.call(this, t), this.getOuterRadius() !== t / 2 && this.setOuterRadius(t / 2)
		}, setHeight: function (t) {
			n.Node.prototype.setHeight.call(this, t), this.getOuterRadius() !== t / 2 && this.setOuterRadius(t / 2)
		}
	}, n.Util.extend(n.Arc, n.Shape), n.Factory.addGetterSetter(n.Arc, "innerRadius", 0, n.Validators.getNumberValidator()), n.Factory.addGetterSetter(n.Arc, "outerRadius", 0, n.Validators.getNumberValidator()), n.Factory.addGetterSetter(n.Arc, "angle", 0, n.Validators.getNumberValidator()), n.Factory.addGetterSetter(n.Arc, "clockwise", !1), n.Collection.mapMethods(n.Arc)
}(Konva), function () {
	"use strict";
	Konva.Image = function (t) {
		this.___init(t)
	}, Konva.Image.prototype = {
		___init: function (t) {
			Konva.Shape.call(this, t), this.className = "Image", this.sceneFunc(this._sceneFunc), this.hitFunc(this._hitFunc)
		}, _useBufferCanvas: function () {
			return (this.hasShadow() || 1 !== this.getAbsoluteOpacity()) && this.hasStroke() && this.getStage()
		}, _sceneFunc: function (t) {
			var e, i, n, a = this.getWidth(), r = this.getHeight(), o = this.getImage();
			o && (e = this.getCropWidth(), i = this.getCropHeight(), n = e && i ? [o, this.getCropX(), this.getCropY(), e, i, 0, 0, a, r] : [o, 0, 0, a, r]), (this.hasFill() || this.hasStroke()) && (t.beginPath(), t.rect(0, 0, a, r), t.closePath(), t.fillStrokeShape(this)), o && t.drawImage.apply(t, n)
		}, _hitFunc: function (t) {
			var e = this.getWidth(), i = this.getHeight();
			t.beginPath(), t.rect(0, 0, e, i), t.closePath(), t.fillStrokeShape(this)
		}, getWidth: function () {
			var t = this.getImage();
			return this.attrs.width || (t ? t.width : 0)
		}, getHeight: function () {
			var t = this.getImage();
			return this.attrs.height || (t ? t.height : 0)
		}
	}, Konva.Util.extend(Konva.Image, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Image, "image"), Konva.Factory.addComponentsGetterSetter(Konva.Image, "crop", ["x", "y", "width", "height"]), Konva.Factory.addGetterSetter(Konva.Image, "cropX", 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Image, "cropY", 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Image, "cropWidth", 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Image, "cropHeight", 0, Konva.Validators.getNumberValidator()), Konva.Collection.mapMethods(Konva.Image), Konva.Image.fromURL = function (t, e) {
		var i = new Image;
		i.onload = function () {
			var t = new Konva.Image({image: i});
			e(t)
		}, i.crossOrigin = "Anonymous", i.src = t
	}
}(), function () {
	"use strict";
	var t, M = "auto", C = "justify", e = "2d", i = ["fontFamily", "fontSize", "fontStyle", "fontVariant", "padding", "align", "verticalAlign", "lineHeight", "text", "width", "height", "wrap", "ellipsis", "letterSpacing"], n = i.length;

	function k() {
		return t || (t = Konva.Util.createCanvasElement().getContext(e))
	}

	function a(t) {
		t.fillText(this.partialText, 0, 0)
	}

	function r(t) {
		t.strokeText(this.partialText, 0, 0)
	}

	Konva.Text = function (t) {
		this.___init(t)
	}, Konva.Text.prototype = {
		___init: function (t) {
			(t = t || {}).fillLinearGradientColorStops || t.fillRadialGradientColorStops || (t.fill = t.fill || "black"), Konva.Shape.call(this, t), this._fillFunc = a, this._strokeFunc = r, this.className = "Text";
			for (var e = 0; e < n; e++)this.on(i[e] + "Change.konva", this._setTextData);
			this._setTextData(), this.sceneFunc(this._sceneFunc), this.hitFunc(this._hitFunc)
		}, _sceneFunc: function (t) {
			var e, i = this.getPadding(), n = this.getTextHeight(), a = this.getLineHeight() * n, r = this.textArr, o = r.length, s = this.getVerticalAlign(), h = 0, l = this.getAlign(), c = this.getWidth(), d = this.getLetterSpacing(), u = this.textDecoration(), g = this.fill(), f = this.fontSize();
			for (t.setAttr("font", this._getContextFont()), t.setAttr("textBaseline", "middle"), t.setAttr("textAlign", "left"), "middle" === s ? h = (this.getHeight() - o * a - 2 * i) / 2 : "bottom" === s && (h = this.getHeight() - o * a - 2 * i), i ? (t.translate(i, 0), t.translate(0, h + i + a / 2)) : t.translate(0, h + a / 2), e = 0; e < o; e++) {
				var v, p, m, _ = r[e], y = _.text, K = _.width, S = e !== o - 1;
				if (t.save(), "right" === l ? t.translate(c - K - 2 * i, 0) : "center" === l && t.translate((c - K - 2 * i) / 2, 0), -1 !== u.indexOf("underline") && (t.save(), t.beginPath(), t.moveTo(0, Math.round(a / 2)), p = 0 === (v = y.split(" ").length - 1), m = l === C && S && !p ? c - 2 * i : K, t.lineTo(Math.round(m), Math.round(a / 2)), t.lineWidth = f / 15, t.strokeStyle = g, t.stroke(), t.restore()), -1 !== u.indexOf("line-through") && (t.save(), t.beginPath(), t.moveTo(0, 0), p = 0 === (v = y.split(" ").length - 1), m = l === C && S && !p ? c - 2 * i : K, t.lineTo(Math.round(m), 0), t.lineWidth = f / 15, t.strokeStyle = g, t.stroke(), t.restore()), 0 !== d || l === C) {
					v = y.split(" ").length - 1;
					for (var b = 0; b < y.length; b++) {
						var x = y[b];
						" " === x && e !== o - 1 && l === C && t.translate(Math.floor((c - 2 * i - K) / v), 0), this.partialText = x, t.fillStrokeShape(this), t.translate(Math.round(this._getTextSize(x).width) + d, 0)
					}
				} else this.partialText = y, t.fillStrokeShape(this);
				t.restore(), 1 < o && t.translate(0, a)
			}
		}, _hitFunc: function (t) {
			var e = this.getWidth(), i = this.getHeight();
			t.beginPath(), t.rect(0, 0, e, i), t.closePath(), t.fillStrokeShape(this)
		}, setText: function (t) {
			var e = Konva.Util._isString(t) ? t : (t || "").toString();
			return this._setAttr("text", e), this
		}, getWidth: function () {
			return this.attrs.width === M || void 0 === this.attrs.width ? this.getTextWidth() + 2 * this.getPadding() : this.attrs.width
		}, getHeight: function () {
			return this.attrs.height === M || void 0 === this.attrs.height ? this.getTextHeight() * this.textArr.length * this.getLineHeight() + 2 * this.getPadding() : this.attrs.height
		}, getTextWidth: function () {
			return this.textWidth
		}, getTextHeight: function () {
			return this.textHeight
		}, _getTextSize: function (t) {
			var e, i = k(), n = this.getFontSize();
			return i.save(), i.font = this._getContextFont(), e = i.measureText(t), i.restore(), {
				width: e.width,
				height: parseInt(n, 10)
			}
		}, _getContextFont: function () {
			return Konva.UA.isIE ? this.getFontStyle() + " " + this.getFontSize() + "px " + this.getFontFamily() : this.getFontStyle() + " " + this.getFontVariant() + " " + this.getFontSize() + "px " + this.getFontFamily()
		}, _addTextLine: function (t) {
			this.align() === C && (t = t.trim());
			var e = this._getTextWidth(t);
			return this.textArr.push({text: t, width: e})
		}, _getTextWidth: function (t) {
			var e = this.getLetterSpacing(), i = t.length;
			return k().measureText(t).width + (i ? e * (i - 1) : 0)
		}, _setTextData: function () {
			var t = this.getText().split("\n"), e = +this.getFontSize(), i = 0, n = this.getLineHeight() * e, a = this.attrs.width, r = this.attrs.height, o = a !== M, s = r !== M, h = this.getPadding(), l = a - 2 * h, c = r - 2 * h, d = 0, u = this.getWrap(), g = "none" !== u, f = "char" !== u && g, v = this.getEllipsis() && !g;
			this.textArr = [], k().font = this._getContextFont();
			for (var p = 0, m = t.length; p < m; ++p) {
				var _ = t[p], y = v ? this._getTextWidth("…") : 0, K = this._getTextWidth(_);
				if (o && l < K)for (; 0 < _.length;) {
					for (var S = 0, b = _.length, x = "", C = 0; S < b;) {
						var w = S + b >>> 1, F = _.slice(0, w + 1), T = this._getTextWidth(F) + y;
						T <= l ? (S = w + 1, x = F + (v ? "…" : ""), C = T) : b = w
					}
					if (!x)break;
					if (f) {
						var P, A = _[x.length];
						0 < (P = (" " === A || "-" === A) && C <= l ? x.length : Math.max(x.lastIndexOf(" "), x.lastIndexOf("-")) + 1) && (S = P, x = x.slice(0, S), C = this._getTextWidth(x))
					}
					if (x = x.trimRight(), this._addTextLine(x), i = Math.max(i, C), d += n, !g || s && c < d + n)break;
					if (0 < (_ = (_ = _.slice(S)).trimLeft()).length && (K = this._getTextWidth(_)) <= l) {
						this._addTextLine(_), d += n, i = Math.max(i, K);
						break
					}
				} else this._addTextLine(_), d += n, i = Math.max(i, K);
				if (s && c < d + n)break
			}
			this.textHeight = e, this.textWidth = i
		}
	}, Konva.Util.extend(Konva.Text, Konva.Shape), Konva.Factory.addSetter(Konva.Node, "width", Konva.Validators.getNumberOrAutoValidator()), Konva.Factory.addSetter(Konva.Node, "height", Konva.Validators.getNumberOrAutoValidator()), Konva.Factory.addGetterSetter(Konva.Text, "fontFamily", "Arial"), Konva.Factory.addGetterSetter(Konva.Text, "fontSize", 12, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Text, "fontStyle", "normal"), Konva.Factory.addGetterSetter(Konva.Text, "fontVariant", "normal"), Konva.Factory.addGetterSetter(Konva.Text, "padding", 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Text, "align", "left"), Konva.Factory.addGetterSetter(Konva.Text, "verticalAlign", "top"), Konva.Factory.addGetterSetter(Konva.Text, "lineHeight", 1, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Text, "wrap", "word"), Konva.Factory.addGetterSetter(Konva.Text, "ellipsis", !1), Konva.Factory.addGetterSetter(Konva.Text, "letterSpacing", 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetter(Konva.Text, "text", ""), Konva.Factory.addOverloadedGetterSetter(Konva.Text, "text"), Konva.Factory.addGetterSetter(Konva.Text, "textDecoration", ""), Konva.Collection.mapMethods(Konva.Text)
}(), function () {
	"use strict";
	Konva.Line = function (t) {
		this.___init(t)
	}, Konva.Line.prototype = {
		___init: function (t) {
			Konva.Shape.call(this, t), this.className = "Line", this.on("pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva", function () {
				this._clearCache("tensionPoints")
			}), this.sceneFunc(this._sceneFunc)
		}, _sceneFunc: function (t) {
			var e, i, n, a = this.getPoints(), r = a.length, o = this.getTension(), s = this.getClosed(), h = this.getBezier();
			if (r) {
				if (t.beginPath(), t.moveTo(a[0], a[1]), 0 !== o && 4 < r) {
					for (i = (e = this.getTensionPoints()).length, n = s ? 0 : 4, s || t.quadraticCurveTo(e[0], e[1], e[2], e[3]); n < i - 2;)t.bezierCurveTo(e[n++], e[n++], e[n++], e[n++], e[n++], e[n++]);
					s || t.quadraticCurveTo(e[i - 2], e[i - 1], a[r - 2], a[r - 1])
				} else if (h)for (n = 2; n < r;)t.bezierCurveTo(a[n++], a[n++], a[n++], a[n++], a[n++], a[n++]); else for (n = 2; n < r; n += 2)t.lineTo(a[n], a[n + 1]);
				s ? (t.closePath(), t.fillStrokeShape(this)) : t.strokeShape(this)
			}
		}, getTensionPoints: function () {
			return this._getCache("tensionPoints", this._getTensionPoints)
		}, _getTensionPoints: function () {
			return this.getClosed() ? this._getTensionPointsClosed() : Konva.Util._expandPoints(this.getPoints(), this.getTension())
		}, _getTensionPointsClosed: function () {
			var t = this.getPoints(), e = t.length, i = this.getTension(), n = Konva.Util, a = n._getControlPoints(t[e - 2], t[e - 1], t[0], t[1], t[2], t[3], i), r = n._getControlPoints(t[e - 4], t[e - 3], t[e - 2], t[e - 1], t[0], t[1], i), o = Konva.Util._expandPoints(t, i);
			return [a[2], a[3]].concat(o).concat([r[0], r[1], t[e - 2], t[e - 1], r[2], r[3], a[0], a[1], t[0], t[1]])
		}, getWidth: function () {
			return this.getSelfRect().width
		}, getHeight: function () {
			return this.getSelfRect().height
		}, getSelfRect: function () {
			for (var t, e, i, n = (t = 0 !== this.getTension() ? this._getTensionPoints() : this.getPoints())[0], a = t[0], r = t[1], o = t[1], s = 0; s < t.length / 2; s++)e = t[2 * s], i = t[2 * s + 1], n = Math.min(n, e), a = Math.max(a, e), r = Math.min(r, i), o = Math.max(o, i);
			return {x: Math.round(n), y: Math.round(r), width: Math.round(a - n), height: Math.round(o - r)}
		}
	}, Konva.Util.extend(Konva.Line, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Line, "closed", !1), Konva.Factory.addGetterSetter(Konva.Line, "bezier", !1), Konva.Factory.addGetterSetter(Konva.Line, "tension", 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Line, "points", [], Konva.Validators.getNumberArrayValidator()), Konva.Collection.mapMethods(Konva.Line)
}(), function () {
	"use strict";
	Konva.Sprite = function (t) {
		this.___init(t)
	}, Konva.Sprite.prototype = {
		___init: function (t) {
			Konva.Shape.call(this, t), this.className = "Sprite", this._updated = !0;
			var e = this;
			this.anim = new Konva.Animation(function () {
				var t = e._updated;
				return e._updated = !1, t
			}), this.on("animationChange.konva", function () {
				this.frameIndex(0)
			}), this.on("frameIndexChange.konva", function () {
				this._updated = !0
			}), this.on("frameRateChange.konva", function () {
				this.anim.isRunning() && (clearInterval(this.interval), this._setInterval())
			}), this.sceneFunc(this._sceneFunc), this.hitFunc(this._hitFunc)
		}, _sceneFunc: function (t) {
			var e = this.getAnimation(), i = this.frameIndex(), n = 4 * i, a = this.getAnimations()[e], r = this.frameOffsets(), o = a[n + 0], s = a[n + 1], h = a[n + 2], l = a[n + 3], c = this.getImage();
			if ((this.hasFill() || this.hasStroke()) && (t.beginPath(), t.rect(0, 0, h, l), t.closePath(), t.fillStrokeShape(this)), c)if (r) {
				var d = r[e], u = 2 * i;
				t.drawImage(c, o, s, h, l, d[u + 0], d[u + 1], h, l)
			} else t.drawImage(c, o, s, h, l, 0, 0, h, l)
		}, _hitFunc: function (t) {
			var e = this.getAnimation(), i = this.frameIndex(), n = 4 * i, a = this.getAnimations()[e], r = this.frameOffsets(), o = a[n + 2], s = a[n + 3];
			if (t.beginPath(), r) {
				var h = r[e], l = 2 * i;
				t.rect(h[l + 0], h[l + 1], o, s)
			} else t.rect(0, 0, o, s);
			t.closePath(), t.fillShape(this)
		}, _useBufferCanvas: function () {
			return (this.hasShadow() || 1 !== this.getAbsoluteOpacity()) && this.hasStroke()
		}, _setInterval: function () {
			var t = this;
			this.interval = setInterval(function () {
				t._updateIndex()
			}, 1e3 / this.getFrameRate())
		}, start: function () {
			if (!this.isRunning()) {
				var t = this.getLayer();
				this.anim.setLayers(t), this._setInterval(), this.anim.start()
			}
		}, stop: function () {
			this.anim.stop(), clearInterval(this.interval)
		}, isRunning: function () {
			return this.anim.isRunning()
		}, _updateIndex: function () {
			var t = this.frameIndex(), e = this.getAnimation();
			t < this.getAnimations()[e].length / 4 - 1 ? this.frameIndex(t + 1) : this.frameIndex(0)
		}
	}, Konva.Util.extend(Konva.Sprite, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Sprite, "animation"), Konva.Factory.addGetterSetter(Konva.Sprite, "animations"), Konva.Factory.addGetterSetter(Konva.Sprite, "frameOffsets"), Konva.Factory.addGetterSetter(Konva.Sprite, "image"), Konva.Factory.addGetterSetter(Konva.Sprite, "frameIndex", 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Sprite, "frameRate", 17, Konva.Validators.getNumberValidator()), Konva.Factory.backCompat(Konva.Sprite, {
		index: "frameIndex",
		getIndex: "getFrameIndex",
		setIndex: "setFrameIndex"
	}), Konva.Collection.mapMethods(Konva.Sprite)
}(), function () {
	"use strict";
	Konva.Path = function (t) {
		this.___init(t)
	}, Konva.Path.prototype = {
		___init: function (t) {
			this.dataArray = [];
			var e = this;
			Konva.Shape.call(this, t), this.className = "Path", this.dataArray = Konva.Path.parsePathData(this.getData());
			for (var i = this.pathLength = 0; i < this.dataArray.length; ++i)this.pathLength += this.dataArray[i].pathLength;
			this.on("dataChange.konva", function () {
				e.dataArray = Konva.Path.parsePathData(this.getData());
				for (var t = this.pathLength = 0; t < this.dataArray.length; ++t)this.pathLength += this.dataArray[t].pathLength
			}), this.sceneFunc(this._sceneFunc)
		}, _sceneFunc: function (t) {
			var e = this.dataArray;
			t.beginPath();
			for (var i = 0; i < e.length; i++) {
				var n = e[i].command, a = e[i].points;
				switch (n) {
					case"L":
						t.lineTo(a[0], a[1]);
						break;
					case"M":
						t.moveTo(a[0], a[1]);
						break;
					case"C":
						t.bezierCurveTo(a[0], a[1], a[2], a[3], a[4], a[5]);
						break;
					case"Q":
						t.quadraticCurveTo(a[0], a[1], a[2], a[3]);
						break;
					case"A":
						var r = a[0], o = a[1], s = a[2], h = a[3], l = a[4], c = a[5], d = a[6], u = a[7], g = h < s ? s : h, f = h < s ? 1 : s / h, v = h < s ? h / s : 1;
						t.translate(r, o), t.rotate(d), t.scale(f, v), t.arc(0, 0, g, l, l + c, 1 - u), t.scale(1 / f, 1 / v), t.rotate(-d), t.translate(-r, -o);
						break;
					case"z":
						t.closePath()
				}
			}
			t.fillStrokeShape(this)
		}, getSelfRect: function () {
			var e = [];
			this.dataArray.forEach(function (t) {
				e = e.concat(t.points)
			});
			for (var t, i, n = e[0], a = e[0], r = e[1], o = e[1], s = 0; s < e.length / 2; s++)t = e[2 * s], i = e[2 * s + 1], isNaN(t) || (n = Math.min(n, t), a = Math.max(a, t)), isNaN(i) || (r = Math.min(r, i), o = Math.max(o, i));
			return {x: Math.round(n), y: Math.round(r), width: Math.round(a - n), height: Math.round(o - r)}
		}, getLength: function () {
			return this.pathLength
		}, getPointAtLength: function (t) {
			var e, i = 0, n = this.dataArray.length;
			if (!n)return null;
			for (; i < n && t > this.dataArray[i].pathLength;)t -= this.dataArray[i].pathLength, ++i;
			if (i === n)return {x: (e = this.dataArray[i - 1].points.slice(-2))[0], y: e[1]};
			if (t < .01)return {x: (e = this.dataArray[i].points.slice(0, 2))[0], y: e[1]};
			var a = this.dataArray[i], r = a.points;
			switch (a.command) {
				case"L":
					return Konva.Path.getPointOnLine(t, a.start.x, a.start.y, r[0], r[1]);
				case"C":
					return Konva.Path.getPointOnCubicBezier(t / a.pathLength, a.start.x, a.start.y, r[0], r[1], r[2], r[3], r[4], r[5]);
				case"Q":
					return Konva.Path.getPointOnQuadraticBezier(t / a.pathLength, a.start.x, a.start.y, r[0], r[1], r[2], r[3]);
				case"A":
					var o = r[0], s = r[1], h = r[2], l = r[3], c = r[4], d = r[5], u = r[6];
					return c += d * t / a.pathLength, Konva.Path.getPointOnEllipticalArc(o, s, h, l, c, u)
			}
			return null
		}
	}, Konva.Util.extend(Konva.Path, Konva.Shape), Konva.Path.getLineLength = function (t, e, i, n) {
		return Math.sqrt((i - t) * (i - t) + (n - e) * (n - e))
	}, Konva.Path.getPointOnLine = function (t, e, i, n, a, r, o) {
		void 0 === r && (r = e), void 0 === o && (o = i);
		var s = (a - i) / (n - e + 1e-8), h = Math.sqrt(t * t / (1 + s * s));
		n < e && (h *= -1);
		var l, c = s * h;
		if (n === e)l = {x: r, y: o + c}; else if ((o - i) / (r - e + 1e-8) === s)l = {
			x: r + h,
			y: o + c
		}; else {
			var d, u, g = this.getLineLength(e, i, n, a);
			if (g < 1e-8)return;
			var f = (r - e) * (n - e) + (o - i) * (a - i);
			d = e + (f /= g * g) * (n - e), u = i + f * (a - i);
			var v = this.getLineLength(r, o, d, u), p = Math.sqrt(t * t - v * v);
			h = Math.sqrt(p * p / (1 + s * s)), n < e && (h *= -1), l = {x: d + h, y: u + (c = s * h)}
		}
		return l
	}, Konva.Path.getPointOnCubicBezier = function (t, e, i, n, a, r, o, s, h) {
		function l(t) {
			return t * t * t
		}

		function c(t) {
			return 3 * t * t * (1 - t)
		}

		function d(t) {
			return 3 * t * (1 - t) * (1 - t)
		}

		function u(t) {
			return (1 - t) * (1 - t) * (1 - t)
		}

		return {x: s * l(t) + r * c(t) + n * d(t) + e * u(t), y: h * l(t) + o * c(t) + a * d(t) + i * u(t)}
	}, Konva.Path.getPointOnQuadraticBezier = function (t, e, i, n, a, r, o) {
		function s(t) {
			return t * t
		}

		function h(t) {
			return 2 * t * (1 - t)
		}

		function l(t) {
			return (1 - t) * (1 - t)
		}

		return {x: r * s(t) + n * h(t) + e * l(t), y: o * s(t) + a * h(t) + i * l(t)}
	}, Konva.Path.getPointOnEllipticalArc = function (t, e, i, n, a, r) {
		var o = Math.cos(r), s = Math.sin(r), h = i * Math.cos(a), l = n * Math.sin(a);
		return {x: t + (h * o - l * s), y: e + (h * s + l * o)}
	}, Konva.Path.parsePathData = function (t) {
		if (!t)return [];
		var e = t, i = ["m", "M", "l", "L", "v", "V", "h", "H", "z", "Z", "c", "C", "q", "Q", "t", "T", "s", "S", "a", "A"];
		e = e.replace(new RegExp(" ", "g"), ",");
		for (var n = 0; n < i.length; n++)e = e.replace(new RegExp(i[n], "g"), "|" + i[n]);
		var a, r = e.split("|"), o = [], s = [], h = 0, l = 0, c = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
		for (n = 1; n < r.length; n++) {
			var d = r[n], u = d.charAt(0);
			for (d = d.slice(1), s.length = 0; a = c.exec(d);)s.push(a[0]);
			for (var g = [], f = 0, v = s.length; f < v; f++) {
				var p = parseFloat(s[f]);
				isNaN(p) ? g.push(0) : g.push(p)
			}
			for (; 0 < g.length && !isNaN(g[0]);) {
				var m, _, y, K, S, b, x, C, w, F, T = null, P = [], A = h, M = l;
				switch (u) {
					case"l":
						h += g.shift(), l += g.shift(), T = "L", P.push(h, l);
						break;
					case"L":
						h = g.shift(), l = g.shift(), P.push(h, l);
						break;
					case"m":
						var k = g.shift(), G = g.shift();
						if (h += k, l += G, T = "M", 2 < o.length && "z" === o[o.length - 1].command)for (var N = o.length - 2; 0 <= N; N--)if ("M" === o[N].command) {
							h = o[N].points[0] + k, l = o[N].points[1] + G;
							break
						}
						P.push(h, l), u = "l";
						break;
					case"M":
						h = g.shift(), l = g.shift(), T = "M", P.push(h, l), u = "L";
						break;
					case"h":
						h += g.shift(), T = "L", P.push(h, l);
						break;
					case"H":
						h = g.shift(), T = "L", P.push(h, l);
						break;
					case"v":
						l += g.shift(), T = "L", P.push(h, l);
						break;
					case"V":
						l = g.shift(), T = "L", P.push(h, l);
						break;
					case"C":
						P.push(g.shift(), g.shift(), g.shift(), g.shift()), h = g.shift(), l = g.shift(), P.push(h, l);
						break;
					case"c":
						P.push(h + g.shift(), l + g.shift(), h + g.shift(), l + g.shift()), h += g.shift(), l += g.shift(), T = "C", P.push(h, l);
						break;
					case"S":
						_ = h, y = l, "C" === (m = o[o.length - 1]).command && (_ = h + (h - m.points[2]), y = l + (l - m.points[3])), P.push(_, y, g.shift(), g.shift()), h = g.shift(), l = g.shift(), T = "C", P.push(h, l);
						break;
					case"s":
						_ = h, y = l, "C" === (m = o[o.length - 1]).command && (_ = h + (h - m.points[2]), y = l + (l - m.points[3])), P.push(_, y, h + g.shift(), l + g.shift()), h += g.shift(), l += g.shift(), T = "C", P.push(h, l);
						break;
					case"Q":
						P.push(g.shift(), g.shift()), h = g.shift(), l = g.shift(), P.push(h, l);
						break;
					case"q":
						P.push(h + g.shift(), l + g.shift()), h += g.shift(), l += g.shift(), T = "Q", P.push(h, l);
						break;
					case"T":
						_ = h, y = l, "Q" === (m = o[o.length - 1]).command && (_ = h + (h - m.points[0]), y = l + (l - m.points[1])), h = g.shift(), l = g.shift(), T = "Q", P.push(_, y, h, l);
						break;
					case"t":
						_ = h, y = l, "Q" === (m = o[o.length - 1]).command && (_ = h + (h - m.points[0]), y = l + (l - m.points[1])), h += g.shift(), l += g.shift(), T = "Q", P.push(_, y, h, l);
						break;
					case"A":
						K = g.shift(), S = g.shift(), b = g.shift(), x = g.shift(), C = g.shift(), w = h, F = l, h = g.shift(), l = g.shift(), T = "A", P = this.convertEndpointToCenterParameterization(w, F, h, l, x, C, K, S, b);
						break;
					case"a":
						K = g.shift(), S = g.shift(), b = g.shift(), x = g.shift(), C = g.shift(), w = h, F = l, h += g.shift(), l += g.shift(), T = "A", P = this.convertEndpointToCenterParameterization(w, F, h, l, x, C, K, S, b)
				}
				o.push({command: T || u, points: P, start: {x: A, y: M}, pathLength: this.calcLength(A, M, T || u, P)})
			}
			"z" !== u && "Z" !== u || o.push({command: "z", points: [], start: void 0, pathLength: 0})
		}
		return o
	}, Konva.Path.calcLength = function (t, e, i, n) {
		var a, r, o, s, h = Konva.Path;
		switch (i) {
			case"L":
				return h.getLineLength(t, e, n[0], n[1]);
			case"C":
				for (a = 0, r = h.getPointOnCubicBezier(0, t, e, n[0], n[1], n[2], n[3], n[4], n[5]), s = .01; s <= 1; s += .01)o = h.getPointOnCubicBezier(s, t, e, n[0], n[1], n[2], n[3], n[4], n[5]), a += h.getLineLength(r.x, r.y, o.x, o.y), r = o;
				return a;
			case"Q":
				for (a = 0, r = h.getPointOnQuadraticBezier(0, t, e, n[0], n[1], n[2], n[3]), s = .01; s <= 1; s += .01)o = h.getPointOnQuadraticBezier(s, t, e, n[0], n[1], n[2], n[3]), a += h.getLineLength(r.x, r.y, o.x, o.y), r = o;
				return a;
			case"A":
				a = 0;
				var l = n[4], c = n[5], d = n[4] + c, u = Math.PI / 180;
				if (Math.abs(l - d) < u && (u = Math.abs(l - d)), r = h.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], l, 0), c < 0)for (s = l - u; d < s; s -= u)o = h.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], s, 0), a += h.getLineLength(r.x, r.y, o.x, o.y), r = o; else for (s = l + u; s < d; s += u)o = h.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], s, 0), a += h.getLineLength(r.x, r.y, o.x, o.y), r = o;
				return o = h.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], d, 0), a += h.getLineLength(r.x, r.y, o.x, o.y)
		}
		return 0
	}, Konva.Path.convertEndpointToCenterParameterization = function (t, e, i, n, a, r, o, s, h) {
		var l = h * (Math.PI / 180), c = Math.cos(l) * (t - i) / 2 + Math.sin(l) * (e - n) / 2, d = -1 * Math.sin(l) * (t - i) / 2 + Math.cos(l) * (e - n) / 2, u = c * c / (o * o) + d * d / (s * s);
		1 < u && (o *= Math.sqrt(u), s *= Math.sqrt(u));
		var g = Math.sqrt((o * o * (s * s) - o * o * (d * d) - s * s * (c * c)) / (o * o * (d * d) + s * s * (c * c)));
		a === r && (g *= -1), isNaN(g) && (g = 0);
		var f = g * o * d / s, v = g * -s * c / o, p = (t + i) / 2 + Math.cos(l) * f - Math.sin(l) * v, m = (e + n) / 2 + Math.sin(l) * f + Math.cos(l) * v, _ = function (t) {
			return Math.sqrt(t[0] * t[0] + t[1] * t[1])
		}, y = function (t, e) {
			return (t[0] * e[0] + t[1] * e[1]) / (_(t) * _(e))
		}, K = function (t, e) {
			return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(y(t, e))
		}, S = K([1, 0], [(c - f) / o, (d - v) / s]), b = [(c - f) / o, (d - v) / s], x = [(-1 * c - f) / o, (-1 * d - v) / s], C = K(b, x);
		return y(b, x) <= -1 && (C = Math.PI), 1 <= y(b, x) && (C = 0), 0 === r && 0 < C && (C -= 2 * Math.PI), 1 === r && C < 0 && (C += 2 * Math.PI), [p, m, o, s, S, C, l, r]
	}, Konva.Factory.addGetterSetter(Konva.Path, "data"), Konva.Collection.mapMethods(Konva.Path)
}(), function () {
	"use strict";
	function i(t) {
		t.fillText(this.partialText, 0, 0)
	}

	function n(t) {
		t.strokeText(this.partialText, 0, 0)
	}

	Konva.TextPath = function (t) {
		this.___init(t)
	}, Konva.TextPath.prototype = {
		___init: function (t) {
			var e = this;
			this.dummyCanvas = Konva.Util.createCanvasElement(), this.dataArray = [], this.getKerning = t && t.getKerning, Konva.Shape.call(this, t), this._fillFunc = i, this._strokeFunc = n, this._fillFuncHit = i, this._strokeFuncHit = n, this.className = "TextPath", this.dataArray = Konva.Path.parsePathData(this.attrs.data), this.on("dataChange.konva", function () {
				e.dataArray = Konva.Path.parsePathData(this.attrs.data), e._setTextData()
			}), this.on("textChange.konva alignChange.konva letterSpacingChange.konva", e._setTextData), e._setTextData(), this.sceneFunc(this._sceneFunc), this.hitFunc(this._hitFunc)
		}, _sceneFunc: function (t) {
			t.setAttr("font", this._getContextFont()), t.setAttr("textBaseline", this.getTextBaseline()), t.setAttr("textAlign", "left"), t.save();
			var e = this.textDecoration(), i = this.fill(), n = this.fontSize(), a = this.glyphInfo;
			"underline" === e && t.beginPath();
			for (var r = 0; r < a.length; r++) {
				t.save();
				var o = a[r].p0;
				t.translate(o.x, o.y), t.rotate(a[r].rotation), this.partialText = a[r].text, t.fillStrokeShape(this), "underline" === e && (0 === r && t.moveTo(0, n / 2 + 1), t.lineTo(n, n / 2 + 1)), t.restore()
			}
			"underline" === e && (t.strokeStyle = i, t.lineWidth = n / 20, t.stroke()), t.restore()
		}, _hitFunc: function (t) {
			t.beginPath();
			var e = this.glyphInfo;
			if (1 <= e.length) {
				var i = e[0].p0;
				t.moveTo(i.x, i.y)
			}
			for (var n = 0; n < e.length; n++) {
				var a = e[n].p1;
				t.lineTo(a.x, a.y)
			}
			t.setAttr("lineWidth", this.getFontSize()), t.setAttr("strokeStyle", this.colorKey), t.stroke()
		}, getTextWidth: function () {
			return this.textWidth
		}, getTextHeight: function () {
			return this.textHeight
		}, setText: function (t) {
			Konva.Text.prototype.setText.call(this, t)
		}, _getTextSize: function (t) {
			var e = this.dummyCanvas.getContext("2d");
			e.save(), e.font = this._getContextFont();
			var i = e.measureText(t);
			return e.restore(), {width: i.width, height: parseInt(this.attrs.fontSize, 10)}
		}, _setTextData: function () {
			var l = this, t = this._getTextSize(this.attrs.text), c = this.getLetterSpacing(), d = this.align();
			this.textWidth = t.width, this.textHeight = t.height;
			var u = Math.max(this.textWidth + ((this.attrs.text || "").length - 1) * c, 0);
			this.glyphInfo = [];
			for (var g = 0, e = 0; e < l.dataArray.length; e++)0 < l.dataArray[e].pathLength && (g += l.dataArray[e].pathLength);
			var i = 0;
			"center" === d && (i = Math.max(0, g / 2 - u / 2)), "right" === d && (i = Math.max(0, g - u));
			for (var f, v, p, n = this.getText().split(""), m = this.getText().split(" ").length - 1, a = -1, _ = 0, y = function () {
				_ = 0;
				for (var t = l.dataArray, e = a + 1; e < t.length; e++) {
					if (0 < t[e].pathLength)return t[a = e];
					"M" === t[e].command && (f = {x: t[e].points[0], y: t[e].points[1]})
				}
				return {}
			}, r = function (t) {
				var e = l._getTextSize(t).width + c;
				" " === t && "justify" === d && (e += (g - u) / m);
				var i = 0, n = 0;
				for (v = void 0; .01 < Math.abs(e - i) / e && n < 25;) {
					n++;
					for (var a = i; void 0 === p;)(p = y()) && a + p.pathLength < e && (a += p.pathLength, p = void 0);
					if (p === {} || void 0 === f)return;
					var r = !1;
					switch (p.command) {
						case"L":
							Konva.Path.getLineLength(f.x, f.y, p.points[0], p.points[1]) > e ? v = Konva.Path.getPointOnLine(e, f.x, f.y, p.points[0], p.points[1], f.x, f.y) : p = void 0;
							break;
						case"A":
							var o = p.points[4], s = p.points[5], h = p.points[4] + s;
							0 === _ ? _ = o + 1e-8 : i < e ? _ += Math.PI / 180 * s / Math.abs(s) : _ -= Math.PI / 360 * s / Math.abs(s), (s < 0 && _ < h || 0 <= s && h < _) && (_ = h, r = !0), v = Konva.Path.getPointOnEllipticalArc(p.points[0], p.points[1], p.points[2], p.points[3], _, p.points[6]);
							break;
						case"C":
							0 === _ ? _ = e > p.pathLength ? 1e-8 : e / p.pathLength : i < e ? _ += (e - i) / p.pathLength : _ -= (i - e) / p.pathLength, 1 < _ && (_ = 1, r = !0), v = Konva.Path.getPointOnCubicBezier(_, p.start.x, p.start.y, p.points[0], p.points[1], p.points[2], p.points[3], p.points[4], p.points[5]);
							break;
						case"Q":
							0 === _ ? _ = e / p.pathLength : i < e ? _ += (e - i) / p.pathLength : _ -= (i - e) / p.pathLength, 1 < _ && (_ = 1, r = !0), v = Konva.Path.getPointOnQuadraticBezier(_, p.start.x, p.start.y, p.points[0], p.points[1], p.points[2], p.points[3])
					}
					void 0 !== v && (i = Konva.Path.getLineLength(f.x, f.y, v.x, v.y)), r && (r = !1, p = void 0)
				}
			}, o = l._getTextSize("C").width + c, s = 0; s < i / o && (r("C"), void 0 !== f && void 0 !== v); s++)f = v;
			for (var h = 0; h < n.length && (r(n[h]), void 0 !== f && void 0 !== v); h++) {
				var K = Konva.Path.getLineLength(f.x, f.y, v.x, v.y), S = 0;
				if (this.getKerning)try {S = this.getKerning(n[h - 1], n[h]) * this.fontSize()} catch (t) {S = 0}
				f.x += S, v.x += S, this.textWidth += S;
				var b = Konva.Path.getPointOnLine(S + K / 2, f.x, f.y, v.x, v.y), x = Math.atan2(v.y - f.y, v.x - f.x);
				this.glyphInfo.push({transposeX: b.x, transposeY: b.y, text: n[h], rotation: x, p0: f, p1: v}), f = v
			}
		}, getSelfRect: function () {
			var e = [];
			this.glyphInfo.forEach(function (t) {
				e.push(t.p0.x), e.push(t.p0.y), e.push(t.p1.x), e.push(t.p1.y)
			});
			for (var t, i, n = e[0], a = e[0], r = e[0], o = e[0], s = 0; s < e.length / 2; s++)t = e[2 * s], i = e[2 * s + 1], n = Math.min(n, t), a = Math.max(a, t), r = Math.min(r, i), o = Math.max(o, i);
			var h = this.fontSize();
			return {
				x: Math.round(n) - h / 2,
				y: Math.round(r) - h / 2,
				width: Math.round(a - n) + h,
				height: Math.round(o - r) + h
			}
		}
	}, Konva.TextPath.prototype._getContextFont = Konva.Text.prototype._getContextFont, Konva.Util.extend(Konva.TextPath, Konva.Shape), Konva.Factory.addGetterSetter(Konva.TextPath, "data"), Konva.Factory.addGetterSetter(Konva.TextPath, "fontFamily", "Arial"), Konva.Factory.addGetterSetter(Konva.TextPath, "fontSize", 12, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.TextPath, "fontStyle", "normal"), Konva.Factory.addGetterSetter(Konva.TextPath, "align", "left"), Konva.Factory.addGetterSetter(Konva.TextPath, "letterSpacing", 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.TextPath, "textBaseline", "middle"), Konva.Factory.addGetterSetter(Konva.TextPath, "fontVariant", "normal"), Konva.Factory.addGetter(Konva.TextPath, "text", ""), Konva.Factory.addGetterSetter(Konva.TextPath, "textDecoration", null), Konva.Collection.mapMethods(Konva.TextPath)
}(), function () {
	"use strict";
	Konva.RegularPolygon = function (t) {
		this.___init(t)
	}, Konva.RegularPolygon.prototype = {
		_centroid: !0, ___init: function (t) {
			Konva.Shape.call(this, t), this.className = "RegularPolygon", this.sceneFunc(this._sceneFunc)
		}, _sceneFunc: function (t) {
			var e, i, n, a = this.attrs.sides, r = this.attrs.radius;
			for (t.beginPath(), t.moveTo(0, 0 - r), e = 1; e < a; e++)i = r * Math.sin(2 * e * Math.PI / a), n = -1 * r * Math.cos(2 * e * Math.PI / a), t.lineTo(i, n);
			t.closePath(), t.fillStrokeShape(this)
		}, getWidth: function () {
			return 2 * this.getRadius()
		}, getHeight: function () {
			return 2 * this.getRadius()
		}, setWidth: function (t) {
			Konva.Node.prototype.setWidth.call(this, t), this.radius() !== t / 2 && this.setRadius(t / 2)
		}, setHeight: function (t) {
			Konva.Node.prototype.setHeight.call(this, t), this.radius() !== t / 2 && this.setRadius(t / 2)
		}
	}, Konva.Util.extend(Konva.RegularPolygon, Konva.Shape), Konva.Factory.addGetterSetter(Konva.RegularPolygon, "radius", 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.RegularPolygon, "sides", 0, Konva.Validators.getNumberValidator()), Konva.Collection.mapMethods(Konva.RegularPolygon)
}(), function () {
	"use strict";
	Konva.Star = function (t) {
		this.___init(t)
	}, Konva.Star.prototype = {
		_centroid: !0, ___init: function (t) {
			Konva.Shape.call(this, t), this.className = "Star", this.sceneFunc(this._sceneFunc)
		}, _sceneFunc: function (t) {
			var e = this.innerRadius(), i = this.outerRadius(), n = this.numPoints();
			t.beginPath(), t.moveTo(0, 0 - i);
			for (var a = 1; a < 2 * n; a++) {
				var r = a % 2 == 0 ? i : e, o = r * Math.sin(a * Math.PI / n), s = -1 * r * Math.cos(a * Math.PI / n);
				t.lineTo(o, s)
			}
			t.closePath(), t.fillStrokeShape(this)
		}, getWidth: function () {
			return 2 * this.getOuterRadius()
		}, getHeight: function () {
			return 2 * this.getOuterRadius()
		}, setWidth: function (t) {
			Konva.Node.prototype.setWidth.call(this, t), this.outerRadius() !== t / 2 && this.setOuterRadius(t / 2)
		}, setHeight: function (t) {
			Konva.Node.prototype.setHeight.call(this, t), this.outerRadius() !== t / 2 && this.setOuterRadius(t / 2)
		}
	}, Konva.Util.extend(Konva.Star, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Star, "numPoints", 5, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Star, "innerRadius", 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Star, "outerRadius", 0, Konva.Validators.getNumberValidator()), Konva.Collection.mapMethods(Konva.Star)
}(), function () {
	"use strict";
	var a = ["fontFamily", "fontSize", "fontStyle", "padding", "lineHeight", "text", "width"], l = "right", c = "down", d = "left", r = a.length;
	Konva.Label = function (t) {
		this.____init(t)
	}, Konva.Label.prototype = {
		____init: function (t) {
			var e = this;
			Konva.Group.call(this, t), this.className = "Label", this.on("add.konva", function (t) {
				e._addListeners(t.child), e._sync()
			})
		}, getText: function () {
			return this.find("Text")[0]
		}, getTag: function () {
			return this.find("Tag")[0]
		}, _addListeners: function (t) {
			var e, i = this, n = function () {
				i._sync()
			};
			for (e = 0; e < r; e++)t.on(a[e] + "Change.konva", n)
		}, getWidth: function () {
			return this.getText().getWidth()
		}, getHeight: function () {
			return this.getText().getHeight()
		}, _sync: function () {
			var t, e, i, n, a, r, o, s = this.getText(), h = this.getTag();
			if (s && h) {
				switch (t = s.getWidth(), e = s.getHeight(), i = h.getPointerDirection(), n = h.getPointerWidth(), o = h.getPointerHeight(), r = a = 0, i) {
					case"up":
						a = t / 2, r = -1 * o;
						break;
					case l:
						a = t + n, r = e / 2;
						break;
					case c:
						a = t / 2, r = e + o;
						break;
					case d:
						a = -1 * n, r = e / 2
				}
				h.setAttrs({x: -1 * a, y: -1 * r, width: t, height: e}), s.setAttrs({x: -1 * a, y: -1 * r})
			}
		}
	}, Konva.Util.extend(Konva.Label, Konva.Group), Konva.Collection.mapMethods(Konva.Label), Konva.Tag = function (t) {
		this.___init(t)
	}, Konva.Tag.prototype = {
		___init: function (t) {
			Konva.Shape.call(this, t), this.className = "Tag", this.sceneFunc(this._sceneFunc)
		}, _sceneFunc: function (t) {
			var e = this.getWidth(), i = this.getHeight(), n = this.getPointerDirection(), a = this.getPointerWidth(), r = this.getPointerHeight(), o = Math.min(this.getCornerRadius(), e / 2, i / 2);
			t.beginPath(), o ? t.moveTo(o, 0) : t.moveTo(0, 0), "up" === n && (t.lineTo((e - a) / 2, 0), t.lineTo(e / 2, -1 * r), t.lineTo((e + a) / 2, 0)), o ? (t.lineTo(e - o, 0), t.arc(e - o, o, o, 3 * Math.PI / 2, 0, !1)) : t.lineTo(e, 0), n === l && (t.lineTo(e, (i - r) / 2), t.lineTo(e + a, i / 2), t.lineTo(e, (i + r) / 2)), o ? (t.lineTo(e, i - o), t.arc(e - o, i - o, o, 0, Math.PI / 2, !1)) : t.lineTo(e, i), n === c && (t.lineTo((e + a) / 2, i), t.lineTo(e / 2, i + r), t.lineTo((e - a) / 2, i)), o ? (t.lineTo(o, i), t.arc(o, i - o, o, Math.PI / 2, Math.PI, !1)) : t.lineTo(0, i), n === d && (t.lineTo(0, (i + r) / 2), t.lineTo(-1 * a, i / 2), t.lineTo(0, (i - r) / 2)), o && (t.lineTo(0, o), t.arc(o, o, o, Math.PI, 3 * Math.PI / 2, !1)), t.closePath(), t.fillStrokeShape(this)
		}, getSelfRect: function () {
			var t = 0, e = 0, i = this.getPointerWidth(), n = this.getPointerHeight(), a = this.pointerDirection(), r = this.getWidth(), o = this.getHeight();
			return "up" === a ? (e -= n, o += n) : a === c ? o += n : a === d ? (t -= 1.5 * i, r += i) : a === l && (r += 1.5 * i), {
				x: t,
				y: e,
				width: r,
				height: o
			}
		}
	}, Konva.Util.extend(Konva.Tag, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Tag, "pointerDirection", "none"), Konva.Factory.addGetterSetter(Konva.Tag, "pointerWidth", 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Tag, "pointerHeight", 0, Konva.Validators.getNumberValidator()), Konva.Factory.addGetterSetter(Konva.Tag, "cornerRadius", 0, Konva.Validators.getNumberValidator()), Konva.Collection.mapMethods(Konva.Tag)
}(), function (u) {
	"use strict";
	u.Arrow = function (t) {
		this.____init(t)
	}, u.Arrow.prototype = {
		____init: function (t) {
			u.Line.call(this, t), this.className = "Arrow"
		}, _sceneFunc: function (t) {
			u.Line.prototype._sceneFunc.apply(this, arguments);
			var e = 2 * Math.PI, i = this.points(), n = i, a = 0 !== this.getTension() && 4 < i.length;
			a && (n = this.getTensionPoints());
			var r, o, s = i.length;
			a ? (r = i[s - 2] - n[s - 2], o = i[s - 1] - n[s - 1]) : (r = i[s - 2] - i[s - 4], o = i[s - 1] - i[s - 3]);
			var h = (Math.atan2(o, r) + e) % e, l = this.pointerLength(), c = this.pointerWidth();
			t.save(), t.beginPath(), t.translate(i[s - 2], i[s - 1]), t.rotate(h), t.moveTo(0, 0), t.lineTo(-l, c / 2), t.lineTo(-l, -c / 2), t.closePath(), t.restore(), this.pointerAtBeginning() && (t.save(), t.translate(i[0], i[1]), a ? (r = n[0] - i[0], o = n[1] - i[1]) : (r = i[2] - i[0], o = i[3] - i[1]), t.rotate((Math.atan2(-o, -r) + e) % e), t.moveTo(0, 0), t.lineTo(-l, c / 2), t.lineTo(-l, -c / 2), t.closePath(), t.restore());
			var d = this.dashEnabled();
			d && (this.attrs.dashEnabled = !1, t.setLineDash([])), t.fillStrokeShape(this), d && (this.attrs.dashEnabled = !0)
		}
	}, u.Util.extend(u.Arrow, u.Line), u.Factory.addGetterSetter(u.Arrow, "pointerLength", 10, u.Validators.getNumberValidator()), u.Factory.addGetterSetter(u.Arrow, "pointerWidth", 10, u.Validators.getNumberValidator()), u.Factory.addGetterSetter(u.Arrow, "pointerAtBeginning", !1), u.Collection.mapMethods(u.Arrow)
}(Konva), function (G) {
	"use strict";
	var e = ["resizeEnabledChange", "rotateAnchorOffsetChange", "rotateEnabledChange", "enabledAnchorsChange", "anchorSizeChange", "borderEnabledChange", "borderStrokeChange", "borderStrokeWidthChange", "anchorStrokeChange", "anchorStrokeWidthChange", "anchorFillChange"].join(" "), t = "nodeRect", i = ["xChange.resizer", "yChange.resizer", "widthChange.resizer", "heightChange.resizer", "scaleXChange.resizer", "scaleYChange.resizer", "skewXChange.resizer", "skewYChange.resizer", "rotationChange.resizer", "offsetXChange.resizer", "offsetYChange.resizer", "transformsEnabledChange.resizer"].join(" "), n = ["widthChange.resizer", "heightChange.resizer", "scaleXChange.resizer", "scaleYChange.resizer", "skewXChange.resizer", "skewYChange.resizer", "rotationChange.resizer", "offsetXChange.resizer", "offsetYChange.resizer"].join(" "), s = {
		"top-left": -45,
		"top-center": 0,
		"top-right": 45,
		"middle-right": -90,
		"middle-left": 90,
		"bottom-left": -135,
		"bottom-center": 180,
		"bottom-right": 135
	};
	G.Transformer = function (t) {
		this.____init(t)
	};
	var a = ["top-left", "top-center", "top-right", "middle-right", "middle-left", "bottom-left", "bottom-center", "bottom-right"];
	G.Transformer.prototype = {
		_centroid: !1, ____init: function (t) {
			G.Group.call(this, t), this.className = "Transformer", this._createElements(), this._handleMouseMove = this._handleMouseMove.bind(this), this._handleMouseUp = this._handleMouseUp.bind(this), this.update = this.update.bind(this), this.on(e, this.update), this.getNode() && this.update()
		}, attachTo: function (t) {
			this.setNode(t)
		}, setNode: function (t) {
			return this._node && this.detach(), this._node = t, this._resetTransformCache(), t.on(i, this._resetTransformCache.bind(this)), t.on(n, function () {
				this._transforming || this.update()
			}.bind(this)), !!this.findOne(".top-left") && this.update(), this
		}, getNode: function () {
			return this._node
		}, detach: function () {
			this.getNode() && (this.getNode().off(".resizer"), this._node = void 0), this._resetTransformCache()
		}, _resetTransformCache: function () {
			this._clearCache(t), this._clearCache("transform"), this._clearSelfAndDescendantCache("absoluteTransform")
		}, _getNodeRect: function () {
			return this._getCache(t, this.__getNodeRect)
		}, __getNodeRect: function () {
			var t = this.getNode();
			if (!t)return {x: -Number.MAX_SAFE_INTEGER, y: -Number.MAX_SAFE_INTEGER, width: 0, height: 0, rotation: 0};
			var e = t.getClientRect({skipTransform: !0}), i = G.getAngle(t.rotation()), n = e.x * t.scaleX() - t.offsetX() * t.scaleX(), a = e.y * t.scaleY() - t.offsetY() * t.scaleY();
			return {
				x: t.x() + n * Math.cos(i) + a * Math.sin(-i),
				y: t.y() + a * Math.cos(i) + n * Math.sin(i),
				width: e.width * t.scaleX(),
				height: e.height * t.scaleY(),
				rotation: t.rotation()
			}
		}, getX: function () {
			return this._getNodeRect().x
		}, getY: function () {
			return this._getNodeRect().y
		}, getRotation: function () {
			return this._getNodeRect().rotation
		}, getWidth: function () {
			return this._getNodeRect().width
		}, getHeight: function () {
			return this._getNodeRect().height
		}, _createElements: function () {
			this._createBack(), a.forEach(function (t) {
				this._createAnchor(t)
			}.bind(this)), this._createAnchor("rotater")
		}, _createAnchor: function (r) {
			var o = new G.Rect({
				stroke: "rgb(0, 161, 255)",
				fill: "white",
				strokeWidth: 1,
				name: r + " _anchor",
				dragDistance: 0,
				draggable: !0
			}), e = this;
			o.on("mousedown touchstart", function (t) {
				e._handleMouseDown(t)
			}), o.on("dragstart", function (t) {
				t.cancelBubble = !0
			}), o.on("dragmove", function (t) {
				t.cancelBubble = !0
			}), o.on("dragend", function (t) {
				t.cancelBubble = !0
			}), o.on("mouseenter", function () {
				var t = this.getParent(), e = G.getAngle(t.rotation()), i = t.getNode().getAbsoluteScale(), n = i.y * i.x < 0, a = function (t, e, i) {
					if ("rotater" === t)return "crosshair";
					e += G.Util._degToRad(s[t] || 0), i && (e *= -1);
					var n = (G.Util._radToDeg(e) % 360 + 360) % 360;
					return G.Util._inRange(n, 337.5, 360) || G.Util._inRange(n, 0, 22.5) ? "ns-resize" : G.Util._inRange(n, 22.5, 67.5) ? "nesw-resize" : G.Util._inRange(n, 67.5, 112.5) ? "ew-resize" : G.Util._inRange(n, 112.5, 157.5) ? "nwse-resize" : G.Util._inRange(n, 157.5, 202.5) ? "ns-resize" : G.Util._inRange(n, 202.5, 247.5) ? "nesw-resize" : G.Util._inRange(n, 247.5, 292.5) ? "ew-resize" : G.Util._inRange(n, 292.5, 337.5) ? "nwse-resize" : (G.Util.error("Transformer has unknown angle for cursor detection: " + n), "pointer")
				}(r, e, n);
				o.getStage().content.style.cursor = a, t._cursorChange = !0
			}), o.on("mouseout", function () {
				o.getStage() && this.getParent() && (o.getStage().content.style.cursor = "", this.getParent()._cursorChange = !1)
			}), this.add(o)
		}, _createBack: function () {
			var t = new G.Shape({
				name: "back", width: 0, height: 0, listening: !1, sceneFunc: function (t) {
					var e = this.getParent(), i = e.getPadding();
					t.beginPath(), t.rect(-i, -i, this.width() + 2 * i, this.height() + 2 * i), t.moveTo(this.width() / 2, -i), e.rotateEnabled() && t.lineTo(this.width() / 2, -e.rotateAnchorOffset() * G.Util._sign(this.height())), t.fillStrokeShape(this)
				}
			});
			this.add(t)
		}, _handleMouseDown: function (t) {
			this.movingResizer = t.target.name().split(" ")[0];
			var e = this._getNodeRect(), i = e.width, n = e.height, a = Math.sqrt(Math.pow(i, 2) + Math.pow(n, 2));
			this.sin = n / a, this.cos = i / a, window.addEventListener("mousemove", this._handleMouseMove), window.addEventListener("touchmove", this._handleMouseMove), window.addEventListener("mouseup", this._handleMouseUp, !0), window.addEventListener("touchend", this._handleMouseUp, !0), this._transforming = !0, this._fire("transformstart", {evt: t}), this.getNode()._fire("transformstart", {evt: t})
		}, _handleMouseMove: function (t) {
			var e, i, n, a = this.findOne("." + this.movingResizer), r = a.getStage().getContent().getBoundingClientRect(), o = r.left, s = r.top, h = {
				x: (void 0 !== t.clientX ? t.clientX : t.touches[0].clientX) - o,
				y: (void 0 !== t.clientX ? t.clientY : t.touches[0].clientY) - s
			};
			a.setAbsolutePosition(h);
			var l = this.keepRatio() || t.shiftKey;
			if ("top-left" === this.movingResizer)l && (e = (n = Math.sqrt(Math.pow(this.findOne(".bottom-right").x() - a.x(), 2) + Math.pow(this.findOne(".bottom-right").y() - a.y(), 2))) * this.cos, i = n * this.sin, this.findOne(".top-left").x(this.findOne(".bottom-right").x() - e), this.findOne(".top-left").y(this.findOne(".bottom-right").y() - i)); else if ("top-center" === this.movingResizer)this.findOne(".top-left").y(a.y()); else if ("top-right" === this.movingResizer) {
				l && (e = (n = Math.sqrt(Math.pow(this.findOne(".bottom-left").x() - a.x(), 2) + Math.pow(this.findOne(".bottom-left").y() - a.y(), 2))) * this.cos, i = n * this.sin, this.findOne(".top-right").x(e), this.findOne(".top-right").y(this.findOne(".bottom-left").y() - i));
				var c = a.position();
				this.findOne(".top-left").y(c.y), this.findOne(".bottom-right").x(c.x)
			} else if ("middle-left" === this.movingResizer)this.findOne(".top-left").x(a.x()); else if ("middle-right" === this.movingResizer)this.findOne(".bottom-right").x(a.x()); else if ("bottom-left" === this.movingResizer)l && (e = (n = Math.sqrt(Math.pow(this.findOne(".top-right").x() - a.x(), 2) + Math.pow(this.findOne(".top-right").y() - a.y(), 2))) * this.cos, i = n * this.sin, this.findOne(".bottom-left").x(this.findOne(".top-right").x() - e), this.findOne(".bottom-left").y(i)), c = a.position(), this.findOne(".top-left").x(c.x), this.findOne(".bottom-right").y(c.y); else if ("bottom-center" === this.movingResizer)this.findOne(".bottom-right").y(a.y()); else if ("bottom-right" === this.movingResizer)l && (e = (n = Math.sqrt(Math.pow(this.findOne(".bottom-right").x(), 2) + Math.pow(this.findOne(".bottom-right").y(), 2))) * this.cos, i = n * this.sin, this.findOne(".bottom-right").x(e), this.findOne(".bottom-right").y(i)); else if ("rotater" === this.movingResizer) {
				var d = this.getPadding(), u = this._getNodeRect();
				e = a.x() - u.width / 2, i = -a.y() + u.height / 2;
				var g = Math.atan2(-i, e) + Math.PI / 2;
				u.height < 0 && (g -= Math.PI);
				for (var f = G.getAngle(this.rotation()), v = G.Util._radToDeg(f) + G.Util._radToDeg(g), p = G.getAngle(this.getNode().rotation()), m = G.Util._degToRad(v), _ = this.rotationSnaps(), y = 0; y < _.length; y++) {
					var K = G.getAngle(_[y]);
					Math.abs(K - G.Util._degToRad(v)) % (2 * Math.PI) < .1 && (v = G.Util._radToDeg(K), m = G.Util._degToRad(v))
				}
				var S = d, b = d;
				this._fitNodeInto({
					rotation: G.angleDeg ? v : G.Util._degToRad(v),
					x: u.x + (u.width / 2 + d) * (Math.cos(p) - Math.cos(m)) + (u.height / 2 + d) * (Math.sin(-p) - Math.sin(-m)) - (S * Math.cos(f) + b * Math.sin(-f)),
					y: u.y + (u.height / 2 + d) * (Math.cos(p) - Math.cos(m)) + (u.width / 2 + d) * (Math.sin(p) - Math.sin(m)) - (b * Math.cos(f) + S * Math.sin(f)),
					width: u.width + 2 * d,
					height: u.height + 2 * d
				}, t)
			} else console.error(new Error("Wrong position argument of selection resizer: ", this.movingResizer));
			if ("rotater" !== this.movingResizer) {
				var x = this.findOne(".top-left").getAbsolutePosition(this.getParent());
				if (this.getCenteredScaling() || t.altKey) {
					var C = this.findOne(".top-left"), w = this.findOne(".bottom-right"), F = C.x(), T = C.y(), P = this.getWidth() - w.x(), A = this.getHeight() - w.y();
					console.log(F, T, P, A), w.move({x: -F, y: -T}), C.move({
						x: P,
						y: A
					}), x = C.getAbsolutePosition(this.getParent())
				}
				e = x.x, i = x.y;
				var M = this.findOne(".bottom-right").x() - this.findOne(".top-left").x(), k = this.findOne(".bottom-right").y() - this.findOne(".top-left").y();
				this._fitNodeInto({x: e + this.offsetX(), y: i + this.offsetY(), width: M, height: k}, t)
			}
		}, _handleMouseUp: function (t) {
			this._removeEvents(t)
		}, _removeEvents: function (t) {
			if (this._transforming) {
				this._transforming = !1, window.removeEventListener("mousemove", this._handleMouseMove), window.removeEventListener("touchmove", this._handleMouseMove), window.removeEventListener("mouseup", this._handleMouseUp, !0), window.removeEventListener("touchend", this._handleMouseUp, !0), this._fire("transformend", {evt: t});
				var e = this.getNode();
				e && e.fire("transformend", {evt: t})
			}
		}, _fitNodeInto: function (t, e) {
			var i = this.getBoundBoxFunc();
			if (i) {
				var n = this._getNodeRect();
				t = i.call(this, n, t)
			}
			this._settings = !0;
			var a = this.getNode();
			void 0 !== t.rotation && this.getNode().rotation(t.rotation);
			var r = a.getClientRect({skipTransform: !0}), o = this.getPadding(), s = (t.width - 2 * o) / r.width, h = (t.height - 2 * o) / r.height, l = G.getAngle(a.getRotation()), c = r.x * s - o - a.offsetX() * s, d = r.y * h - o - a.offsetY() * h;
			this.getNode().setAttrs({
				scaleX: s,
				scaleY: h,
				x: t.x - (c * Math.cos(l) + d * Math.sin(-l)),
				y: t.y - (d * Math.cos(l) + c * Math.sin(l))
			}), this._settings = !1, this._fire("transform", {evt: e}), this.getNode()._fire("transform", {evt: e}), this.update(), this.getLayer().batchDraw()
		}, forceUpdate: function () {
			this._resetTransformCache(), this.update()
		}, update: function () {
			var t = this._getNodeRect(), e = this.getNode(), i = {x: 1, y: 1};
			e && e.getParent() && (i = e.getParent().getAbsoluteScale());
			var n = {
				x: 1 / i.x,
				y: 1 / i.y
			}, a = t.width, r = t.height, o = this.enabledAnchors(), s = this.resizeEnabled(), h = this.getPadding(), l = this.getAnchorSize();
			this.find("._anchor").setAttrs({
				width: l,
				height: l,
				offsetX: l / 2,
				offsetY: l / 2,
				stroke: this.getAnchorStroke(),
				strokeWidth: this.getAnchorStrokeWidth(),
				fill: this.getAnchorFill()
			}), this.findOne(".top-left").setAttrs({
				x: -h,
				y: -h,
				scale: n,
				visible: s && 0 <= o.indexOf("top-left")
			}), this.findOne(".top-center").setAttrs({
				x: a / 2,
				y: -h,
				scale: n,
				visible: s && 0 <= o.indexOf("top-center")
			}), this.findOne(".top-right").setAttrs({
				x: a + h,
				y: -h,
				scale: n,
				visible: s && 0 <= o.indexOf("top-right")
			}), this.findOne(".middle-left").setAttrs({
				x: -h,
				y: r / 2,
				scale: n,
				visible: s && 0 <= o.indexOf("middle-left")
			}), this.findOne(".middle-right").setAttrs({
				x: a + h,
				y: r / 2,
				scale: n,
				visible: s && 0 <= o.indexOf("middle-right")
			}), this.findOne(".bottom-left").setAttrs({
				x: -h,
				y: r + h,
				scale: n,
				visible: s && 0 <= o.indexOf("bottom-left")
			}), this.findOne(".bottom-center").setAttrs({
				x: a / 2,
				y: r + h,
				scale: n,
				visible: s && 0 <= o.indexOf("bottom-center")
			}), this.findOne(".bottom-right").setAttrs({
				x: a + h,
				y: r + h,
				scale: n,
				visible: s && 0 <= o.indexOf("bottom-right")
			});
			var c = -this.rotateAnchorOffset() * Math.abs(n.y);
			this.findOne(".rotater").setAttrs({
				x: a / 2,
				y: c * G.Util._sign(r),
				scale: n,
				visible: this.rotateEnabled()
			}), this.findOne(".back").setAttrs({
				width: a * i.x,
				height: r * i.y,
				scale: n,
				visible: this.borderEnabled(),
				stroke: this.getBorderStroke(),
				strokeWidth: this.getBorderStrokeWidth(),
				dash: this.getBorderDash()
			})
		}, isTransforming: function () {
			return this._transforming
		}, stopTransform: function () {
			if (this._transforming) {
				this._removeEvents();
				var t = this.findOne("." + this.movingResizer);
				t && t.stopDrag()
			}
		}, destroy: function () {
			this.getStage() && this._cursorChange && (this.getStage().content.style.cursor = ""), G.Group.prototype.destroy.call(this), this.detach(), this._removeEvents()
		}, toObject: function () {
			return G.Node.prototype.toObject.call(this)
		}
	}, G.Util.extend(G.Transformer, G.Group), G.Factory.addGetterSetter(G.Transformer, "enabledAnchors", a, function (t) {
		return t instanceof Array || G.Util.warn("enabledAnchors value should be an array"), t instanceof Array && t.forEach(function (t) {
			-1 === a.indexOf(t) && G.Util.warn("Unknown anchor name: " + t + ". Available names are: " + a.join(", "))
		}), t || []
	}), G.Factory.addGetterSetter(G.Transformer, "resizeEnabled", !0), G.Factory.addGetterSetter(G.Transformer, "anchorSize", 10, G.Validators.getNumberValidator()), G.Factory.addGetterSetter(G.Transformer, "rotateEnabled", !0), G.Factory.addGetterSetter(G.Transformer, "rotationSnaps", []), G.Factory.addGetterSetter(G.Transformer, "rotateAnchorOffset", 50, G.Validators.getNumberValidator()), G.Factory.addGetterSetter(G.Transformer, "borderEnabled", !0), G.Factory.addGetterSetter(G.Transformer, "anchorStroke", "rgb(0, 161, 255)"), G.Factory.addGetterSetter(G.Transformer, "anchorStrokeWidth", 1, G.Validators.getNumberValidator()), G.Factory.addGetterSetter(G.Transformer, "anchorFill", "white"), G.Factory.addGetterSetter(G.Transformer, "borderStroke", "rgb(0, 161, 255)"), G.Factory.addGetterSetter(G.Transformer, "borderStrokeWidth", 1, G.Validators.getNumberValidator()), G.Factory.addGetterSetter(G.Transformer, "borderDash"), G.Factory.addGetterSetter(G.Transformer, "keepRatio", !0), G.Factory.addGetterSetter(G.Transformer, "centeredScaling", !1), G.Factory.addGetterSetter(G.Transformer, "padding", 0, G.Validators.getNumberValidator()), G.Factory.addOverloadedGetterSetter(G.Transformer, "node"), G.Factory.addGetterSetter(G.Transformer, "boundBoxFunc"), G.Factory.backCompat(G.Transformer, {
		lineEnabled: "borderEnabled",
		rotateHandlerOffset: "rotateAnchorOffset",
		enabledHandlers: "enabledAnchors"
	}), G.Collection.mapMethods(G.Transformer)
}(Konva);