<template>
  <q-page class="dashboard q-pa-md">
    <div class="row items-start justify-between q-mb-sm">
      <div>
        <div class="text-h4 dashboard__title q-mb-xs">Dashboard Ergonomi</div>
        <div class="text-body1 dashboard__subtitle q-mb-md">
          Selamat datang di aplikasi pembelajaran ergonomi. Pilih fitur yang ingin Anda akses.
        </div>
      </div>
    </div>

    <div class="q-mt-md">
      <q-card
        class="dashboard__navCard q-mb-md"
        flat
        bordered
        clickable
        role="button"
        tabindex="0"
        @click="$router.push('/materi')"
        @keyup.enter="$router.push('/materi')"
      >
        <q-card-section class="row items-center q-py-md">
          <div class="dashboard__iconWrap dashboard__iconWrap--purple q-mr-md">
            <q-icon name="menu_book" size="24px" />
          </div>
          <div class="col">
            <div class="text-subtitle1 dashboard__itemTitle">Materi Pembelajaran</div>
            <div class="text-caption dashboard__itemCaption">Baca materi ergonomi</div>
          </div>
          <q-icon name="chevron_right" class="dashboard__chevron" size="24px" />
        </q-card-section>
      </q-card>

      <q-card
        class="dashboard__navCard q-mb-md"
        flat
        bordered
        clickable
        role="button"
        tabindex="0"
        @click="$router.push('/assessment')"
        @keyup.enter="$router.push('/assessment')"
      >
        <q-card-section class="row items-center q-py-md">
          <div class="dashboard__iconWrap dashboard__iconWrap--blue q-mr-md">
            <q-icon name="quiz" size="24px" />
          </div>
          <div class="col">
            <div class="text-subtitle1 dashboard__itemTitle">Penilaian</div>
            <div class="text-caption dashboard__itemCaption">Lakukan penilaian ergonomi</div>
          </div>
          <q-icon name="chevron_right" class="dashboard__chevron" size="24px" />
        </q-card-section>
      </q-card>

      <q-card
        class="dashboard__navCard q-mb-md"
        flat
        bordered
        clickable
        role="button"
        tabindex="0"
        @click="$router.push('/latihan')"
        @keyup.enter="$router.push('/latihan')"
      >
        <q-card-section class="row items-center q-py-md">
          <div class="dashboard__iconWrap dashboard__iconWrap--green q-mr-md">
            <q-icon name="fitness_center" size="24px" />
          </div>
          <div class="col">
            <div class="text-subtitle1 dashboard__itemTitle">Latihan</div>
            <div class="text-caption dashboard__itemCaption">Latihan postur dan peregangan</div>
          </div>
          <q-icon name="chevron_right" class="dashboard__chevron" size="24px" />
        </q-card-section>
      </q-card>

      <q-card
        class="dashboard__navCard q-mb-lg"
        flat
        bordered
        clickable
        role="button"
        tabindex="0"
        @click="$router.push('/progress')"
        @keyup.enter="$router.push('/progress')"
      >
        <q-card-section class="row items-center q-py-md">
          <div class="dashboard__iconWrap dashboard__iconWrap--orange q-mr-md">
            <q-icon name="bar_chart" size="24px" />
          </div>
          <div class="col">
            <div class="text-subtitle1 dashboard__itemTitle">Progress</div>
            <div class="text-caption dashboard__itemCaption">Lihat kemajuan Anda</div>
          </div>
          <q-icon name="chevron_right" class="dashboard__chevron" size="24px" />
        </q-card-section>
      </q-card>

      <q-card class="dashboard__tipsCard" flat bordered>
        <q-card-section>
          <div class="row items-center q-mb-sm">
            <q-icon name="lightbulb" class="dashboard__tipsIcon q-mr-sm" size="22px" />
            <div class="text-subtitle2 dashboard__tipsTitle">TIPS ERGONOMI</div>
          </div>
          <div class="dashboard__tipsText">
            “Pastikan layar komputer sejajar dengan mata untuk mengurangi beban pada leher Anda.”
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped>
.dashboard {
  background:
    radial-gradient(circle at 12% 18%, rgba(59, 130, 246, 0.15), transparent 48%),
    radial-gradient(circle at 88% 25%, rgba(168, 85, 247, 0.12), transparent 45%),
    radial-gradient(circle at 50% 95%, rgba(14, 165, 233, 0.08), transparent 35%),
    linear-gradient(165deg, #f8faff 0%, #eff6ff 35%, #dbeafe 100%);
}

.dashboard__title {
  font-weight: 800;
  letter-spacing: -0.3px;
}

.dashboard__subtitle {
  color: rgba(0, 0, 0, 0.62);
  max-width: 520px;
}

.dashboard__themeBtn {
  background: #fff;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

.dashboard__navCard {
  border-radius: 28px;
  border-color: rgba(59, 130, 246, 0.12);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.88) 100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
  box-shadow:
    0 4px 14px rgba(59, 130, 246, 0.08),
    0 1px 3px rgba(14, 165, 233, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(168, 85, 247, 0.08) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow:
      0 16px 38px rgba(59, 130, 246, 0.22),
      0 4px 12px rgba(168, 85, 247, 0.15),
      0 0 0 1px rgba(99, 102, 241, 0.08);
    border-color: rgba(99, 102, 241, 0.25);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.005);
  }
}

