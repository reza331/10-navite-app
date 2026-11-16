import { api } from "@/axios/client"
import { ProductsResponse } from "@/types/product.type"

export const getProducts = async (
  q: string,
  skip: number,
  limit: number,
  signal?: AbortSignal
) => {
  const { data } = await api.get<ProductsResponse>('/products/search', {
    params: { q, skip, limit },
    signal,
  })

  return data
}