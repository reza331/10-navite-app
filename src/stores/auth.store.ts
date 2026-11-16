import { AuthUser } from '@/types/auth.type';
import { create } from 'zustand';

interface AuthState {
    user: AuthUser | null;
    status: 'loading' | 'authenticated' | 'unauthenticated';

    setUser: (user: AuthUser | null) => void;
    setStatus: (status: AuthState['status']) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    status: 'loading',

    setUser: (user) => set({ user }),

    setStatus: (status) => set({ status }),

    logout: () => set({
        user: null,
        status: 'unauthenticated'
    })
}));