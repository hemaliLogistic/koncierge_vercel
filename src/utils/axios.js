import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_APP_HOST_API ||
    "http://localhost:1337/api/v1",
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer token`,
      },
});

export default axiosInstance;
