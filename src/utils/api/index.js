import axios from "axios";

const apiClient = axios.create({
  // baseURL: "https://parklinkapi.azurewebsites.net/v1", // <- ENV variable
  baseURL: process.env.REACT_APP_API_ENDPOINT ? process.env.REACT_APP_API_ENDPOINT : "http://localhost:4000/v1", // <- ENV variable
});

// apiClient.interceptors.request.use((config) => {
//   return ({
//     ...config,
//     headers: {
//     }
//   })
// },
//   error => Promise.reject(error),
// );

// apiClient.interceptors.response.use((response) =>
//   response,
//   async (error) => {
//     console.log(error)
//     return Promise.reject(error.response.data);
//   },
// );

// const { get, post, put, delete: destroy } = apiClient;
// export { get, post, put, destroy };

export default apiClient;