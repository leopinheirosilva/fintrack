import axios from 'axios'

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage'

export const protectedApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
})

export const publicApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
})

// anexa os tokens nas requests com axios interceptors
protectedApi.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
  if (!accessToken) {
    return request
  }
  request.headers.Authorization = `Bearer ${accessToken}`
  return request
})

// refaz a requisição em caso de ERRO 401
protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config
    // verificar se há um refresh token
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
    if (!refreshToken) {
      return Promise.reject(error)
    }
    if (
      // verifica se o erro é 401 (token inválido ou inexistente)
      error.response.status == 401 &&
      // verifica se a requisição já foi refeita
      !request._retry &&
      // verifica se a requisição está sendo feita para a rota indicada
      !request.url.includes('/users/refresh-token')
    ) {
      request._retry = true
      try {
        // atualiza os tokens
        const response = await protectedApi.post('/users/refresh-token', {
          refreshToken,
        })
        const newAccessToken = response.data.accessToken
        const newRefreshToken = response.data.refreshToken
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, newAccessToken)
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, newRefreshToken)
        // refaz a requisição
        request.headers.Authorization = `Bearer ${newAccessToken}`
        return protectedApi(request)
      } catch (refreshError) {
        // remove os tokens caso eles sejam inválidos
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
        console.error(refreshError)
      }
    }
    return Promise.reject(error)
  }
)
