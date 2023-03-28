// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
//导入store
import store from './store'

//全局引入
// import MintUI from 'mint-ui'; //导入 mint-ui
// Vue.use(MintUI)//使用mint-ui
// import 'mint-ui/lib/style.css';//导入全局css

//按需引入
import {Button} from 'mint-ui'//导入组件
import VueLazyload from 'vue-lazyload'
import loading from './common/img/loading.gif'
Vue.use(VueLazyload, {
loading
}) 
Vue.component(Button.name, Button)//注册组件

Vue.config.productionTip = false

//屏蔽重复使用路由
const originalReplace= VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location) {
    return originalReplace.call(this, location).catch(err => err)
}

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
    return originalPush.call(this, location).catch(err => err)
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
