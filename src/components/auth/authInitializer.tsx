import { getMe } from '@/services/auth.service';
import { tokenStorage } from '@/storage/token.storage';
import { useAuthStore } from '@/stores/auth.store';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function AuthInitializer() {
    const queryClient = useQueryClient();

    const setUser = useAuthStore(state => state.setUser);
    const setStatus = useAuthStore(state => state.setStatus);

    useEffect(() => {
        const restoreSession = async () => {
            try {
                const token = await tokenStorage.getAccessToken();

                if (!token) {
                    setStatus('unauthenticated');
                    return;
                }

                const user = await getMe();

                setUser(user);
                setStatus('authenticated');

                queryClient.setQueryData(['me'], user);

            } catch {
                await tokenStorage.clearTokens();
                setStatus('unauthenticated');
            }
        };

        restoreSession();
    }, []);

    return null;
}