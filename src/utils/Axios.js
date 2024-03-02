import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL:"http://localhost:8080", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // 从本地存储中获取Token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; // 将Token添加到请求的Authorization头部中
        }
        return config;
      },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

export default service
