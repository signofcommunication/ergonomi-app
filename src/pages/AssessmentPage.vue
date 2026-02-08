<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">Penilaian Ergonomi</div>
    <div class="text-body1 q-mb-lg">
      Jawab 15 pertanyaan acak berikut untuk menilai pemahaman Anda tentang ergonomi.
    </div>

    <div class="q-mb-md text-subtitle2">Progres: {{ answeredCount }} / 15 soal terjawab</div>

    <q-card class="q-mb-md" v-for="(soal, index) in soalAktif" :key="soal.id">
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
      class="full-width"
      unelevated
      size="lg"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { soalErgonomi } from 'src/data/soalErgonomi';
import { useResultStore } from 'src/stores/result';

const router = useRouter();
const resultStore = useResultStore();

// Fungsi untuk acak array (Fisher-Yates shuffle)
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp!;
  }
  return shuffled;
};

// Generate 15 soal acak saat component dimount
const soalAktif = ref<typeof soalErgonomi>([]);

onMounted(() => {
  // Acak semua soal, ambil 15
  const shuffled = shuffleArray(soalErgonomi);
  soalAktif.value = shuffled.slice(0, 15);

  // Initialize jawaban
  resetJawaban();
});

const jawaban = ref<Record<string, number | null>>({});

const resetJawaban = () => {
  jawaban.value = soalAktif.value.reduce(
    (acc, s) => {
      acc[s.id] = null;
      return acc;
    },
    {} as Record<string, number | null>,
  );
};

const answeredCount = computed(() => Object.values(jawaban.value).filter((v) => v !== null).length);

const isComplete = computed(() => Object.values(jawaban.value).every((v) => v !== null));

const submitAssessment = () => {
  const detail = soalAktif.value.map((s) => ({
    id: s.id,
    question: s.question,
    correctIndex: s.correctIndex,
    userIndex: jawaban.value[s.id] ?? null,
  }));

  const benar = detail.filter((d) => d.userIndex === d.correctIndex).length;

  resultStore.setResult({
    score: benar,
    total: soalAktif.value.length,
    detail,
  });

  sessionStorage.setItem(
    'assessmentResult',
    JSON.stringify({ score: benar, total: soalAktif.value.length, detail }),
  );
  void router.push('/result');
};
</script>
