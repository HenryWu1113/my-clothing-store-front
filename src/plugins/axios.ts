import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { useUserStore } from '@/stores/user'

const createAxiosInstance = (): ((type?: 'auth') => AxiosInstance) => {
  const baseInstance = axios.create({
    baseURL: import.meta.env.VITE_API
  })

  const authInstance = axios.create({
    baseURL: import.meta.env.VITE_API
  })

  authInstance.interceptors.request.use((config) => {
    const user = useUserStore()
    config.headers.authorization = `Bearer ${user.token}`
    return config
  })

  authInstance.interceptors.response.use(
    (res) => {
      return res
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        if (error.config.url !== '/users/extend' && error.config.url !== '/users/logout') {
          const user = useUserStore()
          return authInstance
            .post('/users/extend', {})
            .then(({ data }) => {
              user.token = data.result
              error.config.headers.authorization = `Bearer ${user.token}`
              return axios(error.config)
            })
            .catch((_) => {
              user.logout()
              return Promise.reject(error)
            })
        }
      }
      return Promise.reject(error)
    }
  )

  return (type?: 'auth'): AxiosInstance => {
    if (type === 'auth') return authInstance
    else if (type === void 0) return baseInstance
    else return baseInstance
  }
}

/**
 * return 一個 function
 * @param type (已登入 auth，未登入不傳)
 */
export const api = createAxiosInstance()
