import axiosClient from "./axiosClient";

class ShoeProductAPI {
    urlConfig = `/shoes-store/v1/admin/product/list`;
    url = `/shoes-store/v1/admin/product`;
    getProduct = async (models: any) => {
        try {
            const formData = new FormData();

            formData.append('priceFrom', models.priceFrom);
            formData.append('priceTo', models.priceTo);
            formData.append('searchValue', models.searchValue);
            formData.append('typeId', models.typeId);
            formData.append('materialId', models.materialId);
            formData.append('brandId', models.brandId);
            formData.append('sexId', models.sexId);
            const urlParams = new URLSearchParams(formData as any);
            
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
            console.error("Error get models shoe:", error);
            throw error; // Nếu bạn muốn chuyển lỗi ra ngoại vi để xử lý ở nơi khác
        }
    }

    addProduct = async (data: any) => {
        console.log(data)
        try {
            const response = await axiosClient.post(this.url, {
                size_id: data.size_id,
                price: data.price,
                quantity: data.quantity,
                shoes_id: data.shoes_id,
                color_id: data.color_id
            });
            return response.data;
        } catch (error) {
            console.error("Error adding shoes config:", error);
            throw error;
        }
    }
    deleteData = async (idList: number[]) => {
        console.log(idList)
        try {
            const response = await axiosClient.delete(this.url, { data: { idList } });
            return response.data;
        } catch (error) {
            console.error("Error deleting data:", error);
            throw error;
        }
    }
}

const shoeProductAPI = new ShoeProductAPI();
export default shoeProductAPI;
