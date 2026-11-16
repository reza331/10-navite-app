import { useState } from 'react';
import {
    ActivityIndicator, Text, TextInput, TouchableOpacity, View,
} from 'react-native';

import useLogin from '@/hooks/use-login';

export default function LoginScreen() {
    const [username, setUsername] = useState('emilys');
    const [password, setPassword] = useState('emilyspass');

    const { mutate, isPending, error } = useLogin();

    const handleLogin = () => {
        mutate({
            username: username.trim(),
            password,
        });
    }

    return (
        <View className="flex-1 bg-black justify-center px-6">
            <View className="mb-10">
                <Text className="text-emerald-400 text-sm font-semibold mb-3">
                    STORE MANAGEMENT
                </Text>

                <Text className="text-white text-4xl font-bold mb-3">
                    Welcome Back
                </Text>

                <Text className="text-zinc-400 text-base">
                    Sign in to manage your store orders.
                </Text>
            </View>

            <View className="gap-5">
                <View>
                    <Text className="text-zinc-300 mb-2">
                        Username
                    </Text>

                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Enter your username"
                        placeholderTextColor="#71717a"
                        autoCapitalize="none"
                        autoCorrect={false}
                        editable={!isPending}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-white"
                    />
                </View>

                <View>
                    <Text className="text-zinc-300 mb-2">
                        Password
                    </Text>

                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter your password"
                        placeholderTextColor="#71717a"
                        secureTextEntry
                        editable={!isPending}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-white"
                    />
                </View>

                {error && (
                    <Text className="text-red-400 text-sm">
                        {error.message}
                    </Text>
                )}

                <TouchableOpacity
                    onPress={handleLogin}
                    disabled={isPending || !username.trim() || !password}
                    activeOpacity={0.8}
                    className={`rounded-xl py-4 items-center justify-center ${isPending ? 'bg-emerald-800' : 'bg-emerald-500'
                        }`}
                >
                    {isPending ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Text className="text-black font-bold text-base">
                            Sign In
                        </Text>
                    )}
                </TouchableOpacity>
            </View>

            <Text className="text-zinc-600 text-center mt-10 text-xs">
                Demo credentials are prefilled for testing.
            </Text>
        </View>
    );
}