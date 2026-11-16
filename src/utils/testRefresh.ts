import { api } from '@/axios/client'
import { getMe } from '@/services/auth.service'
import { tokenStorage } from '@/storage/token.storage'

const invalidateAccessToken = async () => {
    const refreshToken = await tokenStorage.getRefreshToken()

    if (!refreshToken) {
        throw new Error('Refresh token not found')
    }

    await tokenStorage.setTokens(
        'invalid_access_token',
        refreshToken
    )
}

export const testTokenRefresh = async () => {
    await invalidateAccessToken()
    return getMe()
}

export const testConcurrentRefresh = async () => {
    await invalidateAccessToken()

    const results = await Promise.all([
        api.get('/auth/me'),
        api.get('/auth/me'),
        api.get('/auth/me'),
    ])

    return results.length
}