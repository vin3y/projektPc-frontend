import axios from "axios";

export const api = axios.create({
  baseURL: "http://www.localhost:8080/",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post(
      "http://localhost:8080/projektpc/v1/auth/refresh",
      {},
      { withCredentials: true },
    );

    const token = response.data.accessToken;

    localStorage.setItem("accessToken", token);

    return token;
  } catch {
    localStorage.removeItem("accessToken");
    return null;
  }
};

api.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("accessToken");

    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }

    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const token = await refreshAccessToken();

      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);
