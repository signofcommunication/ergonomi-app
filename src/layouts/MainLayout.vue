<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Aplikasi Ergonomi </q-toolbar-title>

        <div v-if="userStore.isLoggedIn" class="text-body2">
          Selamat datang, {{ userStore.name }}
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Navigasi </q-item-label>

        <q-item clickable @click="navigateTo('/dashboard')" v-close-popup>
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable @click="navigateTo('/materi')" v-close-popup>
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Materi</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable @click="navigateTo('/assessment')" v-close-popup>
          <q-item-section avatar>
            <q-icon name="quiz" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Penilaian</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable @click="navigateTo('/latihan')" v-close-popup>
          <q-item-section avatar>
            <q-icon name="fitness_center" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Latihan</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable @click="navigateTo('/progress')" v-close-popup>
          <q-item-section avatar>
            <q-icon name="bar_chart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Progress</q-item-label>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/user';

const router = useRouter();
const userStore = useUserStore();

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function navigateTo(path: string) {
  void router.push(path);
}
</script>
