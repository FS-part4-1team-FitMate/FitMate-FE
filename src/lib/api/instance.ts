import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';
import 'dotenv/config';

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(function (config) {
	const userData = localStorage.getItem("userData");
	if (userData) {
		const accessToken = JSON.parse(userData).accessToken;
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
	_retry?: boolean;
}

const retryConfig: CustomAxiosRequestConfig = {
	_retry: true,
};

instance.interceptors.response.use(res => res, async (error) => {
	const originalRequest = error.config;
	const response = error.response; // 가로챈 리스폰스
	const userData = localStorage.getItem("userData");
	if (userData && (response?.status === 401 || response?.status === 403)) {
		const userDataJSON = JSON.parse(userData);
		if (!originalRequest._retry) {
			const res = await instance.post('/auth/refresh-token', { refreshToken: userDataJSON.refreshToken }, retryConfig);
			userDataJSON.accessToken = res.data.accessToken;
			userDataJSON.refreshToken = res.data.refreshToken;
			localStorage.setItem("userData", JSON.stringify(userDataJSON));
			originalRequest._retry = true;
			return instance(originalRequest);
		} else {
			localStorage.removeItem("userData");
			const router = useRouter();
			router.push('/login');
		}
	}
	return Promise.reject(error);
});

export default instance;
