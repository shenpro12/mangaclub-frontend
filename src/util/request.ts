import axios, { AxiosError } from "axios";

const request = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 10000,
  withCredentials: true,
});

request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    throw error;
  }
);

request.interceptors.request.use(async (request: any) => {
  return request;
});

export default request;
