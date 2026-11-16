
import axios, {
    InternalAxiosRequestConfig
} from 'axios';

import { tokenStorage } from '@/storage/token.storage';
import { useAuthStore } from '@/stores/auth.store';
import { RefreshResponse } from '@/types/auth.type';
import { normalizeError } from './error';

const BASE_URL = 'https://dummyjson.com';

declare module 'axios' {
    interface InternalAxiosRequestConfig {
        _retry?: boolean;
    }
}

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

let isRefreshing = false;

let failedQueue: {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((request) => {
        if (error) {
            request.reject(error)
        } else if (token) {
            request.resolve(token)
        }
    })
    failedQueue = []
}

api.interceptors.request.use(async (config) => {
    const token = await tokenStorage.getAccessToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (!axios.isAxiosError(error)) {
            return Promise.reject(normalizeError(error));
        }

        const originalRequest = error.config as
            | InternalAxiosRequestConfig
            | undefined;

        const status = error.response?.status;

        const isAuthRequest =
            originalRequest?.url?.includes('/auth/login') ||
            originalRequest?.url?.includes('/auth/refresh');

        if (
            status !== 401 ||
            !originalRequest ||
            originalRequest._retry ||
            isAuthRequest
        ) {
            return Promise.reject(normalizeError(error));
        }

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then((token) => {
                    originalRequest.headers.Authorization =
                        `Bearer ${token}`;

                    return api(originalRequest);
                })
                .catch((err) => {
                    return Promise.reject(normalizeError(err));
                });
        }

        isRefreshing = true;

        try {

            console.log('REFRESH REQUEST')

            const refreshToken =
                await tokenStorage.getRefreshToken();

            if (!refreshToken) {
                throw new Error('Refresh token not found');
            }

            const { data } = await axios.post<RefreshResponse>(
                `${BASE_URL}/auth/refresh`,
                {
                    refreshToken,
                    expiresInMins: 30
                }
            );

            await tokenStorage.setTokens(
                data.accessToken,
                data.refreshToken
            );

            processQueue(null, data.accessToken);

            originalRequest.headers.Authorization =
                `Bearer ${data.accessToken}`;

            return api(originalRequest);

        } catch (refreshError) {

            processQueue(refreshError, null);

            await tokenStorage.clearTokens();

            useAuthStore.getState().logout();

            return Promise.reject(normalizeError(refreshError));

        } finally {
            isRefreshing = false;
        }
    }
)
