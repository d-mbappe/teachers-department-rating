import { defineStore } from 'pinia'
import { axiosInstance } from '@/http/axiosInstance'
import { Roles } from '@/models/Roles'
import { User } from '@/models/User'


type StoreState = {
  user: User | null,
  profile: any
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    profile: {}
  } as StoreState),
  actions: {
    async getUser() {
      try {
        const { data } = await axiosInstance.get('api/user');

        this.user = data;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async getUserInfo() {
      try {
        const { data } = await axiosInstance.get(`api/user/info/${this.user?.id}`);
        
        this.profile = data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  }
});
