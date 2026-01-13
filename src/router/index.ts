import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { auth } from 'src/boot/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from 'stores/user';
import { createPinia } from 'pinia';

function getAuthReady(): Promise<void> {
  return new Promise((resolve) => {
    const stop = onAuthStateChanged(auth, () => {
      stop();
      resolve();
    });
  });
}

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Ensure Pinia exists for guards (in case boot order differs)
  const pinia = createPinia();

  Router.beforeEach(async (to) => {
    const requiresAuth = to.matched.some((r) => r.meta?.requiresAuth === true);
    if (!requiresAuth) return true;

    // Wait for Firebase auth to hydrate (important on refresh / mobile)
    await getAuthReady();

    const isFirebaseLoggedIn = !!auth.currentUser;
    if (isFirebaseLoggedIn) return true;

    // Fallback to local state (useful during development)
    const userStore = useUserStore(pinia);
    if (userStore.isLoggedIn) return true;

    return {
      path: '/login',
      query: { redirect: to.fullPath },
    };
  });

  return Router;
});
