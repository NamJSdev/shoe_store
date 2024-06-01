import axiosClient from "./axiosClient";

class ShoeConfigAPI {
    urlConfig = `/shoes-store/v1/admin/code/list`;
    urlConfigPost = `/shoes-store/v1/admin/code`;
    getConfig = async (code: string) => {
        try {
            const formData = new FormData();
            
            formData.append('pCode', code);
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
            console.error("Error adding food option:", error);
            throw error; // Nếu bạn muốn chuyển lỗi ra ngoại vi để xử lý ở nơi khác
        }
    }
    getColorsConfig = async () => {
        const code = "SHOES_COLOR";
        try {
            const res = await shoeConfigAPI.getConfig(code);
            if (res) {
                return res.data;
            } else {
                console.log('color not found')
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ API:", error);
        }
    }
    getTypesConfig = async () => {
        const code = "SHOES_TYPE";
        try {
            const res = await shoeConfigAPI.getConfig(code);
            if (res) {
                return res.data;
            } else {
                console.log('type not found')
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ API:", error);
        }
    }
    getMaterialsConfig = async () => {
        const code = "SHOES_MATERIAL";
        try {
            const res = await shoeConfigAPI.getConfig(code);
            if (res) {
                return res.data;
            } else {
                console.log('material not found')
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ API:", error);
        }
    }
    getTrademarksConfig = async () => {
        const code = "SHOES_BRAND";
        try {
            const res = await shoeConfigAPI.getConfig(code);
            if (res) {
                return res.data;
            } else {
                console.log('brand not found')
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ API:", error);
        }
    }
    getStylesConfig = async () => {
        const code = "SHOES_STYLE";
        try {
            const res = await shoeConfigAPI.getConfig(code);
            if (res) {
                return res.data;
            } else {
                console.log('style not found')
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ API:", error);
        }
    }
    getSizesConfig = async () => {
        const code = "SHOES_SIZE";
        try {
            const res = await shoeConfigAPI.getConfig(code);
            if (res) {
                return res.data;
            } else {
                console.log('size not found')
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ API:", error);
        }
    }

    addShoesColor = async (colorData: any) => {
        try {
            const response = await axiosClient.post(this.urlConfigPost, {
                p_code: "SHOES_COLOR",
                code: colorData.code,
                desc: colorData.desc
            });
            return response.data;
        } catch (error) {
            console.error("Error adding shoes color:", error);
            throw error;
        }
    }
    addShoesTrademark = async (data: any) => {
        try {
            const response = await axiosClient.post(this.urlConfigPost, {
                p_code: "SHOES_BRAND",
                code: data.code,
                desc: data.desc
            });
            return response.data;
        } catch (error) {
            console.error("Error adding shoes config:", error);
            throw error;
        }
    }
    addShoesMaterial = async (data: any) => {
        try {
            const response = await axiosClient.post(this.urlConfigPost, {
                p_code: "SHOES_MATERIAL",
                code: data.code,
                desc: data.desc
            });
            return response.data;
        } catch (error) {
            console.error("Error adding shoes config:", error);
            throw error;
        }
    }
    addShoesType = async (data: any) => {
        try {
            const response = await axiosClient.post(this.urlConfigPost, {
                p_code: "SHOES_TYPE",
                code: data.code,
                desc: data.desc
            });
            return response.data;
        } catch (error) {
            console.error("Error adding shoes config:", error);
            throw error;
        }
    }
    addShoesStyle = async (data: any) => {
        try {
            const response = await axiosClient.post(this.urlConfigPost, {
                p_code: "SHOES_STYLE",
                code: data.code,
                desc: data.desc
            });
            return response.data;
        } catch (error) {
            console.error("Error adding shoes config:", error);
            throw error;
        }
    }
    addShoesSize = async (data: any) => {
        try {
            const response = await axiosClient.post(this.urlConfigPost, {
                p_code: "SHOES_SIZE",
                code: data.code,
                desc: data.desc
            });
            return response.data;
        } catch (error) {
            console.error("Error adding shoes config:", error);
            throw error;
        }
    }
    updateDataConfig = async (data: any) => {
        try {
            console.log(data.id)
            const response = await axiosClient.put(this.urlConfigPost, {
                id: data.id,
                code: data.code,
                desc: data.desc
            });
            return response.data;
        } catch (error) {
            console.error("Error updating:", error);
            throw error;
        }
    }
    deleteDataConfig = async (idList: number[]) => {
        try {
            const response = await axiosClient.delete(this.urlConfigPost, { data: { idList } });
            return response.data;
        } catch (error) {
            console.error("Error deleting data:", error);
            throw error;
        }
    }
}

const shoeConfigAPI = new ShoeConfigAPI();
export default shoeConfigAPI;
