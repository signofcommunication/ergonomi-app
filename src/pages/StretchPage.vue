<template>
  <q-page class="q-py-md">
    <div class="text-h4 q-mb-md">Latihan Peregangan</div>
    <div class="text-body1 q-mb-lg">Ikuti langkah-langkah latihan peregangan berikut.</div>

    <q-card class="q-mb-md">
      <q-card-section class="row items-start q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-img
            src="/peregangan/Peregangan 1 .png"
            :ratio="4 / 3"
            fit="contain"
            loading="lazy"
            class="stretch-img"
          />
        </div>
        <div class="col-12 col-md-8">
          <div class="text-h6">Peregangan Leher</div>
          <ol>
            <li>Miringkan kepala ke kiri, tahan selama 10 detik.</li>
            <li>Kembali ke posisi netral.</li>
            <li>Miringkan kepala ke kanan, tahan selama 10 detik.</li>
            <li>Kembali ke posisi netral.</li>
            <li>Ulangi rangkaian gerakan tersebut sebanyak 3 kali.</li>
          </ol>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section class="row items-start q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-img
            src="/peregangan/Peregangan 2 .png"
            :ratio="4 / 3"
            fit="contain"
            loading="lazy"
            class="stretch-img"
          />
        </div>
        <div class="col-12 col-md-8">
          <div class="text-h6">Peregangan Bahu</div>
          <p class="q-mt-sm">Angkat bahu ke atas, tahan 10 detik, lalu turunkan. Ulangi 5 kali.</p>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section class="row items-start q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-img
            src="/peregangan/Peregangan 3 .png"
            :ratio="4 / 3"
            fit="contain"
            loading="lazy"
            class="stretch-img"
          />
        </div>
        <div class="col-12 col-md-8">
          <div class="text-h6">Peregangan Punggung</div>
          <p class="q-mt-sm">
            Bungkukkan tubuh ke depan dari pinggang, tahan 15 detik. Ulangi 3 kali.
          </p>
        </div>
      </q-card-section>
    </q-card>

    <!-- Tambahan gambar lain di folder public/peregangan (opsional) -->
    <q-card class="q-mb-md">
      <q-card-section class="row items-start q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-img
            src="/peregangan/Peregangan 4 .png"
            :ratio="4 / 3"
            fit="contain"
            loading="lazy"
            class="stretch-img"
          />
        </div>
        <div class="col-12 col-md-8">
          <div class="text-h6">Peregangan Tangan & Pergelangan</div>
          <p class="q-mt-sm">
            Rentangkan tangan ke depan, tarik perlahan telapak ke arah tubuh selama 10 detik,
            lakukan pada kedua tangan.
          </p>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section class="row items-start q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-img
            src="/peregangan/Peregangan 5 .png"
            :ratio="4 / 3"
            fit="contain"
            loading="lazy"
            class="stretch-img"
          />
        </div>
        <div class="col-12 col-md-8">
          <div class="text-h6">Peregangan Kaki</div>
          <p class="q-mt-sm">
            Luruskan kaki, tekuk pergelangan kaki ke atas-bawah perlahan selama 15 detik. Ulangi 3
            kali.
          </p>
        </div>
      </q-card-section>
    </q-card>

    <q-btn
      :label="isCompleted ? 'Sudah Selesai' : 'Tandai sebagai Selesai'"
      :color="isCompleted ? 'positive' : 'primary'"
      :disable="isCompleted"
      @click="completeStretch"
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProgressStore } from 'stores/progress';

const progressStore = useProgressStore();

const isCompleted = computed(() => progressStore.stretchCompleted);

const completeStretch = () => {
  if (!isCompleted.value) {
    progressStore.completeStretch();
  }
};
</script>

<style scoped>
.stretch-img {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.03);
}
</style>
