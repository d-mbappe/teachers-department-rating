import axios, { AxiosError } from 'axios'
import router  from '@/router'
import { useAuthStore } from '@/stores/auth'

const API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
	baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
	config => {
			const token = localStorage.getItem('access_token');

			if (token) {
					config.headers['Authorization'] = token;
					config.headers['x-access-token'] = token;
			}
			return config;
	},
	error => {
			Promise.reject(error)
});

axiosInstance.interceptors.response.use(undefined, async (error: AxiosError): Promise<AxiosError> => {
	const token = localStorage.getItem('access_token');
	const authStore = useAuthStore();

	if(error.response && (error.response.status === 401 || error.response.status === 403) ) {
			authStore.signOut();

			await router.push('/auth');
	}
	return Promise.reject(error);
});
