import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Clients from '../views/Clients.vue'
import Login from '../views/Login.vue'
import Documents from '../views/Documents.vue'
import AccountingCalendar from '../views/AccountingCalendar.vue'
import ArchivedDocuments from '../views/ArchivedDocuments.vue'
import firebase from 'firebase'
require('firebase/auth');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {requiresAuth: true}
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Clients,
    meta: {requiresAuth: true}
  },
  {
    path: '/accounting-calendar',
    name: 'AccountingCalendar',
    component: AccountingCalendar,
    meta: {requiresAuth: true}
  },
  {
    path: '/documents',
    name: 'Documents',
    component: Documents,
    meta: {requiresAuth: true}
  },
  {
    path: '/archived-documents',
    name: 'ArchivedDocuments',
    component: ArchivedDocuments,
    meta: {requiresAuth: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { hideNavigation: true } // Route meta field used to Hide the Navigation on this route
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if(requiresAuth && !isAuthenticated){
    next("/login");
  } else {
    next();
  }
})

export default router
