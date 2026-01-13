<template>
  <q-page class="q-pa-sm">
    <q-card flat bordered class="q-mb-sm">
      <q-card-section class="q-pa-none">
        <div v-if="currentMateri?.cover" class="q-pa-md text-white" :style="coverStyle">
          <div class="row items-start justify-between">
            <q-btn
              flat
              round
              dense
              icon="arrow_back"
              color="white"
              aria-label="Kembali"
              @click="goBack"
            />
          </div>

          <div class="q-mt-lg">
            <div class="text-h5 text-weight-bold">{{ currentMateri.title }}</div>
            <div v-if="currentMateri.subtitle" class="text-body2 q-mt-xs">
              {{ currentMateri.subtitle }}
            </div>
          </div>
        </div>

        <div v-else class="q-pa-md">
          <div class="row items-start justify-between q-mb-md">
            <q-btn
              flat
              round
              dense
              icon="arrow_back"
              color="primary"
              aria-label="Kembali"
              @click="goBack"
            />
          </div>

          <div class="text-h5 text-weight-bold">{{ currentMateri?.title }}</div>
          <div v-if="currentMateri?.subtitle" class="text-body2 q-mt-xs">
            {{ currentMateri.subtitle }}
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-xl">
      <q-card-section class="q-pa-md">
        <MarkdownContent v-if="currentMateri" :content="currentMateri.contentMd" />
        <div v-else class="text-body2 text-grey-7">Materi tidak ditemukan.</div>
      </q-card-section>
    </q-card>

    <!-- Sticky bottom CTA (mobile-first) -->
    <div class="materi-bottom-cta">
      <q-btn
        unelevated
        class="full-width"
        :label="isCompleted ? 'Sudah Selesai Dibaca' : 'Tandai sebagai Selesai'"
        :color="isCompleted ? 'positive' : 'primary'"
        :disable="isCompleted || !currentMateri"
        @click="completeMateri"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProgressStore } from 'stores/progress';
import MarkdownContent from 'components/MarkdownContent.vue';
import { getMateriById } from 'src/data/materi';

const route = useRoute();
const router = useRouter();
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
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  } as const;
});

const goBack = () => {
  // Mobile-friendly: use history back if possible, otherwise fallback
  if (window.history.length > 1) {
    router.back();
    return;
  }
  void router.push('/materi');
};

const completeMateri = () => {
  if (!isCompleted.value && currentMateri.value) {
    progressStore.completeMateri(materiId.value);
  }
};
</script>

<style scoped lang="scss">
.materi-bottom-cta {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;

  padding: 12px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));

  background: rgba(250, 250, 250, 0.96);
  backdrop-filter: blur(8px);
}
</style>
