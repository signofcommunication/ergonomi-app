<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">Penilaian Ergonomi</div>
    <div class="text-body1 q-mb-lg">
      Jawab pertanyaan berikut untuk menilai pemahaman Anda tentang ergonomi.
    </div>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Pertanyaan 1</div>
        <p class="q-mt-sm">Apa tujuan utama dari ergonomi?</p>
        <q-option-group v-model="answers.q1" :options="options.q1" type="radio" />
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Pertanyaan 2</div>
        <p class="q-mt-sm">Manakah yang bukan merupakan manfaat postur tubuh yang benar?</p>
        <q-option-group v-model="answers.q2" :options="options.q2" type="radio" />
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

const router = useRouter();

const answers = ref({
  q1: '',
  q2: '',
});

const options = {
  q1: [
    { label: 'Meningkatkan efisiensi kerja', value: 'a' },
    { label: 'Mengurangi risiko cedera', value: 'b' },
    { label: 'Keduanya benar', value: 'c' },
  ],
  q2: [
    { label: 'Mengurangi ketegangan otot', value: 'a' },
    { label: 'Meningkatkan produktivitas', value: 'b' },
    { label: 'Menyebabkan kelelahan', value: 'c' },
  ],
};

const isComplete = computed(() => answers.value.q1 && answers.value.q2);

const submitAssessment = () => {
  // For now, just navigate to result
  router.push('/result');
};
</script>
