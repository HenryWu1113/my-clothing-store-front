import axios from 'axios'
import type { AxiosInstance } from 'axios'

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API
})

export const apiAuth: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API
})
