<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">Penilaian Ergonomi</div>
    <div class="text-body1 q-mb-lg">
      Jawab pertanyaan berikut untuk menilai pemahaman Anda tentang ergonomi.
    </div>

    <div class="q-mb-md">
      <div class="text-subtitle2 q-mb-sm">Pilih Level</div>
      <q-btn-toggle
        v-model="selectedLevel"
        :options="selectableOptions"
        color="primary"
        toggle-color="primary"
        unelevated
        spread
      />
    </div>

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
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { soalErgonomi } from 'src/data/soalErgonomi';
import { useResultStore } from 'src/stores/result';
import { useAssessmentProgressStore } from 'src/stores/assessmentProgress';

const router = useRouter();
const resultStore = useResultStore();
const assessProgress = useAssessmentProgressStore();

type Level = 1 | 2 | 3;

const levelOptions: Array<{ label: string; value: Level; disable?: boolean }> = [
  { label: 'Level 1', value: 1 },
  { label: 'Level 2', value: 2 },
  { label: 'Level 3', value: 3 },
];

// Restore progress dari sessionStorage (simple persistence)
const restore = () => {
  const raw = sessionStorage.getItem('assessmentProgress');
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw) as {
      unlockedLevel?: 1 | 2 | 3;
      completedLevel?: 0 | 1 | 2 | 3;
    };
    if (parsed.unlockedLevel) assessProgress.unlockedLevel = parsed.unlockedLevel;
    if (parsed.completedLevel != null) assessProgress.completedLevel = parsed.completedLevel;
  } catch {
    // ignore
  }
};
restore();

const selectableOptions = computed(() =>
  levelOptions.map((o) => ({
    ...o,
    disable: o.value > assessProgress.unlockedLevel,
  })),
);

const selectedLevel = ref<Level>(1);

// Pastikan level yang dipilih tidak melebihi yang terbuka
watch(
  () => assessProgress.unlockedLevel,
  (unlocked) => {
    if (selectedLevel.value > unlocked) selectedLevel.value = unlocked;
  },
  { immediate: true },
);

const soalAktif = computed(() =>
  soalErgonomi.filter((s) => s.level === selectedLevel.value).slice(0, 15),
);

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

watch(
  () => selectedLevel.value,
  () => resetJawaban(),
  { immediate: true },
);

const isComplete = computed(() => Object.values(jawaban.value).every((v) => v !== null));

const persistProgress = () => {
  sessionStorage.setItem(
    'assessmentProgress',
    JSON.stringify({
      unlockedLevel: assessProgress.unlockedLevel,
      completedLevel: assessProgress.completedLevel,
    }),
  );
};

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

  // Mark selesai & unlock level berikutnya
  assessProgress.markCompleted(selectedLevel.value, benar, soalAktif.value.length);
  persistProgress();

  void router.push('/result');
};
</script>
