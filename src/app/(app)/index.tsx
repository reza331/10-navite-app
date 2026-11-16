import useProducts from '@/hooks/use-products'
import { sendTestNotification } from '@/services/notification.service'
import { useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

export default function Home() {

  const [search, setSearch] = useState('')

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts({ q: search })

  const products = data?.pages.flatMap(page => page.products) ?? []

  return (
    <View className="flex-1 px-5 pt-5">

      <TouchableOpacity
        onPress={async () => {
          try {
            await sendTestNotification();
            console.log('Notification scheduled');
          } catch (error) {
            console.log(error);
          }
        }}
        className="bg-emerald-700 p-4 rounded-xl"
      >
        <Text className="text-white text-center">
          Test Notification
        </Text>
      </TouchableOpacity>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search products..."
        placeholderTextColor="#71717a"
        autoCorrect={false}
        className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white mt-4"
      />

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#10b981" />
        </View>
      ) : isError ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-400">Failed to load products.</Text>
        </View>
      ) : (
        <FlatList
          className="mt-2"
          data={products}
          keyExtractor={item => item.id.toString()}
          keyboardShouldPersistTaps="handled"

          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage()
            }
          }}
          onEndReachedThreshold={0.5}

          renderItem={({ item }) => (
            <View className="bg-zinc-600 mt-4 rounded-2xl flex-row overflow-hidden">
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: item.images[0] }}
              />

              <View className="p-2 flex-1">
                <Text className="text-zinc-300 text-sm font-semibold">
                  {item.title}
                </Text>

                <Text className="text-white text-lg font-semibold mt-1">
                  ${item.price}
                </Text>

                <Text className="text-sm mt-2 text-teal-500">
                  {item.brand}
                </Text>
              </View>
            </View>
          )}

          ListEmptyComponent={
            <Text className="text-zinc-400 text-center mt-10">
              No products found.
            </Text>
          }

          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator
                color="#10b981"
                size="large"
                style={{ marginVertical: 20 }}
              />
            ) : <></>
          }
        />
      )}
      <View className='mt-4' />
    </View>
  )
}