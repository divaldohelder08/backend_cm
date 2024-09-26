import Axios, { type AxiosInstance } from 'axios'

const api: AxiosInstance = Axios.create({
  baseURL: `${process.env.BACKEND_RH_URL}`,
  withCredentials: true,
})

export default api
