import { getOrders } from '@/services/order.service';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Props {
    userId: number;
}

const LIMIT = 10;

export default function useOrders({ userId }: Props) {
    return useInfiniteQuery({
        queryKey: ['orders', userId],

        initialPageParam: 0,

        queryFn: ({ pageParam, signal }) =>
            getOrders(userId, pageParam, LIMIT, signal),

        getNextPageParam: (lastPage) => {
            const nextSkip = lastPage.skip + lastPage.limit;

            return nextSkip < lastPage.total
                ? nextSkip
                : undefined;
        },

        enabled: !!userId,
    });
}