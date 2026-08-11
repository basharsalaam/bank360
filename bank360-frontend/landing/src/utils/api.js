import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/", // Base URL for your API
});

// Request Interceptor: Add Authorization Header
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Errors (Token Expiration)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                try {
                    const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
                        refresh: refreshToken,
                    });
                    // Update the access token in localStorage
                    localStorage.setItem("accessToken", response.data.access);

                    // Retry the original request with the new access token
                    error.config.headers.Authorization = `Bearer ${response.data.access}`;
                    return axios.request(error.config);
                } catch (refreshError) {
                    console.error("Token refresh failed:", refreshError);
                    // Clear tokens and redirect to login
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    window.location.href = "/login"; // Redirect to login
                }
            } else {
                // No refresh token available, log out
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
