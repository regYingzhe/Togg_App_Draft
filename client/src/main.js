// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/services/firebaseInit';
import firebase from "firebase";



var app;
Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})

/* eslint-disable no-new */
