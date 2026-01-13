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
import { getUserProfile } from 'src/services/firebase/users';

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
    const requiresAdmin = to.matched.some((r) => r.meta?.requiresAdmin === true);

    if (!requiresAuth && !requiresAdmin) return true;

    await getAuthReady();

    const currentUser = auth.currentUser;

    // Not logged in
    if (!currentUser) {
      // Fallback to local state (useful during development)
      const userStore = useUserStore(pinia);
      if (!userStore.isLoggedIn) {
        return { path: '/login', query: { redirect: to.fullPath } };
      }

      // If local state says logged in but Firebase doesn't, force re-login.
      return { path: '/login', query: { redirect: to.fullPath } };
    }

    // Read user profile from Firestore (no auto-write)
    const profile = await getUserProfile(currentUser.uid);

    // If user doc missing, treat as blocked until admin provisions it.
    if (!profile) {
      return { path: '/login', query: { reason: 'no-profile' } };
    }

    // Inactive users cannot access protected routes
    if (!profile.isActive) {
      return { path: '/login', query: { reason: 'inactive' } };
    }

    // Admin-only gating when meta.requiresAdmin is present
    if (requiresAdmin && profile.role !== 'admin') {
      return { path: '/dashboard' };
    }

    return true;
  });

  return Router;
});
