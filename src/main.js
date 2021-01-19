import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import {
	Button,
	FormModel,
	Input,
	Select,
	Cascader,
	Message,
	Statistic,
	Checkbox,
	Tabs,
	AutoComplete,
	DatePicker,
	ConfigProvider,
	Icon,
	Upload,
	Table,
	Breadcrumb,
	Steps,
	Popconfirm,
	Menu,
	Modal,
	Layout,
} from "ant-design-vue"
Vue.use(Button)
Vue.use(FormModel)
Vue.use(Input)
Vue.use(Select)
Vue.use(Cascader)
Vue.use(Statistic)
Vue.use(Checkbox)
Vue.use(Tabs)
Vue.use(AutoComplete)
Vue.use(DatePicker)
Vue.use(ConfigProvider)
Vue.use(Icon)
Vue.use(Upload)
Vue.use(Table)
Vue.use(Breadcrumb)
Vue.use(Steps)
Vue.use(Popconfirm)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(Layout)
Vue.prototype.$message = Message
Vue.prototype.$confirm = Modal.confirm
Number.prototype.toRound = function(num) {
	//保留两位小数的方法
	return Math.round(this * Math.pow(10, num)) / Math.pow(10, num)
}
import api from "./api"

Array.prototype.find ||
	(Array.prototype.find = function(predicate) {
		if (this == null) {
			throw new TypeError("Array.prototype.find called on null or undefined")
		}
		if (typeof predicate !== "function") {
			throw new TypeError("predicate must be a function")
		}
		var list = Object(this)
		var length = list.length || 0
		var thisArg = arguments[1]
		var value

		for (var i = 0; i < length; i++) {
			value = list[i]
			if (predicate.call(thisArg, value, i, list)) {
				return value
			}
		}
		return null
	})
router.beforeEach((to, from, next) => {
	document.body.scrollTop = 0
	// firefox
	document.documentElement.scrollTop = 0
	// safari
	window.pageYOffset = 0
	next()
})

// Vue.use(Calendar)
Vue.config.productionTip = false
Vue.prototype.$api = api

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app")
