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

    // addModel = async (Data: any,Pictures:any) => {
    //     try {
    //         const listData = {
    //             code: Data.code,
    //             name: Data.name,
    //             price: Data.price,
    //             desc: Data.desc,
    //             style_id: Data.style_id,
    //             type_id: Data.type_id,
    //             brand_id: Data.brand_id,
    //             color_ids: Data.color_ids,
    //             sex_id: Data.sex_id,
    //             material_id: Data.material_id
    //         };
    //         const formData = new FormData();
    //         console.log(Pictures)

    //         formData.append('shoesAddForm', JSON.stringify(listData));
    //         formData.append('images', Pictures);

    //         formData.forEach((value, key) => {
    //             console.log(key, value);
    //         });
    //         const config = {
    //             headers: {
    //                 'content-type': 'multipart/form-data; charset=utf-8; boundary="------";'
    //             }
    //         }
    //         const response = await axiosClient.post(this.url, formData, config);
    //         // console.log(response)
    //         return response.data;
    //     } catch (error) {
    //         // Xử lý lỗi ở đây
    //         console.error("Error adding food option:", error);
    //         throw error; // Nếu bạn muốn chuyển lỗi ra ngoại vi để xử lý ở nơi khác
    //     }
    // }

    deleteData = async (idList: number[]) => {
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
