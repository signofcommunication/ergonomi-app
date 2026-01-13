import { defineStore, acceptHMRUpdate } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    password: '',
    name: '',
    isLoggedIn: false,
  }),

  actions: {
    login(username: string, password: string, name?: string) {
      this.username = username;
      this.password = password;
      if (name) this.name = name;
      this.isLoggedIn = true;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
