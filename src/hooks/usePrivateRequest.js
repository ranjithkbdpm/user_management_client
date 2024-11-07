
import { axiosPrivateRequest } from "../utilities/apiRequest.js";
import { useEffect, useContext } from "react";
import useRefresh from "./useRefresh.js";
import { AuthContext } from './context/AuthProvider';

const useAxiosPrivate = () => {
    const refresh = useRefresh();
    const { auth } = useContext(AuthContext);

    useEffect(() => {

        const requestIntercept = axiosPrivateRequest.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivateRequest.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivateRequest(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivateRequest.interceptors.request.eject(requestIntercept);
            axiosPrivateRequest.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivateRequest;
}

export default useAxiosPrivate;
