import axios from "axios";

export const baseUrl = 'https://scholarly-admin-backend.onrender.com/scholarly/api/v1/';

export const websocket_url = 'wss://scholarly-admin-backend.onrender.com/scholarly-websocket-endpoint/';


const headers = {"Content-Type": 'application/json'};

// To prevent axios from throwing any errors
export const axiosInstance = axios.create({
    validateStatus: ()=> true,
    baseURL:baseUrl,
    headers,
})