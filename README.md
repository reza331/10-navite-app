# Store Mobile App

A React Native store application built with **Expo**, **TypeScript**, and **NativeWind**. This project demonstrates authentication, API integration, paginated data fetching, offline support, and local notifications.

## Features

- **Authentication**
  - JWT login and logout.
  - Secure token storage using Expo SecureStore.
  - Session restoration after restarting the app.
  - Automatic access token refresh.
  - Concurrent request handling during token refresh.

- **Products**
  - Fetch products from DummyJSON.
  - Product search.
  - Infinite scrolling with pagination.
  - Cached product data.

- **Orders**
  - Fetch mock orders for the authenticated user.
  - Infinite scrolling and pagination.
  - Authentication guard for the Orders screen.

- **Offline Support**
  - Network status detection using NetInfo.
  - Global offline indicator.
  - Persisted React Query cache using AsyncStorage.
  - Automatic refetching after reconnecting.

- **Notifications**
  - Notification permission handling.
  - Local test notifications using Expo Notifications.

## Tech Stack

| Technology | Purpose |
|---|---|
| React Native | Mobile application |
| Expo | Development environment |
| TypeScript | Type safety |
| Expo Router | Navigation and routing |
| NativeWind | Styling |
| Axios | HTTP requests |
| TanStack Query | Server state and data fetching |
| Zustand | Authentication state |
| Expo SecureStore | Secure token storage |
| AsyncStorage | Persistent query cache |
| NetInfo | Network connectivity detection |
| Expo Notifications | Local notifications |

## API

This project uses [DummyJSON](https://dummyjson.com/) as its mock API.

Main endpoints:

- `POST /auth/login` – User authentication
- `GET /auth/me` – Retrieve authenticated user
- `POST /auth/refresh` – Refresh access token
- `GET /products/search` – Search and paginate products
- `GET /carts/user/:id` – Retrieve mock orders

**Note:** DummyJSON is a mock API. Carts are used as mock orders, and server-side mutations are not permanently persisted.

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

Install Expo-compatible dependencies if needed:

```bash
npx expo install
```

Start the development server:

```bash
npx expo start
```

Scan the QR code using Expo Go to run the application.

## Test Credentials

Use the following DummyJSON test account:

| Field | Value |
|---|---|
| Username | `emilys` |
| Password | `emilyspass` |

## Offline Testing

1. Open the application while connected to the internet.
2. Wait for products to load.
3. Disable Wi-Fi and mobile data.
4. Verify the offline indicator and cached products.
5. Restart the application while offline and verify persisted data.
6. Re-enable the internet and verify automatic data recovery.

## Notification Testing

1. Grant notification permissions.
2. Open the Home screen.
3. Press the **Test Notification** button.
4. Wait approximately five seconds.
5. Verify that the local notification appears.

**Note:** Notifications in this project are local test notifications, not remote push notifications sent by a server.

## Project Status

All seven assignment requirements have been implemented and tested within the scope of this mock application.