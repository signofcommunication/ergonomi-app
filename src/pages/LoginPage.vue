<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="q-pa-md" style="min-width: 300px">
          <q-card-section>
            <div class="text-h6">Masuk ke Aplikasi Ergonomi</div>
            <div class="text-subtitle2">Masukkan nama Anda untuk melanjutkan</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="name" label="Nama Lengkap" outlined @keyup.enter="login" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Masuk" color="primary" :disable="!name.trim()" @click="login" />
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/user';

const name = ref('');
const router = useRouter();
const userStore = useUserStore();

const login = () => {
  if (name.value.trim()) {
    userStore.login(name.value.trim());
    router.push('/dashboard');
  }
};
</script>
