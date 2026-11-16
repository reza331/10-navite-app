import { api } from '@/axios/client';
import { OrdersResponse } from '@/types/order.type';

export const getOrders = async (
    userId: number,
    skip: number,
    limit: number,
    signal?: AbortSignal
) => {
    const { data } = await api.get<OrdersResponse>(
        `/carts/user/${userId}`,
        {
            params: { skip, limit },
            signal,
        }
    );

    return data;
};