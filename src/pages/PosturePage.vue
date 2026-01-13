<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">Latihan Postur</div>
    <div class="text-body1 q-mb-lg">Ikuti langkah-langkah latihan postur berikut.</div>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Langkah 1: Berdiri Tegak</div>
        <p class="q-mt-sm">Berdirilah dengan kaki selebar bahu, punggung lurus, dan bahu rileks.</p>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Langkah 2: Angkat Dada</div>
        <p class="q-mt-sm">Angkat dada Anda dan tarik bahu ke belakang. Tahan selama 10 detik.</p>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Langkah 3: Relaksasi</div>
        <p class="q-mt-sm">Turunkan bahu dan rileks. Ulangi 5 kali.</p>
      </q-card-section>
    </q-card>

    <q-btn
      :label="isCompleted ? 'Sudah Selesai' : 'Tandai sebagai Selesai'"
      :color="isCompleted ? 'positive' : 'primary'"
      :disable="isCompleted"
      @click="completePosture"
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProgressStore } from 'stores/progress';

const progressStore = useProgressStore();

const isCompleted = computed(() => progressStore.postureCompleted);

const completePosture = () => {
  if (!isCompleted.value) {
    progressStore.completePosture();
  }
};
</script>
