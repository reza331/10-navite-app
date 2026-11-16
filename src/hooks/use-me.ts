import { getMe } from '@/services/auth.service';
import { tokenStorage } from '@/storage/token.storage';
import { useQuery } from '@tanstack/react-query';

export default function useMe() {
    return useQuery({
        queryKey: ['me'],

        queryFn: async () => {
            const token = await tokenStorage.getAccessToken();

            if (!token) {
                throw new Error('Unauthorized');
            }

            return getMe();
        },

        retry: false
    });
}