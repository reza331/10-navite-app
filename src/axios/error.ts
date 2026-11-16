import axios from 'axios';

export interface ApiError {
    message: string;
    code?: number | null;
    status?: string | null;
}

export class HttpError extends Error {
    constructor(status: number, message: string) {
        super(message);
        this.status = status
    }
    status: number
}

export const normalizeError = (error: unknown): ApiError => {

    if (axios.isAxiosError(error)) {

        const responseMessage = error.response?.data?.message;

        return {
            message:
                typeof responseMessage === 'string'
                    ? responseMessage
                    : error.message,
            code: error.response?.status ?? null,
            status: error.response?.statusText ?? error.code ?? null,
        }

    }

    if (error instanceof HttpError) {
        return {
            message: error.message,
            code: error.status,
            status: null,
        }
    }

    if (error instanceof Error) {
        return {
            message: error.message,
            code: null,
            status: null,
        }
    }

    return {
        message: 'Unknown Error',
        code: null,
        status: null,
    }

}