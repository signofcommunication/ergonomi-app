<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="q-pa-lg column items-center justify-center">
        <div class="column">
          <!-- Header circle / logo area -->
          <div
            class="bg-primary flex flex-center q-mb-xl"
            style="width: 220px; height: 220px; border-radius: 9999px"
          >
            <q-avatar size="56px" color="white" text-color="primary" icon="person" />
          </div>

          <!-- Form -->
          <div style="width: 100%; max-width: 360px">
            <q-input
              v-model="username"
              label="Username"
              outlined
              dense
              clearable
              class="q-mb-md"
              autocomplete="username"
              @keyup.enter="focusPassword"
            />

            <q-input
              ref="passwordRef"
              v-model="password"
              label="Password"
              type="password"
              outlined
              dense
              clearable
              class="q-mb-lg"
              autocomplete="current-password"
              @keyup.enter="login"
            />

            <q-btn
              label="LOGIN"
              color="primary"
              unelevated
              class="full-width q-py-sm"
              :disable="!username.trim() || !password.trim()"
              @click="login"
            />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/user';

const username = ref('');
const password = ref('');
const passwordRef = ref();
const router = useRouter();
const userStore = useUserStore();

const focusPassword = () => {
  if (username.value.trim()) {
    passwordRef.value.focus();
  }
};

const login = () => {
  if (username.value.trim() && password.value.trim()) {
    userStore.login(username.value.trim(), password.value.trim());
    void router.push('/dashboard');
  }
};
</script>
