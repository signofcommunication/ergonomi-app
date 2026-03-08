<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="q-pa-lg column items-center justify-center">
        <div class="column items-center">
          <!-- Header circle / logo area -->
          <div
            class="flex flex-center q-mb-xl"
            style="width: 220px; height: 220px; border-radius: 9999px"
          >
            <img
              src="~assets/svg logo.svg"
              alt="Logo Ergonomi"
              style="max-width: 70%; max-height: 70%; object-fit: contain"
            />
          </div>

          <div style="width: 100%; max-width: 360px">
            <q-input
              v-model="email"
              label="Email"
              outlined
              dense
              clearable
              class="q-mb-md"
              autocomplete="email"
              inputmode="email"
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
              class="q-mb-md"
              autocomplete="new-password"
              @keyup.enter="focusConfirm"
            />

            <q-input
              ref="confirmPasswordRef"
              v-model="confirmPassword"
              label="Konfirmasi Password"
              type="password"
              outlined
              dense
              clearable
              class="q-mb-lg"
              autocomplete="new-password"
              @keyup.enter="onRegister"
            />

            <q-btn
              label="DAFTAR"
              color="primary"
              unelevated
              class="full-width q-py-sm"
              :loading="isLoading"
              :disable="isLoading || !canSubmit"
              @click="onRegister"
            />

            <q-btn
              flat
              class="full-width q-mt-sm"
              label="Sudah punya akun? Masuk"
              color="primary"
              @click="goToLogin"
            />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Notify } from 'quasar';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

import { db } from 'src/boot/firebase';
import { register as firebaseRegister } from 'src/services/firebase/auth';
import { useUserStore } from 'stores/user';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const passwordRef = ref();
const confirmPasswordRef = ref();

const isLoading = ref(false);

const canSubmit = computed(() => {
  const e = email.value.trim();
  const p = password.value.trim();
  const cp = confirmPassword.value.trim();
  return e.length > 0 && p.length >= 6 && cp.length >= 6;
});

const focusPassword = () => {
  if (email.value.trim()) passwordRef.value?.focus?.();
};

const focusConfirm = () => {
  if (password.value.trim()) confirmPasswordRef.value?.focus?.();
};

const goToLogin = () => {
  void router.push('/login');
};

const onRegister = async () => {
  const e = email.value.trim();
  const p = password.value.trim();
  const cp = confirmPassword.value.trim();

  if (!e || !p || !cp) return;

  if (p !== cp) {
    Notify.create({
      type: 'negative',
      message: 'Konfirmasi password tidak sesuai.',
      position: 'top',
    });
    return;
  }

  isLoading.value = true;

  try {
    // 1) Create Firebase Auth user (auto-sign-in happens here)
    const cred = await firebaseRegister({ email: e, password: p });

    // 2) Save minimal user doc into Firestore users/{uid}
    // NOTE: This is an explicit write required by the register feature.
    await setDoc(doc(db, 'users', cred.user.uid), {
      email: cred.user.email ?? e,
      createdAt: serverTimestamp(),
    });

    // 3) Update local state (for current app UI). Avoid storing password.
    userStore.login(e, '***');

    Notify.create({
      type: 'positive',
      message: 'Registrasi berhasil. Anda sudah masuk.',
      position: 'top',
      timeout: 1500,
    });

    const redirectPath = (route.query.redirect as string | undefined) ?? '/dashboard';
    void router.push(redirectPath);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Registrasi gagal. Silakan coba lagi.';

    Notify.create({
      type: 'negative',
      message: 'Registrasi gagal.',
      caption: message,
      position: 'top',
      timeout: 2500,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
