import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8099',
    withCredentials: true, // Cho phép gửi cookies cùng với yêu cầu nếu cần
});

let sessionToken = '';

export const setSessionToken = (token: string) => {
    sessionToken = token;
};

axiosClient.interceptors.request.use(async (config: any) => {
    config.headers = {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`,
        ...config.headers,
    }
    config.data

    return config
})

axiosClient.interceptors.response.use((response) => {
        if (response.status === 200 && response.data) {
            return response.data;
        }
        return response
    },
    error => {
        console.warn(`Lỗi kết nối đến cơ sở dữ liệu, ${error.message}`)
    }
)

export default axiosClient;