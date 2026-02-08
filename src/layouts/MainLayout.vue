<template>
  <q-layout view="lHh Lpr lFf" class="custom-layout">
    <q-header elevated class="gradient-header">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="flex items-center">
          <!-- <q-icon name="favorite" size="sm" class="q-mr-sm" /> -->
          <span class="text-weight-medium"></span>
        </q-toolbar-title>

        <div v-if="userStore.isLoggedIn" class="user-badge">
          <q-icon name="account_circle" size="sm" class="q-mr-xs" />
          <span class="text-body2">{{ userStore.username }}</span>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="custom-drawer">
      <div class="drawer-header q-pa-md">
        <div class="text-h6 text-white">Menu</div>
        <div class="text-caption text-white">Navigasi Aplikasi</div>
      </div>

      <q-list class="q-pt-md">
        <q-item clickable @click="navigateTo('/dashboard')" v-close-popup class="menu-item">
          <q-item-section avatar>
            <q-icon name="dashboard" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable @click="navigateTo('/materi')" v-close-popup class="menu-item">
          <q-item-section avatar>
            <q-icon name="book" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Materi</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable @click="navigateTo('/assessment')" v-close-popup class="menu-item">
          <q-item-section avatar>
            <q-icon name="quiz" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Penilaian</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable @click="navigateTo('/latihan')" v-close-popup class="menu-item">
          <q-item-section avatar>
            <q-icon name="fitness_center" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Latihan</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable @click="navigateTo('/progress')" v-close-popup class="menu-item">
          <q-item-section avatar>
            <q-icon name="bar_chart" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Progress</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item
          v-if="isAuthenticated"
          clickable
          @click="handleLogout"
          v-close-popup
          class="menu-item logout-item"
        >
          <q-item-section avatar>
            <q-icon name="logout" color="negative" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
import { useUserStore } from 'stores/user';
import { logout as firebaseLogout } from 'src/services/firebase/auth';
import { auth } from 'src/boot/firebase';

const router = useRouter();
const userStore = useUserStore();

const isAuthenticated = computed(() => userStore.isLoggedIn || !!auth.currentUser);

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function navigateTo(path: string) {
  void router.push(path);
}

async function handleLogout() {
  try {
    await firebaseLogout();
  } finally {
    // Clear local state regardless
    userStore.$reset();
    Notify.create({ type: 'info', message: 'Anda telah logout.', position: 'top', timeout: 1500 });
    void router.push('/login');
  }
}
</script>

<style scoped lang="scss">
// Gradient header yang menarik
.gradient-header {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #64b5f6 100%);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
}

// Badge user dengan styling
.user-badge {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

// Layout dengan background pattern
.custom-layout {
  background: linear-gradient(to bottom, #f5f5f5 0%, #e3f2fd 100%);

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      radial-gradient(circle at 20% 50%, rgba(25, 118, 210, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(66, 165, 245, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 40% 20%, rgba(100, 181, 246, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  .q-page-container {
    position: relative;
    z-index: 1;
  }
}

// Drawer dengan header gradient
.custom-drawer {
  .drawer-header {
    background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
    box-shadow: 0 2px 8px rgba(25, 118, 210, 0.2);
  }

  .menu-item {
    border-radius: 8px;
    margin: 4px 12px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(25, 118, 210, 0.08);
      transform: translateX(4px);
    }

    &.logout-item:hover {
      background: rgba(244, 67, 54, 0.08);
    }
  }
}

// Animasi smooth untuk page container
.q-page-container {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
