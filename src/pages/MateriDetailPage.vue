<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-mb-md">
      <q-card-section class="q-pa-none">
        <div v-if="currentMateri?.cover" class="q-pa-lg text-white" :style="coverStyle">
          <div class="text-h4">{{ currentMateri.title }}</div>
          <div v-if="currentMateri.subtitle" class="text-body1 q-mt-sm">
            {{ currentMateri.subtitle }}
          </div>
        </div>

        <div v-else class="q-pa-lg">
          <div class="text-h4">{{ currentMateri?.title }}</div>
          <div v-if="currentMateri?.subtitle" class="text-body1 q-mt-sm">
            {{ currentMateri.subtitle }}
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <MarkdownContent v-if="currentMateri" :content="currentMateri.contentMd" />
        <div v-else class="text-body2 text-grey-7">Materi tidak ditemukan.</div>
      </q-card-section>
    </q-card>

    <q-btn
      unelevated
      class="full-width"
      :label="isCompleted ? 'Sudah Selesai Dibaca' : 'Tandai sebagai Selesai'"
      :color="isCompleted ? 'positive' : 'primary'"
      :disable="isCompleted || !currentMateri"
      @click="completeMateri"
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProgressStore } from 'stores/progress';
import MarkdownContent from 'components/MarkdownContent.vue';
import { getMateriById } from 'src/data/materi';

const route = useRoute();
const progressStore = useProgressStore();

const materiId = computed(() => route.params.id as string);

const currentMateri = computed(() => getMateriById(materiId.value));

const isCompleted = computed(() => progressStore.materiCompleted.includes(materiId.value));

const coverStyle = computed(() => {
  const cover = currentMateri.value?.cover;
  if (!cover) return {};

  const overlay = cover.overlay ?? 'dark';
  const gradient =
    overlay === 'none'
      ? ''
      : overlay === 'light'
        ? 'linear-gradient(135deg, rgba(255,255,255,.75), rgba(255,255,255,.35))'
        : 'linear-gradient(135deg, rgba(0,0,0,.55), rgba(0,0,0,.20))';

  return {
    borderRadius: '16px',
    backgroundImage: gradient ? `${gradient}, url(${cover.src})` : `url(${cover.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '180px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  } as const;
});

const completeMateri = () => {
  if (!isCompleted.value && currentMateri.value) {
    progressStore.completeMateri(materiId.value);
  }
};
</script>
