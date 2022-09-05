import axios from 'axios';

const myAxios = axios.create();

myAxios.interceptors.request.use(
    (config) => {
        console.log('1 request');
        return config;
    },
    (error) => {
        console.log('2 request error');
        return Promise.reject(error);
    },
);

myAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('3 response error');
        return Promise.reject(error);
    },
);

export default myAxios;
