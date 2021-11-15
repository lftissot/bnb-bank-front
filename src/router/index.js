import { createRouter, createWebHashHistory } from "vue-router";
import Banking from "../views/Banking/Banking.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Register from "../views/Register.vue";
import Expenses from "../views/Banking/Expenses.vue";
import ExpensesForm from "../views/Banking/ExpensesForm.vue";
import IncomesForm from "../views/Banking/IncomesForm.vue";
import Incomes from "../views/Banking/Incomes.vue";
import Transactions from "../views/Banking/Transactions.vue";
import Admin from "../views/Admin/Admin.vue";
import ListPendingIncomes from "../views/Admin/ListPendingIncomes.vue";
import IncomeDetails from "../views/Admin/IncomeDetails.vue";
import store from "@/store/index";

/*import Accepted from "../views/Banking/Incomes/Accepted.vue";
import Denied from "../views/Banking/Incomes/Denied.vue";
import Pending from "../views/Banking/Incomes/Pending.vue";*/

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      skipAuth: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      skipAuth: true,
    },
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
    meta: {
      skipAuth: true,
    },
  },
  {
    path: "/banking",
    name: "Banking",
    component: Banking,
    children: [
      {
        path: "transactions",
        name: "Transactions",
        component: Transactions,
      },
      {
        path: "expenses",
        name: "Expenses",
        component: Expenses,
      },
      {
        path: "expenses/new",
        name: "ExpensesForm",
        component: ExpensesForm,
      },
      {
        path: "incomes",
        name: "Incomes",
        component: Incomes,
        children: [
          /*{
            path: "accepted",
            name: "Accepted",
            component: Accepted,
          },
          {
            path: "pending",
            name: "Pending",
            component: Pending,
          },
          {
            path: "denied",
            name: "Denied",
            component: Denied,
          },*/
        ],
      },
      {
        path: "incomes/new",
        name: "IncomesForm",
        component: IncomesForm,
      },
    ],
  },
  {
    name: "Admin",
    path: "/admin",
    component: Admin,
    meta: {
      adminOnly: true,
    },
    children: [
      {
        path: "pending",
        name: "ListPendingIncomes",
        component: ListPendingIncomes,
      },
      {
        path: "pending/:id",
        name: "IncomeDetails",
        component: IncomeDetails,
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const shouldAuthenticate = !to.meta.skipAuth;
  const loggedIn = store.state.auth.token != null;

  if (shouldAuthenticate && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
