<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">Latihan Peregangan</div>
    <div class="text-body1 q-mb-lg">Ikuti langkah-langkah latihan peregangan berikut.</div>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Peregangan Leher</div>
        <p class="q-mt-sm">
          Miringkan kepala ke kiri, tahan 10 detik, lalu ke kanan. Ulangi 3 kali.
        </p>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Peregangan Bahu</div>
        <p class="q-mt-sm">Angkat bahu ke atas, tahan 10 detik, lalu turunkan. Ulangi 5 kali.</p>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Peregangan Punggung</div>
        <p class="q-mt-sm">
          Bungkukkan tubuh ke depan dari pinggang, tahan 15 detik. Ulangi 3 kali.
        </p>
      </q-card-section>
    </q-card>

    <q-btn
      :label="isCompleted ? 'Sudah Selesai' : 'Tandai sebagai Selesai'"
      :color="isCompleted ? 'positive' : 'primary'"
      :disable="isCompleted"
      @click="completeStretch"
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProgressStore } from 'stores/progress';

const progressStore = useProgressStore();

const isCompleted = computed(() => progressStore.stretchCompleted);

const completeStretch = () => {
  if (!isCompleted.value) {
    progressStore.completeStretch();
  }
};
</script>
