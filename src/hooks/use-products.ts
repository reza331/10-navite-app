import { getProducts } from '@/services/products.service'
import { useInfiniteQuery } from '@tanstack/react-query'

interface Props {
  q: string
}

const LIMIT = 20

export default function useProducts({ q }: Props) {
  return useInfiniteQuery({
    queryKey: ['products', q],

    initialPageParam: 0,

    queryFn: ({ pageParam, signal }) =>
      getProducts(q, pageParam, LIMIT, signal),

    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit

      return nextSkip < lastPage.total ? nextSkip : undefined
    },
  })
}