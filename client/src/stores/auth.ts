import { defineStore, storeToRefs } from 'pinia'
import { axiosInstance } from '@/http/axiosInstance'
import { errorResponse } from '@/http/errorsResponse';
import { Roles } from '@/models/Roles'
import { User } from '@/models/User'

type StoreState = {
  loggedIn: boolean,
  roles: Roles | [],
  user: User | null
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loggedIn: false,
    roles: [],
    user: null
  } as StoreState),
  actions: {
    setToken(token: string) {
      localStorage.setItem('access_token', token);

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axiosInstance.defaults.headers.common['x-access-token'] = `${token}`;
    },
    removeToken() {
      localStorage.removeItem('access_token')
      delete axiosInstance.defaults.headers.common['Authorization']
    },
    /**
     * 
     * @param username 
     * @param password 
     * @returns 
     */
    async authSignIn(username: string, password: string) {
      const queryData = {
        username,
        password,
      };
      try {
        const { data } = await axiosInstance.post('api/auth/signin', queryData);
        const { accessToken, ...user } = data;

        this.user = user;
        this.setToken(accessToken);

        return {
          success: true,
          data: {
            response: data,
          }
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 
     * @param queryData 
     * @returns 
     */
    async authSignUp(queryData: SignUp) {
      try {
        const { data } = await axiosInstance.post('api/auth/signup', queryData);
        const { accessToken, ...user } = data;

        this.user = user;
        this.setToken(accessToken);

        return {
          success: true,
          data: {
            response: data,
          }
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    signIn() {
      this.loggedIn = true
    },
    signOut() {
      this.loggedIn = false
      this.removeToken();
    },

    async getRoles() {
      try {
        const { data } = await axiosInstance.get('api/roles');
        this.roles = data;

        return {
          success: true,
          data: {
            response: data,
          }
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
});
