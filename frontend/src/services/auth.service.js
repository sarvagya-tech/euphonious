import api from "./api";



const registerService = async (formData) => {
    const response = await api.post('/users/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

const loginService = async (email, password) => {
    const response = await api.post('/users/login', { email, password });
    return response.data;
};
const logoutService = async () => {
    try {
        const logoutData = await api.post('/users/logout')
        return logoutData;
    } catch (error) {
        console.log("error in the logout api", error);
    }
}
export { registerService, loginService, logoutService }