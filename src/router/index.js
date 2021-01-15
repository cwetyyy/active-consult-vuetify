import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Clients from '../views/Clients.vue'
import Login from '../views/Login.vue'
import ClientAccount from '../views/ClientAccount.vue'
import Documents from '../views/Documents.vue'
import AccountingCalendar from '../views/AccountingCalendar.vue'
import ArchivedDocuments from '../views/ArchivedDocuments.vue'
import ClientDocuments from '../views/ClientDocuments.vue'
import ClientEvents from '../views/ClientEvents.vue'
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
    path: '/client/:id/events',
    name: 'ClientEvents',
    component: ClientEvents,
    meta: {requiresAuth: true}
  },
  {
    path: '/client/:id/documents',
    name: 'ClientDocuments',
    component: ClientDocuments,
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
  },
  {
    path: '/client-account/:id',
    name: 'ClientAccount',
    component: ClientAccount,
    meta: {requiresAuth: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

import mixins from '../mixins/global'

router.beforeEach((to, from, next) => {
  const user = mixins.methods.getLoggedUser()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if(requiresAuth && (!isAuthenticated || !user)){
    next("/login");
  } else {
    next();
  }
})

export default router
