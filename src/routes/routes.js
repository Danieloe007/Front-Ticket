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
import Cookies from 'js-cookie';


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

function isTokenExpired(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  const payload = JSON.parse(jsonPayload);
  const expirationDate = new Date(payload.exp * 1000);

  return expirationDate < new Date();
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Obtén el usuario y el token de la cookie
    const userLogged = Cookies.get('userLogged');
    if (userLogged) {
      const user = JSON.parse(userLogged);
      if (user && user.token) {
        // Comprueba si el token está vencido
        if (!isTokenExpired(user.token)) {
          next();
        } else {
          next({ path: '/loggin', query: { redirect: to.fullPath } });
        }
      } else {
        next({ path: '/loggin', query: { redirect: to.fullPath } });
      }
    } else {
      next({ path: '/loggin', query: { redirect: to.fullPath } });
    }
  } else {
    next();  // Si la ruta no requiere autenticación, sigue adelante
  }
});
export default router;