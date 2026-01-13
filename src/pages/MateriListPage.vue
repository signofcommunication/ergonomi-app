<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">Materi Pembelajaran</div>
    <div class="text-body1 q-mb-lg">Pilih materi yang ingin Anda baca.</div>

    <q-list separator>
      <q-item
        v-for="materi in materiList"
        :key="materi.id"
        clickable
        @click="$router.push(`/materi/${materi.id}`)"
      >
        <q-item-section avatar>
          <q-icon name="article" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ materi.title }}</q-item-label>
          <q-item-label caption>{{ materi.description }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-chip
            :color="isCompleted(materi.id) ? 'positive' : 'warning'"
            text-color="white"
            size="sm"
          >
            {{ isCompleted(materi.id) ? 'Selesai' : 'Belum' }}
          </q-chip>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProgressStore } from 'stores/progress';

// Mock data for now
const materiList = [
  { id: '1', title: 'Pengantar Ergonomi', description: 'Dasar-dasar ergonomi di tempat kerja' },
  {
    id: '2',
    title: 'Postur Tubuh yang Benar',
    description: 'Cara menjaga postur tubuh saat bekerja',
  },
  {
    id: '3',
    title: 'Peregangan dan Relaksasi',
    description: 'Teknik peregangan untuk mengurangi ketegangan',
  },
];

const progressStore = useProgressStore();

const isCompleted = (id: string) => {
  return progressStore.materiCompleted.includes(id);
};
</script>
