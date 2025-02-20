import axios, { AxiosRequestConfig } from "axios";
import "dotenv/config";
import { useRouter } from "next/router";
import { LSUserData } from "@/types/types";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(function (config) {
  const userData = localStorage.getItem("userData");
  if (userData) {
    try {
      const accessToken = (JSON.parse(userData) as LSUserData).accessToken;
      config.headers.Authorization = `Bearer ${accessToken}`;
    } catch (err) {
      console.error(err);
    }
  }
  return config;
});

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const retryConfig: CustomAxiosRequestConfig = {
  _retry: true,
};

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const response = error.response; // 가로챈 리스폰스
    const userData = localStorage.getItem("userData");
    if (userData && (response?.status === 401 || response?.status === 403)) {
      try {
        const userDataJSON: LSUserData = JSON.parse(userData);
        if (!originalRequest._retry) {
          const res = await instance.post(
            "/auth/token/refresh",
            { refreshToken: userDataJSON.refreshToken },
            retryConfig,
          );
          userDataJSON.accessToken = res.data.accessToken;
          userDataJSON.refreshToken = res.data.refreshToken;
          localStorage.setItem("userData", JSON.stringify(userDataJSON as LSUserData));
          originalRequest._retry = true;
          return instance(originalRequest);
        } else {
          localStorage.removeItem("userData");
          const router = useRouter();
          router.push("/login");
        }
      } catch (err) {
        console.error(err);
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
