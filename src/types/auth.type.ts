export interface LoginPayload {
    username: string;
    password: string;
    expiresInMins?: number;
}

export interface AuthUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}

export interface AuthResponse extends AuthUser {
    accessToken: string;
    refreshToken: string;
}

export interface RefreshResponse {
    accessToken: string;
    refreshToken: string;
}

export interface LoginVariables {
    username: string;
    password: string;
}

export interface RefreshResponse {
    accessToken: string;
    refreshToken: string;
}