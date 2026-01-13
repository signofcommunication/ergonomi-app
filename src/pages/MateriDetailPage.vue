<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">{{ currentMateri?.title }}</div>
    <div class="text-body1 q-mb-lg">{{ currentMateri?.description }}</div>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Konten Materi</div>
        <p class="q-mt-md">
          {{ currentMateri?.content }}
        </p>
      </q-card-section>
    </q-card>

    <q-btn
      :label="isCompleted ? 'Sudah Selesai Dibaca' : 'Tandai sebagai Selesai'"
      :color="isCompleted ? 'positive' : 'primary'"
      :disable="isCompleted"
      @click="completeMateri"
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProgressStore } from 'stores/progress';

const route = useRoute();
const progressStore = useProgressStore();

const materiId = computed(() => route.params.id as string);

// Mock data
const materiData = {
  '1': {
    title: 'Pengantar Ergonomi',
    description: 'Dasar-dasar ergonomi di tempat kerja',
    content:
      'Ergonomi adalah ilmu yang mempelajari interaksi antara manusia dan sistem kerja. Tujuan utama ergonomi adalah untuk meningkatkan efisiensi, keselamatan, dan kenyamanan kerja. Dengan menerapkan prinsip ergonomi, kita dapat mengurangi risiko cedera dan meningkatkan produktivitas.',
  },
  '2': {
    title: 'Postur Tubuh yang Benar',
    description: 'Cara menjaga postur tubuh saat bekerja',
    content:
      'Postur tubuh yang benar sangat penting untuk mencegah cedera otot dan tulang. Pastikan punggung lurus, bahu rileks, dan kaki rata di lantai. Hindari membungkuk terlalu lama atau duduk dalam posisi yang tidak ergonomis.',
  },
  '3': {
    title: 'Peregangan dan Relaksasi',
    description: 'Teknik peregangan untuk mengurangi ketegangan',
    content:
      'Peregangan secara teratur dapat membantu mengurangi ketegangan otot dan meningkatkan fleksibilitas. Lakukan peregangan selama 5-10 menit setiap jam kerja. Fokus pada area yang sering tegang seperti leher, bahu, dan punggung.',
  },
};

const currentMateri = computed(() => materiData[materiId.value]);

const isCompleted = computed(() => progressStore.materiCompleted.includes(materiId.value));

const completeMateri = () => {
  if (!isCompleted.value) {
    progressStore.completeMateri(materiId.value);
  }
};
</script>
