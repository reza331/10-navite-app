import AuthInitializer from '@/components/auth/authInitializer'
import { queryClient } from '@/lib/query-client'
import { queryPersister } from '@/lib/query-persister'
import { useNetInfo } from '@react-native-community/netinfo'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import * as Notifications from 'expo-notifications'
import { Slot } from 'expo-router'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import "../../global.css"

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function MainLayout() {
  const netInfo = useNetInfo()

  const isOffline =
    netInfo.isConnected === false ||
    netInfo.isInternetReachable === false
    

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: queryPersister,
        maxAge: 1000 * 60 * 60 * 24,

        dehydrateOptions: {
          shouldDehydrateQuery: query =>
            query.state.status === 'success' &&
            query.queryKey[0] === 'products',
        },
      }}
    >
      <AuthInitializer />

      <SafeAreaView className="bg-black flex-1">
        {isOffline && (
          <View className="bg-rose-800 p-3">
            <Text className="text-white">
              You are offline. Showing cached data.
            </Text>
          </View>
        )}

        <View className="bg-zinc-800 flex-1">
          <Slot />
        </View>
      </SafeAreaView>
    </PersistQueryClientProvider>
  )
}