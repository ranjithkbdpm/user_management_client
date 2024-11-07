import apiRequest from '../utilities/apiRequest.js';
import { useContext } from 'react';
import {AuthContext} from '../context/AuthProvider.js';

const useRefresh = () => {
    const { setAuth } = useContext(AuthContext);

    const refresh = async () => {
        try {
            const response = await apiRequest.get('/auth/refresh-accesstoken');
            if (!response) {
                alert('No response from refresh-accesstoken API');
                return null;
            }
            
            const { accessToken } = response.data;
            
            setAuth((prevAuth) => ({
                ...prevAuth,
                accessToken: accessToken
            }));
            // console.log(accessToken)
            
            return accessToken;
        } catch (error) {
            console.error("Error refreshing access token:", error);
            return null;
        }
    };

    return refresh;
};

export default useRefresh;