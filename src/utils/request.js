import axios from 'axios'
import { baseUrl } from '@/config/env'

var axiosInstance = axios.create({
    baseURL: baseUrl, // api的base_url
    timeout: 30000,
});

axiosInstance.defaults.headers = {
    "Content-Type": "application/json"
};
// request拦截器
axiosInstance.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        // 解决axios post请求头为json，方便后台获取数据
        if (config.method === 'post') {
            config.headers['Content-Type'] = 'application/json' //  注意：设置很关键
        }
        return config
    },
    error => {
        console.log(error) // for debug
        Promise.reject(error)
    })

// respone拦截器
axiosInstance.interceptors.response.use(
    response => {
        if (response.headers['content-type'] === 'application/vnd.ms-excel;charset=utf-8') {
            return response
        }
        return response.data

    }
)

export default axiosInstance