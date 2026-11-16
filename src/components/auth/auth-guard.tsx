import { useAuthStore } from '@/stores/auth.store';
import { Redirect, Slot } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function AuthGuard() {
    const status = useAuthStore(state => state.status);

    if (status === 'loading') {
        return (
            <View className="flex-1 items-center justify-center bg-zinc-900">
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }

    if (status === 'unauthenticated') {
        return <Redirect href="/login" />;
    }

    return <Slot />;
}