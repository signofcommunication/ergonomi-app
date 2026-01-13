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
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to) => {
    const requiresAuth = to.matched.some((r) => r.meta?.requiresAuth === true);
    if (!requiresAuth) return true;

    await getAuthReady();

    if (auth.currentUser) return true;

    return {
      path: '/login',
      query: { redirect: to.fullPath },
    };
  });

  return Router;
});
