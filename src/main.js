import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app'
import 'firebase/auth'
import JsonExcel from "vue-json-excel";
 
Vue.config.productionTip = false

Vue.component("downloadExcel", JsonExcel);

// let app;
// firebase.auth().onAuthStateChanged(user => {
//   console.log(user);
//   if(!app) {
//     app = createApp(App).use(store).use(router).mount('#app')
//   }
// });

let app;
firebase.auth().onAuthStateChanged(user => {
  console.log(user);
  if(!app) {
    app = new Vue({
        router,
        store, 
        vuetify,
        render: h => h(App)
      }).$mount('#app') 
  }
});

// new Vue({
//   router,
//   store, 
//   vuetify,
//   render: h => h(App)
// }).$mount('#app') 
