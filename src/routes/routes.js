import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Loggin from "@/pages/Loggin.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import Register from "@/pages/Register.vue";
import auth from '@/logic/auth' 


Vue.use(VueRouter);

const routes = [
    {
      path: "/loggin",
      name: "Loggin",
      component: Loggin
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/",
      component: DashboardLayout,
      redirect: "/dashboard",
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Dashboard,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "user",
          name: "User Profile",
          component: UserProfile,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "table",
          name: "Table List",
          component: TableList,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "icons",
          name: "Icons",
          component: Icons,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "maps",
          name: "Maps",
          meta: {
            hideFooter: true,
            requiresAuth: true
          },
          component: Maps
        },
        {
          path: "notifications",
          name: "Notifications",
          component: Notifications,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "upgrade",
          name: "Upgrade to PRO",
          component: UpgradeToPRO,
          meta: {
            requiresAuth: true
          }
        },
      ]
    }
  ];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {


  if (to.matched.some(record => record.meta.requiresAuth) && !auth.isLoggedIn()) {   
    next({
      path: '/loggin',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
});
export default router;