import NetInfo from '@react-native-community/netinfo'
import { onlineManager, QueryClient } from '@tanstack/react-query'

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(
      state.isConnected === true &&
      state.isInternetReachable !== false
    )
  })
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      gcTime: 1000 * 60 * 60 * 24,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
})