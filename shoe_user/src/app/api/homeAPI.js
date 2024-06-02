import axiosClient from "./axiosClient";

class HomeAPI {
    urlConfig = `/shoes-store/v1/admin/code/list`;
    urlConfigUser = `/shoes-store/v1/user/shoes/list`;
    getProduct = async (models) => {
        try {
            const formData = new FormData();

            formData.append('priceFrom', models.priceFrom);
            formData.append('priceTo', models.priceTo);
            formData.append('searchValue', models.searchValue);
            formData.append('typeId', models.typeId);
            formData.append('materialId', models.materialId);
            formData.append('brandId', models.brandId);
            formData.append('sexId', models.sexId);
            const urlParams = new URLSearchParams(formData);
            
            const config = {
                // Thêm query params vào URL
                url: `${this.urlConfigUser}?${urlParams.toString()}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'multipart/form-data', // Đảm bảo rằng bạn đang gửi formData
                }
            };
            const response = await axiosClient(config);
            return response;
        } catch (error) {
            // Xử lý lỗi ở đây
            console.error("Error get models shoe:", error);
            throw error; // Nếu bạn muốn chuyển lỗi ra ngoại vi để xử lý ở nơi khác
        }
    }
    getConfig = async (code) => {
        try {
            const formData = new FormData();
            
            formData.append('pCode', code);
            const urlParams = new URLSearchParams(formData);
            
            const config = {
                // Thêm query params vào URL
                url: `${this.urlConfig}?${urlParams.toString()}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'multipart/form-data', // Đảm bảo rằng bạn đang gửi formData
                }
            };
            const response = await axiosClient(config);
            return response;
        } catch (error) {
            // Xử lý lỗi ở đây
            console.error("Error adding food option:", error);
            throw error; // Nếu bạn muốn chuyển lỗi ra ngoại vi để xử lý ở nơi khác
        }
    }

    getTrademarksConfig = async () => {
        const code = "SHOES_BRAND";
        try {
            const res = await homeAPI.getConfig(code);
            if (res) {
                return res.data;
            } else {
                console.log('brand not found')
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ API:", error);
        }
    }
}

const homeAPI = new HomeAPI();
export default homeAPI;
