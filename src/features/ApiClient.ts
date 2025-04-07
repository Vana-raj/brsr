import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

let isRefreshing = false;
let subscribers: Array<(token: string) => void> = [];

const navigateToLogin = () => {
    localStorage.clear();
    window.location.href = "/login";
};

const refreshToken = async () => {
    try {
        const refresh_token = localStorage.getItem("refreshToken");
        if (!refresh_token) throw new Error("No refresh token available.");

        const response = await axios.post("https://api.escuelajs.co/api/v1/auth/refresh", {
            refresh_token,
        });
        const { access_token } = response.data;

        localStorage.setItem("accessToken", access_token);

        return access_token;
    } catch (error) {
        console.error("Error refreshing token:", error);
        navigateToLogin();
        throw error;
    }
};

const onAccessTokenFetched = (token: string) => {
    subscribers.forEach((callback) => callback(token));
    subscribers = [];
};

apiClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const newToken = await refreshToken();
                    isRefreshing = false;
                    onAccessTokenFetched(newToken);
                } catch {
                    return Promise.reject(error);
                }
            }

            return new Promise((resolve) => {
                subscribers.push((token: string) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    resolve(axios(originalRequest));
                });
            });
        }

        return Promise.reject(error);
    }
);

export default apiClient;
