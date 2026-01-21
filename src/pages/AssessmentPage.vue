<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">Penilaian Ergonomi</div>
    <div class="text-body1 q-mb-lg">
      Jawab pertanyaan berikut untuk menilai pemahaman Anda tentang ergonomi.
    </div>

    <q-card class="q-mb-md" v-for="(soal, index) in soalLevel1" :key="soal.id">
      <q-card-section>
        <div class="text-h6">Pertanyaan {{ index + 1 }}</div>
        <p class="q-mt-sm">{{ soal.question }}</p>
        <q-option-group
          :model-value="jawaban[soal.id]"
          @update:model-value="(val) => (jawaban[soal.id] = val)"
          :options="soal.options.map((opt, i) => ({ label: opt, value: i }))"
          type="radio"
        />
      </q-card-section>
    </q-card>

    <q-btn
      label="Selesai Penilaian"
      color="primary"
      :disable="!isComplete"
      @click="submitAssessment"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { soalErgonomi } from 'src/data/soalErgonomi';
import { useResultStore } from 'src/stores/result';

const router = useRouter();
const resultStore = useResultStore();

// Ambil dulu soal level 1 (Part 1)
const soalLevel1 = soalErgonomi.filter((s) => s.level === 1).slice(0, 15);

const jawaban = ref<Record<string, number | null>>(
  soalLevel1.reduce(
    (acc, s) => {
      acc[s.id] = null;
      return acc;
    },
    {} as Record<string, number | null>,
  ),
);

const isComplete = computed(() => Object.values(jawaban.value).every((v) => v !== null));

const submitAssessment = () => {
  const detail = soalLevel1.map((s) => ({
    id: s.id,
    question: s.question,
    correctIndex: s.correctIndex,
    userIndex: jawaban.value[s.id],
  }));

  const benar = detail.filter((d) => d.userIndex === d.correctIndex).length;

  resultStore.setResult({
    score: benar,
    total: soalLevel1.length,
    detail,
  });

  sessionStorage.setItem(
    'assessmentResult',
    JSON.stringify({ score: benar, total: soalLevel1.length, detail }),
  );

  void router.push('/result');
};
</script>
