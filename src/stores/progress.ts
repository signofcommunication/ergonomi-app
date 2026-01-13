import { defineStore, acceptHMRUpdate } from 'pinia';

export const useProgressStore = defineStore('progress', {
  state: () => ({
    materiCompleted: [] as string[],
    postureCompleted: false,
    stretchCompleted: false,
  }),

  actions: {
    completeMateri(id: string) {
      if (!this.materiCompleted.includes(id)) {
        this.materiCompleted.push(id);
      }
    },
    completePosture() {
      this.postureCompleted = true;
    },
    completeStretch() {
      this.stretchCompleted = true;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProgressStore, import.meta.hot));
}
