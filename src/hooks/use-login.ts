import { login } from '@/services/auth.service';
import { tokenStorage } from '@/storage/token.storage';
import { useAuthStore } from '@/stores/auth.store';
import { AuthUser, LoginVariables } from '@/types/auth.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

export default function useLogin() {

    const queryClient = useQueryClient()

    const router = useRouter()

    return useMutation({
        mutationFn: async (payload: LoginVariables) => {
            const response = await login(payload);

            await tokenStorage.setTokens(
                response.accessToken,
                response.refreshToken
            );

            return response;
        },

        onSuccess: response => {
            const user: AuthUser = {
                id: response.id,
                username: response.username,
                email: response.email,
                firstName: response.firstName,
                lastName: response.lastName,
                gender: response.gender,
                image: response.image,
            };

            useAuthStore.getState().setUser(user);
            useAuthStore.getState().setStatus('authenticated');

            queryClient.setQueryData(['me'], user);

            router.replace('/');
        },
    })
    
}