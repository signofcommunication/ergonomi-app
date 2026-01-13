<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">Menu Latihan</div>
    <div class="text-body1 q-mb-lg">Pilih jenis latihan yang ingin Anda lakukan.</div>

    <q-list separator>
      <q-item clickable @click="$router.push('/latihan/postur')">
        <q-item-section avatar>
          <q-icon name="accessibility" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Latihan Postur</q-item-label>
          <q-item-label caption>Latihan untuk memperbaiki postur tubuh</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-chip :color="postureCompleted ? 'positive' : 'warning'" text-color="white" size="sm">
            {{ postureCompleted ? 'Selesai' : 'Belum' }}
          </q-chip>
        </q-item-section>
      </q-item>

      <q-item clickable @click="$router.push('/latihan/peregangan')">
        <q-item-section avatar>
          <q-icon name="self_improvement" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Latihan Peregangan</q-item-label>
          <q-item-label caption>Latihan peregangan untuk relaksasi</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-chip :color="stretchCompleted ? 'positive' : 'warning'" text-color="white" size="sm">
            {{ stretchCompleted ? 'Selesai' : 'Belum' }}
          </q-chip>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProgressStore } from 'stores/progress';

const progressStore = useProgressStore();

const postureCompleted = computed(() => progressStore.postureCompleted);
const stretchCompleted = computed(() => progressStore.stretchCompleted);
</script>
