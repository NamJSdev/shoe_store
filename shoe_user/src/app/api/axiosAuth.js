import axios from "axios";

const axiosAuth = axios.create({
    baseURL: 'http://127.0.0.1:8099',
});

axiosAuth.interceptors.request.use(async (config: any) => {
    config.headers = {
        'Content-type': 'application/json',
        ...config.headers,
    }
    config.data

    return config
})

axiosAuth.interceptors.response.use((response) => {
        if (response.status === 200 && response.data) {
            return response.data;
        }
        return response
    },
    error => {
        console.warn(`Lỗi kết nối đến cơ sở dữ liệu, ${error.message}`)
    }
)

export default axiosAuth;