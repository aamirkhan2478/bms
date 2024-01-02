import Axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const axios = Axios.create({
  baseURL,
});

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
      localStorage.removeItem("user");
      axios.post("/user/refresh-token").then((res) => {
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
        }
      });
    }

    return Promise.reject(error);
  }
);
export default axios;
