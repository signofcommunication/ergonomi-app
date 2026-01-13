import { defineStore, acceptHMRUpdate } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    isLoggedIn: false,
  }),

  actions: {
    login(name: string) {
      this.name = name;
      this.isLoggedIn = true;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
