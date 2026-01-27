<template>
  <q-page class="progress q-pa-md">
    <!-- Header -->
    <div class="q-mb-md">
      <div class="text-h4 progress__title">Progress Pembelajaran</div>
      <div class="text-body1 progress__subtitle q-mt-sm">
        Lihat kemajuan Anda dalam pembelajaran ergonomi.
      </div>
    </div>

    <!-- Summary -->
    <q-card class="progress__summary q-mb-lg" flat bordered>
      <q-card-section class="row items-center justify-between q-col-gutter-md">
        <div class="col">
          <div class="text-subtitle1 progress__summaryTitle">Ringkasan Materi</div>
          <div class="text-body2 progress__summarySub q-mt-xs">
            {{ completedMateriCount }} dari {{ materiList.length }} topik telah dipelajari
          </div>
          <q-chip class="q-mt-sm" color="white" text-color="primary" size="sm" square>
            {{ summaryLabel }}
          </q-chip>
        </div>

        <div class="col-auto">
          <q-circular-progress
            class="progress__circle"
            show-value
            :value="progressPercent"
            size="72px"
            :thickness="0.22"
            color="primary"
            track-color="white"
          >
            <div class="progress__circleValue">{{ progressPercent }}%</div>
          </q-circular-progress>
        </div>
      </q-card-section>
    </q-card>

    <!-- Materi read (sinkron dengan data materi) -->
    <div class="progress__sectionLabel q-mb-sm">MATERI YANG TELAH DIBACA</div>
    <q-card class="progress__listCard q-mb-lg" flat bordered>
      <q-list separator>
        <q-item v-if="completedMateriList.length === 0">
          <q-item-section>
            <q-item-label class="progress__itemCaption"
              >Belum ada materi yang diselesaikan.</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item
          v-for="materi in completedMateriList"
          :key="materi.id"
          clickable
          @click="$router.push(`/materi/${materi.id}`)"
        >
          <q-item-section avatar>
            <div class="progress__avatar progress__avatar--blue">
              <q-icon name="menu_book" size="20px" />
            </div>
          </q-item-section>

          <q-item-section>
            <q-item-label class="progress__itemTitle">{{ materi.title }}</q-item-label>
            <q-item-label caption class="progress__itemCaption">{{ materi.subtitle }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="progress__badge progress__badge--done">Selesai</div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <!-- Exercises (sinkron dengan store) -->
    <div class="progress__sectionLabel q-mb-sm">LATIHAN YANG DISELESAIKAN</div>
    <q-card class="progress__listCard" flat bordered>
      <q-list separator>
        <q-item clickable @click="$router.push('/latihan/postur')">
          <q-item-section avatar>
            <div class="progress__avatar progress__avatar--green">
              <q-icon name="fitness_center" size="20px" />
            </div>
          </q-item-section>

          <q-item-section>
            <q-item-label class="progress__itemTitle">Latihan Postur</q-item-label>
            <q-item-label caption class="progress__itemCaption">
              {{ postureCompleted ? 'Selesai dikerjakan' : 'Belum dikerjakan' }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <div
              class="progress__badge"
              :class="postureCompleted ? 'progress__badge--done' : 'progress__badge--todo'"
            >
              {{ postureCompleted ? 'Selesai' : 'Belum' }}
            </div>
          </q-item-section>
        </q-item>

        <q-item clickable @click="$router.push('/latihan/peregangan')">
          <q-item-section avatar>
            <div class="progress__avatar progress__avatar--red">
              <q-icon name="timer" size="20px" />
            </div>
          </q-item-section>

          <q-item-section>
            <q-item-label class="progress__itemTitle">Latihan Peregangan</q-item-label>
            <q-item-label caption class="progress__itemCaption">Estimasi 5 Menit</q-item-label>
          </q-item-section>

          <q-item-section side>
            <div
              class="progress__badge"
              :class="stretchCompleted ? 'progress__badge--done' : 'progress__badge--todo'"
            >
              {{ stretchCompleted ? 'Selesai' : 'Belum' }}
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProgressStore } from 'stores/progress';
import { materiList as materiListData, type Materi } from 'src/data/materi';

const progressStore = useProgressStore();

const materiList: Materi[] = materiListData;

const isMateriCompleted = (id: string) => progressStore.materiCompleted.includes(id);

const postureCompleted = computed(() => progressStore.postureCompleted);
const stretchCompleted = computed(() => progressStore.stretchCompleted);

const completedMateriList = computed(() => materiList.filter((m) => isMateriCompleted(m.id)));

const completedMateriCount = computed(() => completedMateriList.value.length);

const progressPercent = computed(() => {
  if (!materiList.length) return 0;
  return Math.round((completedMateriCount.value / materiList.length) * 100);
});

const summaryLabel = computed(() => {
  const p = progressPercent.value;
  if (p >= 80) return 'Luar biasa!';
  if (p >= 60) return 'Sangat Bagus!';
  if (p >= 40) return 'Bagus!';
  return 'Ayo mulai!';
});
</script>

<style scoped>
.progress {
  background: #f7f8fc;
}

.progress__title {
  font-weight: 850;
  letter-spacing: -0.3px;
}

.progress__subtitle {
  color: rgba(0, 0, 0, 0.6);
  max-width: 560px;
}

.progress__summary {
  border-radius: 22px;
  background: rgba(107, 85, 214, 0.16);
  border-color: rgba(107, 85, 214, 0.18);
}

.progress__summaryTitle {
  font-weight: 850;
  color: rgba(0, 0, 0, 0.85);
}

.progress__summarySub {
  color: rgba(0, 0, 0, 0.62);
}

.progress__circleValue {
  font-size: 12px;
  font-weight: 850;
  color: rgba(0, 0, 0, 0.75);
}

.progress__sectionLabel {
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.08em;
  color: rgba(0, 0, 0, 0.45);
}

.progress__listCard {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(0, 0, 0, 0.07);
}

.progress__avatar {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress__avatar--blue {
  background: rgba(76, 148, 255, 0.18);
  color: #2563eb;
}

.progress__avatar--green {
  background: rgba(45, 212, 191, 0.18);
  color: #059669;
}

.progress__avatar--red {
  background: rgba(255, 99, 132, 0.18);
  color: #ef4444;
}

.progress__itemTitle {
  font-weight: 800;
  color: rgba(0, 0, 0, 0.82);
}

.progress__itemCaption {
  color: rgba(0, 0, 0, 0.55);
}

.progress__badge {
  border-radius: 10px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.02em;
}

.progress__badge--todo {
  background: #fde68a;
  color: #92400e;
}

.progress__badge--done {
  background: #d1fae5;
  color: #166534;
}

/* Dark mode */
:deep(.body--dark) .progress {
  background: #0f1115;
}

:deep(.body--dark) .progress__subtitle,
:deep(.body--dark) .progress__summarySub,
:deep(.body--dark) .progress__sectionLabel,
:deep(.body--dark) .progress__itemCaption {
  color: rgba(255, 255, 255, 0.7);
}

:deep(.body--dark) .progress__summaryTitle,
:deep(.body--dark) .progress__itemTitle,
:deep(.body--dark) .progress__circleValue {
  color: rgba(255, 255, 255, 0.9);
}

:deep(.body--dark) .progress__summary {
  background: rgba(107, 85, 214, 0.22);
  border-color: rgba(107, 85, 214, 0.28);
}

:deep(.body--dark) .progress__listCard {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
}
</style>
