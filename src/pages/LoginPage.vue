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
              label="Email"
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
              class="q-mb-sm"
              autocomplete="current-password"
              @keyup.enter="login"
            />

            <div v-if="errorMessage" class="text-negative text-caption q-mb-md">
              {{ errorMessage }}
            </div>

            <q-btn
              label="LOGIN"
              color="primary"
              unelevated
              class="full-width q-py-sm"
              :loading="isLoading"
              :disable="isLoading || !username.trim() || !password.trim()"
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
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from 'stores/user';
import { login as firebaseLogin } from 'src/services/firebase/auth';
import { Notify } from 'quasar';

const username = ref('');
const password = ref('');
const passwordRef = ref();
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const isLoading = ref(false);
const errorMessage = ref('');

const focusPassword = () => {
  if (username.value.trim()) {
    passwordRef.value?.focus?.();
  }
};

const login = async () => {
  if (!username.value.trim() || !password.value.trim()) return;

  isLoading.value = true;
  errorMessage.value = '';

  try {
    // Email/password auth: treat current "username" field as email.
    const email = username.value.trim();

    const cred = await firebaseLogin({
      email,
      password: password.value.trim(),
    });

    // Store local session state (no guards yet)
    userStore.login(email, '***');

    // Optionally you can store uid later in the store
    void cred;

    Notify.create({
      type: 'positive',
      message: 'Login berhasil.',
      position: 'bottom',
      timeout: 1500,
    });

    const redirectPath = (route.query.redirect as string | undefined) ?? '/dashboard';
    void router.push(redirectPath);
    return;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Login gagal. Silakan coba lagi.';
    errorMessage.value = message;

    Notify.create({
      type: 'negative',
      message: 'Login gagal. Periksa email dan password Anda.',
      caption: message,
      position: 'top',
      timeout: 2500,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
