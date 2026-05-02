import api from "./api";



const registerService = async ({ formData }) => {
    try {
        const registerData = await api.post('/users/register',
            formData,  // ← send directly!
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        return registerData;
    } catch (error) {
        console.log("error in the register api", error);
    }
}
const loginService = async (email, password) => {
    try {
        const loginData = await api.post('/users/login', {
            email,
            password
        })

        return loginData;
    } catch (error) {
        console.log("error in the login api", error);
    }
}
const logoutService = async () => {
    try {
        const logoutData = await api.post('/users/logout')
        return logoutData;
    } catch (error) {
        console.log("error in the logout api", error);
    }
}
export { registerService, loginService, logoutService }