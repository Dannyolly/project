import Vue from 'vue'
import App from './App.vue'
import router from './router'
//組件...element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入less
import less from 'less'
//font圖標..
import '../../exercise/fontawesome-free-5.15.2-web/css/all.css'
//axios 請求...
import axios from 'axios'
axios.defaults.withCredentials=true;
Vue.prototype.$axios=axios;
Vue.use(less);
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
