<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">Progress Pembelajaran</div>
    <div class="text-body1 q-mb-lg">Lihat kemajuan Anda dalam pembelajaran ergonomi.</div>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Materi yang Telah Dibaca</div>
        <q-list>
          <q-item v-for="materi in materiList" :key="materi.id">
            <q-item-section>
              <q-item-label>{{ materi.title }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-chip
                :color="isMateriCompleted(materi.id) ? 'positive' : 'warning'"
                text-color="white"
                size="sm"
              >
                {{ isMateriCompleted(materi.id) ? 'Selesai' : 'Belum' }}
              </q-chip>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Latihan yang Telah Diselesaikan</div>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>Latihan Postur</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-chip
                :color="postureCompleted ? 'positive' : 'warning'"
                text-color="white"
                size="sm"
              >
                {{ postureCompleted ? 'Selesai' : 'Belum' }}
              </q-chip>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Latihan Peregangan</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-chip
                :color="stretchCompleted ? 'positive' : 'warning'"
                text-color="white"
                size="sm"
              >
                {{ stretchCompleted ? 'Selesai' : 'Belum' }}
              </q-chip>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProgressStore } from 'stores/progress';

const progressStore = useProgressStore();

const materiList = [
  { id: '1', title: 'Pengantar Ergonomi' },
  { id: '2', title: 'Postur Tubuh yang Benar' },
  { id: '3', title: 'Peregangan dan Relaksasi' },
];

const isMateriCompleted = (id: string) => {
  return progressStore.materiCompleted.includes(id);
};

const postureCompleted = computed(() => progressStore.postureCompleted);
const stretchCompleted = computed(() => progressStore.stretchCompleted);
</script>