.dashboard__itemTitle {
  font-weight: 750;
  color: rgba(0, 0, 0, 0.86);
}

.dashboard__itemCaption {
  color: rgba(0, 0, 0, 0.55);
}

.dashboard__chevron {
  color: rgba(0, 0, 0, 0.35);
}

.dashboard__iconWrap {
  width: 54px;
  height: 54px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard__iconWrap--purple {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.22) 0%, rgba(139, 92, 246, 0.16) 100%);
  color: #7c3aed;
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.18);
}

.dashboard__iconWrap--blue {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.24) 0%, rgba(37, 99, 235, 0.18) 100%);
  color: #1d4ed8;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.dashboard__iconWrap--green {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.24) 0%, rgba(5, 150, 105, 0.18) 100%);
  color: #047857;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.dashboard__iconWrap--orange {
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.24) 0%, rgba(249, 115, 22, 0.18) 100%);
  color: #ea580c;
  box-shadow: 0 4px 12px rgba(251, 146, 60, 0.22);
}

.dashboard__tipsCard {
  border-radius: 24px;
  border: 1.5px solid rgba(99, 102, 241, 0.22);
  background: linear-gradient(135deg, rgba(165, 180, 252, 0.28) 0%, rgba(199, 210, 254, 0.18) 100%);
  box-shadow: 0 6px 18px rgba(99, 102, 241, 0.12);
}

.dashboard__tipsTitle {
  color: #6366f1;
  letter-spacing: 0.08em;
  font-weight: 800;
}

.dashboard__tipsIcon {
  color: #6366f1;
}

.dashboard__tipsText {
  color: rgba(0, 0, 0, 0.7);
  font-style: italic;
  line-height: 1.6;
}

/* Dark mode tweaks */
:deep(.q-dark) .dashboard__subtitle,
:deep(.body--dark) .dashboard__subtitle {
  color: rgba(255, 255, 255, 0.72);
}

:deep(.body--dark) .dashboard__navCard {
  background: rgba(30, 30, 30, 0.72);
  border-color: rgba(255, 255, 255, 0.12);
}

:deep(.body--dark) .dashboard__itemTitle {
  color: rgba(255, 255, 255, 0.9);
}

:deep(.body--dark) .dashboard__itemCaption {
  color: rgba(255, 255, 255, 0.6);
}

:deep(.body--dark) .dashboard__chevron {
  color: rgba(255, 255, 255, 0.35);
}

:deep(.body--dark) .dashboard__themeBtn {
  background: rgba(30, 30, 30, 0.9);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
}

:deep(.body--dark) .dashboard__tipsCard {
  background: rgba(107, 85, 214, 0.14);
  border-color: rgba(107, 85, 214, 0.28);
}

:deep(.body--dark) .dashboard__tipsText {
  color: rgba(255, 255, 255, 0.72);
}
</style>
