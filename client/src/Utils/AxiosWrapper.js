import axios from 'axios';
import Cookies from 'js-cookie';
import { createContext, useCallback, useMemo, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchAuthToken = async () => {
    return Cookies.get('accessToken');
};

export const storeAuthToken = async (token) => {
    if (token)
        return Cookies.set('accessToken', token, { expires: 90 });
    return token;
};

export const clearAuthToken = async () => {
    Cookies.remove('accessToken');
};

export const getTokenHeaders = async (token, setToken, setIsLoggedIn) => {
    if (!token) {
        const authToken = await fetchAuthToken()
            .then(response => {
                setToken(response);
                return {
                    accessToken: response,
                };
            })
            .catch(error => {
                clearAuthToken();
                setToken(null);
                setIsLoggedIn(false);
                return {
                    accessToken: null,
                };
            });
        return authToken;
    } else {
        return {
            accessToken: token,
        };
    }
};

export const apiReq = async (
    endPoint,
    data,
    method,
    headers,
    token,
    setToken,
    setIsLoggedIn,
    onUploadProgress = () => { },
    requestOptions = {},
) => {
    return new Promise(async (res, rej) => {
        const getTokenHeader = await getTokenHeaders(
            token,
            setToken,
            setIsLoggedIn,
        );
        headers = {
            ...getTokenHeader,
            ...headers,
        };

        if (method === 'get' || method === 'delete') {
            data = {
                ...requestOptions,
                ...data,
                headers,
            };
        }

        endPoint = `${API_URL}/${encodeURI(endPoint)}`;
        axios[method](endPoint, data, { headers, onUploadProgress })
            .then(result => {
                if (result.status === false) {
                    return rej(result);
                }
                if (result && result.data && result.data.token && result.data.token.length > 0) {
                    setToken(result.data.token);
                    storeAuthToken(result.data.token).catch(error =>
                        console.log(error),
                    );
                }

                return res(result);
            })
            .catch(error => {
                if (error && error.response && error.response.status === 401) {
                    clearAuthToken();
                    setIsLoggedIn(false);
                }
                if (error && error.response && error.response.data) {
                    if (!error.response.data.message) {
                        return rej({
                            ...error.response.data,
                            msg: error.response.data.message || 'Network Error',
                        });
                    }
                    return rej(error.response.data);
                } else {
                    return rej({ message: 'Network Error', msg: 'Network Error' });
                }
            });
    });
};


export const AxiosWrapperContext = createContext(false);

export const AxiosWrapperProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    const apiPost = useCallback(
        (endPoint, data, headers = {}, onUploadProgress = () => { }) => {
            return apiReq(
                endPoint,
                data,
                'post',
                headers,
                token,
                setToken,
                setIsLoggedIn,
                onUploadProgress,
            );
        },
        [token, setToken, setIsLoggedIn],
    );

    const apiDelete = useCallback(
        (endPoint, data, headers = {}, onUploadProgress = () => { }) => {
            return apiReq(
                endPoint,
                data,
                'delete',
                headers,
                token,
                setToken,
                setIsLoggedIn,
                onUploadProgress,
            );
        },
        [token, setToken, setIsLoggedIn],
    );

    const apiGet = useCallback(
        (endPoint, data, headers = {}, onUploadProgress = () => { }) => {
            return apiReq(
                endPoint,
                data,
                'get',
                headers,
                token,
                setToken,
                setIsLoggedIn,
                onUploadProgress,
            );
        },
        [token, setToken, setIsLoggedIn],
    );

    const apiPut = useCallback(
        (endPoint, data, headers = {}, onUploadProgress = () => { }) => {
            return apiReq(
                endPoint,
                data,
                'put',
                headers,
                token,
                setToken,
                setIsLoggedIn,
                onUploadProgress,
            );
        },
        [token, setToken, setIsLoggedIn],
    );

    const contextValue = useMemo(
        () => ({
            isLoggedIn,
            setIsLoggedIn,
            token,
            apiPost,
            apiDelete,
            apiGet,
            apiPut,
            setToken,
        }),
        [isLoggedIn, setIsLoggedIn, token, apiPost, apiDelete, apiGet, apiPut],
    );

    return (
        <AxiosWrapperContext.Provider value={contextValue}>
            {children}
        </AxiosWrapperContext.Provider>
    );
};