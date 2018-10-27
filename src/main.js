import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import Websocket from 'websocket'
//Vue.use(Websocket)
Vue.use(Element)
// import Require from 'async-validator/lib'
// Vue.use(Require)
// 引用路由
import VueRouter from 'vue-router'
// 光引用不成，还得使用

Vue.use(VueRouter)
// 引用路由配置文件
import routes from './config/routes'
// 使用配置文件规则
const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {
	if (from.path.indexOf(to.path) == -1) {
		next();
	} else {
		next(false);
	}
})
new Vue({
	router,
	el: '#app',
	render: h => h(App)
})
