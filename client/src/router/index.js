import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from "@/components/Login"
import SignOut from "@/components/SignOut"
import Form from "@/components/Form"
import Dashboard from "@/components/Dashboard"
import firebase from "firebase"

Vue.use(Router)

// how do you hit different routes
var router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/signout',
      name: 'Signout',
      component: SignOut
    },
    {
      path: '/form',
      name: 'Form',
      component: Form
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Check for requiredAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NOT logged in
    if (!firebase.auth().currentUser) {
      console.log("you are not logged in yet")
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      console.log("yes, you login already")
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      console.log("you are not guest because you have logged in")
      next({
        path: '/dashboard',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;