export interface OrderProduct {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedTotal: number;
    thumbnail: string;
}

export interface Order {
    id: number;
    userId: number;
    total: number;
    discountedTotal: number;
    totalProducts: number;
    totalQuantity: number;
    products: OrderProduct[];
}

export interface OrdersResponse {
    carts: Order[];
    total: number;
    skip: number;
    limit: number;
}