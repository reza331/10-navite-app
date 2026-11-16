import { logout } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const user = useAuthStore(state => state.user);
    const status = useAuthStore(state => state.status);

    const isAuthenticated = status === 'authenticated';

    const handleLogout = async () => {
        setMenuOpen(false);
        await logout();
    };

    return (
        <View className="bg-zinc-900 px-5 py-4 z-50">
            <View className="flex-row justify-between items-center">
                {/* Logo */}

                <Pressable onPress={()=>{
                    setMenuOpen(false)
                    router.push('/')
                }}>
                    <Text className="text-emerald-400 font-bold text-2xl">
                        Store
                    </Text>
                </Pressable>

                {/* User & Menu */}
                <View className="flex-row items-center gap-4">
                    {isAuthenticated && (
                        <View className="items-end">
                            <Text className="text-white font-semibold">
                                {user?.firstName}
                            </Text>
                            <Text className="text-zinc-500 text-xs">
                                Store Manager
                            </Text>
                        </View>
                    )}

                    <Pressable
                        onPress={() => setMenuOpen(prev => !prev)}
                        className="w-10 h-10 items-center justify-center rounded-xl bg-zinc-800"
                    >
                        <View className="gap-1.5">
                            <View className="w-5 h-0.5 bg-zinc-200 rounded-full" />
                            <View className="w-5 h-0.5 bg-zinc-200 rounded-full" />
                            <View className="w-5 h-0.5 bg-zinc-200 rounded-full" />
                        </View>
                    </Pressable>
                </View>
            </View>

            {/* Dropdown Menu */}
            {menuOpen && (
                <View className="mt-4 bg-zinc-800 rounded-xl p-2">
                    {isAuthenticated ? (
                        <>
                            <Pressable
                                onPress={() => {
                                    setMenuOpen(false);
                                    router.push('/orders');
                                }}
                                className="p-3"
                            >
                                <Text className="text-white">Orders</Text>
                            </Pressable>

                            <View className="h-px bg-zinc-700 my-1" />

                            <Pressable onPress={handleLogout} className="p-3">
                                <Text className="text-red-400 font-semibold">
                                    Logout
                                </Text>
                            </Pressable>
                        </>
                    ) : (
                        <Link href="/login" asChild>
                            <Pressable
                                onPress={() => setMenuOpen(false)}
                                className="p-3"
                            >
                                <Text className="text-emerald-400 font-semibold">
                                    Login
                                </Text>
                            </Pressable>
                        </Link>
                    )}
                </View>
            )}
        </View>
    );
}