<template>
  <q-page class="latihan q-pa-md">
    <!-- Header -->
    <div class="row items-start justify-between q-mb-md">
      <div>
        <div class="text-h4 latihan__title">Menu Latihan</div>
        <div class="text-body1 latihan__subtitle q-mt-sm">
          Pilih jenis latihan yang ingin Anda lakukan untuk menjaga kesehatan kerja.
        </div>
      </div>
    </div>

    <!-- Cards -->
    <div class="column q-gutter-md">
      <!-- Posture -->
      <q-card class="latihan__card" flat bordered>
        <q-card-section class="row items-center q-col-gutter-md">
          <div class="col-auto">
            <div class="latihan__avatar latihan__avatar--blue">
              <q-icon name="accessibility_new" size="22px" />
            </div>
          </div>

          <div class="col">
            <div class="text-subtitle1 latihan__cardTitle">Latihan Postur</div>
            <div class="text-body2 latihan__cardSub q-mt-xs">
              Latihan khusus untuk memperbaiki dan menjaga posisi tubuh ideal saat bekerja.
            </div>

            <div class="row items-center justify-between q-mt-md">
              <div
                class="latihan__pill"
                :class="postureCompleted ? 'latihan__pill--done' : 'latihan__pill--todo'"
              >
                <span class="latihan__dot" />
                {{ postureCompleted ? 'Selesai' : 'Belum' }}
              </div>

              <q-btn
                :label="postureCompleted ? 'Ulangi' : 'Mulai'"
                :color="postureCompleted ? 'grey-3' : 'primary'"
                :text-color="postureCompleted ? 'grey-9' : 'white'"
                class="latihan__actionBtn"
                rounded
                unelevated
                :icon-right="postureCompleted ? 'refresh' : 'chevron_right'"
                @click="$router.push('/latihan/postur')"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Stretch -->
      <q-card class="latihan__card" flat bordered>
        <q-card-section class="row items-center q-col-gutter-md">
          <div class="col-auto">
            <div class="latihan__avatar latihan__avatar--purple">
              <q-icon name="self_improvement" size="22px" />
            </div>
          </div>

          <div class="col">
            <div class="text-subtitle1 latihan__cardTitle">Latihan Peregangan</div>
            <div class="text-body2 latihan__cardSub q-mt-xs">
              Rangkaian gerakan relaksasi otot untuk mengurangi ketegangan selama bekerja.
            </div>

            <div class="row items-center justify-between q-mt-md">
              <div
                class="latihan__pill"
                :class="stretchCompleted ? 'latihan__pill--done' : 'latihan__pill--todo'"
              >
                <span class="latihan__dot" />
                {{ stretchCompleted ? 'Selesai' : 'Belum' }}
              </div>

              <q-btn
                :label="stretchCompleted ? 'Ulangi' : 'Mulai'"
                :color="stretchCompleted ? 'grey-3' : 'primary'"
                :text-color="stretchCompleted ? 'grey-9' : 'white'"
                class="latihan__actionBtn"
                rounded
                unelevated
                :icon-right="stretchCompleted ? 'refresh' : 'chevron_right'"
                @click="$router.push('/latihan/peregangan')"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Summary today -->
    <div class="q-mt-lg">
      <div class="latihan__sectionLabel q-mb-sm">RINGKASAN HARI INI</div>

      <div class="row q-col-gutter-md">
        <div class="col-6">
          <q-card class="latihan__miniCard" flat bordered>
            <q-card-section>
              <div class="latihan__miniValue">{{ minutesToday }}</div>
              <div class="latihan__miniCaption">MENIT LATIHAN</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-6">
          <q-card class="latihan__miniCard latihan__miniCard--mint" flat bordered>
            <q-card-section>
              <div class="latihan__miniValue latihan__miniValue--mint">{{ targetToday }}</div>
              <div class="latihan__miniCaption">TARGET TERCAPAI</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Floating theme button -->
    <q-btn
      round
      unelevated
      color="white"
      text-color="grey-9"
      icon="dark_mode"
      class="latihan__fab"
      @click="$q.dark.toggle()"
      aria-label="Toggle theme"
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { useProgressStore } from 'stores/progress';

const $q = useQuasar();
const progressStore = useProgressStore();

const postureCompleted = computed(() => progressStore.postureCompleted);
const stretchCompleted = computed(() => progressStore.stretchCompleted);

// UI-only (bisa dihubungkan ke data sebenarnya nanti)
const minutesToday = computed(() => 12);
const targetToday = computed(
  () => `${Number(postureCompleted.value) + Number(stretchCompleted.value)}/2`,
);
</script>

<style scoped>
.latihan {
  background: #f7f8fc;
}

.latihan__title {
  font-weight: 850;
  letter-spacing: -0.3px;
}

.latihan__subtitle {
  color: rgba(0, 0, 0, 0.6);
  max-width: 560px;
}

.latihan__card {
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(0, 0, 0, 0.07);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
}

.latihan__avatar {
  width: 52px;
  height: 52px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.latihan__avatar--blue {
  background: rgba(76, 148, 255, 0.18);
  color: #2563eb;
}

.latihan__avatar--purple {
  background: rgba(152, 108, 255, 0.18);
  color: #7b46ff;
}

.latihan__cardTitle {
  font-weight: 850;
  color: rgba(0, 0, 0, 0.85);
}

.latihan__cardSub {
  color: rgba(0, 0, 0, 0.6);
}

.latihan__pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 850;
}

.latihan__dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: currentColor;
  opacity: 0.9;
}

.latihan__pill--todo {
  background: rgba(251, 146, 60, 0.18);
  color: #ea580c;
}

.latihan__pill--done {
  background: rgba(34, 197, 94, 0.18);
  color: #16a34a;
}

.latihan__actionBtn {
  padding-left: 18px;
  padding-right: 12px;
  min-height: 38px;
}

.latihan__sectionLabel {
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.08em;
  color: rgba(0, 0, 0, 0.45);
}

.latihan__miniCard {
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(0, 0, 0, 0.07);
}

.latihan__miniCard--mint {
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.18);
}

.latihan__miniValue {
  font-size: 20px;
  font-weight: 900;
  color: #2563eb;
}

.latihan__miniValue--mint {
  color: #059669;
}

.latihan__miniCaption {
  margin-top: 4px;
  font-size: 10px;
  font-weight: 850;
  letter-spacing: 0.08em;
  color: rgba(0, 0, 0, 0.45);
}

.latihan__fab {
  position: fixed;
  right: 18px;
  bottom: 88px; /* biar tidak ketabrak bottom nav */
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14);
}

/* Dark mode */
:deep(.body--dark) .latihan {
  background: #0f1115;
}

:deep(.body--dark) .latihan__subtitle,
:deep(.body--dark) .latihan__cardSub,
:deep(.body--dark) .latihan__sectionLabel,
:deep(.body--dark) .latihan__miniCaption {
  color: rgba(255, 255, 255, 0.7);
}

:deep(.body--dark) .latihan__card {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
}

:deep(.body--dark) .latihan__miniCard {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
}
</style>
