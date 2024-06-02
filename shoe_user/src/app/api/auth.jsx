import axiosAuth from "@/app/api/axiosAuth";

class AuthAPIs {
    urlConfigPost = `/shoes-store/v1/admin/auth/login`;

    login = async (valueLogin: string, password: string) => {
        try {
            const response = await axiosAuth.post(this.urlConfigPost, {
                email: valueLogin,
                password: password
            });
            return response;

        } catch (error) {
            console.error("Error login:", error);
            throw error;
        }
    }
    // changePass = async (codeActive: string, password: string) => {
    //     console.log(codeActive, password)
    //     try {
    //         const formData = new FormData();

    //         formData.append('CodeActive', codeActive);
    //         formData.append('NewPassword', password);
    //         const response = await axiosClient.post("/api/Admin/create-new-password", formData);
    //         return response;

    //     } catch (error) {
    //         console.error("Error login:", error);
    //         throw error; // Bạn có thể xử lý lỗi ở đây theo cách phù hợp với ứng dụng của bạn
    //     }
    // }
}

const authApi = new AuthAPIs();
export default authApi;