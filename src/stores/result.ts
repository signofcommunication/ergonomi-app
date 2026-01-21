import { defineStore } from 'pinia';

export type DetailItem = {
  id: string;
  question: string;
  correctIndex: number;
  userIndex: number | null;
};

export type ResultState = {
  score: number;
  total: number;
  detail: DetailItem[];
};

export const useResultStore = defineStore('result', {
  state: (): ResultState => ({
    score: 0,
    total: 0,
    detail: [],
  }),
  actions: {
    setResult(payload: ResultState) {
      this.score = payload.score;
      this.total = payload.total;
      this.detail = payload.detail;
    },
    reset() {
      this.score = 0;
      this.total = 0;
      this.detail = [];
    },
  },
});
