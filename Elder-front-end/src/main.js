import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ViewUIPlus from 'view-ui-plus'
// import 'view-ui-plus/dist/styles/viewuiplus.css'

import ViewUI from 'view-design'
import '../my-theme/index.less'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入 axios
import axios from 'axios'

// 挂载一个自定义属性$http
Vue.prototype.$http = axios

Vue.use(ViewUI);
Vue.use(ElementUI);
// Vue.use(ViewUIPlus);

import config from './config'
Vue.prototype.$config = config;

Vue.config.productionTip = false
// import * as echarts from 'echarts'
// //局部或全局定义
// Vue.prototype.$echarts = echarts


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// import { createApp } from 'vue'
// import ViewUIPlus from 'view-ui-plus'
// import App from './App.vue'
// import router from './router'
// import store from './store'
// import 'view-ui-plus/dist/styles/viewuiplus.css'
//
// const app = createApp(App)
//
// app.use(store)
//     .use(router)
//     .use(ViewUIPlus)
//     .mount('#app')