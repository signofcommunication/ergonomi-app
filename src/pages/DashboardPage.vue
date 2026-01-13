<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">Dashboard Ergonomi</div>
    <div class="text-body1 q-mb-lg">
      Selamat datang di aplikasi pembelajaran ergonomi. Pilih fitur yang ingin Anda akses.
    </div>

    <q-list separator>
      <q-item clickable @click="$router.push('/materi')">
        <q-item-section avatar>
          <q-icon name="book" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Materi Pembelajaran</q-item-label>
          <q-item-label caption>Baca materi ergonomi</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>

      <q-item clickable @click="$router.push('/assessment')">
        <q-item-section avatar>
          <q-icon name="quiz" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Penilaian</q-item-label>
          <q-item-label caption>Lakukan penilaian ergonomi</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>

      <q-item clickable @click="$router.push('/latihan')">
        <q-item-section avatar>
          <q-icon name="fitness_center" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Latihan</q-item-label>
          <q-item-label caption>Latihan postur dan peregangan</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>

      <q-item clickable @click="$router.push('/progress')">
        <q-item-section avatar>
          <q-icon name="bar_chart" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Progress</q-item-label>
          <q-item-label caption>Lihat kemajuan Anda</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
// No logic needed for dashboard
</script>
