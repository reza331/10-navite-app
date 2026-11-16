import { api } from '@/axios/client';
import {
    AuthResponse,
    AuthUser,
    LoginPayload,
    RefreshResponse
} from '@/types/auth.type';

import { queryClient } from '@/lib/query-client';
import { tokenStorage } from '@/storage/token.storage';
import { useAuthStore } from '@/stores/auth.store';


export const login = async (payload: LoginPayload) => {
    const { data } = await api.post<AuthResponse>(
        '/auth/login',
        {
            ...payload,
            expiresInMins: payload.expiresInMins ?? 30
        }
    );

    return data;
};

export const getMe = async () => {
    const { data } = await api.get<AuthUser>('/auth/me');

    return data;
};

export const refreshToken = async (refreshToken: string) => {
    const { data } = await api.post<RefreshResponse>(
        '/auth/refresh',
        {
            refreshToken,
            expiresInMins: 30
        }
    );

    return data;
};

export const logout = async () => {
    await tokenStorage.clearTokens();

    queryClient.clear();

    useAuthStore.getState().logout();
};