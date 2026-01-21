<template>
  <q-page class="materi q-pa-md">
    <!-- Header -->
    <div class="row items-start justify-between q-mb-md">
      <div>
        <div class="text-h4 materi__title">Materi Pembelajaran</div>
        <div class="text-body1 materi__subtitle q-mt-sm">
          Pilih materi yang ingin Anda pelajari untuk meningkatkan kenyamanan kerja.
        </div>
      </div>
    </div>

    <!-- Search -->
    <q-input
      v-model="search"
      rounded
      dense
      borderless
      class="materi__search q-mb-md"
      placeholder="Cari materi..."
    >
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <!-- Category chips -->
    <div class="row no-wrap q-gutter-sm q-mb-lg materi__chipRow">
      <q-btn
        v-for="c in categories"
        :key="c"
        rounded
        unelevated
        class="materi__chip"
        :color="activeCategory === c ? 'primary' : 'grey-2'"
        :text-color="activeCategory === c ? 'white' : 'grey-9'"
        :label="c"
        @click="activeCategory = c"
      />
    </div>

    <!-- Materi cards -->
    <div class="column q-gutter-md">
      <q-card
        v-for="materi in filteredMateri"
        :key="materi.id"
        class="materi__card"
        flat
        bordered
        clickable
        @click="$router.push(`/materi/${materi.id}`)"
      >
        <q-card-section class="row items-start q-col-gutter-md">
          <div class="col-auto">
            <div class="materi__iconWrap">
              <q-icon :name="getMateriIcon(materi)" size="22px" />
            </div>
          </div>

          <div class="col">
            <div class="row items-start justify-between q-col-gutter-sm">
              <div class="col">
                <div class="text-h6 materi__cardTitle">
                  {{ materi.title }}
                </div>
              </div>
              <div class="col-auto">
                <div
                  class="materi__badge"
                  :class="isCompleted(materi.id) ? 'materi__badge--done' : 'materi__badge--todo'"
                >
                  {{ isCompleted(materi.id) ? 'SELESAI' : 'BELUM' }}
                </div>
              </div>
            </div>

            <div class="text-body2 materi__cardSubtitle q-mt-xs">
              {{ materi.subtitle }}
            </div>

            <div class="row items-center q-gutter-lg q-mt-md materi__meta">
              <div class="row items-center q-gutter-xs">
                <q-icon name="schedule" size="18px" />
                <span>{{ getDuration(materi) }}</span>
              </div>
              <div class="row items-center q-gutter-xs">
                <q-icon name="trending_up" size="18px" />
                <span>{{ getLevel(materi) }}</span>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useProgressStore } from 'stores/progress';
import { materiList as materiData } from 'src/data/materi';

type MateriItem = {
  id: string;
  title: string;
  subtitle: string;
  content?: string;
  category?: string;
  tags?: string | string[];
  duration?: number;
  minutes?: number;
  level?: string;
};

const progressStore = useProgressStore();

const materiList = materiData as unknown as MateriItem[];

const isCompleted = (id: string) => progressStore.materiCompleted.includes(id);

const search = ref('');
const categories = ['Semua', 'Dasar', 'Pencegahan', 'Latihan'] as const;
const activeCategory = ref<(typeof categories)[number]>('Semua');

const normalize = (s: string) => (s || '').toLowerCase().trim();

const getCategory = (materi: MateriItem): (typeof categories)[number] => {
  const hay = normalize(
    `${materi?.category ?? ''} ${String(materi?.tags ?? '')} ${materi?.title ?? ''}`,
  );
  if (hay.includes('dasar')) return 'Dasar';
  if (hay.includes('pencegahan') || hay.includes('keluhan')) return 'Pencegahan';
  if (hay.includes('latihan') || hay.includes('peregangan') || hay.includes('postur'))
    return 'Latihan';
  return 'Dasar';
};

const filteredMateri = computed(() => {
  const q = normalize(search.value);
  return materiList.filter((m: MateriItem) => {
    const inCategory = activeCategory.value === 'Semua' || getCategory(m) === activeCategory.value;
    const inSearch =
      !q ||
      normalize(m.title).includes(q) ||
      normalize(m.subtitle).includes(q) ||
      normalize(m?.content ?? '').includes(q);
    return inCategory && inSearch;
  });
});

const getMateriIcon = (materi: MateriItem) => {
  const c = getCategory(materi);
  if (c === 'Pencegahan') return 'health_and_safety';
  if (c === 'Latihan') return 'menu_book';
  return 'menu_book';
};

const getDuration = (materi: MateriItem) => {
  const d = materi?.duration ?? materi?.minutes;
  const minutes = typeof d === 'number' ? d : undefined;
  return minutes ? `${minutes} Menit` : '5 Menit';
};

const getLevel = (materi: MateriItem) => {
  const l = normalize(materi?.level ?? '');
  if (l.includes('pemula')) return 'Pemula';
  if (l.includes('menengah')) return 'Menengah';
  if (l.includes('lanjut')) return 'Lanjut';
  return 'Menengah';
};
</script>

<style scoped>
.materi {
  background: #f7f8fc;
}

.materi__title {
  font-weight: 850;
  letter-spacing: -0.3px;
}

.materi__subtitle {
  color: rgba(0, 0, 0, 0.6);
  max-width: 560px;
}

.materi__profileBtn {
  color: #6b55d6;
}

.materi__search {
  background: #eef3f8;
  border-radius: 999px;
  padding: 6px 6px;
}

.materi__chipRow {
  overflow-x: auto;
  padding-bottom: 4px;
}

.materi__chip {
  padding: 6px 12px;
  min-height: 42px;
}

.materi__card {
  border-radius: 28px;
  background: rgba(107, 85, 214, 0.06);
  border-color: rgba(0, 0, 0, 0.07);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

.materi__iconWrap {
  width: 52px;
  height: 52px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(107, 85, 214, 0.12);
  color: #6b55d6;
}

.materi__cardTitle {
  font-weight: 850;
  line-height: 1.2;
}

.materi__cardSubtitle {
  color: rgba(0, 0, 0, 0.6);
}

.materi__meta {
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;
}

.materi__badge {
  border-radius: 10px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.06em;
}

.materi__badge--todo {
  background: #fde68a;
  color: #92400e;
}

.materi__badge--done {
  background: #d1fae5;
  color: #166534;
}

.materi__sectionTitle {
  font-weight: 850;
}

.materi__progressCard {
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(107, 85, 214, 0.18);
}

.materi__progressValue {
  font-size: 12px;
  font-weight: 850;
  color: #6b55d6;
}

.materi__progressTitle {
  font-weight: 850;
}

.materi__progressSub {
  color: rgba(0, 0, 0, 0.6);
}

/* Dark mode */
:deep(.body--dark) .materi {
  background: #0f1115;
}

:deep(.body--dark) .materi__subtitle,
:deep(.body--dark) .materi__cardSubtitle,
:deep(.body--dark) .materi__meta,
:deep(.body--dark) .materi__progressSub {
  color: rgba(255, 255, 255, 0.7);
}

:deep(.body--dark) .materi__card {
  background: rgba(107, 85, 214, 0.14);
  border-color: rgba(255, 255, 255, 0.12);
}

:deep(.body--dark) .materi__search {
  background: rgba(255, 255, 255, 0.08);
}

:deep(.body--dark) .materi__progressCard {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(107, 85, 214, 0.28);
}
</style>
