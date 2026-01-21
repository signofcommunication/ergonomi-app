import { defineStore, acceptHMRUpdate } from 'pinia';

export type AssessmentProgressState = {
  /** Level tertinggi yang sudah terbuka (1..3). Default: 1 */
  unlockedLevel: 1 | 2 | 3;
  /** Level tertinggi yang sudah diselesaikan (0..3). Default: 0 */
  completedLevel: 0 | 1 | 2 | 3;
  /** Skor terakhir per level (opsional) */
  lastScoreByLevel: Partial<Record<1 | 2 | 3, { score: number; total: number }>>;
};

export const useAssessmentProgressStore = defineStore('assessmentProgress', {
  state: (): AssessmentProgressState => ({
    unlockedLevel: 1,
    completedLevel: 0,
    lastScoreByLevel: {},
  }),

  actions: {
    unlockLevel(level: 1 | 2 | 3) {
      if (level > this.unlockedLevel) this.unlockedLevel = level;
    },

    markCompleted(level: 1 | 2 | 3, score: number, total: number) {
      if (level > this.completedLevel) this.completedLevel = level;
      this.lastScoreByLevel[level] = { score, total };
      if (level < 3) this.unlockLevel((level + 1) as 2 | 3);
    },

    reset() {
      this.unlockedLevel = 1;
      this.completedLevel = 0;
      this.lastScoreByLevel = {};
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAssessmentProgressStore, import.meta.hot));
}
