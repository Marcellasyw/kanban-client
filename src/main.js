import Vue from 'vue';
import App from './App.vue';
import VueSweetalert2 from 'vue-sweetalert2';
import { LoaderPlugin } from 'vue-google-login';


Vue.use(VueSweetalert2);
Vue.use(LoaderPlugin, {
  client_id: "535236340893-os9slvac221sa575pimv5gl7qf73n35u.apps.googleusercontent.com"
});

new Vue({
  render: h => h(App),
}).$mount('#app');