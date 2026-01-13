<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">Hasil Penilaian</div>
    <div class="text-body1 q-mb-lg">Berikut adalah hasil penilaian Anda.</div>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Skor Anda: {{ score }}/2</div>
        <div class="text-body2 q-mt-sm">
          {{
            score === 2
              ? 'Luar biasa! Anda memahami ergonomi dengan baik.'
              : 'Perlu lebih banyak belajar tentang ergonomi.'
          }}
        </div>
      </q-card-section>
    </q-card>

    <q-btn label="Kembali ke Dashboard" color="primary" @click="$router.push('/dashboard')" />
  </q-page>
</template>

<script setup lang="ts">
// For now, mock score
const score = 2; // Assume perfect for demo
</script>
