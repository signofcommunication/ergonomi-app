<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">Hasil Penilaian</div>
    <div class="text-body1 q-mb-lg">Berikut adalah hasil penilaian Anda.</div>

    <q-banner v-if="showEmptyHint" class="q-mb-md" rounded dense inline-actions>
      <template #avatar>
        <q-icon name="info" color="primary" />
      </template>
      Detail jawaban tidak tersedia (biasanya terjadi jika halaman ini dibuka ulang/refresh).
      Silakan ulangi penilaian untuk melihat rincian per soal.
    </q-banner>

    <q-card class="q-mb-md">
      <q-card-section class="row items-center q-col-gutter-md">
        <div class="col-auto">
          <!-- Icon dinamis berdasarkan kategori skor -->
          <q-icon :name="iconName" :color="iconColor" size="64px" />
        </div>
        <div class="col">
          <div class="text-h6">Skor Anda: {{ score }}/{{ total }}</div>
          <div class="text-body2 q-mt-sm">
            {{ messageText }}
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Chart sederhana benar vs salah -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">Ringkasan Jawaban</div>
        <div class="row items-center q-col-gutter-md">
          <div class="col">
            <div class="text-caption q-mb-xs">Benar: {{ correctCount }}</div>
            <div class="progress-bar bg-green-2">
              <div
                class="progress-bar-fill bg-green"
                :style="{ width: correctPercent + '%' }"
              ></div>
            </div>
          </div>
          <div class="col">
            <div class="text-caption q-mb-xs">Salah: {{ wrongCount }}</div>
            <div class="progress-bar bg-red-2">
              <div class="progress-bar-fill bg-red" :style="{ width: wrongPercent + '%' }"></div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Detail per soal -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">Detail Jawaban Per Soal</div>
        <div v-for="(item, idx) in detailList" :key="item.id" class="q-mb-sm">
          <div class="row items-start q-col-gutter-sm">
            <div class="col-auto">
              <q-icon
                :name="item.isCorrect ? 'check_circle' : 'cancel'"
                :color="item.isCorrect ? 'green' : 'red'"
              />
            </div>
            <div class="col">
              <div class="text-body2">
                <strong>Soal {{ idx + 1 }}:</strong> {{ item.question }}
              </div>
              <div class="text-caption q-mt-xs">
                Jawaban Anda:
                <span :class="item.isCorrect ? 'text-green' : 'text-red'">
                  {{ item.userAnswerLabel ?? 'Tidak dijawab' }}
                </span>
              </div>
              <div class="text-caption">
                Jawaban benar:
                <span class="text-green">
                  {{ item.correctAnswerLabel }}
                </span>
              </div>
            </div>
          </div>
          <q-separator v-if="idx < detailList.length - 1" class="q-my-sm" />
        </div>
      </q-card-section>
    </q-card>

    <q-btn label="Kembali ke Dashboard" color="primary" @click="$router.push('/dashboard')" />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { soalErgonomi } from 'src/data/soalErgonomi';
import { useResultStore } from 'src/stores/result';

const route = useRoute();
const resultStore = useResultStore();

// Jika halaman di-refresh, store bisa kosong. Ambil cadangan dari sessionStorage.
if (resultStore.detail.length === 0) {
  const raw = sessionStorage.getItem('assessmentResult');
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as {
        score: number;
        total: number;
        detail: Array<{
          id: string;
          question: string;
          correctIndex: number;
          userIndex: number | null;
        }>;
      };
      resultStore.setResult(parsed);
    } catch {
      // ignore
    }
  }
}

const score = computed(() => resultStore.score || Number(route.query.skor ?? 0));
const total = computed(() => resultStore.total || Number(route.query.total ?? 0) || 15);

const ratio = computed(() => (total.value > 0 ? score.value / total.value : 0));

const showEmptyHint = computed(() => resultStore.detail.length === 0);

const messageText = computed(() => {
  if (ratio.value === 1) {
    return 'Luar biasa! Anda memahami ergonomi dengan sangat baik.';
  }
  if (ratio.value >= 0.7) {
    return 'Bagus! Pemahaman Anda sudah cukup baik, tetap pertahankan dan terus belajar.';
  }
  return 'Perlu lebih banyak belajar tentang ergonomi. Silakan ulangi materi dan latihan kembali.';
});

const iconName = computed(() => {
  if (ratio.value === 1) {
    return 'emoji_events';
  }
  if (ratio.value >= 0.7) {
    return 'sentiment_satisfied_alt';
  }
  return 'sentiment_dissatisfied';
});

const iconColor = computed(() => {
  if (ratio.value === 1) {
    return 'amber';
  }
  if (ratio.value >= 0.7) {
    return 'green';
  }
  return 'red';
});

// Detail untuk tampilan
const detailList = computed(() => {
  return resultStore.detail.map((item) => {
    const bank = soalErgonomi.find((s) => s.id === item.id);
    const options = bank?.options ?? [];
    const correctLabel = options[item.correctIndex] ?? '';
    const userLabel =
      item.userIndex != null && item.userIndex >= 0 && item.userIndex < options.length
        ? options[item.userIndex]
        : null;
    const isCorrect = item.userIndex === item.correctIndex;
    return {
      id: item.id,
      question: item.question,
      correctAnswerLabel: correctLabel,
      userAnswerLabel: userLabel,
      isCorrect,
    };
  });
});

const correctCount = computed(() => detailList.value.filter((d) => d.isCorrect).length);
const wrongCount = computed(() => detailList.value.length - correctCount.value);

const correctPercent = computed(() =>
  detailList.value.length > 0 ? (correctCount.value / detailList.value.length) * 100 : 0,
);
const wrongPercent = computed(() =>
  detailList.value.length > 0 ? (wrongCount.value / detailList.value.length) * 100 : 0,
);
</script>

<style scoped>
.progress-bar {
  width: 100%;
  height: 12px;
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  transition: width 0.3s ease;
}
</style>
