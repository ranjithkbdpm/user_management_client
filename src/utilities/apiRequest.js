import axios from 'axios';

const apiRequest = axios.create({
    baseURL: 'http://localhost:3500/api',
    withCredentials: true, //for sending cookies if needed
});


export const apiPrivateRequest = axios.create({
    baseURL: 'http://localhost:3500/api',
    withCredentials: true, //for sending cookies if needed
})


// src/utilities/apiRequest.js
export const setupInterceptor = (getToken, refreshAuthLogic) => {
    apiPrivateRequest.interceptors.request.use(
      (config) => {
        const token = getToken();
        // console.log('gettoken',token)
        if(!config.headers.Authorization){
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
              }
        }        
        return config;
      },(error) => Promise.reject(error)
    );
  
    apiPrivateRequest.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
  
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
  
          // Refresh the access token
          const newToken = await refreshAuthLogic();
          if (newToken) {
            apiPrivateRequest.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            return apiPrivateRequest(originalRequest); // Retry the original request with the new token
          }
        }
        return Promise.reject(error);
      }
    );
  };
  

export default apiRequest