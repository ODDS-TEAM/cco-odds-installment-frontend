import Vue from 'vue'
import VueRouter from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
import IndividualLoan from '../views/IndividualLoan.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "DashBoard",
    component: DashBoard
  },
  {
    path: "/loans",
    name: "Loans",
    component: DashBoard
  },
  {
    path: "/loans/:id",
    name: "IndividualLoan",
    component: IndividualLoan
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
