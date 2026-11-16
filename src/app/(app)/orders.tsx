import useOrders from '@/hooks/use-orders';
import { useAuthStore } from '@/stores/auth.store';
import { Redirect } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from 'react-native';

export default function OrdersScreen() {
  const user = useAuthStore(state => state.user);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useOrders({
    userId: user?.id ?? 0,
  });

  const orders = data?.pages.flatMap(page => page.carts) ?? [];

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

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-900">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-900">
        <Text className="text-white">Failed to load orders.</Text>
      </View>
    );
  }

  return (
    <FlatList
      className="flex-1 bg-zinc-900 px-4"
      data={orders}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View className="mb-3 rounded-xl bg-zinc-800 p-4">
          <Text className="text-lg font-bold text-white">
            Order #{item.id}
          </Text>

          <Text className="mt-2 text-zinc-300">
            Products: {item.totalProducts}
          </Text>

          <Text className="text-zinc-300">
            Quantity: {item.totalQuantity}
          </Text>

          <Text className="mt-2 text-white">
            Total: ${item.total.toFixed(2)}
          </Text>
        </View>
      )}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage
          ? <ActivityIndicator color="white" className="my-4" />
          : <></>
      }
      ListEmptyComponent={
        <Text className="mt-10 text-center text-zinc-400">
          No orders found.
        </Text>
      }
    />
  );
}